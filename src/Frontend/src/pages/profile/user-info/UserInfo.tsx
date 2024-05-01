import { FC } from "react";
import { Grid } from "@mui/material";
import ProfileAvatar from "../../../assets/image/ProfileAvatar.png"
import ProfileLockal from "../../../assets/image/icons/ProfileLockal.svg"
import PropfileAdd from "../../../assets/image/icons/PropfileAdd.svg"
import ProfilePortfolio from "../../../assets/image/icons/ProfilePortfolio.svg"
import ProfileGallery from "../../../assets/image/ProfileGallery.png"
import { userInfoDataPropsTypes, userInfoDataEducation, userInfoDataGalery } from "../profileData.interface";
import styles from "./user_info.module.scss"
const UserInfo: FC<userInfoDataPropsTypes> = ({ userData }) => {
    return (
        <>
            <div className={styles.div}>
                <div className={styles.sub_div1}>
                    <img className={styles.avatar} src={userData.avatar} />
                    <div className={styles.user_name}>
                        <h1>{userData.userName}</h1>
                        <div>
                            <img src={ProfileLockal} />
                            <h4>{userData.lockal}</h4>
                        </div>
                    </div>
                    <div className={styles.folowers}>
                        <div>
                            <h2>{userData.subscribers}</h2>
                            <h3>Підписників</h3>
                        </div>
                        <div>
                            <h2>{userData.subscriptions}</h2>
                            <h3>Відстежується</h3>
                        </div>
                    </div>
                    <div className={styles.folow_button}>
                        <button>Підписатись</button>
                        <img src={PropfileAdd} />
                    </div>
                </div>
                <div className={styles.sub_div2}>
                    <ul>
                        {userData.education && (
                            userData.education.map((item: userInfoDataEducation) => {
                                return (
                                    <li key={item.id}>
                                        <img src={item.icon} />
                                        <h5>{item.text}</h5>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </div>
                <div>
                    {/* //ТУТ МОЖЕТ БЫТЬ JUST DO IT */}
                </div>
                <div className={styles.gallery}>
                    <h2>Фото</h2>
                    <Grid container >
                        {userData.gallery && (
                            userData.gallery.map((item, index) => {
                                return (
                                    <Grid md={6}>
                                        <img
                                            width={100}
                                            height={100}
                                            key={index}
                                            src={item.image} />
                                    </Grid>
                                )
                            })
                        )}
                    </Grid>
                    <div>
                        <h5>Показати ще 30 </h5>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserInfo;