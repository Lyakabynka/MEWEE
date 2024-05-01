import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../../entities";
import CustomModalIcon from "../../../widgets/сommon/custom-modal-icon/CustomModalIcon";
import CommentPostIcon from "../../../assets/image/icons/CommentPostIcon.svg";
import CustomButton from "../../../widgets/сommon/custom-button/customButton";
import LocationIcon from "../../../assets/image/icons/LocationIcon.svg";
import LikePostIcon from "../../../assets/image/icons/LikePostIcon.svg";
import SentIcon from "../../../assets/image/icons/SentIcon.svg";
import { postDataProps } from "../dataPostShow.interface";
import styles from "./post.module.scss";
import CommentBarComponents from "../../../widgets/comment-bar-components/CommentBarComponents";
import { decryptImage } from "../../../entities/sharedStores/post-utils";
import { useCommentStore } from "../../../entities/sharedStores/useCommentStore";
import { modalPostDataLink } from "../../../widgets/widgetData";
const Post: FC<postDataProps> = ({ dataObject }) => {
  const [commentsHiden, setCommentsHiden] = useState<string | null>(null);
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);
  // const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();
  const { currentTheme } = useThemeStore();
  const { getComments } = useCommentStore();
  const [comments, setComments] = useState<any>(null);
  const isImage = (url: string) => {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
  };

  const isVideo = (url: string) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };
  const onResponse = (data: any, errors: string[]) => {
    console.log(errors);
    if (errors.length == 0) {
      console.log("all good");
      setComments(data);
    }
  };
  useEffect(() => {
    getComments(onResponse, dataObject.id, 1, 0);
    const at = dataObject.attachment ?? "";
    if (at != "")
      decryptImage(at)
        .then((decryptedData) => {
          setImageSrc(decryptedData);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

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
  const handleCommentClick = (postId: string) => {
    setCommentsHiden(commentsHiden === postId ? null : postId);
  };
  const onUpdated = () => {
    getComments(onResponse, dataObject.id, 1, 0);
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
                {dataObject.createdAt}
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
          <CustomModalIcon id={0} links={modalPostDataLink} />
        </header>
        <main className={styles.main}>
          {dataObject.attachment ? (
            <div>
              <img src={imageSrc} alt="Post Image" />
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
              <img
                onClick={() => handleCommentClick(dataObject.id)}
                src={CommentPostIcon}
              />
              <span>({comments ? (comments.length > 0 ? comments.length-1 : 0) : 0})</span>
            </div>
          </nav>
        </footer>
      </div>
      <CommentBarComponents
        id={dataObject.id}
        appearance={true}
        hiden={commentsHiden}
        commentDataRender={comments}
        onUpdated={onUpdated}
      />
    </div>
  );
};
export default Post;
