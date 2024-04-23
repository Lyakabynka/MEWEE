import { FC, useState, useEffect, useRef } from "react";
import { useThemeStore } from "../../../../entities";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../../widgets/сommon/custom-button/customButton";
import CommentBarComponents from "../../../../widgets/comment-bar-components/CommentBarComponents";
import CustomModalIcon from "../../../../widgets/сommon/custom-modal-icon/CustomModalIcon";
import LocationIcon from "../../../../assets/image/icons/LocationIcon.svg";
import LikePostIcon from "../../../../assets/image/icons/LikePostIcon.svg";
import SentIcon from "../../../../assets/image/icons/SentIcon.svg";
import CommentPostIcon from "../../../../assets/image/icons/CommentPostIcon.svg";
import { FeedPostPropsTypes } from "../../home.interface";
import { postDataTypes } from "../../../post-show/dataPostShow.interface";
import { commentsData } from "../../../../widgets/widgetData";
import styles from "./feed_post.module.scss";

export const FeedPost: FC<FeedPostPropsTypes> = ({ posts }) => {
  const [commentsHiden, setCommentsHiden] = useState<number | null>(null);
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

  const handleCommentClick = (postId: number) => {
    setCommentsHiden(commentsHiden === postId ? null : postId);
  };

  // Check if currentTheme exists before accessing custom values
  const CustomBox = currentTheme?.components?.MuiIcon;
  // const fio = username?.split(' ');
  return (
    <div>
      {posts &&
        posts.map((item: postDataTypes) => {
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
                      <img src={item.profileImageUrl} />
                    </div>
                    <div>
                      <span
                        style={{
                          color: currentTheme?.mainPage.post.colorText,
                        }}
                      >
                        {item.username}
                      </span>
                      <span
                        style={{
                          color: currentTheme?.mainPage.post.thirdColorText,
                        }}
                      >
                        {item.postDate}
                      </span>
                      <div>
                        <img src={LocationIcon} />
                        <span
                          style={{
                            color: currentTheme?.mainPage.post.secondColorText,
                          }}
                        >
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CustomModalIcon id={item.id} />
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
                      <img src={LikePostIcon} />
                      <img src={SentIcon} />
                      <img
                        onClick={() => handleCommentClick(item.id)}
                        src={CommentPostIcon}
                      />
                    </div>
                  </nav>
                </footer>
              </div>
              <CommentBarComponents
                id={item.id}
                appearance={true}
                hiden={commentsHiden}
                commentDataRender={commentsData}
              />
            </div>
          );
        })}
    </div>
  );
};
