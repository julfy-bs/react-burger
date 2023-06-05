import { serverConfig } from '../../utils/config.js';
import checkResponse from '../helpers/checkResponse.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants.js';
import { getCookie } from '../helpers/getCookie.js';
import { setCookie } from '../helpers/setCookie.js';

const profileApi = ({ baseUrl, headers }) => {

  const request = async (url, options = {}) => {
    const computedUrl = `${baseUrl}/${url}`;
    const res = await fetch(computedUrl, {
      headers: headers,
      ...options,
    });
    return checkResponse(res);
  };

  const authorizationRequest = async (url, options) => {
    const computedUrl = `${baseUrl}/${url}`;
    const res = await fetch(computedUrl, {
      headers: {
        authorization: getCookie(ACCESS_TOKEN),
        ...headers
      },
      ...options
    });
    if (res.status === 403) {
      const updateTokenRequest = await fetch(`${baseUrl}/auth/token`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ token: getCookie(REFRESH_TOKEN) }),
      });

      if (updateTokenRequest.ok) {
        const data = await updateTokenRequest;
        setCookie(ACCESS_TOKEN, data.accessToken, 1200);
        setCookie(REFRESH_TOKEN, data.refreshToken, 1200);

        const res = await fetch(computedUrl, {
          headers: {
            authorization: getCookie(ACCESS_TOKEN),
            ...headers
          },
          ...options
        });
        return checkResponse(res);
      }
    }
    return checkResponse(res);
  };

  const registerUser = ({ email, password, name }) => {
    return request('auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    });
  };

  const loginUser = ({ email, password }) => {
    return request('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  };

  const logoutUser = ({ token }) => {
    return request('auth/logout', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  };

  const getUser = () => {
    return authorizationRequest('auth/user', {
      method: 'GET',
    });
  };

  const patchUser = async (data) => {
    return authorizationRequest('auth/user', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };

  const forgotPassword = ({ email }) => {
    return request('password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  };

  const resetPassword = ({ password, token }) => {
    return request('password-reset/reset', {
      method: 'POST',
      body: JSON.stringify({ password, token }),
    });
  };

  return { registerUser, loginUser, logoutUser, getUser, patchUser, forgotPassword: forgotPassword, resetPassword };
};

export const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  patchUser,
  forgotPassword,
  resetPassword
} = profileApi(serverConfig);