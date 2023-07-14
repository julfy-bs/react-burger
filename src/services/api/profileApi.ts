import { authorizationRequest, request } from '../helpers/request';
import { LoginPromise } from '../../types/LoginPromise';
import { LogoutPromise } from '../../types/LogoutPromise';
import { LogoutInput } from '../../types/LogoutInput';
import { ForgotPasswordPromise } from '../../types/ForgotPasswordPromise';
import { ForgotPasswordInput } from '../../types/ForgotPasswordInput';
import { ResetPasswordInput } from '../../types/ResetPasswordInput';
import { ResetPasswordPromise } from '../../types/ResetPasswordPromise';
import { User } from '../../types/User';
import { LoginInput } from '../../types/LoginInput';
import { UserPromise } from '../../types/UserPromise';
import { fetchUpdateUserInput } from '../../types/fetchUpdateUserInput';

export const registerUser = ({ email, password, name }: User): Promise<LoginPromise> =>
  request('auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name })
  });

export const loginUser = ({ email, password }: LoginInput): Promise<LoginPromise> =>
  request('auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

export const logoutUser = ({ token }: LogoutInput): Promise<LogoutPromise> =>
  request('auth/logout', {
    method: 'POST',
    body: JSON.stringify({ token })
  });

export const forgotPassword = ({ email }: ForgotPasswordInput): Promise<ForgotPasswordPromise> =>
  request('password-reset', {
    method: 'POST',
    body: JSON.stringify({ email })
  });

export const resetPassword = ({ password, token }: ResetPasswordInput): Promise<ResetPasswordPromise> =>
  request('password-reset/reset', {
    method: 'POST',
    body: JSON.stringify({ password, token })
  });

export const getUser = (): Promise<UserPromise> => authorizationRequest('auth/user');

export const patchUser = (userData: fetchUpdateUserInput): Promise<UserPromise> => authorizationRequest('auth/user', {
  method: 'PATCH',
  body: JSON.stringify(userData),
});
