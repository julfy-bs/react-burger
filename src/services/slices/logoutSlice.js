import { createSlice } from '@reduxjs/toolkit';
import {
  ERROR_DEFAULT,
  NOTIFICATION_LOGOUT_SUCCESS,
} from '../../utils/constants.js';
import { fetchLogout } from '../asyncThunk/logoutThunk.js';
import { showMessage } from '../helpers/showMessage.js';

const initialState = {
  fetch: false,
  error: false,
  message: null,
  messageContent: NOTIFICATION_LOGOUT_SUCCESS,
  errorMessage: null,
  errorMessageContent: ERROR_DEFAULT
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    setMessage: showMessage
  },
  extraReducers: (builder) => {
    builder
      // Logout
      .addCase(fetchLogout.pending, (state) => {
        state.fetch = true;
        state.error = false;
        state.message = false;
        state.errorMessage = false;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.fetch = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        const { message } = action.payload;
        state.errorMessageContent = message || ERROR_DEFAULT;
        state.fetch = false;
        state.error = true;
      });
  }
});

export const { setMessage } = logoutSlice.actions;
export default logoutSlice.reducer;