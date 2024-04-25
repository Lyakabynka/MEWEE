import { create } from "zustand";
import { posts } from "../../pages/home/dataHome";
import { ResponseCallback, ResponseDataCallback, decryptState, encryptState, pErrors } from "./utils";
import { $api, ENDPOINTS } from "../../shared/exportSharedMorules";
import { useAuthStore } from "./useAuthStore";
import { get } from "http";

interface IChatStore {
  isLoading: boolean;

  createChat: (callback: ResponseCallback, inviteUserId: string) => Promise<void>;
}

export const useChatStore = create<IChatStore>((set) => ({
  isLoading: false,

  createChat: async (callback: ResponseCallback, inviteUserId: string) => { 
    
    const response = await $api.post<any>(ENDPOINTS.USER.CREATE_CHAT, {InviteeUserId: inviteUserId});
    console.log(response);

    callback(pErrors(response.data.errors));

    if (response?.status == 200) {
      console.log(response.data);
    }

    set({ isLoading: false });
  }
}));
