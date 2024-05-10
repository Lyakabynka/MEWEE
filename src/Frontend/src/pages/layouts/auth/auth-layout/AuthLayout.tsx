import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { useNavigate } from "react-router-dom";
import { AuthHeaderForm } from "../../../../features/exportFeaturesComponents";
import { SwitchComponent } from "../../../../widgets/sideToolbar/components/switchComponent";
import { LanguageComponent } from "../../../../widgets/sideToolbar/components/languageComponent";
import { useThemeStore } from "../../../../entities";
import "./AuthLayout.css";

export const AuthLayout: React.FC<{
  children: React.ReactNode;
  isAuthNavActive: boolean;
}> = ({ children, isAuthNavActive }) => {
  const { t } = useTranslation(); // Call useTranslation hook
  const navigate = useNavigate();
  const { currentTheme } = useThemeStore();

  return (
    <div className="auth-main-container">
      <AuthHeaderForm />
      <div className="auth-content-holder">
        <div className="auth-title-holder">
          <span
            className="auth-title-text"
            style={{
              color: currentTheme?.authPages.commonElements.logoColorText,
            }}
          >
            MEWEE
          </span>
          <span className="auth-sub-title-text">{t("title-description")}</span>
        </div>
        {/* <div className="trapezoid" /> */}
        <div className="auth-content-container">
          {isAuthNavActive && (
            <div className="buttons-container">
              <div
                onClick={() => navigate("/auth/register")}
                className="button-c"
              >
                <h4>{t("registration")}</h4>
              </div>
              <div onClick={() => navigate("/auth/login")} className="button-c">
                <h4>{t("login")}</h4>
              </div>
            </div>
          )}
          {children}
          <div className="language-switch-container">
            <LanguageComponent />
            <SwitchComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
