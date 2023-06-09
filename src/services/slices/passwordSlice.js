import { createSlice } from '@reduxjs/toolkit';
import {
  ERROR_DEFAULT,
  NOTIFICATION_EMAIL_SUBMITTED, NOTIFICATION_INCORRECT_TOKEN,
  NOTIFICATION_PASSWORD_RESET,
  SERVER_RESPOND_INCORRECT_TOKEN
} from '../../utils/constants.js';
import { fetchResetPassword } from '../asyncThunk/resetPasswordThunk.js';
import { fetchForgotPassword } from '../asyncThunk/forgotPasswordThunk.js';

const initialState = {
  isEmailSubmitted: false,
  isPasswordChanged: false,
  forgotPasswordRequest: {
    fetch: false,
    error: false,
    message: null,
    messageContent: NOTIFICATION_EMAIL_SUBMITTED,
    errorMessage: null,
    errorMessageContent: ERROR_DEFAULT,
  },
  resetPasswordRequest: {
    fetch: false,
    error: false,
    message: null,
    messageContent: NOTIFICATION_PASSWORD_RESET,
    errorMessage: null,
    errorMessageContent: ERROR_DEFAULT,
  },
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setIsEmailSubmitted(state, action) {
      state.isEmailSubmitted = action.payload;
    },
    setIsPasswordChanged(state, action) {
      state.isPasswordChanged = action.payload;
    },
    setMessage(state, action) {
      state.forgotPasswordRequest.message = action.payload;
      state.resetPasswordRequest.message = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Password forgot
      .addCase(fetchForgotPassword.pending, (state) => {
        state.isEmailSubmitted = false;
        state.forgotPasswordRequest = {
          ...initialState.forgotPasswordRequest,
          fetch: true
        };
      })
      .addCase(fetchForgotPassword.fulfilled, (state) => {
        state.isEmailSubmitted = true;
        state.forgotPasswordRequest = {
          ...state.forgotPasswordRequest,
          fetch: false,
          message: NOTIFICATION_EMAIL_SUBMITTED,
        };
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.isEmailSubmitted = false;
        const { message } = action.payload;
        state.forgotPasswordRequest = {
          fetch: false,
          error: true,
          message: null,
          errorMessage: message || ERROR_DEFAULT,
        };
      })
      // Password reset
      .addCase(fetchResetPassword.pending, (state) => {
        state.isPasswordChanged = false;
        state.resetPasswordRequest = {
          ...initialState.resetPasswordRequest,
          fetch: true
        };
      })
      .addCase(fetchResetPassword.fulfilled, (state) => {
        state.isPasswordChanged = true;
        state.isEmailSubmitted = false;
        state.resetPasswordRequest = {
          ...state.resetPasswordRequest,
          fetch: false,
          message: NOTIFICATION_PASSWORD_RESET
        };
      })
      .addCase(fetchResetPassword.rejected.type, (state, action) => {
        state.isPasswordChanged = false;
        const { message } = action.payload;
        state.resetPasswordRequest = {
          ...state.resetPasswordRequest,
          fetch: false,
          error: true,
          errorMessage: (message && message === SERVER_RESPOND_INCORRECT_TOKEN)
            ? state.resetPasswordRequest.errorMessage = NOTIFICATION_INCORRECT_TOKEN
            : state.resetPasswordRequest.errorMessage = message || ERROR_DEFAULT,
        };
      })
  }
});

export const { setIsEmailSubmitted, setIsPasswordChanged, setMessage } = passwordSlice.actions;
export default passwordSlice.reducer;