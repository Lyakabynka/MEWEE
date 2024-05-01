import { FC } from "react";
import { Grid } from "@mui/material";
import ProfileItem from "./propfile-item/ProfileItem";
import UserInfo from "./user-info/UserInfo";
import { userInfoData } from "./profileData";

const Profile: FC = () => {
  return (
    <>
      <Grid style={{ marginTop: "8rem" }} container>
        <Grid md={4}>
          <UserInfo userData={userInfoData} />
        </Grid>
        <Grid md={8}>
          <ProfileItem />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
