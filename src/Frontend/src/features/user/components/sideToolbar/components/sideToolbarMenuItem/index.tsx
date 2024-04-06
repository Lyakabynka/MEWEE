import React, {useState} from 'react';
import {useThemeStore} from "../../../../../../entities";
import "./index.css"

interface SideToolbarMenuItemProps {
    title: string;
    icon: React.ReactNode;
    isVisible: boolean;
}

export const SideToolbarMenuItem: React.FC<SideToolbarMenuItemProps> = ({ title, icon, isVisible }) => {
    const { currentTheme } = useThemeStore();
    const [backgroundColor, setBackgroundColor] = useState('transparent');
    const [hoverTextColor, setHoverTextColor] = useState('');
    const [hoverIconColor, setHoverIconColor] = useState('');


    return (
<<<<<<< HEAD
        <div className={`item ${isVisible ? "" : "icon-centered"}`}
             style={{background: backgroundColor,}}
             onMouseEnter={() => {
                 setBackgroundColor(currentTheme?.mainPage.sideBar.hoverBackground || '');
                 setHoverTextColor("white" || '');
                 setHoverIconColor(currentTheme?.mainPage.sideBar.hoverIcon || '');
             }}
             onMouseLeave={() => {
                 setBackgroundColor('transparent');
                 setHoverTextColor('');
                 setHoverIconColor('');
             }}>
            <div className="icon-container" style={{color: hoverIconColor || currentTheme?.mainPage.sideBar.icon}}>
                {icon}
            </div>
            {isVisible && (
                <span className={"text-block"}
                      style={{color: hoverTextColor || currentTheme?.mainPage.sideBar.colorText}}>{title}</span>
            )}
=======
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.0254 20.5707L16.0257 17.357C16.0259 15.5818 14.5868 14.1426 12.8116 14.1426H5.61441C3.83948 14.1426 2.40055 15.5814 2.40036 17.3563L2.39999 20.5707M21.5997 20.5709L21.6 17.3571C21.6002 15.582 20.1611 14.1428 18.3859 14.1428M15.4063 4.06051C16.1956 4.64615 16.7071 5.58501 16.7071 6.64334C16.7071 7.70167 16.1956 8.64052 15.4063 9.22616M12.4938 6.64316C12.4938 8.41824 11.0548 9.85722 9.27974 9.85722C7.50466 9.85722 6.06568 8.41824 6.06568 6.64316C6.06568 4.86809 7.50466 3.42911 9.27974 3.42911C11.0548 3.42911 12.4938 4.86809 12.4938 6.64316Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{title}</span>
>>>>>>> 37733862c06b99a250ba46706029fd5778618247
        </div>
    )
};
