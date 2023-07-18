import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { store } from './services';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

