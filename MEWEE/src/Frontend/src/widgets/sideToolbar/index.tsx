import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore, useThemeStore } from "../../entities";
import "./index.css";
import { SideToolbarMenuItem } from "./components/sideToolbarMenuItem";
import { useTranslation } from "react-i18next";
import { ReactComponent as IconGroups } from "./images/icon_groups.svg";
import { ReactComponent as IconEvents } from "./images/icon_events.svg";
import { ReactComponent as IconAnnouncements } from "./images/icon_announcements.svg";
import { ReactComponent as IconJobs } from "./images/icon_jobs.svg";
import { ReactComponent as IconNews } from "./images/icon_news.svg";
import { ReactComponent as IconSettings } from "./images/icon_settings.svg";
import { ReactComponent as LogoDefault } from "./images/logo_default.svg";
import { ReactComponent as LogoHide } from "./images/logo_hide.svg";
import { ReactComponent as ArrowLeft } from "./images/arrow_left.svg";
import { ReactComponent as ArrowRight } from "./images/arrow-right.svg";
import { SwitchComponent } from "./components/switchComponent";
import { LanguageComponent } from "./components/languageComponent";

export const SideToolbar = () => {
  const navigate = useNavigate();
  const { username, email, isLoggedIn, role, isEmailConfirmed } =
    useAuthStore();
  const { t, i18n } = useTranslation();
  const { currentTheme, currentThemeIndex, cycleThemes, getCurrentTheme } =
    useThemeStore();
  const fio = username?.split(" ");

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    const storedLanguage = localStorage.getItem("language");
    return storedLanguage || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="toolbar-generic-content">
      <div className="toolbar-main-content">
        <div
          className="toolbar-block-container"
          style={{
            backgroundColor: currentTheme?.mainPage?.sideBar?.secondBackground,
          }}
        >
          {isVisible ? (
            <div className="toolbar-logo">
              <LogoDefault />
            </div>
          ) : (
            <div className="toolbar-logo-another">
              <LogoHide />
            </div>
          )}
        </div>
        <div
          className="toolbar-prof-block-container"
          style={{
            backgroundColor: currentTheme?.mainPage?.sideBar?.background,
          }}
        >
          <div className="toolbar-profile-main-container">
            <div className="toolbar-profile-image">
              <img src={require("./images/unknown.jpg")}></img>
            </div>
            {isVisible && (
              <div
                className="toolbar-profile-info-container"
                style={{
                  color: currentTheme?.mainPage?.sideBar?.secondColorText,
                }}
              >
                <span className="toolbar-fio-title">
                  {fio ? fio[0] : "Unknown"}
                </span>
                <span className="toolbar-fio-second">
                  {fio ? fio[1] : "Unknown"}
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          className="toolbar-items-block-container"
          style={{
            backgroundColor: currentTheme?.mainPage?.sideBar?.background,
          }}
        >
          <div className="toolbar-list">
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconGroups />}
              title={t("groups")}
            />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconEvents />}
              title={t("events")}
            />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconAnnouncements />}
              title={t("announcements")}
            />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconJobs />}
              title={t("jobs")}
            />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconNews />}
              title={t("news")}
            />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconSettings />}
              title={t("settings")}
            />
          </div>
          <div
            onClick={toggleVisibility}
            className="arrow-block"
            style={{
              backgroundColor: currentTheme?.mainPage?.sideBar?.arrowBackground,
            }}
          >
            {isVisible ? (
              <div className="arrow-icon">
                <ArrowLeft />
              </div>
            ) : (
              <div className="arrow-icon">
                <ArrowRight />
              </div>
            )}
          </div>
        </div>
        <div
          className="toolbar-settings-block-container"
          style={{
            backgroundColor: currentTheme?.mainPage?.sideBar?.background,
          }}
        >
          {isVisible && <SwitchComponent />}
          <LanguageComponent />
        </div>
        <button onClick={() => navigate("/auth/logout")}>LOGOUT</button>
      </div>
    </div>
  );
};
