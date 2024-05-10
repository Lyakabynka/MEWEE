import { FC, useState } from "react";
import { CommentBarPropsTypes, commentDataTypes } from "../widget.interface";
import CustomInput from "../сommon/custom-input/CustomInput";
import styles from "./comment_bar_components.module.scss";
import CommentBarItem from "./CommentBarItem";
import { ReactComponent as CloseIcon } from "../../assets/image/icons/CloseIcon.svg";
import CloseIcon2 from "../../assets/image/icons/CloseIcon.svg";
import { useCommentStore } from "../../entities/sharedStores/useCommentStore";
import { EMPTY_GUID } from "../../shared/exportSharedMorules";
import { useTranslation } from "react-i18next";

const CommentBarComponents: FC<CommentBarPropsTypes> = ({
  id,
  hiden,
  appearance,
  commentDataRender,
  onUpdated,
}) => {
  const {t} = useTranslation(); 
  const [replyTo, setReplyTo] = useState<any>(null);
  const [replyToId, setReplyToId] = useState<string>("");
  const { createComment } = useCommentStore();

  const handleGetReplies = (replyCommentId: string) => {
    if (!commentDataRender || !Array.isArray(commentDataRender)) {
      return [];
    }

    const findReplies = (parentId: string): commentDataTypes[] => {
      const replies: commentDataTypes[] = [];
      for (const comment of commentDataRender) {
        if (comment.replyCommentId === parentId) {
          replies.push(comment);
          const nestedReplies = findReplies(comment.id);
          replies.push(...nestedReplies);
        }
      }
      return replies;
    };

    return findReplies(replyCommentId);
  };
  const resetReplyTo = () => {
    setReplyTo(null);
    setReplyToId(EMPTY_GUID);
  };

  const handleSubmit = (input: string) => {
    resetReplyTo();
    const replyId = replyToId ?? "00000000-0000-0000-0000-000000000000";
    createComment(onResponse, id ?? "", replyId, input);
  };

  const handleOnReply = (id: string, user: any) => {
    setReplyTo(user);
    setReplyToId(id);
    console.log(user);
  };

  const onResponse = (errors: string[]) => {
    if (errors.length === 0) {
      onUpdated();
    }
    console.log(errors);
  };

  return (
    <>
      {hiden === id && (
        <div
          className={
            appearance
              ? hiden == null
                ? styles.comments
                : `${styles.comments} ${styles._comments_visible}`
              : styles.comments_full
          }
        >
          {commentDataRender &&
            commentDataRender.map(
              (item: commentDataTypes) =>
                item.replyCommentId === EMPTY_GUID && (
                  <CommentBarItem
                    parent={null}
                    key={item.id}
                    item={item}
                    onReply={handleOnReply}
                    replies={handleGetReplies(item.id)}
                  />
                )
            )}
          {replyTo !== null && (
            <div className={styles.reply}>
              <span>{t("replying_to")}</span>
              <span style={{color:'gray'}}>{replyTo.username}</span>
              <div>
                <CloseIcon onClick={resetReplyTo} />
              </div>
            </div>
          )}
          <CustomInput
            inputTypes="commentBar"
            onSubmit={handleSubmit}
            placeHolder="Lorem ipsum..."
          />

        </div>
      )}
    </>
  );
};

export default CommentBarComponents;
