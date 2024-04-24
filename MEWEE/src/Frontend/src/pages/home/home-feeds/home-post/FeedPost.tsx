import { FC, useState, useEffect, useRef } from "react";
import styles from "./feed_post.module.scss";
import { decryptImage } from "../../../../entities/sharedStores/post-utils";
import { FeedPostItem } from "./FeedPostItem";
import { FeedPostPropsTypes } from "../../home.interface";
import { postDataTypes } from "../../../post-show/dataPostShow.interface";

export const FeedPost: FC<FeedPostPropsTypes> = ({ posts }) => {
  


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
