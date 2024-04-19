import React, { useEffect } from "react";
import { usePostsStore, useThemeStore } from "../../../entities";
import { FeedPost } from "../feeds/components/post/FeedPost";
import { Box, CircularProgress } from "@mui/material";
import { modalPostDataLink } from "../data";
import "./index.css";
interface IPost {
  id: number;
  username: string;
  profileImageUrl: string;
  postDate: string;
  location: string;
  imageUrl: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  // Add content property if necessary
  content?: string;
}

export const HomeNews = () => {
  const { currentTheme } = useThemeStore();
  const { data, isLoading, errorMessage, getPosts } = usePostsStore();

  useEffect(() => {
    getPosts(); // Fetch posts when component mounts
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div
      className="home-news-generic-container"
      style={{ backgroundColor: currentTheme?.mainPage.post.background }}
    >
      {data &&
        data.map(
          (post: IPost) =>
            post.id == 14 && <FeedPost key={post.id} post={post} />
        )}
    </div>
  );
};
