export const API_URL = 'http://localhost:5000';

export const ENDPOINTS = {
    AUTH : {
        LOGIN: `${API_URL}/auth/login`,
        REFRESH: `${API_URL}/auth/refresh`,
        LOGOUT: `${API_URL}/auth/logout`,
        //CHECK_EMAIL: `https://65f7919db4f842e80885b525.mockapi.io/auth/check-email/check-email`,
    },
    GROUPS: {
        CREATE_GROUP: `${API_URL}/create-group`,
        DELETE_GROUP: `${API_URL}/delete-group`,
        GET_GROUPS: `${API_URL}/groups`,
        GET_GROUP: `${API_URL}/get-group`,
        JOIN_GROUP: `${API_URL}/join-group`,
        UNJOIN_GROUP: `${API_URL}/unjoin-group`,
    },
    USER :{
        REGISTER: `${API_URL}/user/register`,
        GET_PROFILE_DATA: `${API_URL}/user/profile`,
        UPDATE_PROFILE_DATA: `${API_URL}/user/profile`,
        CONFIRM_EMAIL: `${API_URL}/user/confirm-email`,
        GET_POSTS: `${API_URL}/posts`,
        GET_POST: `${API_URL}/get-post`,
        SAVE_POST: `${API_URL}/save-post`,
        GET_POST_SAVE: `${API_URL}/get-post-save`,
        UNSAVE_POST: `${API_URL}/unsave-post`,
        POST: `${API_URL}/post`,
        CREATE_CHAT: `${API_URL}/chat`,
        GET_CHATS: `${API_URL}/get-chats`,
        GET_CONVERSATION: `${API_URL}/get-conversation`,
        GET_FOLLOWERS: `${API_URL}/followers`,
        GET_FOLLOWINGS: `${API_URL}/followings`,
        GET_FRIENDS: `${API_URL}/friends`,
        
        
        FOLLOW_USER: `${API_URL}/follow-user`,
        UNFOLLOW_USER: `${API_URL}/unfollow-user`,
        FIND_PEOPLE: `${API_URL}/find-groups-and-users`,

        UPLOAD_PHOTO_TO_PROFILE: `${API_URL}/user/photo`,
        GET_PROFILE_GALLERY: `${API_URL}/user/photos`,
    },
    POST:
    {
        GET_COMMENTS: `${API_URL}/comments`,
        CREATE_COMMENT: `${API_URL}/comment`,
    },
    HOME :
    {
        FIND_POSTS: `${API_URL}/posts/find`,
        LIKE_POST: `${API_URL}/like-post`,
        UNLIKE_POST: `${API_URL}/unlike-post`,
        GET_POST_LIKES: `${API_URL}/post-likes`,
    },
    RECOVERY:
    {
        CONFIRM_EMAIL: `${API_URL}/user/forgot-password`,
        VERIFY_CODE: `${API_URL}/user/check-forgot-password`,
        SET_NEW_PASSWORD: `${API_URL}/user/restore-password`,
    },
    FEEDS :{
        GET_POSTS: `https://sparkling-article.com/posts.json`,
    },
    ADMINISTRATOR: {
       
    },
    PLAN: {
        GET_PLANS: `${API_URL}/plans`,
        ADD_PLAN: `${API_URL}/plan`,
        DELETE_PLAN: `${API_URL}/plan/{id:guid}`
    },
    SCHEDULED_PLAN: {
        CREATE_SCHEDULED_PLAN: `${API_URL}/scheduled-plan`,
        DELETE_SCHEDULED_PLAN: `${API_URL}/scheduled-plan/{id:guid}`,
        GET_SCHEDULED_PLANS: `${API_URL}/scheduled-plans/{planId:guid}`
    },
    PLANGROUP: {
        GET_PLANGROUPS: `${API_URL}/plan-groups`,
        CREATE_PLANGROUP: `${API_URL}/plan-group`,
        SET_PLANS_TO_PLANGROUP: `${API_URL}/plan-group/{id:guid}/plans`,
        DELETE_PLANGROUP: `${API_URL}/plan-group/{id:guid}`,
        GET_PLANGROUP: `${API_URL}/plan-group/{id:guid}`
    },
    SCHEDULED_PLANGROUP: {
        CREATE_SCHEDULED_PLANGROUP: `${API_URL}/scheduled-plan-group`,
    }
}

export default ENDPOINTS;
