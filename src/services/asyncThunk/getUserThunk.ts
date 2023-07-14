import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../api/profileApi';
import { AppDispatch, RootState } from '../index';
import { UserPromise } from '../../types/UserPromise';
import { UserError } from '../../types/UserError';

export const fetchGetUser = createAsyncThunk<
  UserPromise,
  void,
  {
    rejectValue: UserError,
    state: RootState,
    dispatch: AppDispatch
  }
>(
  'profile/fetchGetUser',
  async (_, { rejectWithValue }) => {
    try {
      return await getUser();
    } catch (e: unknown) {
      const hasErrorData = (e as UserError);
      return rejectWithValue(hasErrorData);
    }
  }
);
