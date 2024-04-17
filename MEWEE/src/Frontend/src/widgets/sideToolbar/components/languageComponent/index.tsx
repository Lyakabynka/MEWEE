import React, { useEffect, useState } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../../../entities";
export const LanguageComponent = () => {
  const { t, i18n } = useTranslation();
  const { currentTheme } = useThemeStore();

  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    const storedLanguage = localStorage.getItem("language");
    return storedLanguage || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="drop_up">
      <span
        className="drop_span"
        style={{ color: currentTheme?.mainPage?.sideBar?.secondColorText }}
      >
        {currentLanguage.toUpperCase()}
      </span>
      <div
        className="drop_up-content"
        style={{
          backgroundColor: currentTheme?.mainPage?.sideBar?.backgroundLanguage,
        }}
      >
        <span
          onClick={() => changeLanguage("ua")}
          style={{
            color:
              currentLanguage === "ua"
                ? currentTheme?.mainPage?.sideBar?.hoverAndActiveText
                : currentTheme?.mainPage?.sideBar?.secondColorText,
          }}
        >
          UA
        </span>
        <span
          onClick={() => changeLanguage("en")}
          style={{
            color:
              currentLanguage === "en"
                ? currentTheme?.mainPage?.sideBar?.hoverAndActiveText
                : currentTheme?.mainPage?.sideBar?.secondColorText,
          }}
        >
          EN
        </span>
      </div>
    </div>
  );
};
