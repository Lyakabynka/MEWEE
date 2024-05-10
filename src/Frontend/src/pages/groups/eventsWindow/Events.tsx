import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import styles from "./events.module.scss";
import { decryptImage } from "../../../entities/sharedStores/post-utils";
import Sidebar from "../sidebar/Sidebar";
import GroupItem from "../group-item/GroupItem";
import { useGroupsStore, usePostsStore, useSearchBar } from "../../../entities";
import { dataSideBar } from "../groupData";
import { FeedPost } from "../../../features/exportFeaturesComponents";
import EventItem from "./events-item/EventItem";

const Events: FC<{}> = () => {
  const [data, setData] = useState<any>();
  const [dataToDisplay, setDataToDisplay] = useState<any>(null);
  const { findPosts } = usePostsStore();
  const { setTitle } = useSearchBar();



  const onResponse = (data:any, errors: string[]) => {
    if (errors.length == 0 && data != null) {
      
      const result = data.filter((x:any)=>x.type == "Event"); 
      setData(result);
      setDataToDisplay(result);
    } else
      console.error(errors);
  };
  useEffect(() => {
    setTitle("events");
    findPosts(onResponse, "", { page: 0, pageSize: 10 }, false);
  }, []);


  const onCategoryChanged = (id: string) => {
    onCategorySwitch(id);

  }


  const onCategorySwitch = (category:string) => {

    if (category == "Interesting")
      setDataToDisplay(data);
    else
    {
      setDataToDisplay(data.filter((item: any) => item.category.split('_')[1] === category));
    }
  }
  const sideBarData = dataSideBar();

  return (
    <>
    <Grid container className={styles.eventsContainer}>
      <Grid item md={3} sx={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
      <Sidebar data={sideBarData} onCategoryChanged={onCategoryChanged} />
      </Grid>

      <Grid item md={9}>
        <Grid container spacing={10}>
          {dataToDisplay &&
            dataToDisplay.map((item: any) => (
              <Grid key={item.id} item xs={12} sm={2} md={5}>
                <EventItem item={item} />
              </Grid>
              
            ))}
        </Grid>
      </Grid>
    </Grid>
  </>
  );
};

export default Events;
