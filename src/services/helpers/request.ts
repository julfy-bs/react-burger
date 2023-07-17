import { checkResponse } from './checkResponse';
import { checkSuccess } from './checkSuccess';
import { SERVER_CONFIG } from '../../utils/config';
import { getCookie } from './getCookie';
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES
} from '../../utils/constants';
import { setCookie } from './setCookie';

export const request = (endpoint: string, options?: RequestInit, token?: string) => {
  return fetch(`${SERVER_CONFIG.BASE_URL}${endpoint}`, {
    headers: {
      ...SERVER_CONFIG.HEADERS,
      authorization: token || getCookie(ACCESS_TOKEN) as string,
    },
    ...options,
  })
    .then(checkResponse)
    .then(checkSuccess);
};

export const authorizationRequest = async (endpoint: string, options?: RequestInit) => {
  try {
    const tokenUrl = `auth/token`;
    const access = getCookie(ACCESS_TOKEN);
    const token = getCookie(REFRESH_TOKEN);
    if (access) {
      return await request(endpoint, options, access);
    }
    if (!access && token) {
      const res = await request(tokenUrl, {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
      const { accessToken, refreshToken } = res;
      const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES * 1000;
      setCookie({ name: ACCESS_TOKEN, value: accessToken, props: { expires: ACCESS_TOKEN_EXPIRES } });
      setCookie({ name: REFRESH_TOKEN, value: refreshToken, props: { expires: REFRESH_TOKEN_EXPIRES } });
      setCookie({ name: EXPIRES_AT, value: expiresAt, props: { expires: REFRESH_TOKEN_EXPIRES } });
      return request(endpoint, options, getCookie(ACCESS_TOKEN));
    }
  } catch (e) {
    console.warn(e);
  }
};