import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useErrors, useRecoveryStore, useThemeStore } from '../../../../../entities';
import { CircularProgress } from '@mui/material';
import './index.css'

export const RecoverySuccessFulForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const {t} = useTranslation();
  const {currentTheme} = useThemeStore();
  const [isHoverButton, setIsHoverButton] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const buttonStyle = {
    backgroundColor: isActiveButton
        ? currentTheme?.authPages.commonElements.buttonActiveBackground
        : (isHoverButton && !isActiveButton)
            ? currentTheme?.authPages.commonElements.buttonHoverBackground
            : currentTheme?.authPages.commonElements.buttonBackground,
    color: isActiveButton
        ? currentTheme?.authPages.commonElements.buttonActiveColor
        : (isHoverButton && !isActiveButton)
            ? currentTheme?.authPages.commonElements.buttonHoverColor
            : currentTheme?.authPages.commonElements.buttonColor,
};
  return (
    <div className="recoverySucessfull-main-container">
        <span className="recoverySucessfull-title" style={{color:currentTheme?.authPages.commonElements.logoColorText}}>{t("ur_password_has_changed")}</span>
        <button className="login-style text-style-2" onClick={onNext}
                style={buttonStyle}
                onMouseEnter={() => setIsHoverButton(true)}
                onMouseLeave={() => {
                    setIsHoverButton(false);
                    setIsActiveButton(false);
                }}
                onMouseDown={() => setIsActiveButton(true)}
                onMouseUp={() => setIsActiveButton(false)}>{t('login')}
        </button>
    </div>
  );
};