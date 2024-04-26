import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuthStore, useErrors, useThemeStore } from "../../../entities";
import { useFormik } from "formik"; // Import Formik library
import * as Yup from "yup"; // Import Yup for validation
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import "./index.css";
import styles from "./login_form.module.scss";
import { useTranslation } from "react-i18next";
import { LOGIN_SCHEMA } from "../../../shared/exportSharedMorules";

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { login, isLoading } = useAuthStore();

  const [showPassword, setShowPassword] = useState({ password: false });

  const togglePasswordVisibility = (fieldName: keyof typeof showPassword) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LOGIN_SCHEMA,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: () => {
      login(onResponse, {
        email: formik.values.email,
        password: formik.values.password,
      });
    },
  });

  const onResponse = (errors: string[]) => {
    setAutoClearErrors(errors);

    console.log(errors);
    if (errors.length == 0) navigate("/feed");
  };

  const emailError = formik.errors.email;
  const passwordError = formik.errors.password;

  return (
      <div>
        <div className={styles.div}>
          <header className={styles.header}>
            <div className={styles.header_div}></div>
            <span className={styles.header_span}>{t('or')}</span>
            <div className={styles.header_div}></div>
          </header>
          <form onSubmit={formik.handleSubmit}>
            <main className={styles.main}>
              <div>
                <label className={`${styles.label} ${emailError ? styles.label_error : ''}`}>
                  <input
                      required
                      autoComplete="email"
                      name="email"
                      id="email"
                      placeholder={t('email') + '*'}
                      autoFocus
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className={`${emailError ? styles.input_error : ''}`}
                  />
                </label>
                {formik.errors.email && <div className={styles.error}>{t(formik.errors.email)}</div>}
              </div>
              <div>
                <label className={`${styles.label} ${passwordError ? styles.label_error : ''}`}>
                  <input
                      required
                      name="password"
                      placeholder={t('password') + '*'}
                      type={showPassword.password ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      className={`${passwordError ? styles.input_error : ''}`}
                  />
                  <span
                      className={`${showPassword.password ? styles.password_icon_active : styles.password_icon_default}`}
                      onClick={() => togglePasswordVisibility('password')}/>
                </label>
                {formik.errors.password && <div className={styles.error}>{t(formik.errors.password)}</div>}
              </div>
            </main>
            <footer>
              <button type="submit">{t('login')}</button>
              <div className={styles.div_link}>
                <Link href="/auth/recovery/email"><span>{t('forgot_password')}?</span></Link>
              </div>
              {(errors && errors.length > 0) && errors.map((error, index) => (
                  <span key={index} className={styles.error}>{t(error)}</span>
              ))}
              {isLoading && <CircularProgress></CircularProgress>}
            </footer>
          </form>
        </div>
      </div>
  );
}
