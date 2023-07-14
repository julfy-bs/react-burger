import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ERROR_DEFAULT,
  NOTIFICATION_LOGOUT_SUCCESS,
} from '../../utils/constants.js';
import { fetchLogout } from '../asyncThunk/logoutThunk';
import { State } from '../../types/State';

const initialState: State = {
  fetch: false,
  error: false,
  message: false,
  messageContent: NOTIFICATION_LOGOUT_SUCCESS,
  errorMessage: false,
  errorMessageContent: ERROR_DEFAULT
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    setMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.message = action.payload;
    },
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
        // todo: найти причину почему action.payload может быть undefined
        if (action.payload && 'message' in action.payload) {
          console.log(action);
          const { message } = action.payload;
          state.errorMessageContent = message || ERROR_DEFAULT;
          state.fetch = false;
          state.error = true;
        } else {
          console.error('action.payload is undefined');
        }
      });
  }
});

export const { setMessage } = logoutSlice.actions;
export default logoutSlice.reducer;