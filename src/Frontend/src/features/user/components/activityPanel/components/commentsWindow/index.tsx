import React, { useEffect } from 'react';
import './index.css';
import { Box, CircularProgress } from '@mui/material';
import { usePostsStore, useThemeStore } from '../../../../../../entities';

export const CommentsWindow = () => {
    const { currentTheme } = useThemeStore();

    const { data, isLoading, errorMessage, getPosts } = usePostsStore();

    useEffect(() => {
        getPosts(); // Fetch posts when component mounts
    }, []);
    
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    
    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <div>
            <span>Comments</span>
        </div>

    )
};