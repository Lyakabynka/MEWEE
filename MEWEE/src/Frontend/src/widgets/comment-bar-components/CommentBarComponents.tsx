import { FC, useState } from "react";
import { CommentBarPropsTypes, commentDataTypes } from "../widget.interface";
import CustomInput from "../сommon/custom-input/CustomInput";
import styles from "./comment_bar_components.module.scss";
import CommentBarItem from "./CommentBarItem";
import { useCommentStore } from "../../entities/sharedStores/useCommentStore";
import { EMPTY_GUID } from "../../shared/exportSharedMorules";

const CommentBarComponents: FC<CommentBarPropsTypes> = ({
  id,
  hiden,
  appearance,
  commentDataRender,
  onUpdated
}) => {
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
  
  
  const handleSubmit = (input: string) => {
    const replyId = replyToId ?? "00000000-0000-0000-0000-000000000000";
    console.log(id ?? "", replyId, input);
    createComment(onResponse, id ?? "", replyId, input);
  };

  const handleOnReply = (id: string, user: any) => {
    setReplyTo(user);
    setReplyToId(id);
    console.log(user);
  };

  const onResponse = (errors: string[]) => {
    if(errors.length === 0) {
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
            commentDataRender.map((item: commentDataTypes) => 
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
            <div>
              <span>Replying to... {replyTo.username}</span>
              <button onClick={()=>{setReplyTo(null); setReplyToId(EMPTY_GUID)}}>x</button>
            </div>
          )}
          <CustomInput onSubmit={handleSubmit} />
        </div>
      )}
    </>
  );
};

export default CommentBarComponents;
