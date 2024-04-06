import {
    CircularProgress,
} from "@mui/material";
import { useAuthStore, useErrors, useThemeStore } from "../../../../entities";
import { useFormik } from 'formik';
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const EmailConfirmationForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {

    const {t} = useTranslation();
    const {currentTheme} = useThemeStore();
    const [errors, setErrors, setAutoClearErrors] = useErrors();
    const { confirmEmail, email, isLoading } = useAuthStore();
    const [isHoverButton, setIsHoverButton] = useState(false);
    const [isActiveButton, setIsActiveButton] = useState(false);
    const [isHoverLink, setIsHoverLink] = useState(false);
    const [isActiveLink, setIsActiveLink] = useState(false);
  
    const buttonStyle = {
        backgroundColor: isActiveButton
            ? currentTheme?.authPages.loginPage.buttonActiveBackground
            : (isHoverButton && !isActiveButton)
                ? currentTheme?.authPages.loginPage.buttonHoverBackground
                : currentTheme?.authPages.loginPage.buttonBackground,
        color: isActiveButton
            ? currentTheme?.authPages.loginPage.buttonActiveColor
            : (isHoverButton && !isActiveButton)
                ? currentTheme?.authPages.loginPage.buttonHoverColor
                : currentTheme?.authPages.loginPage.buttonColor,
    };
    const linkStyle = {
        color: isActiveLink
            ? currentTheme?.authPages.loginPage.linkActiveColor
            : (isHoverLink && !isActiveLink)
                ? currentTheme?.authPages.loginPage.linkHoverColor
                : currentTheme?.authPages.loginPage.linkColor,
    };

    const formik = useFormik(
    {
        initialValues: { code: '', },

        onSubmit: () => { confirmEmail(onResponse, { email: email, code: formik.values.code}); }
    });


    const onResponse = (errors: string[]) =>
    {
        setAutoClearErrors(errors);

        if (errors.length == 0)
            onNext();
    }

    const inputStyle = {
        backgroundColor: currentTheme?.authPages.loginPage.inputBackground,
    };
    const codeError = formik.errors.code;
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
            <div className="input-container">
                            <label className={`label-style ${codeError ? 'label-error' : ''}`}>
                                <input
                                    required
                                    autoComplete="code"
                                    id="code"
                                    placeholder={t('code') + '*'}
                                    autoFocus
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    className={`"text-style-1 input-login ${codeError ? 'input-error' : ''}`}
                                    style={inputStyle}
                                />
                            </label>
                            {formik.errors.code && <div className="error">{t(formik.errors.code)}</div>}
                        </div>
                        <button className="login-style text-style-2" type="submit"
                style={buttonStyle}
                onMouseEnter={() => setIsHoverButton(true)}
                onMouseLeave={() => {
                    setIsHoverButton(false);
                    setIsActiveButton(false);
                }}
                onMouseDown={() => setIsActiveButton(true)}
                onMouseUp={() => setIsActiveButton(false)}>{t('verify')+ " " +t('code')}
        </button>
        {isLoading && <CircularProgress></CircularProgress>}
            </form>

            {(errors && errors.length > 0) && errors.map((error, index) => (
                <span key={index} className="error">{t(error)}</span>
            ))}
        </div>
    );
}