import { FC } from "react";
import { Grid } from "@mui/material";
import { dataSideBar, dataGroupItem } from "./groupData";
import GroupItem from "./group-item/GroupItem";
import Sidebar from "./sidebar/Sidebar";

const Groups: FC = () => {
    return (
        <Grid container>
            <Grid md={3}>
                <Sidebar data={dataSideBar} />
            </Grid>
            <Grid md={9}>
                <GroupItem data={dataGroupItem} />
            </Grid>
        </Grid>
    )
}
export default Groups;