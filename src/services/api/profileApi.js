import { authorizationRequest, request } from '../helpers/request.js';

export const registerUser = ({ email, password, name }) =>
  request('auth/register', {
  method: 'POST',
  body: JSON.stringify({ email, password, name })
});

export const loginUser = ({ email, password }) =>
  request('auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

export const logoutUser = ({ token }) =>
  request('auth/logout', {
  method: 'POST',
  body: JSON.stringify({ token })
});

export const forgotPassword = ({ email }) =>
  request('password-reset', {
  method: 'POST',
  body: JSON.stringify({ email })
});

export const resetPassword = ({ password, token }) =>
  request('password-reset/reset', {
  method: 'POST',
  body: JSON.stringify({ password, token })
});

export const getUser = () => authorizationRequest('auth/user');

export const patchUser = (data) => authorizationRequest('auth/user', {
  method: 'PATCH',
  body: JSON.stringify(data),
});
