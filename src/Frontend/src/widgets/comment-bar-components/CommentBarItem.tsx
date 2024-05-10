import { FC, useEffect, useState } from "react";
import LikeComentIcon from "../../assets/image/icons/LikeComentIcon.svg";
import { CommentBarPropsTypes, commentDataTypes } from "../widget.interface";
import CustomInput from "../сommon/custom-input/CustomInput";
import styles from "./comment_bar_item.module.scss";
import { useAuthStore, useUserStore } from "../../entities";
import { decryptImage } from "../../entities/sharedStores/post-utils";
import { useTranslation } from "react-i18next";

const CommentBarItem: FC<{
  parent: any;
  item: any;
  replies: any;
  onReply: (id: string, user: any) => void;
}> = ({ parent, item, replies, onReply }) => {
  const { t } = useTranslation();
  const { getProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState<any>(null);
  const [avatar, setAvatar] = useState<any>(null);

  const [isRepliesHidden, setIsRepliesHidden] = useState(true); // Initially hidden

  useEffect(() => {
    getProfile(onResponse, item.userId);
  }, []);

  const onResponse = (data: any, errors: string[]) => {
    if (errors.length === 0 && data != null) {
      setAuthor(data);
      handleAvatarDecrypt(data);
      setIsLoading(false);
    }
  };

  const toggleRepliesVisibility = () => {
    setIsRepliesHidden(!isRepliesHidden);
  };

  const handleGetReplies = (replyCommentId: string) => {
    if (!replies || !Array.isArray(replies)) {
      return []; // Return an empty array if replies is not an array or undefined/null
    }

    // Recursive function to find all replies connected to the comment
    const findReplies = (commentId: string): commentDataTypes[] => {
      const result: commentDataTypes[] = [];
      for (const reply of replies) {
        if (reply.replyCommentId === commentId) {
          result.push(reply);
          // Recursively find replies of the current reply
          result.push(...findReplies(reply.id));
        }
      }
      return result;
    };

    // Start the deep search from the specified commentId
    return findReplies(replyCommentId);
  };

  const handleAvatarDecrypt = (data: any) => {
    if (data !== null) {
      const at = data.avatar ?? "";
      if (at != "")
        decryptImage(at)
          .then((decryptedData) => {
            setAvatar(decryptedData);
          })
          .catch((error) => {
            console.error(error);
          });
    }
  };

  return (
    <section>
      {!isLoading && (
        <div key={item.id} className={styles.comments_content}>
          <header>
            <img src={avatar === "" ? "" : avatar} />
          </header>
          <main>
            <span>
              {author.username}
              {parent && <span>replied to "{parent.content}"</span>}
            </span>
            <div>
              <span>{item.content}</span>
              <div>
                <a onClick={toggleRepliesVisibility}>
                  <p>
                    {isRepliesHidden
                      ? `${t("view_replies")} (${replies.length})`
                      : t("hide_replies")}
                  </p>
                </a>
                <a
                  className={styles.answer}
                  onClick={() => onReply(item.id, author)}
                >
                  <p>{t("reply")}</p>
                </a>
                <img src={LikeComentIcon} />
              </div>
            </div>
          </main>
        </div>
      )}
      <footer>
        {!isRepliesHidden &&
          replies &&
          replies.map(
            (reply: commentDataTypes) =>
              reply.replyCommentId === item.id && (
                <CommentBarItem
                  parent={item}
                  key={reply.id}
                  item={reply}
                  onReply={onReply}
                  replies={handleGetReplies(reply.id)}
                />
              )
          )}
      </footer>
    </section>
  );
};

export default CommentBarItem;
