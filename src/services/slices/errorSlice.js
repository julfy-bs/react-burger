import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  error: {
    exists: false,
    code: null,
    message: null,
  },
};

const create = createAction('error/create');

const errorSlice = createSlice({
  name: 'errorSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(create, (state, action) => {
        state.error = {
          exists: true,
          code: action.payload.code,
          message: action.payload.message
        };
      });
  },
});

export default errorSlice.reducer;