import { serverConfig } from '../../utils/config.js';
import checkResponse from '../helpers/checkResponse.js';

const profileApi = ({ baseUrl, headers }) => {

  const request = async (url, options = {}) => {
    const computedUrl = `${baseUrl}/${url}`;
    const res = await fetch(computedUrl, {
      headers: headers,
      ...options,
    });
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

  return { registerUser, loginUser, logoutUser, forgotPassword: forgotPassword, resetPassword };
};

export const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = profileApi(serverConfig);