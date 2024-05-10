import React, { useEffect, useState } from "react";
import { useFormik } from "formik"; // Import Formik library
import * as Yup from "yup"; // Import Yup for validation
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";
import { REGISTER_SCHEMA } from "../../../shared/exportSharedMorules";
import { useAuthStore, useErrors, useThemeStore } from "../../../entities";
import "./index.css";

export const RegisterForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { t } = useTranslation();
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const { currentTheme } = useThemeStore();
  const [isHoverButton, setIsHoverButton] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);

  const buttonStyle = {
    backgroundColor: isActiveButton
      ? currentTheme?.authPages.commonElements.buttonActiveBackground
      : isHoverButton && !isActiveButton
        ? currentTheme?.authPages.commonElements.buttonHoverBackground
        : currentTheme?.authPages.commonElements.buttonBackground,
    color: isActiveButton
      ? currentTheme?.authPages.commonElements.buttonActiveColor
      : isHoverButton && !isActiveButton
        ? currentTheme?.authPages.commonElements.buttonHoverColor
        : currentTheme?.authPages.commonElements.buttonColor,
  };

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
    <div className="form-container">
      <div className="login-or-block">
        <div
          style={{
            borderColor: currentTheme?.authPages.commonElements.lineColor,
          }}
        ></div>
        <span
          style={{
            color: currentTheme?.authPages.commonElements.lineColorText,
          }}
        >
          {t("or")}
        </span>
        <div
          style={{
            borderColor: currentTheme?.authPages.commonElements.lineColor,
          }}
        ></div>
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
                className={`text-style-1 input-short input-registration ${usernameError ? "input-error" : ""
                  }`}
                style={{
                  backgroundColor:
                    currentTheme?.authPages.commonElements.inputBackground,
                }}
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
                className={`text-style-1 input-short input-registration ${surnameError ? "input-error" : ""
                  }`}
                style={{
                  backgroundColor:
                    currentTheme?.authPages.commonElements.inputBackground,
                }}
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
                className={`text-style-1 input-long input-registration ${emailError ? "input-error" : ""
                  }`}
                style={{
                  backgroundColor:
                    currentTheme?.authPages.commonElements.inputBackground,
                }}
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
                className={`text-style-1 input-short input-registration password-input ${passwordError ? "input-error" : ""
                  }`}
                style={{
                  backgroundColor:
                    currentTheme?.authPages.commonElements.inputBackground,
                }}
              />
              <span
                className={`show-password-toggle ${showPassword.password
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
              className={`label-style ${confirmPasswordError ? "label-error" : ""
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
                className={`text-style-1 input-short input-registration password-input ${confirmPasswordError ? "input-error" : ""
                  }`}
                style={{
                  backgroundColor:
                    currentTheme?.authPages.commonElements.inputBackground,
                }}
              />
              <span
                className={`show-password-toggle ${showPassword.confirm_password
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
          <button
            className="registration-style text-style-2"
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setIsHoverButton(true)}
            onMouseLeave={() => {
              setIsHoverButton(false);
              setIsActiveButton(false);
            }}
            onMouseDown={() => setIsActiveButton(true)}
            onMouseUp={() => setIsActiveButton(false)}
          >
            {t("register-me")}
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
              className={`text-style-1 agree-with-policy-text ${policyAgreeError ? "input-error" : ""
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
{
  /* <div className="login-link">
<a href="/auth/login">Already have an account? Sign in</a>
</div> */
}
