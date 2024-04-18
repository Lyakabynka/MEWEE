import React from "react";
import "./index.css";
import { EnumActivityType, useThemeStore } from "../../../../entities";
import { NewsWindow } from "./components/newsWindow";
import { CommentsWindow } from "./components/commentsWindow";

export const ActivityPanel: React.FC<{ activityType: EnumActivityType }> = ({
  activityType,
}) => {
  const { currentTheme } = useThemeStore();

  return (
    <div
      className="activity-panel-generic-container"
      style={{ backgroundColor: currentTheme?.mainPage.post.background }}
    >
      {activityType === EnumActivityType.News && <NewsWindow></NewsWindow>}
      {activityType === EnumActivityType.Comments && (
        <CommentsWindow></CommentsWindow>
      )}
    </div>
  );
};
