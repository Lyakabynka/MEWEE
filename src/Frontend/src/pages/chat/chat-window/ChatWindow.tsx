import React, { FC, useState, useEffect, useRef, ChangeEvent } from "react";
import { ReactComponent as EmojiIcon } from "../../../assets/image/icons/EmojiIcon.svg";
import { ReactComponent as SentIcon } from "../../../assets/image/icons/SentIcon.svg";
import { ReactComponent as AddCircle } from "../../../assets/image/icons/AddCircle.svg";
import { smileData } from "../../../widgets/widgetData";
import CustomModalIcon from "../../../widgets/сommon/custom-modal-icon/CustomModalIcon";
import { modalPostDataLink } from "../../../widgets/widgetData";
import { ReactComponent as VolumeHigh } from "../../../assets/image/icons/VolumeHigh.svg";
import { ReactComponent as VolumeOff } from "../../../assets/image/icons/VolumeOff.svg";
import CommentWriterAvatar from "../../../assets/image/CommentWriterAvatar.png";
import { chatDataTypes } from "../chatData.interface";
import { incomingMessageData } from "../chatData";
import styles from "./chat_window.module.scss";
import { useAuthStore, useSignalRStore, useUserStore } from "../../../entities";
import { decryptImage } from "../../../entities/sharedStores/post-utils";
import { useTranslation } from "react-i18next";
import CustomModalMenu from "../../../widgets/сommon/custom-modal-menu/CustomModalMenu";
import { useNavigate } from "react-router-dom";
import { isTypeNode } from "typescript";
import { ChatPost } from "./components/ChatPost";
interface ChatWindowProps {
  chat: any;
}


