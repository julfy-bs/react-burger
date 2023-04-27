import { createSlice, createAction } from '@reduxjs/toolkit';

const create = createAction('error/create');

const errorSlice = createSlice({
  name: 'errorSlice',
  initialState: {
    error: {
      exists: false,
      code: null,
      message: null,
    },
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(create, (state, action) => {
        state.error = {
          exists: true,
          code: action.payload.code,
          message: action.payload.message
        };
      })
  },
});

export default errorSlice.reducer;