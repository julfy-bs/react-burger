import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setWsConnected, setWSMessage } from '../services/slices/wsSlice';
import { fetchGetUser } from '../services/asyncThunk/getUserThunk.js';

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const ws = useRef(null);
  const connect = useCallback((url, token) => {
    ws.current = token ? new WebSocket(`${url}?token=${token}`) : new WebSocket(url);
    ws.current.onopen = () => dispatch(setWsConnected(true));
    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      (message.success)
        ? dispatch(setWSMessage(message))
        : dispatch(fetchGetUser());
    };
    ws.current.onerror = () => dispatch(setWsConnected(false));
    ws.current.onclose = (e) => (e.wasClean)
      ? dispatch(setWSMessage(null))
      : dispatch(setWsConnected(false));
  }, [dispatch]);
  const closeWs = useCallback(() => ws.current?.close(), []);
  return { connect, closeWs };
};