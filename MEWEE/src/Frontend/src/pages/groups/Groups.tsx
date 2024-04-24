import { FC } from "react";
import { Grid } from "@mui/material";
import Sidebar from "./sidebar/Sidebar";

const Groups: FC = () => {
    return (
        <Grid container>
            <Grid md={3}>
                <Sidebar />
            </Grid>
        </Grid>
    )
}
export default Groups;