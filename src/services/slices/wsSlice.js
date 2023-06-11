import { createSlice } from '@reduxjs/toolkit';

const wsSlice = createSlice({
  name: 'wsSlice',
  initialState: {
    wsConnected: false,
    wsMessage: null,
  },
  reducers: {
    setWsConnected(state, action) {
      state.wsConnected = action.payload;
    },
    setWSMessage(state, action) {
      state.wsMessage = action.payload;
    },
  },
});

export const { setWsConnected, setWSMessage } = wsSlice.actions;
export default wsSlice.reducer;
