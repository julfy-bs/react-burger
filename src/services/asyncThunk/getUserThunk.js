import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../api/profileApi.js';

export const fetchGetUser = createAsyncThunk(
  'profile/fetchGetUser',
  (_, { rejectWithValue }) =>
    getUser()
      .catch(e => rejectWithValue(e))
);
