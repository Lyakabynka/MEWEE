import React, { useEffect } from 'react';
import { EnumUserRole, useAuthStore } from "../../../entities";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { HomePageForm } from '../../../features';

export const HomePage = () => {

    const { isLoggedIn, role } = useAuthStore();

    if (!isLoggedIn)
        return <Navigate to='/auth/login' />

    return (
        <HomePageForm />
    )
};
