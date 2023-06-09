import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../helpers/getCookie.js';
import {
  ACCESS_TOKEN,
  ERROR_DEFAULT,
  NOTIFICATION_USER_UPDATE_ERROR,
  NOTIFICATION_USER_UPDATE_SUCCESS
} from '../../utils/constants.js';
import { fetchUpdateUser } from '../asyncThunk/updateUserThunk.js';
import { fetchGetUser } from '../asyncThunk/getUserThunk.js';

const initialState = {
  getUserRequest: {
    fetch: false,
    error: false,
    message: null,
    errorMessage: null,
  },
  patchUserRequest: {
    fetch: false,
    error: false,
    message: null,
    errorMessage: null,
  },
  user: {
    isLogin: !!getCookie(ACCESS_TOKEN) || false,
    isLogout: false,
    token: null,
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
      }
    }
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
        state.updateUserRequest = {
          ...initialState.updateUserRequest,
          fetch: true
        };
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        const { email, name } = user;

        state.updateUserRequest = {
          ...state.updateUserRequest,
          fetch: false,
          message: NOTIFICATION_USER_UPDATE_SUCCESS
        };

        state.user = {
          ...state.user,
          isLogin: true,
          email,
          name
        };
      })
      .addCase(fetchUpdateUser.rejected.type, (state, action) => {
        const { message } = action.payload;
        state.updateUserRequest = {
          ...state.updateUserRequest,
          fetch: false,
          error: true,
          errorMessage: message || NOTIFICATION_USER_UPDATE_ERROR
        };
      });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;