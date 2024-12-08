import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './ridux/store/store';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ea4a10', // Customize the primary color
    },
    secondary: {
      main: '#000000', // Customize the secondary color
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <CssBaseline />
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
