import { $api } from "../../shared/exportSharedMorules";
import { create } from "zustand";
import ENDPOINTS from "../../shared/api/endpoints";
import { persist } from "zustand/middleware";
import { ResponseCallback, ResponseDataCallback, pErrors } from "./utils";

interface IGroupStore {

    isLoading: boolean;

    createGroup: (callback: ResponseDataCallback, title: string, avatar: string, category: string) => Promise<void>;
    deleteGroup: (callback: ResponseCallback, groupId: string) => Promise<void>;
    getGroups: (callback: ResponseDataCallback, category?: string) => Promise<void>;
    getGroup: (callback: ResponseDataCallback, credentials: string) => Promise<void>;
    joinUnJoinGroup: (callback: ResponseDataCallback, groupId: string, join: boolean) => Promise<void>;
    

}
export const useGroupsStore = create<IGroupStore>()(
    persist(
        (set, get) => ({
            isLoading: false,
            createGroup: async (callback: ResponseDataCallback, title: string, avatar: string, category: string) => {

                try {
                    set({ isLoading: true });
                    const response = await $api.post<any>(ENDPOINTS.GROUPS.CREATE_GROUP, {Title: title, Avatar: avatar, Category: category});

                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isLoading: false }));
            },
            deleteGroup: async (callback: ResponseDataCallback, groupId: string) => {

                try {
                    set({ isLoading: true });
                    const response = await $api.post<any>(ENDPOINTS.GROUPS.CREATE_GROUP, {GroupId: groupId});

                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isLoading: false }));
            },
            joinUnJoinGroup: async (callback: ResponseDataCallback, groupId: string, join: boolean) => {

                try {
                    set({ isLoading: true });
                    const response = await $api.post<any>(join? ENDPOINTS.GROUPS.JOIN_GROUP: ENDPOINTS.GROUPS.UNJOIN_GROUP, {GroupId: groupId});

                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isLoading: false }));
            },
            getGroups: async (callback: ResponseDataCallback, category?: string) => {

                try {
                    set({ isLoading: true });
                    const response = await $api.get<any>(ENDPOINTS.GROUPS.GET_GROUPS+`/${category}`);

                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isLoading: false }));
            },
            getGroup: async (callback: ResponseDataCallback, credentials: string) => {

                try {
                    set({ isLoading: true });
                    const response = await $api.get<any>(ENDPOINTS.GROUPS.GET_GROUP + `/${credentials}`);

                    if (response?.status === 200) {
                        callback(response.data, []);
                    } else {
                        callback(null, pErrors(response.data.errors));
                    }
                } catch (error: any) {
                    callback(null, pErrors(['unknown_error']));

                }
                set((state) => ({ ...state, isLoading: false }));
            },

        }),
        {
            name: "user",
            version: 1,
        }
    )
);
