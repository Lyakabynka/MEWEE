import { useTranslation } from "react-i18next";

export const moreTabsData = () => {
  const { t } = useTranslation();

  const moreTabs  = [
    {
      id: "1",
      title: t('profile'),
      path: "/settings/profile",
    },
    {
      id: "2",
      title: t('privacy_security'),
      path: "/settings/security",
    },
    {
      id: "3",
      title: t('account_management'),
      path: "/settings/account",
    },
    {
      id: "4",
      title: t('sign_out'),
      path: "/auth/logout",
    },
  ];

  return moreTabs;
};

export const switchTabsData = () => {
  const { t } = useTranslation();

  const switchTabs = [
    {
      id: "1",
      title: t('hide_profile'),
      switchActive: true,
    },
    {
      id: "2",
      title: t('save_login_details'),
      switchActive: false,
    },
    {
      id: "3",
      title: t('notification'),
      switchActive: true,
    },
    {
      id: "4",
      title: t('personalized_advertising'),
      switchActive: true,
    },
    {
      id: "5",
      title: t('activity_status'),
      switchActive: false,
      description:
          "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem",
    },
    {
      id: "6",
      title: t('allow_interact'),
      switchActive: false,
      description:
          "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem",
    },
  ];

  return switchTabs;
};

