import { FC } from "react";
import { Grid } from "@mui/material";
import DialogModal from "./dialog-modal/DialogModal";
import Dialog from "./dialogs/Dialogs";
import { dialogData, modalChatsDataLink } from "./messengerData";
const Messenger: FC = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <Grid container>
        <Grid item md={12}>
          <DialogModal />
        </Grid>
        <Grid item md={12}>
          <Dialog
            onOpenChat={() => {}}
            dialogData={dialogData}
            modalDialogsData={modalChatsDataLink}
            sideBarType={false}
            openChat={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Messenger;
