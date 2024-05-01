import { FC } from "react";
import DialogModal from "./dialog-modal/DialogModal";
import Dialog from "./dialogs/Dialogs";
import { dialogData, modalChatsDataLink } from "./messengerData";
const Messenger: FC = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <DialogModal />
      <Dialog dialogData={dialogData} modalDialogsData={modalChatsDataLink} />
    </div>
  );
};

export default Messenger;
