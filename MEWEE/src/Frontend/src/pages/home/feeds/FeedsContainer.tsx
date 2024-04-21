// Update the mapping function in the FeedsContainer component
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { usePostsStore } from "../../../entities";
import { FeedPost } from "./post/FeedPost";
import { postDataTypes } from "../home.interface";
import "./feeds_container.css";

export const FeedsContainer = () => {
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
    <div className="feeds-generic-container">
      <div className="feeds-main-content">
        {data &&
          data.map((post: postDataTypes) => (
            <FeedPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};
