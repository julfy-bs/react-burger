import { createAsyncThunk } from '@reduxjs/toolkit';
import { patchUser } from '../api/profileApi.js';
import { setError } from '../slices/userSlice.js';

export const fetchUpdateUser = createAsyncThunk(
  'profile/fetchUpdateUser',
  ({ name, email, password },
   { rejectWithValue, dispatch }) =>
    patchUser({ name, email, password })
      .catch((e) => {
        setTimeout(() => dispatch(setError({
          request: 'patchUserRequest',
          errorMessage: false
        })), 2000);
        return rejectWithValue(e)
      })
);
