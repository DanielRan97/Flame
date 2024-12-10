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
    background: {
      default: 'rgb(33 30 30)',
      paper: 'rgb(76 70 70)',
    },
    text: {
      primary: '#000000', // Default text color
      secondary: '#ffffff', // Secondary text color
      disabled: '#aaaaaa', // Disabled text color
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#000000', // Input text color
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#aaaaaa', // Default label color
          '&.Mui-focused': {
            color: '#ea4a10', // Color when the input is focused
          },
          '&.Mui-error': {
            color: '#ff0000', // Color when there's an error
          },
        },
      },
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
