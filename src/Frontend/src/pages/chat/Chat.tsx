import { FC, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import DialogSidebar from "./dialog-sidebar/DialogSidebar";
import ChatWindow from "./chat-window/ChatWindow";
import { useAuthStore, useChatStore, useSearchBar, useSignalRStore } from "../../entities";
import { useNavigate } from "react-router-dom";
import CustomBurgerMenu from "../../widgets/сommon/custom-burger-menu/CustomBurgerMenu";
const Chat: FC = () => {
  const navigate = useNavigate();
  const { connection, joinChat } = useSignalRStore();
  const { isLoggedIn, id } = useAuthStore();

  if (!isLoggedIn) navigate("auth/login");
  const { setTitle } = useSearchBar();
  const { getChats, setCurrentChat } = useChatStore();
  const [chatsData, setChatsData] = useState<any>(null);
  const [currentChat, _setCurrentChat] = useState<string>("");
  const [messagesData, setMessagesData] = useState<any>(null);

  const onResponse = (data: any, errors: string[]) => {
    if (errors.length == 0 && data !== null) {
      console.log("NEW CHAT DATA: ", data);
      setChatsData(data);
    }
  };

  const onMessageReceived = (message: string) => {
    console.log("refreshing chats...", message);
    refreshChats();
  };

  const refreshChats = () => {
    getChats(onResponse);
  };
  useEffect(() => {
    setTitle("chat");
    refreshChats();
  }, []);

  const loadMessagesData = (chatId: string) => {
    
    const chat = chatsData.find((item: any) => item.id == chatId);
    _setCurrentChat(chat);
    setCurrentChat(chatId);
    
    joinChat(chatId);
  };

  return (
    <>
      <div style={{ padding: "1rem", height: "100%" }}>
        {!currentChat && (
            <div style={{marginBottom: "0.5rem"}}>
              <CustomBurgerMenu/>
            </div>
        )}
        <Grid container style={{height: '100%'}}>
          <Grid item md={currentChat ? 3 : 12} sx={{ maxHeight: "82vh", height:"100%", overflowY: "scroll",
            scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch",}}>
            <DialogSidebar chats={chatsData} onOpenChat={loadMessagesData} openChat={!!currentChat}/>
          </Grid>
          {currentChat &&
              <Grid md={9}>
                <ChatWindow chat={currentChat} />
              </Grid>
          }
        </Grid>
      </div>
    </>
  );
};
//participants={}
export default Chat;
