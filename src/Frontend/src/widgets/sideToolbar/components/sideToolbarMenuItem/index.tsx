import React, { useState } from "react";
import styles from "./side_toolbar_menu_item.module.scss"

interface SideToolbarMenuItemProps {
    title: string;
    icon: React.ReactNode;
    isVisible: boolean;
    onNavigate: () => void;
    isActive: boolean;
}

export const SideToolbarMenuItem: React.FC<SideToolbarMenuItemProps> = ({
                                                                            title,
                                                                            icon,
                                                                            isVisible,
                                                                            onNavigate,
                                                                            isActive
                                                                        }) => {


    return (
        <div className={`${styles.item} ${isVisible ? "" : styles.icon_centered} 
        ${isActive ? styles.active : ""}`} onClick={onNavigate}>
            <div className={styles.icon_container}>
                {icon}
            </div>
            {isVisible && (
                <span className={styles.text_block}>
          {title}
        </span>
            )}
        </div>
    );
};
