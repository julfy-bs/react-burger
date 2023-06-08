export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then(reject => Promise.reject({
      status: res.status,
      statusText: res.statusText,
      url: res.url,
      ok: res.ok,
      data: reject,
      success: false
    }));
  }
};