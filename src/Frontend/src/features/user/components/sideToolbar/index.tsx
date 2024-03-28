import React, { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuthStore, useThemeStore } from '../../../../entities';
import './index.css';
import { SideToolbarMenuItem } from './components/sideToolbarMenuItem';
import { title } from 'process';
import { useTranslation } from 'react-i18next';

export const SideToolbar = () => {

    const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();

    const { t, i18n } = useTranslation();
    const { currentTheme, currentThemeIndex, cycleThemes, getCurrentTheme  } = useThemeStore();

    const fio = username?.split(' ');
    return (
        <div className='toolbar-generic-content'>
            <div className='toolbar-main-content'>
                <div className='toolbar-block-container' style={{backgroundColor: currentTheme?.colorBlocks.homeSideColor}}>
                    <img className='toolbar-logo' src={require('./images/toolbar-logo.png')}></img>
                </div>
                <div className='toolbar-prof-block-container' style={{backgroundColor: currentTheme?.colorBlocks.homeSideColor}}>
                    <div className='toolbar-profile-main-container'>
                        <div className='toolbar-profile-image'>
                            <img src={require('./images/unknown.jpg')}></img>
                        </div>
                        <div className='toolbar-profile-info-container' >
                            <span className='toolbar-fio-title'>{fio? fio[0]: 'Unknown'}</span>
                            <span className='toolbar-fio-second'>{fio? fio[1]: 'Unknown'}</span>
                        </div>
                    </div>
                </div>
                <div className='toolbar-prof-block-container' style={{backgroundColor: currentTheme?.colorBlocks.homeSideColor}}>
                    <div className='toolbar-list'>
                        <SideToolbarMenuItem title={t("groups")} />
                        <SideToolbarMenuItem title={t("events")} />
                        <SideToolbarMenuItem title={t("announcements")} />
                        <SideToolbarMenuItem title={t("jobs")} />
                        <SideToolbarMenuItem title={t("news")} />
                        <SideToolbarMenuItem title={t("settings")} />
                    </div>
                </div>
                <div className='toolbar-prof-block-container' style={{backgroundColor: currentTheme?.colorBlocks.homeSideColor}}>
                    <button onClick={cycleThemes}>Next Theme</button>
                    <button onClick={() => i18n.changeLanguage('ua')}>UA</button>
                </div>
            </div>
        </div>
    )
};
