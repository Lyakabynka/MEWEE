import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import MoreTabs from "./more-tabs/MoreTabs";
import SwitchTabs from "./switch-tabs/SwitchTabs";
import { moreTabsData, switchTabsData } from "./settingData";
import { useSearchBar } from "../../entities";
const Setting: FC = () => {
  const moreTabs = moreTabsData();
  const { setTitle } = useSearchBar();
  const switchTabs = switchTabsData();

  useEffect(()=>
  {
    setTitle("settings")
  }, [])
  return (
    <div>
      <Grid container>
        <Grid item md={6}>
          <MoreTabs moreTabsData={moreTabs} />
          {switchTabs.slice(0, 2).map((tab, index) => (
              <SwitchTabs switchTabsData={[tab]} />
          ))}
        </Grid>
        <Grid item md={6}>
          {switchTabs.slice(2).map((tab, index) => (
              <SwitchTabs switchTabsData={[tab]} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Setting;
