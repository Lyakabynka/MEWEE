import { FC, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as LocationIcon } from "../../../assets/image/icons/LocationIcon.svg";
import { ReactComponent as LikePostIcon } from "../../../assets/image/icons/LikePostIcon.svg";
import FriendsHomeModalIcon from "../../../assets/image/icons/FriendsHomeModalIcon.svg";
import SaveHomeModalSvg from "../../../assets/image/icons/SaveHomeModalIcon.svg";
import { ReactComponent as SaveHomeModalIcon } from "../../../assets/image/icons/SaveHomeModalIcon.svg";
import EyeHomeModalIcon from "../../../assets/image/icons/EyeHomeModalIcon.svg";
import { ReactComponent as SentIcon } from "../../../assets/image/icons/SentIcon.svg";
import { ReactComponent as CommentPostIcon } from "../../../assets/image/icons/CommentPostIcon.svg";
import styles from "./feed_post_item.module.scss";
import { EnumPostType, useAuthStore, useChatStore, useGroupsStore, usePostsStore, useSignalRStore, useThemeStore, useUserStore } from "../../../entities";
import CustomModalIcon from "../../сommon/custom-modal-icon/CustomModalIcon";
import CommentBarComponents from "../../comment-bar-components/CommentBarComponents";
import { useCommentStore } from "../../../entities/sharedStores/useCommentStore";
import { postDataTypes } from "../../../pages/post-show/dataPostShow.interface";
import { decryptImage } from "../../../entities/sharedStores/post-utils";
import CustomButton from "../../сommon/custom-button/customButton";
import { modalPostDataLinkTypes } from "../../widget.interface";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import DecryptedImg from "../../../pages/profile/DecryptedImg";

