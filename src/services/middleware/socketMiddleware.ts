import { fetchGetUser } from '../asyncThunk/getUserThunk';
import { WS_RESPOND_INCORRECT_TOKEN } from '../../utils/constants.js';
import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../index';
import { PayloadAction } from '@reduxjs/toolkit';
import { WebsocketState } from '../../types/WebsocketState';
import { WebsocketActions } from '../../types/WebsocketActions';

export const socketMiddleware =
  (wsActions: WebsocketActions): Middleware =>
    (store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;

      return (next) => (action: PayloadAction<string>) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
        if (type === wsInit) {
          socket = new WebSocket(payload);
        }

        if (type === wsInit && socket?.readyState === 1) {
          socket.close();
        }

        if (socket) {
          socket.onopen = () => {
            dispatch({ type: onOpen });
          };

          socket.onerror = () => {
            dispatch({ type: onError });
          };

          socket.onmessage = (event: MessageEvent<string>) => {
            const { data } = event;
            const parsedData: WebsocketState & { message: string } = JSON.parse(data);

            if (parsedData.message
              && parsedData.message === WS_RESPOND_INCORRECT_TOKEN) {
              dispatch(fetchGetUser());
            }
            const { ...restParsedData } = parsedData;

            if (restParsedData.orders) {
              restParsedData.orders.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );

              dispatch({ type: onMessage, payload: restParsedData });
            }
          };

          socket.onclose = () => {
            dispatch({ type: onClose });
          };
        }
        next(action);
      };
    };