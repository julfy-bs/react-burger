import { createSlice } from '@reduxjs/toolkit';
import {
  ERROR_DEFAULT, ERROR_LOGIN,
  NOTIFICATION_LOGIN_SUCCESS,
  SERVER_RESPOND_INCORRECT_VALUES
} from '../../utils/constants.js';
import { fetchLogin } from '../asyncThunk/loginThunk.js';
import { showMessage } from '../helpers/showMessage.js';


const initialState = {
  fetch: false,
  error: false,
  message: false,
  messageContent: NOTIFICATION_LOGIN_SUCCESS,
  errorMessage: false,
  errorMessageContent: ERROR_DEFAULT
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setMessage: showMessage,
    setErrorMessage(state, action) {
      const { errorMessage } = action.payload;
      state.errorMessage = errorMessage;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(fetchLogin.pending, (state) => {
        state.fetch = true;
        state.error = false;
        state.message = false;
        state.errorMessage = false;
      })
      .addCase(fetchLogin.fulfilled, (state) => {
        state.fetch = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        const { data } = action.payload;
        const { message } = data;
        state.errorMessage = true;
        state.errorMessageContent = (message && message === SERVER_RESPOND_INCORRECT_VALUES)
          ? state.errorMessageContent = ERROR_LOGIN
          : state.errorMessageContent = message || ERROR_DEFAULT;
        state.fetch = false;
        state.error = true;
      });

  }
});

export const { setMessage, setErrorMessage } = loginSlice.actions;
export default loginSlice.reducer;
