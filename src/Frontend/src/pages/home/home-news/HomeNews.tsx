import { FC, useEffect } from "react";
import { EnumPostType, useAuthStore, usePostsStore } from "../../../entities";
import { Box, CircularProgress, Grid } from "@mui/material";
import News from "./news/News";
import { FeedPost } from "../../../features/exportFeaturesComponents";

export const HomeNews: FC<{ posts: any }> = ({ posts }) => {
  return (
    <Grid item >
      <FeedPost type={EnumPostType.News} posts={posts} />
    </Grid>
  );
};
