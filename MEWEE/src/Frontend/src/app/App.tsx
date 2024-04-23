import React, { useEffect } from "react";
import { useSignalRStore, useThemeStore } from "../entities";
import { useAuthStore } from "../entities";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { themes } from "../themes";
import { Routing } from "../widgets/exportWigetComponents";
import RegLogRouting from "../widgets/Routing/RegLogRouting";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  const { establishConnection, closeConnection } = useSignalRStore();
  const { id, isLoggedIn } = useAuthStore();

  const { getCurrentTheme } = useThemeStore();
  const theme = getCurrentTheme() || themes[0];

  useEffect(() => {
    if (isLoggedIn && id !== null && isLoggedIn === true) {
      establishConnection(id);
    } else if (isLoggedIn) {
      closeConnection();
    }
  }, [isLoggedIn, id]);

  const location = useLocation();
  const hideSideToolbarAndTopSearchBar = location.pathname.startsWith("/auth"); // проверка, если маршрут начинается с /auth/
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid item md={12}>
        {hideSideToolbarAndTopSearchBar ? <RegLogRouting /> : <Routing />}
      </Grid>
    </ThemeProvider>
  );
};

export default App;
