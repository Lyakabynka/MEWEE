import { FC } from "react";
import { Grid } from "@mui/material";
import ProfileItem from "./propfile-item/ProfileItem";
import UserInfo from "./user-info/UserInfo";
import { profileItemData, userInfoData } from "./profileData";
import { prfileItemDataTypes, profileButtonsDataTypes, userInfoDataPropsTypes } from "./profileData.interface";
import { FeedPostItem } from "../../widgets/home-feeds/home-post/FeedPostItem";
import { postDataTypes } from "../post-show/dataPostShow.interface";
import { FeedPost } from "../../features/exportFeaturesComponents";

const Profile: FC = () => {
    return (
        <>
            <Grid style={{ marginTop: "8rem" }} container>
                <Grid md={4}>
                    <UserInfo userData={userInfoData} />
                </Grid>
                <Grid md={8}>
                    <ProfileItem />
                <FeedPost posts={profileItemData}></FeedPost>
                </Grid>
                
            </Grid>

        </>
    )
}

export default Profile;
