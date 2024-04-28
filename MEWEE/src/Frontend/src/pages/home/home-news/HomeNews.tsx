import { FC, useEffect } from "react";
import { useAuthStore, usePostsStore } from "../../../entities";
import { Box, CircularProgress } from "@mui/material";
import News from "./news/News";

export const HomeNews: FC = () => {
  const { getPosts } = usePostsStore();
  const {id} = useAuthStore();
  //console.log(id)
  let data = null;
  useEffect(() => {
    getPosts(onResponse, id); // Fetch posts when component mounts
  }, []);

  const onResponse = (errors: string[]) => {

    //console.log(errors);
  };
  return (
    <div className="home-news-generic-container">
      <News posts={data} />
    </div>
  );
};
