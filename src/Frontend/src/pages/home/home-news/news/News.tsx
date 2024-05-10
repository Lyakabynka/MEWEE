import { FC, useState, useEffect, useRef } from "react";
import { useThemeStore } from "../../../../entities";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../../widgets/сommon/custom-button/customButton";
import SentIcon from "../../../../assets/image/icons/SentIcon.svg";
import SaveHomeModalIcon from "../../../../assets/image/icons/SaveHomeModalIcon.svg";
import CustomModalIcon from "../../../../widgets/сommon/custom-modal-icon/CustomModalIcon";
import { FeedPostPropsTypes } from "../../home.interface";
import { postDataTypes } from "../../../post-show/dataPostShow.interface";
import { modalPostDataLink } from "../../../../widgets/widgetData";
import styles from "./news.module.scss";
const News: FC<FeedPostPropsTypes> = ({ posts }) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
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
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Check if currentTheme exists before accessing custom values
  const CustomBox = currentTheme?.components?.MuiIcon;
  // const fio = username?.split(' ');
  return (
    <div>
      {posts &&
        posts.map((item: postDataTypes) => {
          return (
            <div key={item.id} className={styles.div}>
              <div
                className={styles.sub_div}
                style={{
                  backgroundColor: currentTheme?.mainPage.post.background,
                }}
              >
                <header className={styles.header}>
                  <div>
                    <h3
                      style={{
                        color: currentTheme?.mainPage.post.colorText,
                      }}
                    >
                      {item.username}
                    </h3>
                  </div>
                  {/* <CustomModalIcon id={0} links={modalPostDataLink} /> */}
                </header>
                <main className={styles.main}>
                  {isImage(item.imageUrl) ? (
                    <div>
                      <img src={item.imageUrl} alt="Post Image" />
                    </div>
                  ) : isVideo(item.imageUrl) ? (
                    <video
                      className={styles.feed_post_video}
                      ref={videoRef}
                      autoPlay
                      muted
                    >
                      <source src={item.imageUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <span>Unsupported media format</span>
                  )}
                </main>
                <footer className={styles.footer}>
                  <span
                    style={{ color: currentTheme?.mainPage.post.colorText }}
                  >
                    {item.title}
                  </span>
                  <p>{item.description}</p>
                  <nav className={styles.nav}>
                    <CustomButton text={t("more")} />
                    <div>
                      <img src={SaveHomeModalIcon} />
                      <img src={SentIcon} />
                    </div>
                  </nav>
                </footer>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default News;
