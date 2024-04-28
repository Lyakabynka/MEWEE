import React, { useState } from "react";
import { useThemeStore } from "../../../../entities";
import "./index.css";

interface SideToolbarMenuItemProps {
  title: string;
  icon: React.ReactNode;
  isVisible: boolean;
  onNavigate: () => void;
}

export const SideToolbarMenuItem: React.FC<SideToolbarMenuItemProps> = ({
  title,
  icon,
  isVisible,
  onNavigate
}) => {
  const { currentTheme } = useThemeStore();
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [hoverTextColor, setHoverTextColor] = useState("");
  const [hoverIconColor, setHoverIconColor] = useState("");

  return (
    <div
      className={`item ${isVisible ? "" : "icon-centered"}`}
      style={{ background: backgroundColor }}
      onClick={onNavigate}
      onMouseEnter={() => {
        setBackgroundColor(
          currentTheme?.mainPage.sideBar.hoverBackground || ""
        );
        setHoverTextColor("white" || "");
        setHoverIconColor(currentTheme?.mainPage.sideBar.hoverIcon || "");
      }}
      onMouseLeave={() => {
        setBackgroundColor("transparent");
        setHoverTextColor("");
        setHoverIconColor("");
      }}
    >
      <div
        className="icon-container"
        style={{ color: hoverIconColor || currentTheme?.mainPage.sideBar.icon }}
      >
        {icon}
      </div>
      {isVisible && (
        <span
          className={"text-block"}
          style={{
            color: hoverTextColor || currentTheme?.mainPage.sideBar.colorText,
          }}
        >
          {title}
        </span>
      )}
    </div>
  );
};
