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
import PhotoVideoSliders from "../../../widgets/photo-video-sliders/PhotoVideoSliders";
import { ReactComponent as ProfileItemFilter } from "../../../assets/image/icons/ProfileItemFilter.svg";
import styles from "./profile_item.module.scss";
import { EnumProfileType, useGroupsStore, usePostsStore, useUserStore } from "../../../entities";
import { Input } from "@mui/material";
import { useFormik } from "formik";
import { GROUP_NAME_VALIDATION, LOGIN_SCHEMA } from "../../../shared/exportSharedMorules";
import { useNavigate } from "react-router-dom";
import AddPost from "../../../widgets/topSearchBar/components/add-post/AddPost";
import { useTranslation } from "react-i18next";
import ProfileGroupAdd from "./profile-group-add/ProfileGroupAdd";
const ProfileItem: FC<{profileButtonsData:any,  profileData: any, photos: any, profileType: EnumProfileType, friends: any }> = ({
  profileButtonsData,
  profileData,
  photos,
  profileType,
  friends,
}) => {

  const [groupCategory, setGroupCategory] = useState('Interesting');
  const {t} = useTranslation();
  const handleDropdownChange = (value: string) => {
    setGroupCategory(value);
  };

  const [createGroupFormEnabled, setCreateGroupFormEnabled] = useState<boolean>(false);

  const { createGroup } = useGroupsStore();
  const [activeItemId, setActiveItemId] = useState<number | null>(null);


  const formik = useFormik({
    initialValues: { groupName: "" },
    validationSchema: GROUP_NAME_VALIDATION,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: () => {

    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (profileButtonsData.length > 0 && activeItemId === null) {
      setActiveItemId(profileButtonsData[0].id);
    }
  }, [activeItemId]);

  const handleLiClick = (itemId: number) => {
    setActiveItemId(itemId);
  };
  const onGroupCreationResponse = (data: any, errors: string[]) => {
    if (errors.length === 0) {
      navigate('/group/' + data.nickname)
    } else console.error("Error occured. onGroupCreationResponse (ProfileItem)", errors);
  }
  const handleCreateGroup = () => {
    createGroup(onGroupCreationResponse, formik.values.groupName, "", groupCategory);
  }


  return (
    <>
      {profileData && (
        <div className={styles.div}>
          <ul>
            {profileButtonsData &&
              profileButtonsData.map((item: profileButtonsDataTypes) => {
                return (
                  <li
                    className={`${styles.li} ${item.id === activeItemId ? styles._li_active : ""
                      }`}
                    key={item.id}
                    onClick={() => handleLiClick(item.id)}
                  >
                    <h5>{t(item.text)}</h5>
                  </li>
                );
              })
            }
            {profileType == EnumProfileType.Group && (

              <AddPost avatar={profileData.avatar} username={profileData.username} id={profileData.id} type={EnumProfileType.Group}></AddPost>

            )}
          </ul>

          {activeItemId === 1 && (
            <ProfilePost id={profileData.id} />
          )}

          {activeItemId === 2 && (
            <Portfilio
              portfilioData={portfilioData}
              setificateData={setificateData}
            />
          )}

          {activeItemId === 3 && <Friends friendsData={friends} />}
          {activeItemId === 4 &&
            (
              <div className={styles.groups_container}>
                <div className={styles.groups_add_btn} onClick={() => setCreateGroupFormEnabled(!createGroupFormEnabled)}>
                  {t('create_new_group')}</div>
                {createGroupFormEnabled && (
                    <ProfileGroupAdd
                        formik={formik}
                        handleDropdownChange={handleDropdownChange}
                        handleCreateGroup={handleCreateGroup}
                        setCreateGroupFormEnabled={setCreateGroupFormEnabled}
                    />
                )}
                {/* <Friends friendsData={friends} /> */}
              </div>
            )}
          {(activeItemId === 5 && photos) && (
            <div className={styles.sliders_div}>
              <div className={styles.div_title}>
                <h1>{t("recent")}</h1>
                <div><ProfileItemFilter/></div>
              </div>
              <PhotoVideoSliders sliderData={photos} />
              <PhotoVideoSliders retouch={true} title={t("retouch")} sliderData={photos} />
            </div>
          )}
          {(activeItemId === 6 && photos) && (
            <div className={styles.sliders_div}>
              <div className={styles.div_title}>
                <h1>{t("recent")}</h1>
                <div><ProfileItemFilter/></div>
              </div>
              <PhotoVideoSliders sliderData={photos} />
              <PhotoVideoSliders retouch={true} title={t("retouch")} sliderData={photos} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileItem;
