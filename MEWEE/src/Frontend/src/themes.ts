// themes.ts

import { Theme, createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Theme {
    authPages:{
      commonElements:{
        logoColorText: string;
        buttonBackground: string;
        buttonColor: string;
        buttonHoverBackground: string;
        buttonHoverColor: string;
        buttonActiveBackground: string;
        buttonActiveColor: string;
        inputBackground: string;
        inputColor: string;
        lineColor: string;
        lineColorText: string;
      },
      loginPage: {
        linkColor: string;
        linkHoverColor: string;
        linkActiveColor: string;
      },
      registrationPage: {
      },
      emailConfirmationPage: {
        ColorText: string;
        ColorHoverText: string;
        ColorActiveText: string;
      },
      passwordChangePage: {
        ColorText: string;
      }
    },
    mainPage:{
      sideBar: {
        icon: string;
        hoverIcon: string;
        background: string;
        secondBackground: string;
        colorText: string;
        secondColorText: string;
        hoverAndActiveText: string;
        backgroundLanguage: string;
        hoverBackground: string;
        arrowBackground: string;
      },
      header: {
        icon: string;
        hoverIcon: string;
        activeIcon: string;
        background: string;
        colorText: string;
        inputTextColor: string;
        inputColorStroke: string;
      },
      post: {
        icon: string;
        secondIcon: string;
        background: string;
        colorText: string;
        secondColorText: string;
        thirdColorText: string;
      },
    },
  }

  interface ThemeOptions {
    authPages?:{
      commonElements?:{
        logoColorText?: string;
        buttonBackground?: string;
        buttonColor?: string;
        buttonHoverBackground?: string;
        buttonHoverColor?: string;
        buttonActiveBackground?: string;
        buttonActiveColor?: string;
        inputBackground?: string;
        inputColor?: string;
        lineColor?: string;
        lineColorText?: string;
      },
      loginPage?: {
        linkColor?: string;
        linkHoverColor?: string;
        linkActiveColor?: string;
      },
      registrationPage?: {
      },
      emailConfirmationPage: {
        ColorText?: string;
        ColorHoverText?: string;
        ColorActiveText?: string;
      },
      passwordChangePage: {
        ColorText?: string;
      }
    },
    mainPage:{
      sideBar?: {
        icon?: string;
        hoverIcon?: string;
        background?: string;
        colorText?: string;
        secondColorText?: string;
        secondBackground?: string;
        hoverAndActiveText?: string;
        backgroundLanguage?: string;
        hoverBackground?: string;
        arrowBackground?: string;
      },
      header?: {
        icon?: string;
        hoverIcon?: string;
        activeIcon?: string;
        background?: string;
        colorText?: string;
        inputTextColor?: string;
        inputColorStroke?: string;
      },
      post?: {
        icon?: string;
        secondIcon?: string;
        background?: string;
        colorText?: string;
        secondColorText?: string;
        thirdColorText?: string;
      },
    },
  }
}
export const themes: Theme[] = [
  createTheme({
    authPages:{
      commonElements:{
        logoColorText: '#25005C',
        buttonBackground: '#25005C',
        buttonColor: '#B67AFE',
        buttonHoverBackground: '#B67AFE',
        buttonHoverColor: '#25005C',
        buttonActiveBackground: '#B67AFE',
        buttonActiveColor: '#25005C',
        inputBackground: 'white',
        inputColor: 'black',
        lineColor: '#C5C5CA',
        lineColorText: '#6E6E73',
      },
      loginPage: {
        linkColor: '#25005C',
        linkHoverColor: '#B67AFE',
        linkActiveColor: '#FBA500',
      },
      registrationPage: {
      },
      emailConfirmationPage: {
        ColorText: '#25005C',
        ColorHoverText: '#25005CBF',
        ColorActiveText: '#FBA500',
      },
      passwordChangePage: {
        ColorText: '#25005C',
      }
    },
    mainPage:{
      sideBar: {
        icon: 'black',
        hoverIcon: 'white',
        background: '#E9E4FF',
        secondBackground: '#E9E4FF',
        colorText: 'black',
        secondColorText: '#25005C',
        hoverAndActiveText: '#FBA500',
        backgroundLanguage: 'white',
        hoverBackground: '#25005C',
        arrowBackground: '#B67AFE',
      },
      header: {
        icon: 'black',
        hoverIcon: '0.75',
        activeIcon: '#FBA500',
        background: 'white',
        colorText: 'black',
        inputTextColor: 'gray',
        inputColorStroke: 'red',
      },
      post: {
        icon: '#25005C',
        secondIcon: '#B67AFE',
        background: 'white',
        colorText: 'black',
        secondColorText:'#25005C',
        thirdColorText:'gray',
      },
    },
    palette: {
      background: {
        default: '#F5F5F5',
      },
    },
  }),
  createTheme({
    authPages:{
      commonElements:{
        logoColorText: '#B67AFE',
        buttonBackground: '#B67AFE',
        buttonColor: '#25005C',
        buttonHoverBackground: '#25005C',
        buttonHoverColor: '#B67AFE',
        buttonActiveBackground: '#B67AFE',
        buttonActiveColor: '#25005C',
        inputBackground: '#302a37',
        inputColor: 'white',
        lineColor: '#6E6E73',
        lineColorText: '#6E6E73',
      },
      loginPage: {
        linkColor: '#FFFFFF',
        linkHoverColor: 'gray',
        linkActiveColor: '#FBA500',
      },
      registrationPage: {
      },
      emailConfirmationPage: {
        ColorText: '#B67AFE',
        ColorHoverText: '#B67AFEBF',
        ColorActiveText: '#FBA500',
      },
      passwordChangePage: {
        ColorText: '#B67AFE',
      }
    },
    mainPage: {
      sideBar: {
        icon: 'white',
        hoverIcon: 'white',
        background: '#251834',
        secondBackground: '#1F1827',
        colorText: 'white',
        secondColorText: 'white',
        hoverAndActiveText: '#FBA500',
        backgroundLanguage: '#B67AFE',
        hoverBackground: '#764fa5',
        arrowBackground: '#764fa5',
      },
      header: {
        icon: 'white',
        hoverIcon: '0.75',
        activeIcon: '#FBA500',
        background: '#302a37',
        colorText: 'white',
        inputTextColor: 'gray',
        inputColorStroke: 'yellow',
      },
      post: {
        icon: '#B67AFE',
        secondIcon: '#B67AFE',
        background: '#302a37',
        colorText: 'white',
        secondColorText:'#B67AFE',
        thirdColorText:'gray',
      },
    },
    palette: {
      background: {
        default: '#0b0414',
      },
    },
  })
];
