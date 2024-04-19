import React, { useState, useEffect, useRef } from "react";
import { useThemeStore } from "../../../../../entities";
import { useTranslation } from "react-i18next";
import LocationIcon from "../../../../../assets/image/icons/LocationIcon.svg";
import SentPostIcon from "../../../../../assets/image/icons/SentPostIcon.svg";
import CommentPostIcon from "../../../../../assets/image/icons/CommentPostIcon.svg";
import {
  FeedPostPropsTypes,
  modalPostDataLinkTypes,
} from "../../../home.interface";
import { modalPostDataLink } from "../../../data";
import LikePostIcon from "../../../../../assets/image/icons/LikePostIcon.svg";
import styles from "./feed_post.module.scss";

export const FeedPost: React.FC<FeedPostPropsTypes> = (post) => {
  const [modalIcon, setModalIcon] = useState<Boolean>(true);
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentPost = post.post;
  // const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();
  const { currentTheme } = useThemeStore();

  const isImage = (url: string) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
  };

  const isVideo = (url: string) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, []);

  const handleVideoEnded = () => {
    // Reset the playback time to 0 when the video ends
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play(); // Start playing again
    }
  };

  const handleModalClick = () => {
    setModalIcon(!modalIcon);
  };
  // Check if currentTheme exists before accessing custom values
  const CustomBox = currentTheme?.components?.MuiIcon;
  // const fio = username?.split(' ');
  return (
    <div
      className={styles.div}
      style={{ backgroundColor: currentTheme?.mainPage.post.background }}
    >
      <ul
        className={modalIcon ? styles.ul : `${styles.ul} ${styles._ul_visible}`}
      >
        {modalPostDataLink ? (
          modalPostDataLink.map((item: modalPostDataLinkTypes) => {
            return (
              <li key={item.id}>
                <a href={item.url}>
                  <div>
                    <img src={`${item.icons}`} />
                    <h6>{t(`${item.text}`)}</h6>
                  </div>
                </a>
              </li>
            );
          })
        ) : (
          <p>Ошибка сервера...</p>
        )}
      </ul>
      <header>
        <div className={styles.header_div}>
          <div>
            <img src={currentPost.profileImageUrl} />
          </div>
          <div>
            <span style={{ color: currentTheme?.mainPage.post.colorText }}>
              {currentPost.username}
            </span>
            <span style={{ color: currentTheme?.mainPage.post.thirdColorText }}>
              {currentPost.postDate}
            </span>
            <div>
              <img src={LocationIcon} />
              <span
                style={{ color: currentTheme?.mainPage.post.secondColorText }}
              >
                {currentPost.location}
              </span>
            </div>
          </div>
        </div>
        <div onClick={handleModalClick} className={styles.modal_button}>
          <div />
          <div />
          <div />
        </div>
      </header>
      <main className={styles.main}>
        {isImage(currentPost.imageUrl) ? (
          <img src={currentPost.imageUrl} alt="Post Image" />
        ) : isVideo(currentPost.imageUrl) ? (
          <video
            className={styles.feed_post_video}
            ref={videoRef}
            autoPlay
            muted
          >
            <source src={currentPost.imageUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <span>Unsupported media format</span>
        )}
      </main>
      <footer className={styles.footer}>
        <span style={{ color: currentTheme?.mainPage.post.colorText }}>
          {currentPost.title}
        </span>
        <p>{currentPost.description}</p>
        <nav className={styles.nav}>
          <button>{t("more")}</button>
          <div>
            <a href="#">
              <img src={LikePostIcon} />
            </a>
            <a href="#">
              <img src={SentPostIcon} />
            </a>
            <a href="#">
              <img src={CommentPostIcon} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};
