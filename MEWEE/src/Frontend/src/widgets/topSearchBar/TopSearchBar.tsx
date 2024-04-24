import { useErrors, usePostsStore, useThemeStore } from "../../entities";
import { useTranslation } from "react-i18next";
import { ReactComponent as IconPlus } from "./images/icon_plus.svg";
import { ReactComponent as IconFilter } from "./images/icon_filter.svg";
import { ReactComponent as IconNothification } from "./images/icon_nothification.svg";
import { ReactComponent as IconMessages } from "./images/icon_messages.svg";
import { TopSearchBarItem } from "./components/topSearchBarItem";
import "./index.css";
import { useFormik } from "formik";
import { LOGIN_SCHEMA } from "../../shared/exportSharedMorules";

export const TopSearchBar = () => {
  const { t } = useTranslation();
  // const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { currentTheme } = useThemeStore();
  const { findPosts, getPosts } = usePostsStore();
  // const fio = username?.split(' ');

  const formik = useFormik({
    initialValues: { prompt: ""},

    onSubmit: () => {
      findPosts(onResponse, formik.values.prompt, {page: 1, pageSize: 0});
    },
    
  });

  const onResponse = (errors: string[]) => {
    setAutoClearErrors(errors);

    console.log(errors);
    if (errors.length == 0) console.log("all good");
  };

  return (
    <div
      className="top-search-bar-container"
      style={{ backgroundColor: currentTheme?.mainPage.header.background }}
    >
      <div className="top-search-bar-title-container">
        <span
          className="top-search-bar-title"
          style={{ color: currentTheme?.mainPage.header.colorText }}
        >
          {t("main")}
        </span>
      </div>
      <div className="input-search-container">
        <label className="label-search-bar-style">
          <input
            className="input-search-bar"
            type="text"
            name="prompt"
            id="prompt"
            value={formik.values.prompt}
            onChange={formik.handleChange}
            placeholder={t("search") + "..."}
          />
          
          <span className="input-search-bar-icon search-icon-default" onClick={() => formik.handleSubmit()} />
        </label>
      </div>
      <div className="top-search-bar-tools-container">
        <TopSearchBarItem icon={<IconPlus />} />
        <TopSearchBarItem icon={<IconFilter />} />
        <TopSearchBarItem icon={<IconNothification />} />
        <TopSearchBarItem icon={<IconMessages />} />
      </div>
    </div>
  );
};
