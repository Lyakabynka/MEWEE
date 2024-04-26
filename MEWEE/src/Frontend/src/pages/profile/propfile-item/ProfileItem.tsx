import { FC, useState, useEffect } from "react";
import { profileButtonsData } from '../profileData';
import { profileButtonsDataTypes } from "../profileData.interface";
import { FeedPost } from "../../../features/exportFeaturesComponents";
import styles from "./profile_item.module.scss"
const ProfileItem: FC = () => {
    const [activeItemId, setActiveItemId] = useState<number | null>(null);

    useEffect(() => {
        if (profileButtonsData.length > 0 && activeItemId === null) {
            setActiveItemId(profileButtonsData[0].id);
        }
    }, [activeItemId]);

    const handleLiClick = (itemId: number) => {
        setActiveItemId(itemId);
    };
    return (
        <>
            <div className={styles.div}>
                <ul>
                    {profileButtonsData && (
                        profileButtonsData.map((item: profileButtonsDataTypes) => {
                            return (
                                <li className={`${styles.li} ${item.id === activeItemId ? styles._li_active : ""
                                    }`}
                                    key={item.id}
                                    onClick={() => handleLiClick(item.id)} >
                                    <h5>{item.text}</h5>
                                </li>
                            )
                        })
                    )}
                </ul>


            </div>
        </>
    )
}

export default ProfileItem;