import React, { useEffect } from 'react';
import './index.css';
import { EnumActivityType, usePostsStore, useThemeStore } from '../../../../entities';
import { FeedPost } from '../feeds/components/post';
import { Box, CircularProgress } from '@mui/material';
import { NewsItem } from './components/newsWindow/newsItem';
import { NewsWindow } from './components/newsWindow';
import { CommentsWindow } from './components/commentsWindow';

export const ActivityPanel: React.FC<{ activityType: EnumActivityType }> = ({ activityType }) => {
    const { currentTheme } = useThemeStore();


    return (
        <div className='activity-panel-generic-container' style={{backgroundColor: currentTheme?.mainPage.post.background}}>
                { activityType === EnumActivityType.News && <NewsWindow></NewsWindow>}
                { activityType === EnumActivityType.Comments && <CommentsWindow></CommentsWindow>}
        </div>

    )
};
