import { serverConfig } from '../../utils/config.js';
import { checkResponse } from '../helpers/checkResponse.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants.js';
import { getCookie } from '../helpers/getCookie.js';
import { setCookie } from '../helpers/setCookie.js';

const profileApi = ({ baseUrl, headers }) => {

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
        const { accessToken, refreshToken } = await updateTokenRequest;
        setCookie(ACCESS_TOKEN, accessToken, 1200);
        setCookie(REFRESH_TOKEN, refreshToken, 1200);

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

  const registerUser = async ({ email, password, name }) => checkResponse(await fetch(`${baseUrl}/auth/register`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ email, password, name })
  }));

  const loginUser = async ({ email, password }) => checkResponse(await fetch(`${baseUrl}/auth/login`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }));

  const logoutUser = async ({ token }) => checkResponse(await fetch(`${baseUrl}/auth/logout`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ token }),
  }));

  const getUser = () => authorizationRequest('auth/user', {
    method: 'GET',
  });

  const patchUser = (data) => authorizationRequest('auth/user', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  const forgotPassword = async ({ email }) => checkResponse(await fetch(`${baseUrl}/password-reset`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ email }),
  }));

  const resetPassword = async ({ password, token }) => checkResponse(await fetch(`${baseUrl}/password-reset/reset`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ password, token }),
  }));

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