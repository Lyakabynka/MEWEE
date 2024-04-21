import { FC, useEffect } from "react";
import { usePostsStore, useThemeStore } from "../../../entities";
import { Box, CircularProgress } from "@mui/material";
import News from "./news/News";
import { modalPostDataLink } from "../dataHome";
import "./index.css";

export const HomeNews: FC = () => {
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
      <News posts={data} modalPostDataLinkProps={modalPostDataLink} />
    </div>
  );
};
