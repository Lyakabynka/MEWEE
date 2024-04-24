import { create } from "zustand";
import { posts } from "../../pages/home/dataHome";
import { ResponseCallback, decryptState, encryptState, pErrors } from "./utils";
import { $api, ENDPOINTS } from "../../shared/exportSharedMorules";
import { useAuthStore } from "./useAuthStore";

interface IPoststore {
  isLoading: boolean;
  getPosts: (callback: ResponseCallback, id: any) => Promise<void>;
}

export const usePostsStore = create<IPoststore>((set) => ({
  isLoading: false,

  getPosts: async (callback: ResponseCallback, id: any) => { 
    
    const response = await $api.post<any>(ENDPOINTS.HOME.GET_POSTS, {userId: id});
    console.log(response);

    callback(pErrors(response.data.errors));

    if (response?.status == 200) {
      console.log(response.data);

      const userData: any = response.data;
      console.log(userData);

    }

    set({ isLoading: false });
  },
}));
