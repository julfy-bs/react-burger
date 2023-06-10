import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES, TOKEN_EXPIRES_NOW
} from '../../utils/constants.js';
import { setCookie } from './setCookie.js';
import { updateUser } from '../slices/userSlice.js';

export const updateUserData = ({ user = null, accessToken = null, refreshToken = null, dispatch } = {}) => {

  if (user === null) {
    dispatch(updateUser({ isLogin: false, isLogout: true }));
  }
  if (accessToken && refreshToken && user.email && user.name) {
    const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES * 1000;
    setCookie(ACCESS_TOKEN, accessToken, { expires: ACCESS_TOKEN_EXPIRES });
    setCookie(REFRESH_TOKEN, refreshToken, { expires: REFRESH_TOKEN_EXPIRES });
    setCookie(EXPIRES_AT, expiresAt, { expires: REFRESH_TOKEN_EXPIRES });
    dispatch(updateUser({
      isLogin: true,
      token: { refreshToken, accessToken, expiresAt },
      email: user.email,
      name: user.name
    }));
  } else {
    setCookie(ACCESS_TOKEN, '', { expires: TOKEN_EXPIRES_NOW });
    setCookie(REFRESH_TOKEN, '', { expires: TOKEN_EXPIRES_NOW });
    setCookie(EXPIRES_AT, '', { expires: TOKEN_EXPIRES_NOW });
  }
};