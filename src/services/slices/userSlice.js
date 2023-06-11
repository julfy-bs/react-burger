import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../helpers/getCookie.js';
import {
  ACCESS_TOKEN,
  ERROR_DEFAULT, ERROR_USER_EXISTS, EXPIRES_AT, NOTIFICATION_LOGIN_SUCCESS,
  NOTIFICATION_USER_UPDATE_ERROR,
  NOTIFICATION_USER_UPDATE_SUCCESS, REFRESH_TOKEN
} from '../../utils/constants.js';
import { fetchUpdateUser } from '../asyncThunk/updateUserThunk.js';
import { fetchGetUser } from '../asyncThunk/getUserThunk.js';
import { setErrorMessage } from '../helpers/setErrorMessage.js';

const initialState = {
  getUserRequest: {
    fetch: false,
    error: false,
    message: false,
    messageContent: NOTIFICATION_LOGIN_SUCCESS,
    errorMessage: false,
    errorMessageContent: ERROR_DEFAULT
  },
  patchUserRequest: {
    fetch: false,
    error: false,
    message: false,
    messageContent: NOTIFICATION_USER_UPDATE_SUCCESS,
    errorMessage: false,
    errorMessageContent: NOTIFICATION_USER_UPDATE_ERROR
  },
  user: {
    isLogin: !!getCookie(ACCESS_TOKEN) || false,
    isLogout: false,
    token: {
      accessToken: getCookie(ACCESS_TOKEN) || null,
      refreshToken: getCookie(REFRESH_TOKEN) || null,
      expiresAt: getCookie(EXPIRES_AT) || null
    },
    email: null,
    name: null
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload
      };
    },
    setError: setErrorMessage
  },
  extraReducers: (builder) => {
    builder
      // Get user
      .addCase(fetchGetUser.pending, (state) => {
        state.getUserRequest = {
          ...initialState.getUserRequest,
          fetch: true
        };
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        const { email, name } = user;

        state.getUserRequest = {
          ...state.getUserRequest,
          fetch: false,
        };

        state.user = {
          ...state.user,
          isLogin: true,
          email,
          name
        };
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        const { message } = action.payload;

        state.getUserRequest = {
          ...state.getUserRequest,
          fetch: false,
          error: true,
          errorMessage: message || ERROR_DEFAULT
        };
        state.user = {
          ...state.user,
          isLogin: false
        };
      })
      // Update user
      .addCase(fetchUpdateUser.pending, (state) => {
        state.patchUserRequest = {
          ...initialState.patchUserRequest,
          fetch: true
        };
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        const { email, name } = user;

        state.patchUserRequest = {
          ...state.patchUserRequest,
          fetch: false,
          message: true
        };

        state.user = {
          ...state.user,
          isLogin: true,
          email,
          name
        };
      })
      .addCase(fetchUpdateUser.rejected.type, (state, action) => {
        const { message } = action.payload.data;
        state.patchUserRequest = {
          ...state.patchUserRequest,
          fetch: false,
          error: true,
          errorMessage: true
        };
        (message && message === 'User with such email already exists')
          ? state.patchUserRequest.errorMessageContent = ERROR_USER_EXISTS
          : state.patchUserRequest.errorMessageContent = message || NOTIFICATION_USER_UPDATE_ERROR;
      });
  },
});

export const { updateUser, setError } = userSlice.actions;
export default userSlice.reducer;