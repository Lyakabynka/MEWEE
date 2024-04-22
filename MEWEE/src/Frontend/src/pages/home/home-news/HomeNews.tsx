import { FC, useEffect } from "react";
import { usePostsStore } from "../../../entities";
import { Box, CircularProgress } from "@mui/material";
import News from "./news/News";

export const HomeNews: FC = () => {
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
      <News posts={data} />
    </div>
  );
};
