import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../api/profileApi';
import { AppDispatch, RootState } from '../index';
import { UserPromise } from '../../types/UserPromise';
import { UserError } from '../../types/UserError';
import { updateUser } from '../slices/userSlice';

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
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const res = await getUser();
      const { user } = res;
      dispatch(updateUser({
        isLogin: true,
        email: user.email,
        name: user.name
      }));
      return res;
    } catch (e: unknown) {
      const { rejectWithValue } = thunkAPI;
      const hasErrorData = (e as UserError);
      return rejectWithValue(hasErrorData);
    }
  }
);
