import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuthStore, useThemeStore } from '../../../../entities';
import './index.css';
import { useTranslation } from 'react-i18next';
import { ReactComponent as IconPlus} from './images/icon_plus.svg';
import { ReactComponent as IconFilter} from './images/icon_filter.svg';
import { ReactComponent as IconNothification} from './images/icon_nothification.svg';
import { ReactComponent as IconMessages} from './images/icon_messages.svg';
import { ReactComponent as IconSearch} from './images/icon_search.svg';
import {TopSearchBarItem} from "./components/topSearchBarItem";

export const TopSearchBar = () => {

    const {t} = useTranslation();
    // const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();
    const { currentTheme } = useThemeStore();
    // const fio = username?.split(' ');

    return (
        <div className='top-search-bar-container' style={{backgroundColor: currentTheme?.mainPage.header.background}}>
            <div className='top-search-bar-title-container'>
                <span className='top-search-bar-title'
                      style={{color: currentTheme?.mainPage.header.colorText}}>{t('main')}</span>
            </div>
            <div className="input-search-container">
                <label className="label-search-bar-style">
                    <input className='input-search-bar' type='text' placeholder={t('search') + '...'}/>
                    <span className="input-search-bar-icon search-icon-default"/>
                </label>
            </div>
            <div className='top-search-bar-tools-container'>
                <TopSearchBarItem icon={<IconPlus/>}/>
                <TopSearchBarItem icon={<IconFilter/>}/>
                <TopSearchBarItem icon={<IconNothification/>}/>
                <TopSearchBarItem icon={<IconMessages/>}/>
            </div>
        </div>
    )
};
