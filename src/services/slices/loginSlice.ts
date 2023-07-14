import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ERROR_DEFAULT, ERROR_LOGIN,
  NOTIFICATION_LOGIN_SUCCESS,
  SERVER_RESPOND_INCORRECT_VALUES
} from '../../utils/constants.js';
import { fetchLogin } from '../asyncThunk/loginThunk';
import { State } from '../../types/State';

const initialState: State = {
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
    setMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.message = action.payload;
    },
    setErrorMessage(
      state,
      action: PayloadAction<boolean>
    ) {
      state.errorMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(fetchLogin.pending,
        (state) => {
          state.fetch = true;
          state.error = false;
          state.message = false;
          state.errorMessage = false;
        })
      .addCase(fetchLogin.fulfilled,
        (state) => {
          state.fetch = false;
        })
      .addCase(fetchLogin.rejected,
        (state, action) => {
          // todo: найти причину почему action.payload может быть undefined
          if (action.payload && "data" in action.payload) {
            const { data } = action.payload;
            const { message } = data;
            state.errorMessage = true;
            state.errorMessageContent = (message && message === SERVER_RESPOND_INCORRECT_VALUES)
              ? state.errorMessageContent = ERROR_LOGIN
              : state.errorMessageContent = message || ERROR_DEFAULT;
            state.fetch = false;
            state.error = true;
          } else {
            console.error('action.payload is undefined')
          }
        });

  }
});

export const { setMessage, setErrorMessage } = loginSlice.actions;
export default loginSlice.reducer;
