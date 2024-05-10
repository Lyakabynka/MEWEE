import { FC, useEffect, useState } from "react";
import { dialogData } from "../../messenger/messengerData";
import Dialog from "../../messenger/dialogs/Dialogs";
import styles from "./dialog_sidebar.module.scss";
import { useAuthStore, useChatStore } from "../../../entities";
const DialogSidebar: FC<{chats: any, onOpenChat: (chatId: string) => void, openChat: boolean}> = ({
  chats,
  onOpenChat,openChat
}) => {



  return (
    <>
      <div className={openChat ? styles.div : ""}>
          <div>
              <Dialog onOpenChat={onOpenChat} dialogData={chats} sideBarType={true} openChat={openChat} />
          </div>
      </div>
    </>
  );
};

export default DialogSidebar;
