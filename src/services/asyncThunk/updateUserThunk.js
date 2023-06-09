import { createAsyncThunk } from '@reduxjs/toolkit';
import { patchUser } from '../api/profileApi.js';

export const fetchUpdateUser = createAsyncThunk(
  'profile/fetchUpdateUser',
  ({ name, email, password }, thunkAPI) =>
    patchUser({ name, email, password })
      .catch(e => thunkAPI.rejectWithValue(e))
);
