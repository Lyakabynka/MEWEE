import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import i18n from 'i18next'; // Import i18n instance
import { initReactI18next } from 'react-i18next'; // Import initReactI18next function
import enTranslation from './locales/en.json'; // Import English translations
import uaTranslation from './locales/ua.json'; // Import Ukranian translations

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: enTranslation },
      ua: { translation: uaTranslation } 
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false
    }
  });



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
