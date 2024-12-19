import { createTheme } from '@mui/material/styles';

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
          color: '#ffffff', // Input text color
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

export default theme;