import { FC, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { FeedPost } from "./home-post/FeedPost";
import { useAuthStore, usePostsStore } from "../../entities";
import PostShow from "../../pages/post-show/PostShow";

export const HomeFeed: FC = () => {
  const { id } = useAuthStore();
  const { posts, getPosts } = usePostsStore();

  const onResponse = (errors: string[]) => {


    //console.log(errors);
    if (errors.length == 0) 
    {
     // console.log("all good");
    }
    };

  useEffect(() => {
    getPosts(onResponse, id); // Fetch posts when component mounts

  }, []);

  // if (isLoading) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (errorMessage) {
  //   return <div>Error: {errorMessage}</div>;
  // }

  return <FeedPost posts={posts} />;
};
