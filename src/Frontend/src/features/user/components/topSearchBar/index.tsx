import React, { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuthStore, useThemeStore } from '../../../../entities';
import './index.css';
import { useTranslation } from 'react-i18next';

export const TopSearchBar = () => {

    const {t} = useTranslation();
    // const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();
    const { currentTheme } = useThemeStore();
    // const fio = username?.split(' ');
    return (
        <div className='top-search-bar-container' style={{backgroundColor: currentTheme?.colorBlocks?.contentColor ?? 'white'}}>
            <span className='top-search-bar-title' style={{color: currentTheme?.palette?.text?.secondary ?? 'black'}}>{t('main')}</span>
            <input className='top-search-bar-input' style={{border: '2px solid '+currentTheme?.inputs?.inputTextStroke ?? '#6A4F93'}} type='text' placeholder={t('search')+'...'}></input>
            <div className='top-search-bar-tools-container'>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.6C12 21.6 19.5131 14.9217 19.5131 9.91304C19.5131 5.7637 16.1494 2.39999 12 2.39999C7.85067 2.39999 4.48697 5.7637 4.48697 9.91304C4.48697 14.9217 12 21.6 12 21.6Z" stroke={currentTheme?.palette.text.secondary ?? 'black'} strokeWidth="2"/>
                    <path d="M14.4003 9.60015C14.4003 10.9256 13.3258 12.0001 12.0003 12.0001C10.6748 12.0001 9.60032 10.9256 9.60032 9.60015C9.60032 8.27466 10.6748 7.20015 12.0003 7.20015C13.3258 7.20015 14.4003 8.27466 14.4003 9.60015Z" stroke={currentTheme?.palette.text.secondary ?? 'black'} strokeWidth="2"/>
                </svg> 
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.6C12 21.6 19.5131 14.9217 19.5131 9.91304C19.5131 5.7637 16.1494 2.39999 12 2.39999C7.85067 2.39999 4.48697 5.7637 4.48697 9.91304C4.48697 14.9217 12 21.6 12 21.6Z" stroke={currentTheme?.palette.text.secondary ?? 'black'} strokeWidth="2"/>
                    <path d="M14.4003 9.60015C14.4003 10.9256 13.3258 12.0001 12.0003 12.0001C10.6748 12.0001 9.60032 10.9256 9.60032 9.60015C9.60032 8.27466 10.6748 7.20015 12.0003 7.20015C13.3258 7.20015 14.4003 8.27466 14.4003 9.60015Z" stroke={currentTheme?.palette.text.secondary ?? 'black'} strokeWidth="2"/>
                </svg> 
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.6C12 21.6 19.5131 14.9217 19.5131 9.91304C19.5131 5.7637 16.1494 2.39999 12 2.39999C7.85067 2.39999 4.48697 5.7637 4.48697 9.91304C4.48697 14.9217 12 21.6 12 21.6Z" stroke={currentTheme?.palette.text.secondary ?? 'black'} strokeWidth="2"/>
                    <path d="M14.4003 9.60015C14.4003 10.9256 13.3258 12.0001 12.0003 12.0001C10.6748 12.0001 9.60032 10.9256 9.60032 9.60015C9.60032 8.27466 10.6748 7.20015 12.0003 7.20015C13.3258 7.20015 14.4003 8.27466 14.4003 9.60015Z" stroke={currentTheme?.palette.text.secondary ?? 'black'} strokeWidth="2"/>
                </svg> 
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.6C12 21.6 19.5131 14.9217 19.5131 9.91304C19.5131 5.7637 16.1494 2.39999 12 2.39999C7.85067 2.39999 4.48697 5.7637 4.48697 9.91304C4.48697 14.9217 12 21.6 12 21.6Z" stroke={currentTheme?.palette.text.secondary ?? 'black'} strokeWidth="2"/>
                    <path d="M14.4003 9.60015C14.4003 10.9256 13.3258 12.0001 12.0003 12.0001C10.6748 12.0001 9.60032 10.9256 9.60032 9.60015C9.60032 8.27466 10.6748 7.20015 12.0003 7.20015C13.3258 7.20015 14.4003 8.27466 14.4003 9.60015Z" stroke={currentTheme?.palette.text.secondary ?? 'black'} strokeWidth="2"/>
                </svg> 
            </div>
        </div>
    )
};
