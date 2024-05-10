import { FC, useState, useEffect } from "react";
import styles from "./groups.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { decryptImage } from "../../entities/sharedStores/post-utils";
import { useGroupsStore, useSearchBar } from "../../entities";
import { Grid } from "@mui/material";
import Sidebar from "./sidebar/Sidebar";
import GroupItem from "./group-item/GroupItem";
import { dataSideBar } from "./groupData";

const Groups: FC<{}> = () => {
  const [avatarImages, setAvatarImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('Interesting');
  const [data, setData] = useState<any>();
  const { getGroups } = useGroupsStore();
  const { setTitle } = useSearchBar();



  const onGroupsResponse = (data: any, errors: string[]) => {
    if (errors.length == 0 && data !== null) {
      setData(data);
      console.log(data);
      fetchAvatars();

    } else
      console.error(errors);
  };
  useEffect(() => {
    setTitle("groups");
    getGroups(onGroupsResponse,'all');
  }, []);


  const fetchAvatars = async () => {
    if (data) {
      const decryptedAvatars = await Promise.all(
        data.map(async (group: any) => {
          try {
            if (group.avatar) {
              const decryptedAvatar = await decryptImage(group.avatar);
              return decryptedAvatar;
            }
            return null;
          } catch (error) {
            console.error("Error decrypting image:", error);
            return null;
          }
        })
      );
      setAvatarImages(decryptedAvatars);
    }
  };
  const onCategoryChanged = (id: string) => {
    setSelectedCategory(id);
  }

  const sideBarData = dataSideBar();

  return (
    <>

      {data && (
        <Grid container sx={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
          <Grid item md={3}>
            <Sidebar data={sideBarData} onCategoryChanged={onCategoryChanged} />
          </Grid>
          <Grid item md={9}>
            <GroupItem category={selectedCategory} data={data} />
          </Grid>
        </Grid>

      )}
    </>
  );
};

export default Groups;
