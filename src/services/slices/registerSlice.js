import { createSlice } from '@reduxjs/toolkit';
import {
  ERROR_DEFAULT, ERROR_USER_EXISTS,
  NOTIFICATION_LOGIN_SUCCESS, SERVER_RESPOND_USER_EXISTS
} from '../../utils/constants.js';
import { fetchRegister } from '../asyncThunk/registerThunk.js';
import { showMessage } from '../helpers/showMessage.js';

const initialState = {
  fetch: false,
  error: false,
  message: false,
  messageContent: NOTIFICATION_LOGIN_SUCCESS,
  errorMessage: false,
  errorMessageContent: ERROR_DEFAULT
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setMessage: showMessage
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(fetchRegister.pending, (state) => {
        state.fetch = true;
        state.error = false;
        state.message = false;
        state.errorMessage = false;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.fetch = false;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        const { message } = action.payload;
        state.errorMessageContent = (message && message === SERVER_RESPOND_USER_EXISTS)
          ? state.errorMessageContent = ERROR_USER_EXISTS
          : state.errorMessageContent = message || ERROR_DEFAULT;
        state.fetch = false;
        state.error = true;
      });
  }
});

export const { setMessage } = registerSlice.actions;
export default registerSlice.reducer;