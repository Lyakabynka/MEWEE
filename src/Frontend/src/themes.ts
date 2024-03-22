// themes.ts

import { Theme, createTheme } from '@mui/material/styles';

export const themes: Theme[] = [
  createTheme({
    palette: {
      primary: {
        main: '#007bff',
      },
      secondary: {
        main: '#E5E0FB',
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
        main: '#4A227A',
      },
      background: {
        default: '#0B0414',
      },
      
      text: {
        primary: '#f8f9fa',
      },
    },
  }),
  // Add more themes as needed
];
