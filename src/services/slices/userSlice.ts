import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from '../helpers/getCookie';
import {
  ACCESS_TOKEN,
  ERROR_DEFAULT, ERROR_USER_EXISTS, EXPIRES_AT, NOTIFICATION_LOGIN_SUCCESS,
  NOTIFICATION_USER_UPDATE_ERROR,
  NOTIFICATION_USER_UPDATE_SUCCESS, REFRESH_TOKEN
} from '../../utils/constants';
import { fetchUpdateUser } from '../asyncThunk/updateUserThunk';
import { fetchGetUser } from '../asyncThunk/getUserThunk';
import { State } from '../../types/State';
import { Token } from '../../types/Token';

export type UserState = {
  getUserRequest: State;
  patchUserRequest: State;
  user: {
    isLogin: boolean;
    isLogout: boolean;
    token: Token;
    email: string;
    name: string;
  }
}

const initialState: UserState = {
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
    email: '',
    name: ''
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(
      state,
      action: PayloadAction<{
        isLogin?: boolean;
        isLogout?: boolean;
        token?: Token;
        email?: string;
        name?: string;
      }>
    ) {
      state.user = {
        ...state.user,
        ...action.payload
      };
    },
    setError(
      state,
      action: PayloadAction<boolean>
    ) {
      state.patchUserRequest = {
        ...state.patchUserRequest,
        errorMessage: action.payload
      };
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
        if (action.payload && 'message' in action.payload) {
          const { message } = action.payload;
          state.getUserRequest = {
            ...state.getUserRequest,
            fetch: false,
            error: true,
            errorMessageContent: message || ERROR_DEFAULT
          };
          state.user = {
            ...state.user,
            isLogin: false
          };
        } else {
          console.error('action.payload is undefined');
        }
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
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        if (action.payload && 'message' in action.payload) {
          const { message } = action.payload;
          state.patchUserRequest = {
            ...state.patchUserRequest,
            fetch: false,
            error: true,
            errorMessage: true
          };
          (message && message === 'User with such email already exists')
            ? state.patchUserRequest.errorMessageContent = ERROR_USER_EXISTS
            : state.patchUserRequest.errorMessageContent = message || NOTIFICATION_USER_UPDATE_ERROR;
        } else {
          console.error('action.payload is undefined');
        }
      });
  },
});

export const { updateUser, setError } = userSlice.actions;
export default userSlice.reducer;