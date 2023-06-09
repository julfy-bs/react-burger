export const showMessage = (state, action) => {
  const { boolean } = action.payload;
  state.message = boolean;
};