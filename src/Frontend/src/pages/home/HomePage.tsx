import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuthStore, usePostsStore, useSearchBar } from "../../entities";
import { HomeFeed } from "./../../widgets/home-feeds/HomeFeed";
import { HomeNews } from "./home-news/HomeNews";
import CreateChatTest from "../create-chat-test/CreateChatTest";
import { Navigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const { isLoggedIn, role } = useAuthStore();
  const { setTitle } = useSearchBar();
  const [posts, setPosts] = useState<any>(null);
  const [news, setNews] = useState<any>(null);
  if (!isLoggedIn)
    return <Navigate to='/auth/login' />

  const { findPosts } = usePostsStore();

  const onResponse = (data: any, errors: string[]) => {
    if (errors.length == 0 && data != null) {
      setPosts(data.filter((x: any) => x.type == "User"));
      setNews(data.filter((x: any) => x.type == "News"));
    }
  };

  useEffect(() => {
    setTitle('main');
    findPosts(onResponse, "", { page: 0, pageSize: 10 });
  }, []);
  return (
    <>

      {(posts && news) && (
        <Grid container direction="row">
          <Grid item sm={8}>
            <HomeFeed posts={posts} />
          </Grid>
          <Grid item sm={4}>
            <HomeNews posts={news} />
          </Grid>
        </Grid>
      )}
    </>
  );
};
