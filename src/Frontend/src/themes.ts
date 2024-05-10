// themes.ts

import { Theme, createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Theme {
    colorVariation:{
      white_302a37: string;
      black_white: string;
      black_b67afe: string;
      gray_a8a8a8: string;
      b67afe_white: string;
      b67afe_25005c: string;
      _25005c_white: string;
      _25005c_b67afe: string;
      _25005c_fba500: string;
      d6ceffbf_53258bbf: string;
      e1dcf670_615b6e30: string;
    },
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
      },
      preferencesPage:{
        colorText: string;
        borderColor: string;
      },
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
        colorPlaceholder: string;
      },
      chat:{
        icon: string;
        secondIcon: string;
        thirdIcon: string;
        background: string;
        backgroundHover: string;
        secondBackground: string;
        fourIcon: string;
        colorText: string;
        secondBackgroundHover: string;
        thirdBackground: string;
        secondColorText: string;
      },
      settings:{
        icon: string;
        background: string;
        colorText: string;
        inputBackground: string;
        borderColor: string;
        hoverOption: string;
      },
      post: {
        icon: string;
        secondIcon: string;
        secondHoverIcon: string;
        secondActiveIcon: string;
        background: string;
        colorText: string;
        secondColorText: string;
        thirdColorText: string;
        comments: {
          background: string;
          userColorText: string;
          colorText: string;
          shAnswerColorText: string;
          answerColorText: string;
          inputBackground: string;
        },
        addPost: {
          icon: string;
          hoverIcon: string;
          activeIcon: string;
          colorText: string;
          colorTextOther: string;
          background: string;
          inputBackground: string;
          inputPlaceholder: string;
        },
      },

    },
  }

  interface ThemeOptions {
    colorVariation?:{
      white_302a37?: string;
      black_white?: string;
      black_b67afe?: string;
      gray_a8a8a8?: string;
      b67afe_white?: string;
      b67afe_25005c?: string;
      _25005c_white?: string;
      _25005c_b67afe?: string;
      _25005c_fba500?: string;
      d6ceffbf_53258bbf?: string;
      e1dcf670_615b6e30?: string;

    },
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
      emailConfirmationPage?: {
        ColorText?: string;
        ColorHoverText?: string;
        ColorActiveText?: string;
      },
      passwordChangePage?: {
        ColorText?: string;
      },
      preferencesPage?:{
        colorText?: string;
        borderColor?: string;
      },
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
        colorPlaceholder?: string;
      },
      chat?:{
        icon?: string;
        secondIcon?: string;
        thirdIcon?: string;
        background?: string;
        backgroundHover?: string;
        secondBackground?: string;
        fourIcon?: string;
        colorText?: string;
        secondBackgroundHover?: string;
        thirdBackground?: string;
        secondColorText?: string;
      }
      settings?:{
        icon?: string;
        background?: string;
        colorText?: string;
        inputBackground?: string;
        borderColor?: string;
        hoverOption?: string;
      },
      post?: {
        icon?: string;
        secondIcon?: string;
        secondHoverIcon?: string;
        secondActiveIcon?: string;
        background?: string;
        colorText?: string;
        secondColorText?: string;
        thirdColorText?: string;
        comments?: {
          background?: string;
          userColorText?: string;
          colorText?: string;
          shAnswerColorText?: string;
          answerColorText?: string;
          inputBackground?: string;
        },
        addPost?: {
          icon?: string;
          hoverIcon?: string;
          activeIcon?: string;
          colorText?: string;
          colorTextOther?: string;
          background?: string;
          inputBackground?: string;
          inputPlaceholder?: string;
        },
      },
    },
  }
}
export const themes: Theme[] = [
  createTheme({
    colorVariation:{
      white_302a37: 'white',
      black_white: 'black',
      black_b67afe: 'black',
      gray_a8a8a8: 'gray',
      b67afe_white: '#b67afe',
      b67afe_25005c: '#b67afe',
      _25005c_white: '#25005c',
      _25005c_b67afe: '#25005c',
      _25005c_fba500: '#25005c',
      d6ceffbf_53258bbf: '#d6ceffbf',
      e1dcf670_615b6e30: '#e1dcf670',
    },
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
      },
      preferencesPage:{
        colorText: '#25005C',
        borderColor: '#25005C',
      },
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
        colorPlaceholder: 'gray',
      },
      chat:{
        icon: '#B67AFE',
        secondIcon: '#EC0C0C',
        thirdIcon: '#000000',
        background: 'white',
        backgroundHover: '#E9E4FF',
        secondBackground: 'white',
        fourIcon: '#FBA500',
        colorText: 'gray',
        secondBackgroundHover: '#E9E4FF',
        thirdBackground: '#E9E4FF',
        secondColorText: 'gray',
      },
      settings:{
        icon: '#25005C',
        background: 'white',
        colorText: '#25005C',
        inputBackground: 'white',
        borderColor: '#25005C',
        hoverOption: '#e1dcf6',
      },
      post: {
        icon: '#25005C',
        secondIcon: '#B67AFE',
        secondHoverIcon: '0.75',
        secondActiveIcon: '#FBA500',
        background: 'white',
        colorText: 'black',
        secondColorText:'#25005C',
        thirdColorText:'gray',
        comments: {
          background: 'white',
          userColorText: 'black',
          colorText: 'black',
          shAnswerColorText: '#FBA500',
          answerColorText: '#B67AFE',
          inputBackground: 'white',
        },
        addPost: {
          icon: 'black',
          hoverIcon: '0.75',
          activeIcon: '#FBA500',
          colorText: '#25005C',
          colorTextOther: '#25005C',
          background: '#D6CEFFBF',
          inputBackground: 'white',
          inputPlaceholder: 'black',
        },
      },
    },
    palette: {
      background: {
        default: '#F5F5F5',
      },
    },
  }),
  createTheme({
    colorVariation:{
      white_302a37: '#302a37',
      black_white: 'white',
      black_b67afe: '#b67afe',
      gray_a8a8a8: '#a8a8a8',
      b67afe_white: 'white',
      b67afe_25005c: '#25005c',
      _25005c_white: 'white',
      _25005c_b67afe: '#b67afe',
      _25005c_fba500: '#fba500',
      d6ceffbf_53258bbf: '#53258bbf',
      e1dcf670_615b6e30: '#615b6e30',
    },
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
      },
      preferencesPage:{
        colorText: '#B67AFE',
        borderColor: '#B67AFE',
      },
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
        colorPlaceholder: 'white',
      },
      chat:{
        icon: 'white',
        secondIcon: 'white',
        thirdIcon: 'white',
        background: '#B67AFE',
        backgroundHover: '#f9cd5a',
        secondBackground: '#de4363',
        fourIcon: '#B67AFE',
        colorText: '#c0c0c0',
        secondBackgroundHover: '#645e72',
        thirdBackground: '#B67AFE',
        secondColorText: 'white',
      },
      settings:{
        icon: 'white',
        background: '#302a37',
        colorText: 'white',
        inputBackground: '#4e4955',
        borderColor: '#B67AFE',
        hoverOption: '#615b6e',

      },
      post: {
        icon: '#B67AFE',
        secondIcon: '#B67AFE',
        secondHoverIcon: '0.75',
        secondActiveIcon: '#FBA500',
        background: '#302a37',
        colorText: 'white',
        secondColorText:'#B67AFE',
        thirdColorText:'gray',
        comments: {
          background: '#2F2937',
          userColorText: 'white',
          colorText: 'white',
          shAnswerColorText: '#FBA500',
          answerColorText: '#B67AFE',
          inputBackground: '#4e4955',
        },
        addPost: {
          icon: 'white',
          hoverIcon: '0.75',
          activeIcon: '#FBA500',
          colorText: '#FBA500',
          colorTextOther: 'white',
          background: '#5d3985',
          inputBackground: '#735694',
          inputPlaceholder: 'white',
        },
      },
    },
    palette: {
      background: {
        default: '#0b0414',
      },
    },
  })
];
