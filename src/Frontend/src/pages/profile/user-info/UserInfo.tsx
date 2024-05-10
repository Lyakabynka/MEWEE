import { FC, useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import ProfileLockal from "../../../assets/image/icons/ProfileLockal.svg";
import { ReactComponent as ProfileAdd } from "../../../assets/image/icons/ProfileAdd.svg";
import ProfilePortfolio from "../../../assets/image/icons/ProfilePortfolio.svg";
import { ReactComponent as CommentPostIcon } from "../../../assets/image/icons/CommentPostIcon.svg";
import ProfileLovely from "../../../assets/image/icons/ProfileLovely.svg";
import ProfileFlash from "../../../assets/image/icons/ProfileFlash.svg";
import { decryptImage, encryptImage } from "../../../entities/sharedStores/post-utils";
import styles from "./user_info.module.scss";
import { EnumProfileType, useAuthStore, useChatStore, useGroupsStore, useUserStore } from "../../../entities";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DecryptedImg from "../DecryptedImg";
const UserInfo: FC<{
    userData: any,
    gallery: any,
    profileType: EnumProfileType,

    onFollow: () => void,
    onPhotoUploaded: () => void
}> = ({
          userData,
          gallery,
          profileType,
          onFollow,
          onPhotoUploaded }) => {
    const { id } = useAuthStore();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { createChat } = useChatStore();
    const { followUser, unfollowUser, getFollowers, getFollowings, uploadPhotoToProfile, getProfileGallery } = useUserStore();
    const [avatar, setAvatar] = useState<any>(null);
    const { joinUnJoinGroup } = useGroupsStore();
    const [followingStatus, setFollowingStatus] = useState<string>("follow");
    const [groupFollowingStatus, setGroupFollowingStatus] = useState<string>("follow");
    const [followers, setFollowers] = useState<any>(null);
    const [followings, setFollowings] = useState<any>(null);

    const onFollowResponse = (errors: string[]) => {
        if (errors.length == 0) {
            refreshFollows();

        }
    };
    const onJoinGroupResponse = (data: any, errors: string[]) => {
        if (errors.length == 0 && data != null) {
            console.log("joined",data);
            setGroupFollowingStatus(data.Joined ? "unfollow" : "follow");
            onFollow();
        }
    };
    const followersCount = userData.followersCount ?? followers.length;


    const handleFolow = (userId: string) => {

        if (followingStatus == "follow" || followingStatus == "follow_back")

            followUser(onFollowResponse, userId);
        else if (followingStatus == "unfollow" || followingStatus == "friends")
            unfollowUser(onFollowResponse, userId);
    }

    const handleJoinGroup = (groupId: string) => {

        if (groupFollowingStatus == "follow")
            joinUnJoinGroup(onJoinGroupResponse, groupId, true);
        else if (groupFollowingStatus == "unfollow")
            joinUnJoinGroup(onJoinGroupResponse, groupId, false);
    }


    const onFollowersResponse = (data: any, errors: string[]) => {
        if (errors.length == 0 && data !== null) {
            setFollowers(data);
        }
    };
    const onFollowingsResponse = (data: any, errors: string[]) => {
        if (errors.length == 0 && data !== null) {
            setFollowings(data);
        }
    };

    const setStatus = (_followers: any, _followings: any) => {
        const follower = _followers.find((item: any) => item.id === id);
        const following = _followings.find((item: any) => item.id === id);

        if (follower != null && following != null) {
            // If the user is following and being followed back
            setFollowingStatus("friends");
        } else if (following != null && follower == null) {
            // If the user is being followed but not following back
            setFollowingStatus("follow_back");
        } else if (follower != null) {
            // If the user is not being followed but following back
            setFollowingStatus("unfollow");
        } else {
            // If the user is not being followed at all
            setFollowingStatus("follow");
        }
    }
    const refreshFollows = () => {

        if (profileType == EnumProfileType.User) {
            getFollowers(onFollowersResponse, userData.id);
            getFollowings(onFollowingsResponse, userData.id);
        } else if (profileType == EnumProfileType.Group) {
            setFollowers([]);
            setFollowings([]);
            setGroupFollowingStatus((userData.members.find((x:any)=>x.id == id) == null)?"follow":"unfollow");
        }
    }
    const onChatCreatedResponse = (errors: string[]) => {
        if (errors.length === 0) {
            console.log("chat created");
            navigate('/chat');
        }
    };
    const handleMessageUser = () => {
        createChat(onChatCreatedResponse, userData.id);
    }
    const handleAddPhoto = async () => {
        const input = document.createElement('input');
        input.type = 'file';

        input.accept = 'image/*';

        input.addEventListener('change', async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                try {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        if (e.target && e.target.result) {
                            const imageDataUrl = e.target.result as string;
                            const encryptedData = await encryptImage(imageDataUrl);
                            uploadPhotoToProfile((errors: any) => {

                                if (errors.length == 0) {
                                    onPhotoUploaded();
                                } else console.error(errors);
                            }, encryptedData);
                        }
                    };
                    reader.readAsDataURL(file);
                } catch (error) {
                    console.error('Error handling image:', error);
                }
            }
        });

        input.click();
    };


    useEffect(() => {


        userData.avatar &&
        decryptImage(userData.avatar).then(setAvatar).catch(console.error);

        refreshFollows();
        console.log("refresh")
    }, [userData]);
    useEffect(() => {

        if (followers == null || followings == null)
            return;

        setStatus(followers, followings);
    }, [followers]);

    const [showAll, setShowAll] = useState(false);

    const visibleGallery = showAll ? (gallery || []) : (gallery ? gallery.slice(0, 4) : []);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <>
            {(userData && followers && followings) && (
                <div className={styles.div}>
                    <div className={styles.sub_div1}>
                        <img className={styles.avatar} src={avatar} />
                        <div className={styles.user_name}>
                            {profileType === EnumProfileType.User && (
                                <div>
                                    <h1>{userData.firstName}</h1>
                                    <h1>{userData.secondName}</h1>
                                    <br></br>
                                    <h1 style={{color:'gray'}}>@{userData.username}</h1>
                                </div>

                            )}
                            {profileType === EnumProfileType.Group && (
                                <div>
                                    <h1>{userData.title}</h1>
                                </div>
                            )}
                            <div>
                                {(userData.location !== null && profileType === EnumProfileType.User) && (
                                    <>
                                        <img src={ProfileLockal} />
                                        <h4>{userData.location}</h4>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.folowers}>
                            <div>
                                <h2>{followersCount}</h2>
                                <h3>Підписників</h3>
                            </div>
                            {profileType === EnumProfileType.User && (
                                <div>
                                    <h2>{followings.length}</h2>
                                    <h3>Відстежується</h3>
                                </div>
                            )}
                        </div>
                        <div className={styles.folow_button}>
                            {profileType === EnumProfileType.Group && (
                                <button onClick={() => handleJoinGroup(userData.id)}>{t(groupFollowingStatus)}</button>
                            )}
                            {profileType === EnumProfileType.User && (
                                <>
                                    {(userData.id !== id) && (
                                        <>
                                            <button onClick={() => handleFolow(userData.id)}>{t(followingStatus)}</button>
                                            <div><CommentPostIcon onClick={handleMessageUser}/></div>
                                        </>
                                    )}
                                    {(userData.id === id) && (
                                        <div><ProfileAdd onClick={handleAddPhoto}/></div>
                                    )}
                                </>
                            )}
                            {/* {isLoading && <CircularProgress size={"1rem"}></CircularProgress>} */}
                        </div>
                    </div>
                    <div className={styles.sub_div2}>
                        <ul>
                            <>
                                {userData.workplace && (
                                    <li key={"ProfilePortfolio"}>
                                        <img src={ProfilePortfolio} />
                                        <h5>{userData.workplace}</h5>
                                    </li>
                                )}
                                {userData.status && (
                                    <li key={"ProfileLovely"}>
                                        <img src={ProfileLovely} />
                                        <h5>{userData.status}</h5>
                                    </li>
                                )}
                                {userData.website && (
                                    <li key={"ProfileFlash"}>
                                        <img src={ProfileFlash} />
                                        <h5>{userData.website}</h5>
                                    </li>
                                )}
                            </>
                        </ul>
                    </div>
                    <div>{/* JUST DO IT */}</div>
                    {profileType === EnumProfileType.User && (
                        <div className={styles.gallery}>
                            <h2>{t('photo')}</h2>
                            <Grid container>
                                {visibleGallery.map((item: any, index: number) => (
                                    <Grid item md={6} key={index} className={styles.gallery_img}>
                                        <DecryptedImg content={item.content} className={styles.gallery_image} />
                                    </Grid>
                                ))}
                                {!showAll && gallery && gallery.length > 4 && (
                                    <button onClick={toggleShowAll} className={styles.gallery_button}>
                                        {t('show_all')}
                                    </button>
                                )}
                                {showAll && (
                                    <button onClick={toggleShowAll} className={styles.gallery_button}>
                                        {t('hide')}
                                    </button>
                                )}
                            </Grid>
                            {userData.PhotoCount > 0 && (
                                <div>
                                    <h5>Показати ще {userData.PhotoCount}</h5>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default UserInfo;
