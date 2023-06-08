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
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await registerUser({ name, email, password });
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'profile/fetchLogin',
  ({ email, password }, thunkAPI) =>
    loginUser({ email, password })
      .catch(e => thunkAPI.rejectWithValue(e))
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
  getUser
);

export const fetchUpdateUser = createAsyncThunk(
  'profile/fetchUpdateUser',
  ({ name, email, password }, thunkAPI) =>
    patchUser({ name, email, password })
      .catch(e => thunkAPI.rejectWithValue(e))
);

export const fetchForgotPassword = createAsyncThunk(
  'profile/fetchForgotPassword',
  ({ email }, thunkAPI) =>
    forgotPassword({ email })
      .catch(e => thunkAPI.rejectWithValue(e))
);

export const fetchResetPassword = createAsyncThunk(
  'profile/fetchResetPassword',
  ({ password, token }, thunkAPI) =>
    resetPassword({ password, token })
      .catch(e => thunkAPI.rejectWithValue(e))
);