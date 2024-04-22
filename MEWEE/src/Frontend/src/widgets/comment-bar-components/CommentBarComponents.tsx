import { FC } from "react";
import LikeComentIcon from "../../assets/image/icons/LikeComentIcon.svg";
import EmojiIcon from "../../assets/image/icons/EmojiIcon.svg";
import SentIcon from "../../assets/image/icons/SentIcon.svg";
import { CommentBarPropsTypes, commentDataTypes } from "../widget.interface";
import styles from "./comment_bar_components.module.scss";
const CommentBarComponents: FC<CommentBarPropsTypes> = ({
  id,
  hiden,
  appearance,
  commentDataRender,
}) => {
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
            commentDataRender.map((item: commentDataTypes) => {
              return (
                <div key={item.id} className={styles.comments_contetn}>
                  <img src={item.avatarIcon} />
                  <div>
                    <h5>{item.commentText}</h5>
                    <div>
                      <a href="#">
                        <p>Показати відповіді</p>
                      </a>
                      <a href="#">
                        <p>Відповісти</p>
                      </a>
                      <img src={LikeComentIcon} />
                    </div>
                  </div>
                </div>
              );
            })}

          <div className={styles.comments_add}>
            <button>Nick</button>
            <input type="text" placeholder="Lorem ipsum..." />
            <div>
              <img src={EmojiIcon} />
              <img src={SentIcon} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentBarComponents;
