import React, { FC, useEffect, useState } from "react";
import CustomModalIcon from "../../../widgets/сommon/custom-modal-icon/CustomModalIcon";
import DialogCheck from "../../../assets/image/icons/DialogCheck.svg";
import {
    dialogsDataPropTypes,
    dialogDataTypes,
} from "../messengerData.interface";
import styles from "./dialog_item.module.scss";
import { useAuthStore, useChatStore, useUserStore } from "../../../entities";
import { decryptImage } from "../../../entities/sharedStores/post-utils";
import CustomModalMenu from "../../../widgets/сommon/custom-modal-menu/CustomModalMenu";
const DialogItem: FC<{ chatId: string, onClick: ()=>void, userIds: any, sideBarType: boolean, modalDialogsData:any, openChat: boolean}>
    = ({
        chatId,
           onClick,
           userIds,
           sideBarType,
           modalDialogsData, openChat
    }) => {
    const { id } = useAuthStore();
    const { getProfile } = useUserStore();
    const { currentChatId }= useChatStore();
    const [speaker, setSpeaker] = useState<any>(null);
    const [avatar, setAvatar] = useState<any>(null);

    console.log(currentChatId);
    const onProfileResponse = (data: any, errors: string[]) => {

        if (errors.length == 0 && data !== null) {
            setSpeaker(data);
            data.avatar && decryptImage(data.avatar).then(setAvatar).catch(console.error);
        }
    };

    useEffect(() => {
        getProfile(onProfileResponse, userIds[0]);
    }, [])

    return (
        <>
            {speaker && (
                <div key={speaker.id} className={`${styles.chat_div} 
                ${openChat && chatId === currentChatId && styles.active}`} onClick={onClick}
                     style={{
                         marginBottom: openChat ? "0" : "0.8rem",
                         borderRadius: openChat ? "0.5rem" : "1rem",
                     }}>
                    <img src={avatar}/>
                    <div className={styles.chat_div_item}>
                        <div className={styles.chat_div_item1}>
                            <div>
                                <h2 className={`${openChat && chatId === currentChatId && styles.active_text}`}>
                                    {speaker.firstName} {speaker.secondName}</h2>
                                {!openChat && (
                                    <h5>(@{speaker.username})</h5>
                                )}
                            </div>
                            <p className={`${openChat && chatId === currentChatId && styles.active_text}`}>
                                Last comment...</p>
                        </div>
                        {!sideBarType && (
                            <>
                                <div className={styles.chat_div_item2}>
                                    <h5>{speaker.time}</h5>
                                    <div>
                                        {speaker.newMessade && <h5>{speaker.valueMessage}</h5>}
                                    </div>
                                </div>
                                <div className={styles.chat_div_item3}>
                                    {speaker.check && <img src={DialogCheck}/>}
                                </div>
                            </>
                        )}
                    </div>
                    {!openChat && (
                        <div className={styles.modal_div}
                             onClick={(event) => event.stopPropagation()}>
                            <CustomModalMenu location={["0", "100%", "", ""]}/>
                        </div>
                    )}
                    {!sideBarType && (
                        <div className={styles.modal_div}>
                            <CustomModalIcon id={speaker.id} links={modalDialogsData}/>
                        </div>
                    )}
                </div>

            )}
        </>
    );
}

export default DialogItem;
