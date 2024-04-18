import React, { useEffect } from "react";
import "./index.css";
import { Box, CircularProgress } from "@mui/material";
import { NewsItem } from "./newsItem";
import { usePostsStore, useThemeStore } from "../../../../../../entities";

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

export const NewsWindow = () => {
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
    <div className="home-news-generic-container">
      {data &&
        data.map(
          (post: IPost) =>
            post.id == 32 && <NewsItem key={post.id} post={post} />
        )}
    </div>
  );
};
