import React, { useEffect } from 'react';
import { useAuthStore } from "../../../entities";
import { Navigate } from "react-router-dom";
import { EnumUserRole } from "../../../entities";
import { LoginForm } from "../../../features";
import { Box } from '@mui/material';
import { IAuthPageProps } from '../IAuthPageProps';

export const LoginPage: React.FC<IAuthPageProps> = ({ setActiveAuthNav }) => {

    useEffect(() => { setActiveAuthNav(true); });

    const { role, isLoggedIn } = useAuthStore();

    if (isLoggedIn) {
        switch (role) {
            case EnumUserRole.user:
                return <Navigate to='/feed' />
            case EnumUserRole.administrator:
                return <Navigate to='/administrator' />
            default:
                console.error('Unexpected user role');
                break;
        }
    }

    return (
        <LoginForm />
    );
};