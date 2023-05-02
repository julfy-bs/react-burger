import { createSlice, createAction } from '@reduxjs/toolkit';

const start = createAction('loading/start');
const end = createAction('loading/end');

const initialState = {
  loading: false
};

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(start, (state) => {
        state.loading = true;
      })
      .addCase(end, (state) => {
        state.loading = false;
      });
  },
});

export default loadingSlice.reducer;