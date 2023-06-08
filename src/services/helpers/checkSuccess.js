  export const checkSuccess = (res) => (res && res.success) ? res : Promise.reject({
    success: false,
    ...res
  }).then(r => r.json());
