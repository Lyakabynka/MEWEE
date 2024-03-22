import React, { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuthStore, useThemeStore } from '../../../../entities';
import './index.css';

export const SideToolbar = () => {

    const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();
    const { currentTheme } = useThemeStore();
    const fio = username?.split(' ');
    return (
        <div className='toolbar-main-content'>
            <div className='toolbar-block-container' style={{backgroundColor: currentTheme?.palette.secondary.main}}>
                <img src={require('./images/toolbar-logo.png')}></img>
            </div>
            <div className='toolbar-prof-block-container'>
                <div className='toolbar-profile-main-container'>
                    <div className='toolbar-profile-image'>
                        <img src={require('./images/unknown.jpg')}></img>
                    </div>
                    <div className='toolbar-profile-info-container'>
                        <span>{fio? fio[0]: 'Unknown'}</span>
                        <span>{fio? fio[1]: 'Unknown'}</span>
                        <span>Active</span>
                    </div>
                </div>
                <div className='toolbar-tools-container'>
                    <span>1</span>
                    <span>1</span>
                    <span>1</span>
                </div>
            </div>
            <div className='toolbar-prof-block-container'>
                <div className='toolbar-list'>
                    <div className=''></div>
                </div>
            </div>
        </div>
    )
};
