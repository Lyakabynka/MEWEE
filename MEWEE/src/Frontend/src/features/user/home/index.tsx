import React from 'react'
import { Grid } from '@mui/material';
import { useAuthStore } from '../../../entities';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import { SideToolbar } from '../components/sideToolbar';
import { ThemeProvider, useTheme } from 'styled-components';
import { TopSearchBar } from '../components/topSearchBar';
import './index.css';
import { FeedsContainer } from '../components/feeds';
import { HomeNews } from '../components/news';

export const HomePageForm = () => {

    const { t } = useTranslation();

    return (
        <div className='home-generic-container'>
            <SideToolbar></SideToolbar>
            <div className='home-main-container'>
                <TopSearchBar></TopSearchBar>
                <div className='home-generic-content-holder'>
                    <FeedsContainer></FeedsContainer>
                    <HomeNews></HomeNews>
                </div>
            </div>

        </div>
    )
            // <Grid container direction="column" alignItems="center">
        //     <h4>Username: </h4>
        //     <h6>Email: {email} | {isEmailConfirmed ? 'Email confirmed' : 'Confirm your email' }</h6>
        //     <h6>Role: {role}</h6>
        //     <Link href="/logout">{t('Logout')}</Link>
                // </Grid>
}