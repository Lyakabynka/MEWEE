import { FC, useState, useEffect } from "react";
import {
  profileButtonsData,
  portfilioData,
  setificateData,
  friendData,
} from "../profileData";
import { profileButtonsDataTypes } from "../profileData.interface";
import ProfilePost from "./profile-post/ProfilePost";
import Portfilio from "./portfilio/Portfilio";
import Friends from "./friends/Friends";
import styles from "./profile_item.module.scss";
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
          {profileButtonsData &&
            profileButtonsData.map((item: profileButtonsDataTypes) => {
              return (
                <li
                  className={`${styles.li} ${
                    item.id === activeItemId ? styles._li_active : ""
                  }`}
                  key={item.id}
                  onClick={() => handleLiClick(item.id)}
                >
                  <h5>{item.text}</h5>
                </li>
              );
            })}
        </ul>
        <div>
          <ProfilePost />
        </div>
        <div>
          <Portfilio
            portfilioData={portfilioData}
            setificateData={setificateData}
          />
        </div>
        <div>
          <Friends friendData={friendData} />
        </div>
      </div>
    </>
  );
};

export default ProfileItem;
