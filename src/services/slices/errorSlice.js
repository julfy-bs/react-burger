import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: {
    exists: false,
    code: null,
    message: null,
  },
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = {
        exists: true,
        code: action.payload.code,
        message: action.payload.message
      };
    },
    resetError(state) {
      state.error = {
        exists: false,
        code: null,
        message: null
      };
    }
  }
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;