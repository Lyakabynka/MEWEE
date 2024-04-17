import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAuthStore, useErrors } from "../../../../entities";
import { useTranslation } from "react-i18next";
import "./index.css";
import { REGISTER_SCHEMA } from "../../../../shared";
import { CircularProgress } from "@mui/material";

export const RegisterForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { t } = useTranslation();
  const { register, isLoading } = useAuthStore();
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
        username: formik.values.username + " " + formik.values.surname,
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
    <div className="form-container">
      <div className="login-or-block">
        <div></div>
        <span>{t("or")}</span>
        <div></div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <div className="input-container">
            <label
              className={`label-style ${usernameError ? "label-error" : ""}`}
            >
              <input
                type="text"
                id="username"
                name="username"
                placeholder={t("name") + "*"}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`text-style-1 input-short ${
                  usernameError ? "input-error" : ""
                }`}
              />
            </label>
            {formik.touched.username && formik.errors.username && (
              <div className="error">{t(formik.errors.username)}</div>
            )}
          </div>
          <div className="input-container">
            <label
              className={`label-style ${surnameError ? "label-error" : ""}`}
            >
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder={t("surname")}
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`text-style-1 input-short ${
                  surnameError ? "input-error" : ""
                }`}
              />
            </label>
            {formik.touched.surname && formik.errors.surname && (
              <div className="error">{t(formik.errors.surname)}</div>
            )}
          </div>
        </div>
        <div className="input-group">
          <div className="input-container">
            <label className={`label-style ${emailError ? "label-error" : ""}`}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t("email") + "*"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`text-style-1 input-long ${
                  emailError ? "input-error" : ""
                }`}
              />
            </label>
            {formik.touched.email && formik.errors.email && (
              <div className="error">{t(formik.errors.email)}</div>
            )}
          </div>
        </div>
        <div className="input-group">
          <div className="input-container">
            <label
              className={`label-style ${passwordError ? "label-error" : ""}`}
            >
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                placeholder={t("password") + "*"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`text-style-1 input-short password-input ${
                  passwordError ? "input-error" : ""
                }`}
              />
              <span
                className={`show-password-toggle ${
                  showPassword.password
                    ? "password-icon-active"
                    : "password-icon-default"
                }`}
                onClick={() => togglePasswordVisibility("password")}
              />
            </label>
            {formik.touched.password && formik.errors.password && (
              <div className="error">{t(formik.errors.password)}</div>
            )}
          </div>
          <div className="input-container">
            <label
              className={`label-style ${
                confirmPasswordError ? "label-error" : ""
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
                className={`text-style-1 input-short password-input ${
                  confirmPasswordError ? "input-error" : ""
                }`}
              />
              <span
                className={`show-password-toggle ${
                  showPassword.confirm_password
                    ? "password-icon-active"
                    : "password-icon-default"
                }`}
                onClick={() => togglePasswordVisibility("confirm_password")}
              />
            </label>
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <div className="error">{t(formik.errors.confirm_password)}</div>
              )}
          </div>
        </div>
        <div className="input-group">
          <button className="registration-style" type="submit">
            <span className="text-style-2 register-me">{t("register-me")}</span>
          </button>
          <input
            type="checkbox"
            id="policyAgree"
            name="policyAgree"
            checked={formik.values.policyAgree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="agree-with-policy-container">
            <div
              className={`text-style-1 agree-with-policy-text ${
                policyAgreeError ? "input-error" : ""
              }`}
            >
              {t("agree-with-policy")}
            </div>
            {formik.touched.policyAgree && formik.errors.policyAgree && (
              <div className="error">{t(formik.errors.policyAgree)}</div>
            )}
          </div>
        </div>
      </form>
      {errors &&
        errors.length > 0 &&
        errors.map((error, index) => (
          <span key={index} className="error">
            {t(error)}
          </span>
        ))}
      {isLoading && <CircularProgress></CircularProgress>}
    </div>
  );
};
