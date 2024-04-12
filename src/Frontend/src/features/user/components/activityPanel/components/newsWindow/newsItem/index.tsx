import React, { useEffect, useRef } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import './index.css';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../../../../../../entities';

export const NewsItem = (post: any) => {

    const { t } = useTranslation();
    const currentPost = post.post;
    // const { username, email, isLoggedIn, role, isEmailConfirmed } = useAuthStore();
    const { currentTheme } = useThemeStore();

    // Check if currentTheme exists before accessing custom values
    const CustomBox = currentTheme?.components?.MuiIcon;
    // const fio = username?.split(' ');
    return (
        <div className='news-item-generic-container' style={{ backgroundColor: currentTheme?.mainPage.post.background }}>
            { currentPost.description && <MediaElement currentPost={currentPost} imageUrl={currentPost.imageUrl}></MediaElement> }
            <header className='news-item-profile-main-container'>
                <div className='news-item-profile-main-section'>
                <span className='news-item-content-title-text'
                    style={{ color: currentTheme?.mainPage.post.colorText }}>{currentPost.title}</span>
                </div>

                <div className='news-item-more'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#B67AFE" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 7.19999C10.6745 7.19999 9.60001 6.12548 9.60001 4.79999C9.60001 3.47451 10.6745 2.39999 12 2.39999C13.3255 2.39999 14.4 3.47451 14.4 4.79999C14.4 6.12548 13.3255 7.19999 12 7.19999Z" stroke="#B67AFE" strokeWidth="2" />
                        <path d="M12 14.4C10.6745 14.4 9.60001 13.3255 9.60001 12C9.60001 10.6745 10.6745 9.59999 12 9.59999C13.3255 9.59999 14.4 10.6745 14.4 12C14.4 13.3255 13.3255 14.4 12 14.4Z" stroke="#B67AFE" strokeWidth="2" />
                        <path d="M12 21.6C10.6745 21.6 9.60001 20.5255 9.60001 19.2C9.60001 17.8745 10.6745 16.8 12 16.8C13.3255 16.8 14.4 17.8745 14.4 19.2C14.4 20.5255 13.3255 21.6 12 21.6Z" stroke="#B67AFE" strokeWidth="2" />
                    </svg>

                </div>
            </header>
            { !currentPost.description && <MediaElement currentPost={currentPost} imageUrl={currentPost.imageUrl}></MediaElement> }
            <footer>
                <span className='news-item-content-title-text'
                    style={{ color: currentTheme?.mainPage.post.colorText }}>{currentPost.description}</span>
                <nav className='news-item-nav'>
                    <button className='news-item-button-more'>{t('more')}</button>
                    <div className='news-item-tools'>
                        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="#B67AFE" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.09938 5.4992L3.09916 5.49941C2.01183 6.58707 1.401 8.06206 1.401 9.60001C1.401 11.138 2.01183 12.613 3.09916 13.7006L3.09922 13.7007L11.2928 21.8955C11.4804 22.083 11.7347 22.1884 12 22.1884C12.2652 22.1884 12.5196 22.083 12.7071 21.8955L20.8949 13.7065C21.4458 13.1728 21.8853 12.5351 22.1881 11.8302C22.492 11.1226 22.652 10.3615 22.6587 9.59143C22.6654 8.82131 22.5187 8.05757 22.2271 7.34477C21.9354 6.63197 21.5048 5.98439 20.9602 5.43981C20.4156 4.89523 19.768 4.46456 19.0552 4.17293C18.3424 3.8813 17.5787 3.73455 16.8086 3.74125C16.0384 3.74794 15.2774 3.90794 14.5697 4.21191C13.865 4.51466 13.2273 4.95418 12.6936 5.505L12 6.198L11.3006 5.4992C11.3005 5.49913 11.3004 5.49907 11.3004 5.499C10.2127 4.41179 8.73784 3.80104 7.19998 3.80104C5.66202 3.80104 4.18704 4.41187 3.09938 5.4992Z" stroke="#B67AFE" strokeWidth="2" strokeLinejoin="round"/>
                        </svg> */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#B67AFE" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.0704 2.92958L10.4065 13.5935M3.27112 8.23526L19.877 2.47403C20.8996 2.11924 21.8808 3.10037 21.526 4.123L15.7648 20.7289C15.3701 21.8665 13.7726 21.8977 13.3338 20.7764L10.6969 14.0376C10.5652 13.7011 10.2989 13.4348 9.96238 13.3031L3.22366 10.6662C2.10232 10.2274 2.13351 8.62994 3.27112 8.23526Z" stroke="#B67AFE" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#B67AFE" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.2338 15.6356C20.7253 14.5238 20.9983 13.2938 20.9983 12C20.9983 7.02944 16.9692 3 11.9991 3C7.02906 3 3 7.02944 3 12C3 16.9706 7.02906 21 11.9991 21C13.5993 21 15.1019 20.5823 16.4039 19.85L21 20.9991L20.2338 15.6356Z" stroke="#B67AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </nav>
            </footer>
        </div>
    )
};



const MediaElement = (currentPost: any, imageUrl: any) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('ended', handleVideoEnded);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('ended', handleVideoEnded);
            }
        };
    }, []);

    const handleVideoEnded = () => {
        // Reset the playback time to 0 when the video ends
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play(); // Start playing again
        }
    };
    const isImage = (url: string) => {
        return /\.(jpeg|jpg|gif|png)$/i.test(url);
    };

    const isVideo = (url: string) => {
        return /\.(mp4|webm|ogg)$/i.test(url);
    };
    return (<main className='news-item-content'>
        {isImage(currentPost.imageUrl) ? (
            <img className='news-item-image' src={currentPost.imageUrl} alt="Post Image" />
        ) : isVideo(currentPost.imageUrl) ? (
            <video className='news-item-video' ref={videoRef} autoPlay muted>
                <source src={currentPost.imageUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        ) : (
            <span>Unsupported media format</span>
        )}
    </main>);
}