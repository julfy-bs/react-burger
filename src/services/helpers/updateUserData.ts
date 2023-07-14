import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES, TOKEN_EXPIRES_NOW
} from '../../utils/constants';
import { setCookie } from './setCookie';
import { updateUser } from '../slices/userSlice';
import { User } from '../../types/User';
import { AppDispatch } from '../index';

type UserData = {
  user?: User | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  dispatch: AppDispatch;
}

export const updateUserData = (
    {
      user = null,
      accessToken = null,
      refreshToken = null,
      dispatch
    }: UserData
  ) => {
    if (user === null) {
      dispatch(updateUser({
        isLogin: false,
        isLogout: true,
        token: { accessToken: null, refreshToken: null, expiresAt: null },
        name: '',
        email: ''
      }));
    }
    if (accessToken && refreshToken && user?.email && user?.name) {
      const expiresAt = (Date.now() + ACCESS_TOKEN_EXPIRES * 1000).toString();
      setCookie({ name: ACCESS_TOKEN, value: accessToken, props: { expires: ACCESS_TOKEN_EXPIRES } });
      setCookie({ name: REFRESH_TOKEN, value: refreshToken, props: { expires: REFRESH_TOKEN_EXPIRES } });
      setCookie({ name: EXPIRES_AT, value: expiresAt, props: { expires: REFRESH_TOKEN_EXPIRES } });
      dispatch(updateUser({
        isLogin: true,
        token: { refreshToken, accessToken, expiresAt },
        email: user.email,
        name: user.name
      }));
    } else {
      setCookie({ name: ACCESS_TOKEN, value: 'expired', props: { expires: TOKEN_EXPIRES_NOW } });
      setCookie({ name: REFRESH_TOKEN, value: 'expired', props: { expires: TOKEN_EXPIRES_NOW } });
      setCookie({ name: EXPIRES_AT, value: 'expired', props: { expires: TOKEN_EXPIRES_NOW } });
    }
  }
;