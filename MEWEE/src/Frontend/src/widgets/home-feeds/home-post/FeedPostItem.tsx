import { FC, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import LocationIcon from "../../../assets/image/icons/LocationIcon.svg";
import LikePostIcon from "../../../assets/image/icons/LikePostIcon.svg";
import SentIcon from "../../../assets/image/icons/SentIcon.svg";
import CommentPostIcon from "../../../assets/image/icons/CommentPostIcon.svg";
import styles from "./feed_post_item.module.scss";
import { usePostsStore, useThemeStore } from "../../../entities";
import CustomModalIcon from "../../сommon/custom-modal-icon/CustomModalIcon";
import CommentBarComponents from "../../comment-bar-components/CommentBarComponents";
import { useCommentStore } from "../../../entities/sharedStores/useCommentStore";
import { postDataTypes } from "../../../pages/post-show/dataPostShow.interface";
import { decryptImage } from "../../../entities/sharedStores/post-utils";
import CustomButton from "../../сommon/custom-button/customButton";

export const FeedPostItem: FC<{item: postDataTypes}> = ({ item }) => {
  const [commentsHiden, setCommentsHiden] = useState<string | null>(null);
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);
  // const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();
  const { currentTheme } = useThemeStore();
  const { likePost } = usePostsStore();
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
      if (errors.length == 0) 
        {
            console.log("all good");
      setComments(data);

}
  };
const onResponseL = (errors: string[]) => {
      
  console.log(errors);
  if (errors.length == 0) 
    {
        console.log("like-post good");
  
}};
  
  useEffect(() => {
    getComments(onResponse, item.id,1,0);
    const at = item.attachment ?? "";
    if(at != "")
  decryptImage(at)
    .then(decryptedData => {
      setImageSrc(decryptedData);
    })
    .catch(error => {
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
  const onUpdated = () =>
    {
        getComments(onResponse, item.id,1,0);
    }
  // Check if currentTheme exists before accessing custom values
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
                  <CustomModalIcon id={0} />
                </header>
                <main className={styles.main}>
                  {item.attachment ? (
                    <div>
                      <img src={imageSrc} alt="Post Image" />
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
                      <img onClick={() => likePost(onResponseL, item.id)} src={LikePostIcon} />
                      <span>{item.likesCount}</span>
                      <img src={SentIcon} />
                      <img
                        onClick={() => handleCommentClick(item.id)}
                        src={CommentPostIcon}
                      />
                      <span>({comments ? comments.length : 0})</span>
                    </div>
                  </nav>
                </footer>
              </div>
              <CommentBarComponents
                id={item.id}
                appearance={true}
                hiden={commentsHiden}
                commentDataRender={comments}
                onUpdated={onUpdated}
              />
            </div>
  );
};