const ChatWindow: FC<ChatWindowProps> = ({ chat }) => {

  // Ensure chatId exists before rendering
  if (!chat) {
    return null; // or any fallback UI if needed
  }
  const { t } = useTranslation();
  const { connection, sendMessage } = useSignalRStore();
  const [speaker, setSpeaker] = useState<any>(null);
  const [avatar, setAvatar] = useState<any>(null);
  const { getProfile } = useUserStore();
  const [chatData, setChatData] = useState<any>(null);
  const { id } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [visibleSmile, setVisibleSmile] = useState<boolean>(true);
  const [massageArray, setMassageArray] = useState<chatDataTypes[]>([]);
  const [inputData, setInputData] = useState<string>("");
  const [volumeOff, setVolumeOff] = useState<boolean>(false);
  const [incomingMessage, setIncomingMessage] = useState<chatDataTypes>({
    id: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    userType: "",
  });
  const [outgoingMessage, setOutgoingMessage] = useState<chatDataTypes>({
    id: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    userType: "",
  });
  const navigate = useNavigate();

  const onProfileResponse = (data: any, errors: string[]) => {
    if (errors.length == 0 && data !== null) {
      setSpeaker(data);
      data.avatar && decryptImage(data.avatar).then(setAvatar).catch(console.error);
    }
  };

  const handleMessageReceived = (message: any) => {
    console.log("ON_RECEIVED", message);
    const newMessage = {
      content: message.content,
      createdAt: message.createdAt,
      userId: message.userId
    };

    setChatData((prevChatData: any) => prevChatData.concat(newMessage));
  }
  const handleJoinedReceived = (messages: any) => {
    console.log("ON_JOINED");
    setChatData(messages);
    console.log(messages)
  }
  useEffect(() => {

    if (connection) {
      // Attach event listener for receiving messages
      connection.on('receiveMessage', handleMessageReceived)
      connection.on('onJoined', handleJoinedReceived);
    }

    // Cleanup function to unsubscribe when the component is unmounted
    return () => {
      if (connection) {
        connection.off('receiveMessage', handleMessageReceived);
        connection.off('onJoined', handleJoinedReceived);
      }
    };
  }, []);
  useEffect(() => {

    if (chat) {

      const chatUserIds = chat.chatUsers
          ? chat.chatUsers
              .map((user: any) => user.userId)
              .filter((userId: string) => userId !== id)
          : [];

      console.log("CHAT USERS: ", chat.chatUsers);

      if (chatUserIds.length > 0) {
        getProfile(onProfileResponse, chatUserIds[0]);
      }

    }
  }, [chat]);
  useEffect(() => {
    setIncomingMessage(incomingMessageData);
    if (incomingMessage) {
      setMassageArray([...massageArray, incomingMessage]);
    }
  }, [incomingMessage]);

  const handleClickSmileVisible = () => {
    setVisibleSmile(!visibleSmile);
  };

  const handleAddCircleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlerDataInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const handleMessageClick = () => {
    // const randomNum = Math.floor(Math.random() * 900) + 100;
    // const newId = randomNum.toString();
    // setOutgoingMessage(
    //   {
    //     id: newId,
    //     content: inputData,
    //     createdAt: "1",
    //     updatedAt: "1",
    //     userType: "me"
    //   }
    // )
    if (chatData == null) {
      console.warn("chat data is null")
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    sendMessage(chat.id, inputData, formattedDate);
    setInputData("")
  }

  const moveToProfile = () => {
    navigate(`/profile/${speaker.username}`);
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };

    if (chatContainerRef.current) {
      scrollToBottom();
    }

    const scrollTimeout = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(scrollTimeout);

  }, [chatData]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleMessageClick();
    }
  };

  useEffect(() => {
    if (outgoingMessage) {
      setMassageArray([...massageArray, outgoingMessage]);
    }
  }, [outgoingMessage]);

  return (
      <>
        {speaker && (
            <div className={styles.div}>
              <div className={styles.subdiv_up}>
                <div className={styles.subdiv_up_left} >
                  <img src={avatar} onClick={moveToProfile} />
                  <div>
                    <div style={{cursor:'pointer'}} onClick={()=>{navigate('/profile/'+speaker.username)}}>
                      <h2>{speaker.firstName} {speaker.secondName}</h2>
                      <h5>(@{speaker.username})</h5>
                    </div>
                    <p>{t('last_online_recently')}</p>
                  </div>
                </div>
                <div className={styles.subdiv_up_right}>
                  {!volumeOff ? (
                      <VolumeHigh onClick={() => setVolumeOff(prevVolumeOff => !prevVolumeOff)}/>
                      ) :
                      <VolumeOff onClick={() => setVolumeOff(prevVolumeOff => !prevVolumeOff)}/>
                  }
                  <div>
                    <CustomModalMenu location={["100%", "0%", "", ""]} />
                  </div>
                </div>
              </div>
              <div className={styles.subdiv_down}>
                <div ref={chatContainerRef}>
                  {chatData &&
                      chatData.map((item: any) => {
                        const dateString = item.createdAt;
                        const date = new Date(dateString);

                        const hours = date.getHours();
                        const minutes = date.getMinutes();

                        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

                        const isPost = item.content.includes("postId:");

                        return (
                            <div key={item.id} className={styles.subdiv_message}>
                              {item.userId === id && (
                                  <div className={styles.outgoing_message}>
                                    <div>
                                      {!isPost && <p>{item.content}</p>}
                                      {isPost && (
                                          <ChatPost postId={item.content.split(':')[1]}></ChatPost>
                                      )}
                                      <span>{formattedTime}</span>
                                    </div>
                                  </div>
                              )}
                              {item.userId !== id && (
                                  <div className={styles.incoming_message}>
                                    <div>
                                      {!isPost && <p>{item.content}</p>}
                                      {isPost && (
                                          <ChatPost postId={item.content.split(':')[1]}></ChatPost>
                                      )}
                                      <span>{formattedTime}</span>
                                    </div>
                                  </div>
                              )}

                            </div>
                        );
                      })}
                </div>

                <form className={styles.input_message}>
                  <input
                      type="file"
                      id="fileInput"
                      ref={fileInputRef}
                      className="hidden-input"
                      name="uploadedFile"
                      style={{ display: "none" }}
                  />
                  <div>
                    <AddCircle onClick={handleAddCircleClick} />{" "}
                    <EmojiIcon onClick={handleClickSmileVisible} />
                  </div>
                  <input type="text" value={inputData} onKeyDown={handleKeyDown} onChange={handlerDataInput} />
                  <div>
                    <SentIcon onClick={handleMessageClick} style={{ marginRight: '0' }} />
                  </div>
                  <div
                      className={
                        visibleSmile
                            ? styles.smile_icon
                            : `${styles.smile_icon} ${styles._smile_icon_visible}`
                      }
                  >
                    <ul>
                      {smileData.map((item, index) => (
                          <li key={index}>
                            <img src={item.smile} />
                          </li>
                      ))}
                    </ul>
                  </div>
                </form>
              </div>
            </div>
        )}
      </>
  );
};

export default ChatWindow;
