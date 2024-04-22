import { FC, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { usePostsStore } from "../../../entities";
import { FeedPost } from "./home-post/FeedPost";

export const HomeFeed: FC = () => {
  const { data, isLoading, errorMessage, getPosts } = usePostsStore();

  useEffect(() => {
    getPosts(); // Fetch posts when component mounts
  }, []);

  console.log("DADA GOGOGOGOGOGO", data);

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

  return <FeedPost posts={data} />;
};
