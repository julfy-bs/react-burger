import { createSlice } from '@reduxjs/toolkit';
import {
  fetchForgotPassword, fetchGetUser,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchResetPassword, fetchUpdateUser
} from '../asyncThunk/profileThunk';
import {
  ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES,
  ERROR_LOGIN,
  ERROR_USER_EXISTS, EXPIRES_AT,
  NOTIFICATION_EMAIL_SUBMITTED, NOTIFICATION_INCORRECT_TOKEN,
  NOTIFICATION_LOGIN_SUCCESS,
  NOTIFICATION_LOGOUT_SUCCESS,
  NOTIFICATION_PASSWORD_RESET,
  NOTIFICATION_USER_CREATED, NOTIFICATION_USER_UPDATE_ERROR, NOTIFICATION_USER_UPDATE_SUCCESS,
  REFRESH_TOKEN, REFRESH_TOKEN_EXPIRES, SERVER_RESPOND_INCORRECT_TOKEN,
  SERVER_RESPOND_INCORRECT_VALUES,
  SERVER_RESPOND_USER_EXISTS, TOKEN_EXPIRES_NOW
} from '../../utils/constants.js';
import { setCookie } from '../helpers/setCookie.js';

const initialState = {
  profileFetchRequest: false,
  profileFetchFailed: false,
  isEmailSubmitted: false,
  isPasswordChanged: false,
  isLogin: false,
  user: {},
  message: '',
  errorMessage: '',
  token: null
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
    }
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
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.user.password = action.meta.arg.password;
        state.isLogin = true;
        const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES * 1000
        state.token = { refreshToken, accessToken, expiresAt };
        setCookie(ACCESS_TOKEN, accessToken, { expires: ACCESS_TOKEN_EXPIRES });
        setCookie(REFRESH_TOKEN, refreshToken, { expires: REFRESH_TOKEN_EXPIRES });
        setCookie(EXPIRES_AT, expiresAt, { expires: REFRESH_TOKEN_EXPIRES });
        state.profileFetchRequest = false;
        state.message = NOTIFICATION_USER_CREATED;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        console.log(action);
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
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        state.user.password = action.meta.arg.password;
        state.isLogin = true;
        const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES * 1000
        state.token = { refreshToken, accessToken, expiresAt };
        setCookie(ACCESS_TOKEN, accessToken, { expires: ACCESS_TOKEN_EXPIRES });
        setCookie(REFRESH_TOKEN, refreshToken, { expires: REFRESH_TOKEN_EXPIRES });
        setCookie(EXPIRES_AT, expiresAt, { expires: REFRESH_TOKEN_EXPIRES });
        state.profileFetchRequest = false;
        state.message = NOTIFICATION_LOGIN_SUCCESS;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        console.log(action);
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
      .addCase(fetchLogout.fulfilled, (state) => {
        state.profileFetchRequest = false;
        state.message = NOTIFICATION_LOGOUT_SUCCESS;
        state.isLogin = false;
        state.user = null;
        state.token = null;
        setCookie(ACCESS_TOKEN, '', { expires: TOKEN_EXPIRES_NOW });
        setCookie(REFRESH_TOKEN, '', { expires: TOKEN_EXPIRES_NOW });
        setCookie(EXPIRES_AT, '', { expires: TOKEN_EXPIRES_NOW });
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
        state.isPasswordChanged = false;
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
        state.isPasswordChanged = false;
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.message = NOTIFICATION_PASSWORD_RESET;
        state.isEmailSubmitted = false;
        state.profileFetchRequest = false;
        state.isPasswordChanged = true;
      })
      .addCase(fetchResetPassword.rejected.type, (state, action) => {
        (action.payload.message === SERVER_RESPOND_INCORRECT_TOKEN)
          ? state.errorMessage = NOTIFICATION_INCORRECT_TOKEN
          : state.errorMessage = action.payload.message;
        state.profileFetchFailed = true;
        state.profileFetchRequest = false;
      })
      // Get user
      .addCase(fetchGetUser.pending, (state) => {
        state.profileFetchRequest = true;
        state.profileFetchFailed = false;
        state.message = '';
        state.errorMessage = '';
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.isLogin = true;
        state.profileFetchRequest = false;
      })
      .addCase(fetchGetUser.rejected, (state) => {
        state.profileFetchFailed = true;
        state.profileFetchRequest = false;
      })
      // Update user
      .addCase(fetchUpdateUser.pending, (state) => {
        state.profileFetchRequest = true;
        state.profileFetchFailed = false;
        state.message = '';
        state.errorMessage = '';
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        const {user} = action.payload;
        state.user = user;
        state.message = NOTIFICATION_USER_UPDATE_SUCCESS;
        state.profileFetchRequest = false;
      })
      .addCase(fetchUpdateUser.rejected.type, (state, action) => {
        state.profileFetchRequest = false;
        state.profileFetchFailed = true;
        state.errorMessage = NOTIFICATION_USER_UPDATE_ERROR;
        console.log(action.payload);
      });
  },
});

export default profileSlice.reducer;
export const { setMessage, clearErrorMessage } = profileSlice.actions;