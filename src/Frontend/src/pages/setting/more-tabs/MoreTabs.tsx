import {
  moreTabsPropsTypes,
  moreTabsDataTypes,
} from "../settingData.interface";
import {FC, useState} from "react";
import styles from "./more-tabs.module.scss"
import {useNavigate} from "react-router-dom";
import { ReactComponent as ArrowRight } from "../../../widgets/sideToolbar/images/arrow-right.svg";

const MoreTabs: FC<moreTabsPropsTypes> = ({ moreTabsData }) => {

  const navigate = useNavigate();
  return (
    <div style={{ padding: "0 1rem" }}>
      {moreTabsData &&
          moreTabsData.map((item: moreTabsDataTypes) => {
          return (
              <div className={styles.div} id={item.id} onClick={() => navigate(item.path)}>
                <h2>{item.title}</h2>
                {item.id !== '4' && (
                    <div><ArrowRight/></div>
                )}
              </div>
          );
        })}
    </div>
  );
};

export default MoreTabs;
