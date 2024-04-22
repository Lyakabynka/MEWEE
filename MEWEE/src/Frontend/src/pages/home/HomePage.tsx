import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../entities";
import { HomeFeed } from "./home-feeds/HomeFeed";
import { HomeNews } from "./home-news/HomeNews";
import "./home_page.css";
export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { isLoggedIn, role } = useAuthStore();
  // if (!isLoggedIn)
  //     return <Navigate to='/auth/login' />

  return (
    <Grid container>
      <div className="home-generic-container">
        <div className="home-main-container">
          <div className="home-generic-content-holder">
            <Grid sm={8}>
              <HomeFeed />
            </Grid>
            <Grid sm={4}>
              <HomeNews />
            </Grid>
          </div>
        </div>
      </div>
    </Grid>
  );
};
