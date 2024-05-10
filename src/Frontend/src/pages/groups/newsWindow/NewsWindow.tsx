import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { decryptImage } from "../../../entities/sharedStores/post-utils";
import Sidebar from "../sidebar/Sidebar";
import GroupItem from "../group-item/GroupItem";
import { useGroupsStore, usePostsStore, useSearchBar } from "../../../entities";
import { dataSideBar } from "../groupData";
import { FeedPost } from "../../../features/exportFeaturesComponents";
import NewsItem from "./news-item/NewsItem";
import styles from "./news.module.scss";

const NewsWindow: FC<{}> = () => {
  const [data, setData] = useState<any>();
  const [dataToDisplay, setDataToDisplay] = useState<any>(null);
  const { findPosts } = usePostsStore();
  const { setTitle } = useSearchBar();



  const onResponse = (data:any, errors: string[]) => {
    if (errors.length == 0 && data != null) {
      const result = data.filter((x:any)=>x.type == "News"); 
      setData(result);
      setDataToDisplay(result);
    } else
      console.error(errors);
  };
  useEffect(() => {
    setTitle("news");
    findPosts(onResponse, "", { page: 0, pageSize: 10 }, false);
  }, []);


  const onCategoryChanged = (id: string) => {
    onCategorySwitch(id);

  }


  const onCategorySwitch = (category:string) => {

    if (category == "Interesting")
      setDataToDisplay(data);
    else
    setDataToDisplay(data.filter((item: any) => item.category.split('_')[1] === category));
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
                <NewsItem item={item} />
              </Grid>
              
            ))}
        </Grid>
      </Grid>
    </Grid>
  </>
  );
};

export default NewsWindow;
