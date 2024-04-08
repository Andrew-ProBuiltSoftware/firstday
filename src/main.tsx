import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './Styles/index.scss';
import { UserContextProvider } from './context/AppContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
