import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './ridux/store/store';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './contexts/ThemeContext/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <ThemeProvider>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
         <App />
         </PersistGate>

      </Provider>
    </ThemeProvider>
   </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
