import React, { useState } from "react";
import styles from "./top_search_bar_item.module.scss";

interface TopSearchBarItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  isActive: boolean;
}

export const TopSearchBarItem: React.FC<TopSearchBarItemProps> = ({ onClick, icon, isActive }) => {

  return (
    <div className={styles.div} onClick={onClick} style={{color: isActive ? "#FBA500" : ""}}>
      {icon}
    </div>
  );
};
