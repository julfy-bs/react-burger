import { createAsyncThunk } from '@reduxjs/toolkit';
import { patchUser } from '../api/profileApi';
import { setError } from '../slices/userSlice';
import { UserPromise } from '../../types/UserPromise';
import { AppDispatch, RootState } from '../index';
import { fetchUpdateUserInput } from '../../types/fetchUpdateUserInput';
import { UserError } from '../../types/UserError';

export const fetchUpdateUser = createAsyncThunk<
  UserPromise,
  fetchUpdateUserInput,
  {
    rejectValue: UserError,
    state: RootState,
    dispatch: AppDispatch
  }
>(
  'profile/fetchUpdateUser',
  async (userData,
         thunkAPI) => {
    try {
      const { name, email, password } = userData;
      return await patchUser({ name, email, password })
    } catch (e) {
      const { dispatch, rejectWithValue } = thunkAPI;
      const hasErrorData = (e as unknown as UserError);
      setTimeout(() => dispatch(setError(false)), 2000);
      return rejectWithValue(hasErrorData);
    }
  }
);
