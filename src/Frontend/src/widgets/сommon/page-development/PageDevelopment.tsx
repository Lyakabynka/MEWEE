import React, {useState} from "react";
import styles from "./page_development.module.scss"
import {useTranslation} from "react-i18next";

const PageDevelopment = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.div}>
           <div>{t("development")}</div>
        </div>
    );
};

export default PageDevelopment;
