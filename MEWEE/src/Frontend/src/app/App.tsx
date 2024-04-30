import React, { useEffect, useState } from "react";
import { useSignalRStore, useThemeStore } from "../entities";
import { useAuthStore } from "../entities";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { themes } from "../themes";
import { Routing } from "../widgets/exportWigetComponents";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./App.css";
import {setThemeVariables} from "../themesToCss";
import RegLogRouting from "../widgets/routing/RegLogRouting";
import ProfilePictureUploader from "../features/profilePictureUploader/ProfilePictureUploader";
import ChatHub from "../pages/create-chat-test/ChatHub";
import CreateChatTest from "../pages/create-chat-test/CreateChatTest";
import { Button, Input } from "antd";

const App: React.FC = () => {
  const { establishConnection, joinChat, sendMessage, closeConnection } = useSignalRStore();
  const { id, isLoggedIn } = useAuthStore();

  const { getCurrentTheme } = useThemeStore();
  const theme = getCurrentTheme() || themes[0];
  useEffect(() => {
    setThemeVariables(theme);
  }, [theme]);

  useEffect(() => {
    if (isLoggedIn && id !== null && isLoggedIn === true) {
      establishConnection(id);
    } else if (isLoggedIn) {
      closeConnection();
    }
  }, [isLoggedIn, id]);

  const location = useLocation();
  const hideSideToolbarAndTopSearchBar = location.pathname.startsWith("/auth"); // проверка, если маршрут начинается с /auth/
 
  const [inputValue, setInputValue] = useState<string>('');

  // Function to handle change in input value
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // Function to handle form submission (if needed)
  const handleSubmit = () => {
    // Use inputValue for further processing
    console.log('Input value:', inputValue);
    //()=> sendMessage("cb26c900-f324-4055-b33c-c95ba9e6b772", "wo!", "2024-04-28 00:19:55.303389")

    joinChat(inputValue);

  };
  const handleSubmit1 = () => {
    sendMessage(inputValue, "wo!1111", "2024-04-28 00:19:55.303389")
  };
 
  return (
    <ThemeProvider theme={theme}>
      <CreateChatTest></CreateChatTest>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Type something..."
      />
      <Button onClick={handleSubmit}>TEST</Button>
      <Button onClick={handleSubmit1}>SEND</Button>
      <CssBaseline />
      <Grid item md={12}>
        {hideSideToolbarAndTopSearchBar ? <RegLogRouting /> : <Routing />}
      </Grid>
    </ThemeProvider>
  );
};

export default App;