export const FeedPostItem: FC<{ item: postDataTypes, appearance?: boolean, type?: EnumPostType }> = ({ item, appearance = true, type = EnumPostType.Feeds }) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [commentsHiden, setCommentsHiden] = useState<string | null>(null);
  const { id } = useAuthStore();
  const { sendMessageToUser } = useSignalRStore();
  const [saved, setSaved] = useState<boolean>(false);
  const [author, setAuthor] = useState<any>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string>();
  const [avatar, setAvatar] = useState<any>(null);
  const showButton = type == EnumPostType.News ? true : item && item.content && item.content.length > 90;
  const { isUserStoreLoading, getProfile, followUser, getFriends } = useUserStore();
  const { getGroup } = useGroupsStore();
  const { currentTheme } = useThemeStore();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { isLoading, likePost, unLikePost, savePost,getPostLikes, getSavePost } = usePostsStore();
  const { getComments } = useCommentStore();
  const [comments, setComments] = useState<any>(null);
  const [friends, setFriends] = useState<any>(null);
  const [showForwardTo, setShowForwardTo] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showFullContent, setShowFullContent] = useState(false);



  const handleClickShow = () => {
    setShowFullContent(!showFullContent);
  };
  function formatTime(dateString: string) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }
  const [modalPostDataLink, setModalPostDataLink] = useState<modalPostDataLinkTypes[]>([
    {
      id: 1,
      url: "#",
      onClick: () => navigate('/profile/' + author.username),
      icons: FriendsHomeModalIcon,
      text: "modal_home_link1",
    },
    {
      id: 2,
      url: "#",
      onClick: () => { savePost(onPostSaveResponse, item.id); },
      icons: SaveHomeModalSvg,
      customSymbols: "",
      text: "save",
    },
    {
      id: 3,
      url: "#",
      onClick: () => { setHidden(true); },
      icons: EyeHomeModalIcon,
      text: "modal_home_link3",
    },
  ]);

  const onGetPostLikesResponse = (data: any, errors: string[]) => {

    if (errors.length == 0 && data !== null) {
      const result = data.filter((x: { postId: string }) => x.postId === item.id);

      setIsLiked(result.length > 0);
    }
  };

  const onResponse = (data: any, errors: string[]) => {

    if (errors.length == 0) {
      setComments(data);
      if (!appearance)
        handleCommentClick(item.id)
    }
  }
  const onPostSaveResponse = (data: boolean, errors: string[]) => {

    if (errors.length == 0) {
      setSaved(data);
      refreshSavedStatus(data);
    }
    else console.log("Error occured during onPostSaveResponse (FeedPostItem)");
  }
  const onPostGetSaveResponse = (data: boolean, errors: string[]) => {

    if (errors.length == 0) {
      setSaved(data);
      refreshSavedStatus(data);
    }
    else console.log("Error occured during onPostGetSaveResponse (FeedPostItem)");
  }
  const refreshSavedStatus = (status: boolean) => {
    const index = modalPostDataLink.findIndex(item => item.text === "save");

    if (index !== -1) {
      const updatedDataLink = [...modalPostDataLink];
      updatedDataLink[index] = { ...updatedDataLink[index], text: status ? "saved" : "save", customSymbols: status ? "☑️" : "" };
      setModalPostDataLink(updatedDataLink);
    }
  }
  const onProfileResponse = (data: any, errors: string[]) => {

    if (errors.length == 0 && data !== null) {
      setAuthor(data);
      console.log("now me:", data);
      modalPostDataLink[0].onClick = () => navigate('/profile/' + data.username),
        data.avatar && decryptImage(data.avatar).then(setAvatar).catch(console.error);
    }
  };
  const onGroupResponse = (data: any, errors: string[]) => {

    if (errors.length == 0 && data !== null) {
      setAuthor(data.group);
      console.log(data);

      modalPostDataLink[0].onClick = () => navigate('/group/' + data.group.nickname),
        data.group.avatar && decryptImage(data.group.avatar).then(setAvatar).catch(console.error);
    }
  };
  const onGetFriendsResponse = (data: any, errors: string[]) => {

    if (errors.length == 0 && data !== null) {
      setFriends(data);

    }
  };


  const onLikePostResponse = (errors: string[]) => {

    if (errors.length == 0) {
      getPostLikes(onGetPostLikesResponse, item.id);
    }
  };

  const handleLikePost = () => {

    item.likesCount += !isLiked ? 1 : -1;

    (!isLiked) ? likePost(onLikePostResponse, item.id) : unLikePost(onLikePostResponse, item.id)

  };


  const updatePost = () => {
    console.log(item);
    getComments(onResponse, item.id, 1, 0);
    getPostLikes(onGetPostLikesResponse, item.id);

    if (item.category.indexOf("User") !== -1)
      getProfile(onProfileResponse, item.authorId);
    else if (item.category.indexOf("Group") !== -1)
      getGroup(onGroupResponse, item.authorId);
    getSavePost(onPostGetSaveResponse, item.id);
    item.attachment && decryptImage(item.attachment).then(setImageSrc).catch(console.error);

  }
  const handleCommentClick = (postId: string) => {
    setCommentsHiden(commentsHiden === postId ? null : postId);
  };
  const onCommentsUpdated = () => {
    getComments(onResponse, item.id, 1, 0);
  }
  useEffect(() => {

    updatePost();

  }, []);

  const handleForwardMessage = () => {

    setShowForwardTo(!showForwardTo);
    getFriends(onGetFriendsResponse, id??"");
  }
  const handleForwardMessageToUser = (userId: string) =>
    {
      setIsProcessing(true);
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  
      sendMessageToUser(userId, 'postId:'+item.id, formattedDate);
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }

  // Check if currentTheme exists before accessing custom values
  const CustomBox = currentTheme?.components?.MuiIcon;
  // const fio = username?.split(' ');
  return (
    <>
      {!hidden && (
        <div className={styles.div} style={{ flexDirection: appearance ? 'column' : 'row' }} >

          <div
            className={commentsHiden === null ? styles.sub_div : `${styles.sub_div} ${styles._sub_div_box_shadow}`}
            style={{ width: appearance ? '100%' : '60%' }}
          >
            {type === EnumPostType.News && <span>{item.title}</span>}
            {type !== EnumPostType.News && (
              <header>
                <div className={styles.header_div}>
                  <div>
                    <img src={avatar === "" ? "" : avatar} />
                  </div>
                  <div>
                    <span>{author !== null ? (author.firstName ?? author.title) : ""}</span>
                    <span className={styles.span_date}>{formatTime(item.createdAt)}</span>
                    <div>
                      <LocationIcon />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
                <div style={{padding: "1.5rem 0.3rem"}}>
                  <CustomModalIcon id={0} links={modalPostDataLink} />
                </div>

              </header>
            )}
            <main className={styles.main}>
              {item.attachment && (
                <div>
                  <div>
                    <div style={{ backgroundImage: `url(${imageSrc})` }}></div>
                    <img src={imageSrc} alt="Post Image" />
                  </div>
                </div>
              )}
            </main>
            <footer className={styles.footer}>
              {showForwardTo && (
                <div style={{display:'flex'}}>
                  <div className={styles.forwardToContainer}>
                    {isUserStoreLoading && <CircularProgress></CircularProgress>}
                    {friends && friends.map((item: any) => {

                      return (
                        <>
                        <div onClick={() => {handleForwardMessageToUser(item.id)}}>
                          <DecryptedImg  content={item.avatar}></DecryptedImg>
                          <span>{item.username}</span>
                        </div>
                        </>
                      );
                    }
                  )}

                  </div>
                  {isProcessing && <CircularProgress size={"1rem"}></CircularProgress>}
                </div>
              )}
              {type === EnumPostType.Feeds && <span>{item.title}</span>}
              <div>{showFullContent ? (item?.content || '') : (item?.content?.slice(0, 90) || '')}</div>
              <nav className={styles.nav} style={!showButton ? { justifyContent: 'flex-end' } : {}}>
                {showButton && (
                  <CustomButton text={showFullContent ? t("less") : t("more")} onClick={handleClickShow} />
                )}
                <div>
                  <div>
                    {type !== EnumPostType.News && (
                      <div>
                        <LikePostIcon onClick={handleLikePost}
                          style={{
                            color: isLiked ? currentTheme?.mainPage.post.secondActiveIcon
                              :
                              currentTheme?.mainPage.post.secondIcon
                          }} />
                        {!isLoading && <span>{item.likesCount}</span>}
                      </div>
                    )}
                    {type === EnumPostType.News && (
                      <div>
                        <SaveHomeModalIcon onClick={handleLikePost}
                          style={{
                            color: isLiked ? currentTheme?.mainPage.post.secondActiveIcon
                              :
                              currentTheme?.mainPage.post.secondIcon
                          }} />
                      </div>
                    )}

                    <div>
                      <SentIcon
                        onClick={handleForwardMessage}
                        style={{ color: currentTheme?.mainPage.post.secondIcon }} />
                    </div>
                    {type !== EnumPostType.News &&
                      <div>
                        <CommentPostIcon onClick={() => handleCommentClick(item.id)}
                          style={{
                            color: commentsHiden ? currentTheme?.mainPage.post.secondActiveIcon
                              :
                              currentTheme?.mainPage.post.secondIcon
                          }}
                        />
                        <span>{comments ? (comments.length > 0 ? comments.length : 0) : 0}</span>
                      </div>
                    }
                  </div>
                </div>
              </nav>
            </footer>
          </div>
          <CommentBarComponents
            id={item.id}
            appearance={appearance}
            hiden={commentsHiden}
            commentDataRender={comments}
            onUpdated={onCommentsUpdated}
          />
        </div>
      )}
    </>
  );
};