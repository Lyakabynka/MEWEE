import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useErrors, useRecoveryStore, useThemeStore } from "../../../entities";
import { EMAIL_VALIDATION } from "../../../shared/exportSharedMorules";
import { CircularProgress } from "@mui/material";

export const RecoveryEmailForm: React.FC<{ onNext: () => void }> = ({
  onNext,
}) => {
  const { t } = useTranslation();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { currentTheme } = useThemeStore();
  const { confirmEmail, isLoading } = useRecoveryStore();
  const [isHoverButton, setIsHoverButton] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);

  const buttonStyle = {
    backgroundColor: isActiveButton
      ? currentTheme?.authPages.loginPage.buttonActiveBackground
      : isHoverButton && !isActiveButton
      ? currentTheme?.authPages.loginPage.buttonHoverBackground
      : currentTheme?.authPages.loginPage.buttonBackground,
    color: isActiveButton
      ? currentTheme?.authPages.loginPage.buttonActiveColor
      : isHoverButton && !isActiveButton
      ? currentTheme?.authPages.loginPage.buttonHoverColor
      : currentTheme?.authPages.loginPage.buttonColor,
  };
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

    console.log(errors);
    if (errors.length == 0) onNext();
  };
  const inputStyle = {
    backgroundColor: currentTheme?.authPages.loginPage.inputBackground,
  };
  const emailError = formik.errors.email;
  return (
    <div className="">
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <div className="input-container">
            <label className={`label-style ${emailError ? "label-error" : ""}`}>
              <input
                required
                autoComplete="email"
                name="email"
                id="email"
                placeholder={t("email") + "*"}
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                className={`"text-style-1 input-login ${
                  emailError ? "input-error" : ""
                }`}
                style={inputStyle}
              />
            </label>
            {formik.errors.email && (
              <div className="error">{t(formik.errors.email)}</div>
            )}
          </div>
        </div>
        <button
          className="login-style text-style-2"
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
          {t("send") + " " + t("code")}
        </button>

        {isLoading && <CircularProgress></CircularProgress>}
      </form>
    </div>
  );
};
