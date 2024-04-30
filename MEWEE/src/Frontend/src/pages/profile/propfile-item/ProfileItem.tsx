import { FC, useState, useEffect } from "react";
import {
  profileButtonsData,
  portfilioData,
  setificateData,
  friendData,
  imageData,
} from "../profileData";
import { profileButtonsDataTypes } from "../profileData.interface";
import ProfilePost from "./profile-post/ProfilePost";
import Portfilio from "./portfilio/Portfilio";
import Friends from "./friends/Friends";
import PhotoVideoSliders from "../../../widgets/photo-video-sliders/PhotoVideoSliders";
import ProfileItemFilter from "../../../assets/image/icons/ProfileItemFilter.svg";
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
        {activeItemId === 1 && <ProfilePost />}

        {activeItemId === 2 && (
          <Portfilio
            portfilioData={portfilioData}
            setificateData={setificateData}
          />
        )}

        {activeItemId === 3 && <Friends friendData={friendData} />}
        {activeItemId === 5 && (
          <div className={styles.sliders_div}>
            <div className={styles.div_title}>
              <h1>Недавні</h1>
              <img src={ProfileItemFilter} />
            </div>
            <PhotoVideoSliders sliderData={imageData} />
            <PhotoVideoSliders title={"Ретуш"} sliderData={imageData} />
          </div>
        )}
        {activeItemId === 6 && (
          <div className={styles.sliders_div}>
            <div className={styles.div_title}>
              <h1>Недавні</h1>
              <img src={ProfileItemFilter} />
            </div>
            <PhotoVideoSliders sliderData={imageData} />
            <PhotoVideoSliders title={"Ретуш"} sliderData={imageData} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileItem;
