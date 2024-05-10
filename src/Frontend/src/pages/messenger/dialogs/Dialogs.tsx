import { FC } from "react";
import {dialogsDataPropTypes} from "../messengerData.interface";
import styles from "./dialogs.module.scss";
import { useAuthStore, useUserStore } from "../../../entities";
import DialogItem from "./DialogItem";

const Dialog: FC<dialogsDataPropTypes> = ({
  onOpenChat,
  dialogData,
  modalDialogsData,
  sideBarType,
  openChat
}) => {
  const { id } = useAuthStore();
  return (
    <div className={styles.div}>
      {dialogData &&
        dialogData.map((item: any) => {
          
          const chatUserIds = item.chatUsers
            ? item.chatUsers
              .map((user: any) => user.userId)
              .filter((userId: string) => userId !== id)
            : [];

          return (
              <DialogItem
                  onClick={() => onOpenChat(item.id)}
                  chatId={item.id}
                  key={item.id}
                  userIds={chatUserIds}
                  sideBarType={sideBarType}
                  modalDialogsData={modalDialogsData}
                  openChat={openChat}
              />
          );
        })}
    </div>
  );
};

export default Dialog;
