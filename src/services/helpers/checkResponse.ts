import { CustomError } from '../../types/CustomError';

export const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((error: Error & CustomError) => Promise.reject({
      status: res.status,
      statusText: res.statusText,
      url: res.url,
      ok: res.ok,
      data: error,
      success: false
    }));
};