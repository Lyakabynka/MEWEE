import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../../entities";
import CustomModalIcon from "../../../widgets/сommon/custom-modal-icon/CustomModalIcon";
import CustomButton from "../../../widgets/сommon/custom-button/customButton";
import LocationIcon from "../../../assets/image/icons/LocationIcon.svg";
import LikePostIcon from "../../../assets/image/icons/LikePostIcon.svg";
import SentIcon from "../../../assets/image/icons/SentIcon.svg";
import { postDataProps } from "../dataPostShow.interface";
import styles from "./post.module.scss";
const Post: FC<postDataProps> = ({ dataObject }) => {
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

  const CustomBox = currentTheme?.components?.MuiIcon;
  // const fio = username?.split(' ');
  return (
    <div className={styles.div}>
      <div
        className={styles.sub_div}
        style={{
          backgroundColor: currentTheme?.mainPage.post.background,
        }}
      >
        <header>
          <div className={styles.header_div}>
            <div>
              <img src={dataObject.profileImageUrl} />
            </div>
            <div>
              <span
                style={{
                  color: currentTheme?.mainPage.post.colorText,
                }}
              >
                {dataObject.username}
              </span>
              <span
                style={{
                  color: currentTheme?.mainPage.post.thirdColorText,
                }}
              >
                {dataObject.postDate}
              </span>
              <div>
                <img src={LocationIcon} />
                <span
                  style={{
                    color: currentTheme?.mainPage.post.secondColorText,
                  }}
                >
                  {dataObject.location}
                </span>
              </div>
            </div>
          </div>
          <CustomModalIcon id={0} />
        </header>
        <main className={styles.main}>
          {isImage(dataObject.imageUrl) ? (
            <div>
              <img src={dataObject.imageUrl} alt="Post Image" />
            </div>
          ) : isVideo(dataObject.imageUrl) ? (
            <video
              className={styles.feed_post_video}
              ref={videoRef}
              autoPlay
              muted
            >
              <source src={dataObject.imageUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <span>Unsupported media format</span>
          )}
        </main>
        <footer className={styles.footer}>
          <span style={{ color: currentTheme?.mainPage.post.colorText }}>
            {dataObject.title}
          </span>
          <p>{dataObject.description}</p>
          <nav className={styles.nav}>
            <CustomButton text={t("more")} />
            <div>
              <img src={LikePostIcon} />
              <img src={SentIcon} />
              <img src="{CommentPostIcon}" />
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
};
export default Post;
