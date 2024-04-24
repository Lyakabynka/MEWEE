import { FC } from "react";
import { Grid } from "@mui/material";
import KubsGroupPage from "../../../assets/image/icons/KubsGroupPage.svg"
import CustomButton from "../../../widgets/сommon/custom-button/customButton";
import CustomModalIcon from "../../../widgets/сommon/custom-modal-icon/CustomModalIcon";
import { dataGroupItemPropTypes, dataGroupItemTypes } from "../groupData.interface";
import styles from "./group_item.module.scss"
const GroupItem: FC<dataGroupItemPropTypes> = ({ data }) => {
    return (
        <Grid container>
            <Grid md={12}>
                <header className={styles.header}>
                    <h2>Вам може сподобатись</h2>
                    <img src={KubsGroupPage} />
                </header>
            </Grid>
            {data && (
                data.map((item: dataGroupItemTypes) => {
                    return (
                        <Grid key={item.id} md={4}>
                            <div className={styles.div}>
                                <img src={item.img} />
                                <div>
                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>{item.participants}</p>
                                    </div>
                                    <div>
                                        <CustomButton text="Приєднатись" />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    )
                })
            )}

        </Grid>
    )
}
export default GroupItem;