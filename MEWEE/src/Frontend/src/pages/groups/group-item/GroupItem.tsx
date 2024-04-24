import { FC } from "react";
import { Grid } from "@mui/material";
import KubsGroupPage from "../../../assets/image/icons/KubsGroupPage.svg"
import CustomButton from "../../../widgets/сommon/custom-button/customButton";
import GroupPageImage1 from "../../../assets/image/GroupPageImage1.png"
import styles from "./group_item.module.scss"
const GroupItem: FC = () => {
    return (
        <Grid container>
            <Grid md={12}>
                <div>
                    <h2>Вам може сподобатись</h2>
                    <img src={KubsGroupPage} />
                </div>
            </Grid>
            <Grid md={4}>
                <div>
                    <img width={250} src={GroupPageImage1} />
                    <div>
                        <h4>Вебінари| англійська для початківців</h4>
                        <p>165 учасників</p>
                    </div>
                    <CustomButton text="Приєднатись" />
                </div>
            </Grid>
        </Grid>
    )
}
export default GroupItem;