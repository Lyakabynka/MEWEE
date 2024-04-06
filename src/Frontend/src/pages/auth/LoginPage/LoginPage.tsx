import React from 'react';
import { useAuthStore } from "../../../entities";
import { Navigate } from "react-router-dom";
import { EnumUserRole } from "../../../entities";
import { LoginForm } from "../../../features";
import { Box } from '@mui/material';

export const LoginPage = () => {

    const { isLoggedIn } = useAuthStore();

    if (isLoggedIn) {
        return <Navigate to='/feed'/>
    }

    return (
        <LoginForm />
    );
};