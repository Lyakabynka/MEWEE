import { FC } from "react";
import { FeedPost } from "./home-post/FeedPost";

export const HomeFeed: FC<{ posts: any }> = ({ posts }) => {
  return <FeedPost posts={posts} />;
};
