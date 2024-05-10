import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import {
  useErrors,
  useRecoveryStore,
  useThemeStore,
} from "../../../../../entities";
import { CircularProgress } from "@mui/material";
import { SET_NEW_PASSWORD_SCHEMA } from "../../../../../shared/exportSharedMorules";
import styles from "./set_password_form.module.scss";
import { PopUpError } from "../../../../../widgets/popuperror/PopUpError";

export const RecoverySetPasswordForm: React.FC<{ onNext: () => void }> = ({
  onNext,
}) => {
  const { t } = useTranslation();
  const { setNewPassword, isLoading } = useRecoveryStore();
  const [errors, setErrors, setAutoClearErrors] = useErrors();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });

  const togglePasswordVisibility = (fieldName: keyof typeof showPassword) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: SET_NEW_PASSWORD_SCHEMA,
    onSubmit: () => {
      setNewPassword(onVerificationSentResponse, {
        password: formik.values.password,
      });
    },
  });
  const onVerificationSentResponse = (errors: string[]) => {
    setAutoClearErrors(errors);

    if (errors.length == 0) {
      onNext();
    }
  };
  const passwordError = formik.touched.password && formik.errors.password;
  const confirmPasswordError =
    formik.touched.confirm_password && formik.errors.confirm_password;
  return (
    <div className={styles.div}>
      <form onSubmit={formik.handleSubmit}>
        <header>{t("password_change")}</header>
        <main>
          <div>
            <label
              className={`${styles.label} ${passwordError ? styles.label_error : ""
                }`}
            >
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                placeholder={t("password") + "*"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${passwordError ? styles.input_error : ""}`}
              />
              <span
                className={`${styles.show_password_toggle} 
                                ${showPassword.password
                    ? styles.password_icon_active
                    : styles.password_icon_default
                  }`}
                onClick={() => togglePasswordVisibility("password")}
              />
            </label>
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{t(formik.errors.password)}</div>
            )}
          </div>
          <div>
            <label
              className={`${styles.label} ${confirmPasswordError ? styles.label_error : ""
                }`}
            >
              <input
                type={showPassword.confirm_password ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                placeholder={t("confirm_password") + "*"}
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${confirmPasswordError ? styles.input_error : ""}`}
              />
              <span
                className={`${styles.show_password_toggle} 
                                ${showPassword.confirm_password
                    ? styles.password_icon_active
                    : styles.password_icon_default
                  }`}
                onClick={() => togglePasswordVisibility("confirm_password")}
              />
            </label>
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <div className={styles.error}>
                  {t(formik.errors.confirm_password)}
                </div>
              )}
          </div>
        </main>
        <footer>
          <section>
            <button type="submit">{t("send")}</button>
            <nav>
              {isLoading && <CircularProgress size={"1rem"}></CircularProgress>}
            </nav>
          </section>

          <nav>
            {errors &&
              errors.length > 0 &&
              errors.map((error, index) => (
                <PopUpError key={index} text={t(error)}></PopUpError>
              ))}
          </nav>
        </footer>
      </form>
    </div>
  );
};
