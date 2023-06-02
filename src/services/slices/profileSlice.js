import { createSlice } from '@reduxjs/toolkit';
import {
  fetchForgotPassword,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword
} from '../asyncThunk/profileThunk';
import {
  ACCESS_TOKEN,
  ERROR_LOGIN,
  ERROR_USER_EXISTS,
  NOTIFICATION_EMAIL_SUBMITTED,
  NOTIFICATION_LOGIN_SUCCESS,
  NOTIFICATION_LOGOUT_SUCCESS,
  NOTIFICATION_PASSWORD_RESET,
  NOTIFICATION_USER_CREATED,
  REFRESH_TOKEN,
  SERVER_RESPOND_INCORRECT_VALUES,
  SERVER_RESPOND_USER_EXISTS
} from '../../utils/constants.js';

const initialState = {
  profileFetchRequest: false,
  profileFetchFailed: false,
  isEmailSubmitted: false,
  isLogin: false,
  email: '',
  name: '',
  password: '',
  message: '',
  accessToken: '',
  errorMessage: ''
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = '';
    },
  },
  extraReducers: function (builder) {
    builder
      // Register
      .addCase(fetchRegister.pending, (state) => {
        state.profileFetchRequest = true;
        state.profileFetchFailed = false;
        state.message = '';
        state.errorMessage = '';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.profileFetchRequest = false;
        state.accessToken = action.payload.accessToken;
        state.message = NOTIFICATION_USER_CREATED;
        localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.profileFetchRequest = false;
        state.profileFetchFailed = true;
        (action.payload.message === SERVER_RESPOND_USER_EXISTS)
          ? state.errorMessage = ERROR_USER_EXISTS
          : state.errorMessage = action.payload.message;
      })
      // Login
      .addCase(fetchLogin.pending, (state) => {
        state.profileFetchRequest = true;
        state.profileFetchFailed = false;
        state.message = '';
        state.errorMessage = '';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLogin = true;
        state.profileFetchRequest = false;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.password = action.meta.arg.password;
        state.accessToken = action.payload.accessToken;
        state.message = NOTIFICATION_LOGIN_SUCCESS;
        localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.profileFetchRequest = false;
        state.profileFetchFailed = true;
        (action.payload.message === SERVER_RESPOND_INCORRECT_VALUES)
          ? state.errorMessage = ERROR_LOGIN
          : state.errorMessage = action.payload.message;
      })
      // Logout
      .addCase(fetchLogout.pending, (state) => {
        state.profileFetchRequest = true;
        state.profileFetchFailed = false;
        state.message = '';
        state.errorMessage = '';
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.profileFetchRequest = false;
        state.message = NOTIFICATION_LOGOUT_SUCCESS;
        state.isLogin = false;
        state.email = '';
        state.name = '';
        state.accessToken = '';
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.errorMessage = action.payload.message;
        state.profileFetchFailed = true;
        state.profilePending = false;
      })
      // Password forgot
      .addCase(fetchForgotPassword.pending, (state) => {
        state.profileFetchRequest = true;
        state.profileFetchFailed = false;
        state.message = '';
        state.errorMessage = '';
      })
      .addCase(fetchForgotPassword.fulfilled, (state) => {
        state.profileFetchRequest = false;
        state.isEmailSubmitted = true;
        state.message = NOTIFICATION_EMAIL_SUBMITTED;
      })
      .addCase(fetchForgotPassword.rejected, (state) => {
        state.profileFetchFailed = true;
        state.profileFetchRequest = false;
        state.errorMessage = '123';

      })
      // Password reset
      .addCase(fetchResetPassword.pending, (state) => {
        state.profileFetchRequest = true;
        state.profileFetchFailed = false;
        state.message = '';
        state.errorMessage = '';
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.message = NOTIFICATION_PASSWORD_RESET;
        state.isEmailSubmitted = false;
        state.profileFetchRequest = false;
      })
      .addCase(fetchResetPassword.rejected.type, (state, action) => {
        state.errorMessage = action.payload.message;
        state.profileFetchFailed = true;
        state.profileFetchRequest = false;
      });
  },
});

export default profileSlice.reducer;
export const { setMessage, clearErrorMessage } = profileSlice.actions;