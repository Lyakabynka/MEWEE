import React from 'react';
import { useAuthStore } from "../../../entities";
import { Navigate } from 'react-router-dom';

export const LogoutPage = () => {

    const { isLoggedIn, logout } = useAuthStore();

    console.log(isLoggedIn);
    if (isLoggedIn)
    {
         logout();
    }
    return (
        <>
            {!isLoggedIn &&
                <Navigate to='/auth/login' />}
        </>
    );
};
