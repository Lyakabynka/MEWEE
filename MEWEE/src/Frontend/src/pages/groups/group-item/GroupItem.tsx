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
                data.map((item: dataGroupItemTypes, index: number) => {
                    return (
                        <Grid key={item.id} md={index < 6 ? 4 : 6}>
                            <div className={` ${index < 6 ? styles.div : styles._div_horizont}`}>
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
                                <div className={styles.modal_button}>
                                    <CustomModalIcon id={item.id} />
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