import React, { useEffect, useState } from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import { useAuthStore, useThemeStore } from "../../entities";
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
import { decryptImage } from "../../entities/sharedStores/post-utils";
import styles from "./side_toolbar.module.scss"
import ProfilePictureUploader from "../../features/profilePictureUploader/ProfilePictureUploader";
import { CircularProgress } from "@mui/material";

export const SideToolbar = () => {
  const navigate = useNavigate();
  const { username, firstName, secondName, avatar, email, isLoggedIn, role, isEmailConfirmed } =
    useAuthStore();
  const { t, i18n } = useTranslation();
  const [_avatar, setAvatar] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  const activeIcon = (path: string) => {
    return location.pathname.includes(path);
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    const storedLanguage = localStorage.getItem("language");
    return storedLanguage || "en";
  });

  const handleAvatarDecrypt = () => {
    const at = avatar ?? "";
    if (at != "")
      decryptImage(at)
        .then(decryptedData => {
          setAvatar(decryptedData);
        })
        .catch(error => {
          console.error(error);
        });
  }

  useEffect(() => {
    handleAvatarDecrypt();
    localStorage.setItem("language", currentLanguage);
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <div className={styles.toolbar_generic_content}>
      <div className={styles.toolbar_main_content}>
        <div className={styles.toolbar_block_container} onClick={() => navigate('/feed')}>
          {isVisible ? (
            <div className={styles.toolbar_logo}>
              <LogoDefault />
            </div>
          ) : (
            <div className={styles.toolbar_logo_another}>
              <LogoHide />
            </div>
          )}
        </div>
        <div className={styles.toolbar_prof_block_container} style={{cursor:"pointer"}}>
          <div className={styles.toolbar_profile_main_container}
               onClick={() => {navigate('/profile/'+username);}}>
                {/* <ProfilePictureUploader></ProfilePictureUploader> */}
            <div className={styles.toolbar_profile_image}>
              <img src={_avatar === "" ? require("./images/unknown.jpg") : _avatar}>
              </img>
            </div>
            {isVisible && (
              <div className={styles.toolbar_profile_info_container}>
                <span className={styles.toolbar_fio_title}>
                  {firstName ?? "Unknown"}
                </span>
                <span className={styles.toolbar_fio_second}>
                  {secondName ?? "Unknown"}
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          className={styles.toolbar_items_block_container}>
          <div className={styles.toolbar_list}>
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconGroups />}
              title={t("groups")}
              onNavigate={() => navigate('/groups')}
              isActive={activeIcon("/groups")}
              />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconEvents />}
              title={t("events")}
              onNavigate={() => navigate('/events')}
              isActive={activeIcon("/events")}
              />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconAnnouncements />}
              title={t("announcements")}
              onNavigate={() => navigate('/announcements')}
              isActive={activeIcon("/announcements")}
              />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconJobs />}
              title={t("jobs")}
              onNavigate={() => navigate('/jobs')}
              isActive={activeIcon("/jobs")}
              />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconNews />}
              title={t("news")}
              onNavigate={() => navigate('/news')}
              isActive={activeIcon("/news")}
              />
            <SideToolbarMenuItem
              isVisible={isVisible}
              icon={<IconSettings />}
              title={t("settings")}
              onNavigate={() => navigate('/settings')}
              isActive={activeIcon("/settings")}
              />
          </div>
          <div onClick={toggleVisibility} className={styles.arrow_block}>
            {isVisible ? (
              <div className={styles.arrow_icon}>
                <ArrowLeft />
              </div>
            ) : (
              <div className={styles.arrow_icon}>
                <ArrowRight />
              </div>
            )}
          </div>
        </div>
        <div className={styles.toolbar_settings_block_container}>
          {isVisible && <SwitchComponent />}
          <LanguageComponent />
        </div>
      </div>
    </div>
  );
};
