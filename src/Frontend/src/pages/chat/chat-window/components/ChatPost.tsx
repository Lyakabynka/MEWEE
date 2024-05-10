import React, { FC, useEffect, useState } from "react";
import { useGroupsStore, usePostsStore, useUserStore } from "../../../../entities";
import DecryptedImg from "../../../profile/DecryptedImg";
import styles from "./chat_post.module.scss"
import { useNavigate } from "react-router-dom";

export const ChatPost: FC<{ postId: string }> = ({ postId }) => {

    const [myPost, setMyPost] = useState<any>(null);
    const [author, setAuthor] = useState<any>(null);
    const { getPost } = usePostsStore();
    const { getGroup } = useGroupsStore();
    const { getProfile} = useUserStore();
    const navigate = useNavigate();

    const onResponse = (data: any, errors: string[]) => {
        if (errors.length == 0 && data !== null) {
            setMyPost(data);
            data.category.includes("User")?
            getProfile(onProfileResponse, data.authorId)
            :
            getGroup(onGroupResponse, data.authorId);
            console.log(data);
        }
    };
    const onProfileResponse = (data: any, errors: string[]) => {
        if (errors.length == 0 && data !== null) {
            setAuthor(data);
        }
    };
    const onGroupResponse = (data: any, errors: string[]) => {
        if (errors.length == 0 && data !== null) {
            setAuthor(data.group);
        }
    };

    useEffect(() => {
        getPost(onResponse, postId);
    }, [])

    return (
        <>
            {(myPost && author) && (
                <div className={styles.div} onClick={() => {navigate('/post/' + postId)}}>
                    <header className={styles.header}>
                        <div className={styles.hdiv}>
                            <DecryptedImg className={styles.himg} content={author.avatar}></DecryptedImg>
                        </div>
                        <span>{author.username ?? author.nickname}</span>
                    </header>
                    <footer className={styles.footer}>
                        <DecryptedImg size="100%" content={myPost.attachment}></DecryptedImg>
                        <span>{myPost.title}</span>
                    </footer>
                </div>
            )}
        </>
    );
};
