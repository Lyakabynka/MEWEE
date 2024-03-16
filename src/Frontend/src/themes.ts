// themes.ts

import { createTheme } from '@mui/material/styles';

export const themes = [
  createTheme({
    palette: {
      primary: {
        main: '#007bff',
      },
      secondary: {
        main: '#6c757d',
      },
      background: {
        default: '#f8f9fa',
      },
      text: {
        primary: '#343a40',
      },
    },
  }),
  createTheme({
    palette: {
      primary: {
        main: '#007bff',
      },
      secondary: {
        main: '#6c757d',
      },
      background: {
        default: '#343a40',
      },
      text: {
        primary: '#f8f9fa',
      },
    },
  }),
  // Add more themes as needed
];
