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
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      return await registerUser({ email, password, name });
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const fetchLogin = createAsyncThunk(
  'profile/fetchLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await loginUser({ email, password });
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const fetchLogout = createAsyncThunk(
  'profile/fetchLogout',
  async (_, { rejectWithValue }) => {
    try {
      const token = getCookie(REFRESH_TOKEN);
      return await logoutUser({ token });
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const fetchGetUser = createAsyncThunk(
  'profile/fetchGetUser',
  async (_, thunkApi) => {
    try {
      return await getUser();
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

export const fetchUpdateUser = createAsyncThunk(
  'profile/fetchUpdateUser',
  async (data, thunkApi) => {
    try {
      return await patchUser(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

export const fetchForgotPassword = createAsyncThunk(
  'profile/fetchForgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      return await forgotPassword({ email });
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const fetchResetPassword = createAsyncThunk(
  'profile/fetchResetPassword',
  async ({ password, token }, { rejectWithValue }) => {
    try {
      return await resetPassword({ password, token });
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);