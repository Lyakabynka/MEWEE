// Update the mapping function in the FeedsContainer component
import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { usePostsStore } from "../../../entities";
import { FeedPost } from "./components/post";
// Define the interface for a single post
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
          data.map((post: IPost) => <FeedPost key={post.id} post={post} />)}
      </div>
    </div>
  );
};
