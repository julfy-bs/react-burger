import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/app.jsx';
import { store } from './services/index.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

