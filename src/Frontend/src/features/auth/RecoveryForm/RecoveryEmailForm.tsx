import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useErrors, useRecoveryStore, useThemeStore } from "../../../entities";
import { CircularProgress } from "@mui/material";
import { EMAIL_VALIDATION } from "../../../shared/exportSharedMorules";
import styles from "./recovery_form.module.scss";
import { PopUpError } from "../../../widgets/popuperror/PopUpError";

export const RecoveryEmailForm: React.FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { confirmEmail, isLoading } = useRecoveryStore();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: EMAIL_VALIDATION,
    onSubmit: () => {
      confirmEmail(onResponse, { email: formik.values.email });
    },
  });

  const onResponse = (errors: string[]) => {
    setAutoClearErrors(errors);

    if (errors.length == 0) onNext();
  };

  const emailError = formik.errors.email;
  return (
    <div className={styles.div}>
      <form onSubmit={formik.handleSubmit}>
        <header>{t("password_change")}</header>
        <main>
          <div className={styles.main_div}>
            <label className={`${emailError ? styles.label_error : ""}`}>
              <input
                required
                autoComplete="email"
                name="email"
                id="email"
                placeholder={t("email") + "*"}
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                className={`${emailError ? styles.input_error : ""}`}
              />
            </label>
            {formik.errors.email && (
              <div className={styles.error}>{t(formik.errors.email)}</div>
            )}
          </div>
        </main>
        <footer>
          <section>
            <button type="submit">{t("send") + " " + t("code")}</button>
            {isLoading && <CircularProgress size={"1rem"}></CircularProgress>}
            <button onClick={onBack}>{t("go_back")}</button>
          </section>
        </footer>
        <nav>
          {errors &&
            errors.length > 0 &&
            errors.map((error, index) => (
              <PopUpError key={index} text={t(error)}></PopUpError>
            ))}
        </nav>
      </form>
    </div>
  );
};
