import {
    IConfirmEmailRequest,
    ILoginRequest,
    IRegisterRequest,
    IUserData,
    useAuthStore,
} from "../index";
import { $api, decodeJwtToken } from "../../shared/exportSharedMorules";
import { create } from "zustand";
import ENDPOINTS from "../../shared/api/endpoints";
import { persist } from "zustand/middleware";
import { AES, enc } from "crypto-js";
import { error } from "console";
import { ResponseCallback, ResponseDataCallback, decryptState, encryptState, pErrors } from "./utils";
import { AxiosInstance } from "axios";

interface IUserStore {


    isUserStoreLoading: boolean;

    followers: any;
    followings: any;


    setFollowers: (followers: any) => void;
    setFollowings: (followings: any) => void;

    getProfile: (callback: ResponseDataCallback,
        userId: string
    ) => Promise<void>;

    updateProfile: (callback: ResponseCallback,
        profileAvatarData: string
    ) => Promise<void>;

    updateProfileFields: (callback: ResponseCallback,
        data: any
    ) => Promise<void>;


    getFollowers: (callback: ResponseDataCallback,
        userId: string
    ) => Promise<void>;
    getFollowings: (callback: ResponseDataCallback,
        userId: string
    ) => Promise<void>;

    getFriends: (callback: ResponseDataCallback,
        userId: string
    ) => Promise<void>;

    followUser: (callback: ResponseCallback,
        userId: string
    ) => Promise<void>;

    unfollowUser: (callback: ResponseCallback,
        userId: string
    ) => Promise<void>;

    uploadPhotoToProfile: (callback: ResponseCallback,
        imageData: string
    ) => Promise<void>;

    getProfileGallery: (callback: ResponseDataCallback,
        userId:string
    ) => Promise<void>;

    findPeople: (callback: ResponseDataCallback,
        searchQuery:string,
        pagination: any
    ) => Promise<void>;
    
}
export const useUserStore = create<IUserStore>()(
    persist(
        (set, get) => ({
            isUserStoreLoading: false,
            followers: null,
            followings: null,

            setFollowers: (followers: any) => {
                set((state) => ({ ...state, followers: followers[0] }));
            },
            setFollowings: (followings: any) => {
                set((state) => ({ ...state, followings: followings[0] }));
            },
            getProfile: async (callback: ResponseDataCallback, userId: string) => {

                try {
                    set({ isUserStoreLoading: true });
                    const response = await $api.get<any>(ENDPOINTS.USER.GET_PROFILE_DATA + `/${userId}`);

                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isUserStoreLoading: false }));
            },
            updateProfile: async (
                callback: ResponseCallback,
                profileAvatarData: string
            ) => {
                try {
                    const response = await $api.put<any>(
                        ENDPOINTS.USER.UPDATE_PROFILE_DATA,
                        { ProfileAvatar: profileAvatarData },
                        { withCredentials: true }
                    );
                    if (response?.status == 200) {
                        callback([]);
                    } else {
                        callback(pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(pErrors(['unknown_error']));

                }

                set({ isUserStoreLoading: false });
            },
            updateProfileFields: async (
                callback: ResponseCallback,
                request: any
            ) => {
                try {
                    const response = await $api.put<any>(
                        ENDPOINTS.USER.UPDATE_PROFILE_DATA, request,
                        { withCredentials: true }
                    );
                    if (response?.status == 200) {
                        callback([]);
                    } else {
                        callback(pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(pErrors(['unknown_error']));

                }

                set({ isUserStoreLoading: false });
            },
            getFollowers: async (callback: ResponseDataCallback, userId: string) => {

                try {
                    set({ isUserStoreLoading: true });
                    const response = await $api.get<any>(ENDPOINTS.USER.GET_FOLLOWERS + `/${userId}`);

                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isUserStoreLoading: false }));
            },

            getFollowings: async (callback: ResponseDataCallback, userId: string) => {

                try {
                    set({ isUserStoreLoading: true });
                    const response = await $api.get<any>(ENDPOINTS.USER.GET_FOLLOWINGS + `/${userId}`);

                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isUserStoreLoading: false }));
            },
            getFriends: async (callback: ResponseDataCallback, userId: string) => {

                try {
                    set({ isUserStoreLoading: true });
                    const response = await $api.get<any>(ENDPOINTS.USER.GET_FRIENDS + `/${userId}`);

                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isUserStoreLoading: false }));
            },


            followUser: async (callback: ResponseCallback, userId: string) => {

                try {
                    set({ isUserStoreLoading: true });
                    const response = await $api.post<any>(ENDPOINTS.USER.FOLLOW_USER, { FollowingUserId: userId });

                    if (response?.status === 200) {
                        callback([]);
                    } else {
                        callback(pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isUserStoreLoading: false }));
            },
            unfollowUser: async (callback: ResponseCallback, userId: string) => {

                try {
                    set({ isUserStoreLoading: true });
                    const response = await $api.post<any>(
                        ENDPOINTS.USER.UNFOLLOW_USER,
                        { FollowingUserId: userId },
                    );
                    if (response?.status === 200) {
                        callback([]);
                    } else {
                        callback(pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isUserStoreLoading: false }));
            },
            uploadPhotoToProfile: async (callback: ResponseCallback, imageData: string) => {

                try {
                    set({ isUserStoreLoading: true });
                    const response = await $api.post<any>(
                        ENDPOINTS.USER.UPLOAD_PHOTO_TO_PROFILE,
                        { Photo: imageData },
                    );
                    if (response?.status === 200) {
                        callback([]);
                    } else {
                        callback(pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isUserStoreLoading: false }));
            },
            getProfileGallery: async (callback: ResponseDataCallback, userId: string) => {

                try {
                    set({ isUserStoreLoading: true });
                    const response = await $api.get<any>(ENDPOINTS.USER.GET_PROFILE_GALLERY+ `/${userId}`);
                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isUserStoreLoading: false }));
            },
            findPeople: async (callback: ResponseDataCallback, searchQuery: string, pagination: any) => {

                try {
                    set({ isUserStoreLoading: true });
                    const response = await $api.post<any>(
                        ENDPOINTS.USER.FIND_PEOPLE,
                        { searchQuery: searchQuery, pagination: pagination },
                    );
                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isUserStoreLoading: false }));
            },

        }),
        {
            name: "user",
            version: 1,
        }
    )
);
