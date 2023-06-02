import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, forgotPassword, resetPassword, logoutUser } from '../api/profileApi.js';


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
  async(_, { rejectWithValue }) => {
    try {
      const token = localStorage.refreshToken;
      return await logoutUser({ token });
    } catch(e) {
      return rejectWithValue(e);
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