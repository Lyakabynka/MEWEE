import React, { useEffect } from "react";
import { useSignalRStore, useThemeStore } from "../entities";
import { useAuthStore } from "../entities";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { themes } from "../themes";
import { SideToolbar } from "../features/exportFeaturesComponents";
import { TopSearchBar } from "../features/exportFeaturesComponents";
import { Routing } from "../widgets";
import Grid from "@mui/material/Grid";
import "./App.css";

const App: React.FC = () => {
  const { establishConnection, closeConnection } = useSignalRStore();
  const { id, isLoggedIn } = useAuthStore();

  const { getCurrentTheme } = useThemeStore();
  const theme = getCurrentTheme() || themes[0];

  useEffect(() => {
    if (isLoggedIn && id !== null && isLoggedIn === true)
      establishConnection(id);
    else if (isLoggedIn) closeConnection();
  }, [isLoggedIn, id]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <div className="div_gobal">
          <Grid item md={3}>
            <SideToolbar />
          </Grid>
          <div>
            <TopSearchBar />
            <Grid item md={12}>
              <Routing />
            </Grid>
          </div>
        </div>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
