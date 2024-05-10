import React, { useEffect, useState } from "react";
import styles from "./language_component.module.scss"
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../../../entities";
export const LanguageComponent = () => {
  const { t, i18n } = useTranslation();

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
    <div className={styles.drop_up}>
      <span className={styles.drop_span}>
        {currentLanguage.toUpperCase()}
      </span>
      <div className={styles.drop_up_content}>
        <span onClick={() => changeLanguage("ua")}
          className={currentLanguage === "ua" ? styles.active : styles.dont_active}>
          UA
        </span>
        <span onClick={() => changeLanguage("en")}
          className={currentLanguage === "en" ? styles.active : styles.dont_active}>
          EN
        </span>
      </div>
    </div>
  );
};
