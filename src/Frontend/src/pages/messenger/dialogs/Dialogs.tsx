import { FC } from "react";
import CustomModalIcon from "../../../widgets/сommon/custom-modal-icon/CustomModalIcon";
import DialogCheck from "../../../assets/image/icons/DialogCheck.svg"
import { dialogsDataPropTypes, dialogDataTypes } from '../messengerData.interface';
import styles from "./dialogs.module.scss"
const Dialog: FC<dialogsDataPropTypes> = ({ dialogData, modalDialogsData }) => {
    return (
        <div className={styles.div}>
            {dialogData && (
                dialogData.map((item: dialogDataTypes) => {
                    return (
                        <div key={item.id} className={styles.chat_div}>
                            <img src={item.avatar} />
                            <div className={styles.chat_div_item}>
                                <div className={styles.chat_div_item1}>
                                    <h2>{item.name}</h2>
                                    <h5>{item.lastMessage}</h5>
                                </div>
                                <div className={styles.chat_div_item2}>
                                    <h5>{item.time}</h5>
                                    <div>
                                        {item.newMessade && (<h5>{item.valueMessage}</h5>)}
                                    </div>
                                </div>
                                <div className={styles.chat_div_item3}>
                                    {item.check && (<img src={DialogCheck} />)}
                                </div>
                            </div>
                            <div className={styles.modal_div}>
                                <CustomModalIcon id={item.id} links={modalDialogsData} />
                            </div>
                        </div>
                    )
                })
            )}

        </div>
    )
}

export default Dialog;