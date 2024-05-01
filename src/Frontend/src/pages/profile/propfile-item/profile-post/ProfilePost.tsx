import { FC } from "react";
import { profileItemData } from '../../profileData';
import { FeedPost } from "../../../../features/exportFeaturesComponents";
const ProfilePost: FC = () => {
    return (
        <>
            <FeedPost posts={profileItemData} />
        </>
    )
}

export default ProfilePost;