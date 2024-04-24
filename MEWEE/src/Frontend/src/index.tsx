import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import enTranslation from './locales/en.json'
import uaTranslation from './locales/ua.json'
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                               // language to use
  resources: {
    en: {
      translation: enTranslation,
    },
    ua: {
      translation: uaTranslation,
    },
  },
});


root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
