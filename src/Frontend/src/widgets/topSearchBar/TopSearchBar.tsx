import { useAuthStore, useErrors, usePostsStore, useSearchBar, useThemeStore, useUserStore } from "../../entities";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { ReactComponent as IconPlus } from "./images/icon_plus.svg";
import { ReactComponent as IconFilter } from "./images/icon_filter.svg";
import { ReactComponent as IconNothification } from "./images/icon_nothification.svg";
import { ReactComponent as IconMessages } from "./images/icon_messages.svg";
import { TopSearchBarItem } from "./components/topSearchBarItem/TopSearchBarItem";
import AddPost from "./components/add-post/AddPost";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Search from "./components/search-component/Search";
import styles from "./top_search_bar.module.scss";

export const TopSearchBar = () => {
  const { username, avatar, id } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { title } = useSearchBar();
  const { findPeople } = useUserStore();
  const { currentTheme } = useThemeStore();
  const { isLoading, findPosts, getPosts } = usePostsStore();
  // const fio = username?.split(' ');
  const [searchUsers, setSearchUsers] = useState<any>(null);
  const [searchGroups, setSearchGroups] = useState<any>(null);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const debounce = <F extends (...args: any[]) => void>(callback: F, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return function(this: any, ...args: Parameters<F>) {
      clearTimeout(timeoutId as NodeJS.Timeout);
      timeoutId = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  };
  const onFindResponse = (data: any, errors: string[]) => {
    

    if (errors.length == 0) {
      setSearchGroups(data.groups);
      setSearchUsers(data.users);
     }
    else console.error(errors);
  };
  const handleInput = () => {
    findPeople(onFindResponse, formik.values.prompt, {page: 0, pageSize: 10});
  } 

  const activeIcon = (path: string) => {
    return location.pathname.includes(path);
  }

  const formik = useFormik({
    initialValues: { prompt: "" },

    onSubmit: () => {
      findPosts(onResponse, formik.values.prompt, { page: 0, pageSize: 10 });
    },

  });

  useEffect(() => {
    if (formik.values.prompt.trim() !== '') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [formik.values.prompt]);

  const onResponse = (data: any, errors: string[]) => {
    setAutoClearErrors(errors);

    if (errors.length == 0) { }
    else console.error(errors);
  };

  return (
    <div className={styles.top_search_bar_container}>
      <div className={styles.top_search_bar_title_container}>
        <span className={styles.top_search_bar_title} onClick={() => navigate('/feed')}>{t(title)}</span>
      </div>
      <div className={styles.input_search_container}>
        <div className={styles.label_search_bar_style}>
          <input
            className={styles.input_search_bar}
            style={{ borderRadius: isVisible ? "10px 10px 0 0" : "10px" }}
            type="text"
            name="prompt"
            id="prompt"
            value={formik.values.prompt}
            onChange={formik.handleChange}
            onBlur={handleInput}
            placeholder={t("search") + "..."}
          />
          <span className={`${styles.input_search_bar_icon} ${styles.search_icon_default}`}
            onClick={() => formik.handleSubmit()} />
        </div>
        {isVisible && (
          <Search users={searchUsers} groups={searchGroups} />
        )}
      </div>
      <div>
      </div>
      {isLoading && <CircularProgress size={"1rem"}></CircularProgress>}
      <div className={styles.top_search_bar_tools_container}>
        <AddPost avatar={avatar??""} username={username ?? ""} id={id ?? ""} />
        <TopSearchBarItem onClick={() => navigate('/feed')} icon={<IconFilter />}
          isActive={false} />
        <TopSearchBarItem onClick={() => navigate('/feed')} icon={<IconNothification />}
          isActive={false} />
        <TopSearchBarItem onClick={() => navigate('/chat')} icon={<IconMessages />}
          isActive={activeIcon("/chat")} />
      </div>
    </div>
  );
};
