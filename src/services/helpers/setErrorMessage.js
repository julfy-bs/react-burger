export const setErrorMessage = (state, action) => {
  const { request, errorMessage } = action.payload
  state[request] = {
    ...state[request],
    errorMessage
  };
}