// themes.ts

import { Theme, createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Theme {
    icon: {
      stroke: string;
    },
    colorTexts: {
      date: string;
    },
    colorBlocks:
    {
      contentColor: string;
      homeSideColor: string;
    },
    inputs:
    {
      inputTextStroke: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    icon?: {
      stroke?: string;
    },
    colorTexts?: {
      date?: string;
    }
    colorBlocks?:
    {
      contentColor? : string;
      homeSideColor? : string;
    },
    inputs?:
    {
      inputTextStroke?: string
    }
  }
}
export const themes: Theme[] = [
  createTheme({
    icon: {
      stroke: 'black',
    },
    colorTexts: {
      date: 'gray',
    },
    colorBlocks:
    {
      contentColor: 'white',
      homeSideColor: '#E9E4FF'
    },
    inputs:{
      inputTextStroke: '#6A4F93'
    },
    palette: {
      primary: {
        main: '#007bff',
      },
      secondary: {
        main: '#E5E0FB',
      },
      background: {
        default: '#F5F5F5',
      },
      text: {
        primary: 'black',
        secondary: 'black'
      },
    },
  }),
  createTheme({
    icon: {
      stroke: '#B67AFE',
    },
    colorTexts: {
      date: '#B67AFE',
    },
    colorBlocks:{
      contentColor: '#302A37',
      homeSideColor: '#1F1827'
    },
    inputs:
    {
      inputTextStroke: '#6B5094'
    },
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
        secondary: 'white'
      },
    },
  })
];
