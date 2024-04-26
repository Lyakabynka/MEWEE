import { FC, useState, useEffect, useRef } from "react";
import styles from "./feed_post.module.scss";
import { FeedPostItem } from "./FeedPostItem";
import { postDataTypes } from "../../../pages/post-show/dataPostShow.interface";
import { FeedPostPropsTypes } from "../../../pages/home/home.interface";

export const FeedPost: FC<FeedPostPropsTypes> = ({ posts }) => {
  
console.log("POSTS:", posts);

  // const fio = username?.split(' ');
  return (
    <div>
      {posts &&
        posts.map((item: postDataTypes) => {
          return <FeedPostItem item={item}></FeedPostItem>
        })}
    </div>
  );
};
