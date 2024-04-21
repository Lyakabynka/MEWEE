import { FC } from "react";
import { CommentBarComponentsTypes } from "../data.interface";
import styles from "./comment_bar_components.module.scss";
const CommentBarComponents: FC<CommentBarComponentsTypes> = ({
  commentData,
  title,
  hiden,
  appearance,
}) => {
  return (
    <>
      <div
        className={
          appearance
            ? hiden
              ? styles.comments
              : `${styles.comments} ${styles._comments_visible}`
            : styles.comments_full
        }
      >
        <div className={styles.comments_contetn}>
          <img src="{CommentWriterAvatar}" />
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Quam maecenas mollis dui
              sociis ullamcorper. Rhoncus feugiat euismod consectetur quam
              pellentesque. Eget et scelerisque etiam aliquet maecenas nullam
              proin tortor. Lectus pulvinar placerat.
            </p>
            <div>
              <a href="#">Показати відповіді</a>
              <a href="#">Відповісти</a>
              <img src="{LikeComentIcon}" />
            </div>
          </div>
        </div>
        <div className={styles.comments_add}>
          <button>Nick</button>
          <input type="text" placeholder="Lorem ipsum..." />
          <div>
            <img src="{EmojiIcon}" />
            <img src="{SentIcon}" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentBarComponents;
