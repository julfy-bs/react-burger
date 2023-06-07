import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getUser,
  patchUser
} from '../api/profileApi.js';
import { getCookie } from '../helpers/getCookie.js';
import { REFRESH_TOKEN } from '../../utils/constants.js';


export const fetchRegister = createAsyncThunk(
  'profile/fetchRegister',
  async ({ email, password, name }) => await registerUser({ email, password, name })
);

export const fetchLogin = createAsyncThunk(
  'profile/fetchLogin',
  async ({ email, password }) => await loginUser({ email, password })
);

export const fetchLogout = createAsyncThunk(
  'profile/fetchLogout',
  async () => {
    const token = getCookie(REFRESH_TOKEN);
    return await logoutUser({ token });
  },
);

export const fetchGetUser = createAsyncThunk(
  'profile/fetchGetUser',
  async () => await getUser(),
);

export const fetchUpdateUser = createAsyncThunk(
  'profile/fetchUpdateUser',
  async (data) => await patchUser(data)
);

export const fetchForgotPassword = createAsyncThunk(
  'profile/fetchForgotPassword',
  async ({ email }) => await forgotPassword({ email }),
);

export const fetchResetPassword = createAsyncThunk(
  'profile/fetchResetPassword',
  async ({ password, token }) => await resetPassword({ password, token }),
);