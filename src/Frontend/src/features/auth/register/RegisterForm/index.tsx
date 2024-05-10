import React, { useEffect, useState } from "react";
import { useFormik } from "formik"; // Import Formik library
import * as Yup from "yup"; // Import Yup for validation
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./register_form.module.scss";
import { REGISTER_SCHEMA } from "../../../../shared/exportSharedMorules";
import { CircularProgress } from "@mui/material";
import { useAuthStore, useErrors, useThemeStore } from "../../../../entities";
import { PopUpError } from "../../../../widgets/popuperror/PopUpError";

export const RegisterForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { t } = useTranslation();
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

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
      username: "",
      surname: "",
      email: "",
      password: "",
      confirm_password: "",
      policyAgree: false,
    },
    validationSchema: REGISTER_SCHEMA,
    onSubmit: () => {
      register(onResponse, {
        firstName: formik.values.username,
        secondName: formik.values.surname,
        email: formik.values.email,
        password: formik.values.password,
      });
    },
  });

  const onResponse = (_errors: string[]) => {
    setAutoClearErrors(_errors);

    if (_errors.length == 0) onNext();
  };

  const usernameError = formik.touched.username && formik.errors.username;
  const surnameError = formik.touched.surname && formik.errors.surname;
  const emailError = formik.touched.email && formik.errors.email;
  const passwordError = formik.touched.password && formik.errors.password;
  const confirmPasswordError =
    formik.touched.confirm_password && formik.errors.confirm_password;
  const policyAgreeError =
    formik.touched.policyAgree && formik.errors.policyAgree;

  return (
    <div className={styles.div}>
      <header>
        <div className={styles.header_div}></div>
        <span className={styles.header_span}>{t("or")}</span>
        <div className={styles.header_div}></div>
      </header>
      <form onSubmit={formik.handleSubmit}>
        <main>
          <div className={styles.main_div_1}>
            <div>
              <label
                className={`${styles.label} ${
                  usernameError ? styles.label_error : ""
                }`}
              >
                <input
                  autoComplete="firstName"
                  type="text"
                  id="username"
                  name="username"
                  placeholder={t("name") + "*"}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${usernameError ? styles.input_error : ""}`}
                />
              </label>
              {formik.touched.username && formik.errors.username && (
                <div className={styles.error}>{t(formik.errors.username)}</div>
              )}
            </div>
            <div>
              <label
                className={`${styles.label} ${
                  surnameError ? styles.label_error : ""
                }`}
              >
                <input
                  autoComplete="surname"
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder={t("surname")}
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${surnameError ? styles.input_error : ""}`}
                />
              </label>
              {formik.touched.surname && formik.errors.surname && (
                <div className={styles.error}>{t(formik.errors.surname)}</div>
              )}
            </div>
          </div>
          <div className={styles.main_div_2}>
            <div>
              <label
                className={`${styles.label} ${
                  emailError ? styles.label_error : ""
                }`}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("email") + "*"}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${emailError ? styles.input_error : ""}`}
                />
              </label>
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{t(formik.errors.email)}</div>
              )}
            </div>
          </div>
          <div className={styles.main_div_3}>
            <div>
              <label
                className={`${styles.label} ${
                  passwordError ? styles.label_error : ""
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
                  className={`${styles.show_password_toggle} ${
                    showPassword.password
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
                className={`${styles.label} ${
                  confirmPasswordError ? styles.label_error : ""
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
                  className={`${
                    confirmPasswordError ? styles.input_error : ""
                  }`}
                />
                <span
                  className={`${styles.show_password_toggle} ${
                    showPassword.confirm_password
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
          </div>
        </main>
        <footer>
          <section>
            <button type="submit">{t("register-me")}</button>
            {isLoading && <CircularProgress size={"1rem"}></CircularProgress>}
          </section>
          <input
            type="checkbox"
            id="policyAgree"
            name="policyAgree"
            checked={formik.values.policyAgree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className={styles.div_text_container}>
            <div className={`${policyAgreeError ? styles.input_error : ""}`}>
              {t("agree-with-policy")}
            </div>
            {formik.touched.policyAgree && formik.errors.policyAgree && (
              <div className={styles.error}>{t(formik.errors.policyAgree)}</div>
            )}
          </div>
        </footer>
      </form>
      <nav>
        {errors &&
          errors.length > 0 &&
          errors.map((error, index) => (
            <PopUpError
              key={index}
              text={t(error)}
              marginLeft="0.5rem"
            ></PopUpError>
          ))}
      </nav>
    </div>
  );
};
{
  /* <div className="login-link">
<a href="/auth/login">Already have an account? Sign in</a>
</div> */
}
