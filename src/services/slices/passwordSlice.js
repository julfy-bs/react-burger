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
    message: false,
    messageContent: NOTIFICATION_EMAIL_SUBMITTED,
    errorMessage: false,
    errorMessageContent: ERROR_DEFAULT,
  },
  resetPasswordRequest: {
    fetch: false,
    error: false,
    message: false,
    messageContent: NOTIFICATION_PASSWORD_RESET,
    errorMessage: false,
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
    },
    setErrorMessage(state, action) {
      const { errorMessage } = action.payload;
      state.forgotPasswordRequest.errorMessage = errorMessage;
      state.resetPasswordRequest.errorMessage = errorMessage;
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
          message: true
        };
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.isEmailSubmitted = false;
        const { message } = action.payload;
        state.forgotPasswordRequest = {
          fetch: false,
          error: true,
          errorMessage: true,
          errorMessageContent: message || ERROR_DEFAULT,
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
          message: true
        };
      })
      .addCase(fetchResetPassword.rejected.type, (state, action) => {
        state.isPasswordChanged = false;
        const { data } = action.payload;
        const { message } = data;
        state.resetPasswordRequest = {
          ...state.resetPasswordRequest,
          fetch: false,
          error: true,
          errorMessage: true,
          errorMessageContent: (message && message === SERVER_RESPOND_INCORRECT_TOKEN)
            ? state.resetPasswordRequest.errorMessage = NOTIFICATION_INCORRECT_TOKEN
            : state.resetPasswordRequest.errorMessage = message || ERROR_DEFAULT,
        };
      });
  }
});

export const { setMessage, setErrorMessage } = passwordSlice.actions;
export default passwordSlice.reducer;