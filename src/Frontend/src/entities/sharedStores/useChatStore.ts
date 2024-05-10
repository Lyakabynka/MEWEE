import { create } from "zustand";
import { ResponseCallback, ResponseDataCallback, decryptState, encryptState, pErrors } from "./utils";
import { $api, ENDPOINTS } from "../../shared/exportSharedMorules";

interface IChatStore {
  currentChatId: any;
  isLoading: boolean;

  setCurrentChat: (chatData: any) => void;
  createChat: (callback: ResponseCallback, inviteUserId: string) => Promise<void>;
  getChats: (callback: ResponseDataCallback) => Promise<void>;
  getConversation: (callback: ResponseDataCallback, chatId: string) => Promise<void>;
}

export const useChatStore = create<IChatStore>((set) => ({
  isLoading: false,
  currentChatId: null,

  setCurrentChat:(chatData: any) => {
    set({ currentChatId: chatData });
  },
  createChat: async (callback: ResponseCallback, inviteUserId: string) => {

    set({ isLoading: true });
    try {
      const response = await $api.post<any>(ENDPOINTS.USER.CREATE_CHAT, { InviteeUserId: inviteUserId });
      console.log(response);

      
      if (response?.status == 200) {
        callback([]);
        console.log(response.data);
      } else {
        callback(pErrors(response.data.errors));
      }
    } catch (error: any) {
      callback(pErrors(['unknown_error']));

    }


    set({ isLoading: false });
  },
  getChats: async (callback: ResponseDataCallback) => {

    set({ isLoading: true });
    try {
      const response = await $api.get<any>(ENDPOINTS.USER.GET_CHATS);


      if (response?.status == 200) {
        console.log(response.data);
        callback(response.data, []);
      } else {
        callback(null, pErrors(response.data.errors));
      }
    } catch (error: any) {
      callback(null, pErrors(['unknown_error']));

    }
    set({ isLoading: false });
  },
  getConversation: async (callback: ResponseDataCallback, chatId: string) => {

    set({ isLoading: true });
    try {
      const response = await $api.post<any>(ENDPOINTS.USER.GET_CONVERSATION, {chatId});


      if (response?.status == 200) {
        console.log(response.data);
        callback(response.data, []);
      } else {
        callback(null, pErrors(response.data.errors));
      }
    } catch (error: any) {
      callback(null, pErrors(['unknown_error']));

    }
    set({ isLoading: false });
  }
}));
