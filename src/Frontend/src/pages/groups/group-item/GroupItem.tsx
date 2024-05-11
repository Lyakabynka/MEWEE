import { FC, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ReactComponent as KubsGroupPage } from "../../../assets/image/icons/KubsGroupPage.svg";
import CustomButton from "../../../widgets/сommon/custom-button/customButton";
import CustomModalIcon from "../../../widgets/сommon/custom-modal-icon/CustomModalIcon";
import {
  dataGroupItemPropTypes,
  dataGroupItemTypes,
} from "../groupData.interface";
import styles from "./group_item.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DecryptedImg from "../../profile/DecryptedImg";
import { useAuthStore, useUserStore } from "../../../entities";
import { modalPostDataLinkTypes } from "../../../widgets/widget.interface";
import CustomModalGroup from "../../../widgets/сommon/custom-modal_group/CustomModalGroup";

const GroupItem: FC<dataGroupItemPropTypes> = ({ data, category }) => {
  const [friends, setFriends] = useState<any>(null);
  const [dataToDisplay, setDataToDisplay] = useState<any>(data);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { id } = useAuthStore();
  const { getFriends } = useUserStore();

  const onFriendsResponse = (data: any, errors: string[]) => {
    if (errors.length == 0) {
      setFriends(data);
      console.log("Friends received.", data)
    }
    else console.error("Errors occured in onFriendsResponse (GroupItem)", errors);
  }

  const [modalPostDataLink, setModalPostDataLink] = useState<modalPostDataLinkTypes[]>([
    {
      id: 1,
      url: "#",
      onClick: ()=>{},
      icons: '',
      text: "modal_home_link1",
    },
    {
      id: 2,
      url: "#",
      onClick:()=>{},
      icons: '',
      customSymbols: "",
      text: "save",
    },
    {
      id: 3,
      url: "#",
      onClick:()=>{},
      icons: '',
      text: "modal_home_link3",
    },
  ]);
  useEffect(() => {
    if (!id) {
      console.error("User must be logged in. (GroupItem)");
      navigate('/auth/login');
      return;
    }
    getFriends(onFriendsResponse, id ?? "");
  }, []);

  useEffect(() => {
    onCategorySwitch();
  }, [category]);

  const onCategorySwitch = () => {
    if (category == "Interesting")
      setDataToDisplay(data);
    else if (category == "FriendsGroups") {
      console.log(friends);
      if (friends.length == 0) {
        setDataToDisplay(null);
      }
      const friendIds = friends.map((friend: any) => friend.id);

      const groupsWithFriends = data.filter((group: any) => {
        return group.members.some((member: any) => friendIds.includes(member.userId));
      });
      setDataToDisplay(groupsWithFriends);
    }
    else
      setDataToDisplay(data.filter((groupData: any) => groupData.group.category === category));
  }

  return (
    <Grid container>
      <Grid item md={12}>
        <header className={styles.header}>
          <h2>{t("might_like_it")}</h2>
          <KubsGroupPage />
        </header>
      </Grid>
      {data &&
        dataToDisplay.map((item: any, index: number) => {
          const currentGroup: any = item.group;
          const members: any = item.members;
          return (
            <Grid item key={currentGroup.id} md={index < 6 ? 4 : 6} >
              <div
                className={` ${index < 6 ? styles.div : styles._div_horizont}`}
              >
                {currentGroup.avatar && (
                  <DecryptedImg borderRadius="20px" size="100%" content={currentGroup.avatar}
                                className={` ${index < 6 ? '' : styles.img}`}
                  ></DecryptedImg>
                )}
                <div>
                  <div className={styles.div_group_title}>
                    <h4>{currentGroup.title}</h4>
                    {members && (
                      <p>
                        {members.length} {t("participants")}
                      </p>
                    )}
                  </div>
                  <div>
                    <CustomButton text={t("join")} onClick={() => {
                      navigate("/group/" + currentGroup.id, { replace: false });
                      
                    }} />
                  </div>
                </div>
                <div className={styles.modal_button}>
                  <CustomModalGroup />
                  {/*<CustomModalIcon id={item.id} links={modalPostDataLink} />*/}
                </div>
              </div>
            </Grid>
          );
        })}
    </Grid>
  );
};
export default GroupItem;
