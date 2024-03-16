import React from 'react'
import { Grid } from '@mui/material';
import { useAuthStore } from '../../../entities';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';

export const UserProfile = () => {

    const { t } = useTranslation();

    const { username, email, role, isEmailConfirmed } = useAuthStore();

    return (
        <Grid container direction="column" alignItems="center">
            <h4>Username: {username}</h4>
            <h6>Email: {email} | {isEmailConfirmed ? 'Email confirmed' : 'Confirm your email' }</h6>
            <h6>Role: {role}</h6>
            <Link href="/logout">{t('Logout')}</Link>
        </Grid>
    )
}