import { FC } from "react";
import Switch from "@mui/material/Switch";
import {
  switchTabsPropsTypes,
  switchTabsDataTypes,
} from "../settingData.interface";
import styles from "./switch_tabs.module.scss";
import '../components/setting-security/styled_switch.scss';

const SwitchTabs: FC<switchTabsPropsTypes> = ({ switchTabsData }) => {
  const handleChcket = () => {
    const gog = "";
  };
  return (
    <div className={styles.div}>
      <ul>
        {switchTabsData &&
          switchTabsData.map((item: switchTabsDataTypes) => {
            return (
              <li key={item.id}>
                <div>
                  <h2>{item.title}</h2>
                  {item.description != undefined && <p>{item.description}</p>}
                </div>
                <Switch
                    className="CustomSwitch"
                    onChange={handleChcket}
                    defaultChecked={item.switchActive === true}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SwitchTabs;
