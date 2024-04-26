import { FC, useEffect, useState } from "react";
import LikeComentIcon from "../../assets/image/icons/LikeComentIcon.svg";
import { CommentBarPropsTypes, commentDataTypes } from "../widget.interface";
import CustomInput from "../сommon/custom-input/CustomInput";
import styles from "./comment_bar_components.module.scss"
import { useAuthStore } from "../../entities";

const CommentBarItem: FC<{ parent: any, item: any, replies: any, onReply: (id: string, user: any) => void }> = ({ parent, item, replies, onReply }) => {

    const { getProfile } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);
    const [author, setAuthor] = useState<any>(null);
    const [isRepliesHidden, setIsRepliesHidden] = useState(true); // Initially hidden

    useEffect(() => {
        getProfile(onResponse, item.userId);
    }, []);

    const onResponse = (data: any, errors: string[]) => {
        if (errors.length === 0 && data != null) {
            setAuthor(data);
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
      

    return (
        <>
            {!isLoading && (
                <div key={item.id} className={styles.comments_content}>
                    <span>{author.username}{parent && <span style={{color:"orange"}}>replied to {parent.content}</span>}</span>
                    <img src={item.avatarIcon} />
                    <div>
                        <h5>{item.content}</h5>
                        <div>
                            <a onClick={toggleRepliesVisibility}>
                                <p>{isRepliesHidden ? `Показати відповіді (${replies.length})` : 'Сховати відповіді'}</p>
                            </a>
                            <a onClick={() => onReply(item.id, author)}>
                                <p>Відповісти</p>
                            </a>
                            <img src={LikeComentIcon} />
                        </div>
                    </div>
                </div>
            )}

            {!isRepliesHidden && replies &&
            
                replies.map((reply: commentDataTypes) => (
                    reply.replyCommentId === item.id && (
                    <CommentBarItem parent={item} key={reply.id} item={reply} onReply={onReply} replies={handleGetReplies(reply.id)} />
                )))
            }
        </>
    );
}

export default CommentBarItem;
