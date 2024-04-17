import React, { useState } from "react";
import { useThemeStore } from "../../../../entities";
import "./index.css";

interface TopSearchBarItemProps {
  icon: React.ReactNode;
}

export const TopSearchBarItem: React.FC<TopSearchBarItemProps> = ({ icon }) => {
  const { currentTheme } = useThemeStore();
  const [hoverIconColor, setHoverIconColor] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const iconStyle = {
    color: isActive
      ? currentTheme?.mainPage.header.activeIcon
      : currentTheme?.mainPage.header.icon,
    opacity: hoverIconColor ? currentTheme?.mainPage.header.hoverIcon : "1",
  };

  return (
    <div
      className="icon-search-bar-container"
      style={iconStyle}
      onMouseEnter={() => setHoverIconColor(true)}
      onMouseLeave={() => {
        setHoverIconColor(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {icon}
    </div>
  );
};
