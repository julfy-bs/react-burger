import { setCookie } from './setCookie';
import { ACCESS_TOKEN, EXPIRES_AT, REFRESH_TOKEN, TOKEN_EXPIRES_NOW } from '../../utils/constants';

export const resetAllCookie = () => {
  setCookie({ name: ACCESS_TOKEN, value: 'expired', props: { expires: TOKEN_EXPIRES_NOW } });
  setCookie({ name: REFRESH_TOKEN, value: 'expired', props: { expires: TOKEN_EXPIRES_NOW } });
  setCookie({ name: EXPIRES_AT, value: 'expired', props: { expires: TOKEN_EXPIRES_NOW } });
}