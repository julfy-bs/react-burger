import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES
} from '../../utils/constants';
import { setCookie } from './setCookie';
import { updateUser } from '../slices/userSlice';
import { User } from '../../types/User';
import { AppDispatch } from '../index';

export const changeUserLoginInfo = (
    user: User,
    accessToken: string,
    refreshToken: string,
    dispatch: AppDispatch
  ) => {
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
    }
  }
;