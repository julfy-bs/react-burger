import { checkResponse } from './checkResponse.js';
import { checkSuccess } from './checkSuccess.js';
import { SERVER_CONFIG } from '../../utils/config.js';
import { getCookie } from './getCookie.js';
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES
} from '../../utils/constants.js';
import { setCookie } from './setCookie.js';

export const request = (endpoint, options, token) => {
  return fetch(`${SERVER_CONFIG.BASE_URL}${endpoint}`, {
    headers: {
      ...SERVER_CONFIG.HEADERS,
      authorization: token || getCookie(ACCESS_TOKEN),
    },
    ...options,
  })
    .then(checkResponse)
    .then(checkSuccess);
};

export const authorizationRequest = async (endpoint, options) => {
  const tokenUrl = `auth/token`;

  return request(endpoint, options, getCookie(ACCESS_TOKEN))
    .catch(res => {
      if (res.status === 401) {
        const token = getCookie(REFRESH_TOKEN);
        return request(tokenUrl, {
          method: 'POST',
          body: JSON.stringify({ token }),
        })
          .then(res => {
            const { accessToken, refreshToken } = res;
            const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES * 1000
            setCookie(ACCESS_TOKEN, accessToken, { expires: ACCESS_TOKEN_EXPIRES });
            setCookie(REFRESH_TOKEN, refreshToken, { expires: REFRESH_TOKEN_EXPIRES });
            setCookie(EXPIRES_AT, expiresAt, { expires: REFRESH_TOKEN_EXPIRES });
            return request(endpoint, options, getCookie(ACCESS_TOKEN));
          });
      } else {
        console.error(`${res.status}: ${res.statusText}.`);
      }
    });
};