import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ERROR_DEFAULT,
  NOTIFICATION_EMAIL_SUBMITTED, NOTIFICATION_INCORRECT_TOKEN,
  NOTIFICATION_PASSWORD_RESET,
  SERVER_RESPOND_INCORRECT_TOKEN
} from '../../utils/constants';
import { fetchResetPassword } from '../asyncThunk/resetPasswordThunk';
import { fetchForgotPassword } from '../asyncThunk/forgotPasswordThunk';
import { State } from '../../types/State';

export type PasswordState = {
  isEmailSubmitted: boolean;
  isPasswordChanged: boolean;
  forgotPasswordRequest: State;
  resetPasswordRequest: State;
}

const initialState: PasswordState = {
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
    setIsEmailSubmitted(
      state,
      action: PayloadAction<boolean>
    ) {
      state.isEmailSubmitted = action.payload;
    },
    setIsPasswordChanged(
      state,
      action: PayloadAction<boolean>
    ) {
      state.isPasswordChanged = action.payload;
    },
    setMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.forgotPasswordRequest.message = action.payload;
      state.resetPasswordRequest.message = action.payload;
    },
    setErrorMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.forgotPasswordRequest.errorMessage = action.payload;
      state.resetPasswordRequest.errorMessage = action.payload;
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
        state.forgotPasswordRequest = {
          ...state.forgotPasswordRequest,
          fetch: false,
          error: true,
          errorMessage: true,
          errorMessageContent: action.payload?.message || ERROR_DEFAULT,
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
      .addCase(fetchResetPassword.rejected,
        (state, action) => {
          state.isPasswordChanged = false;
          // todo: найти причину почему action.payload может быть undefined
          if (action.payload && 'data' in action.payload) {
            const { data } = action.payload;
            const { message } = data;
            state.resetPasswordRequest = {
              ...state.resetPasswordRequest,
              fetch: false,
              error: true,
              errorMessage: true,
              errorMessageContent: (message && message === SERVER_RESPOND_INCORRECT_TOKEN)
                ? state.resetPasswordRequest.errorMessageContent = NOTIFICATION_INCORRECT_TOKEN
                : state.resetPasswordRequest.errorMessageContent = message || ERROR_DEFAULT,
            };
          } else {
            console.error('action.payload is undefined');
          }
        });
  }
});

export const { setMessage, setErrorMessage } = passwordSlice.actions;
export default passwordSlice.reducer;