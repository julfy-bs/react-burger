const checkResponse = (res) => (res.ok) ? res.json() : res.json().then((e) => Promise.reject(e));

export default checkResponse;