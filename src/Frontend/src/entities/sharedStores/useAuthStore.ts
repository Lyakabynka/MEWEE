import {
  IConfirmEmailRequest,
  ILoginRequest,
  IRegisterRequest,
  IUserData,
} from "../index";
import { $api, decodeJwtToken } from "../../shared/exportSharedMorules";
import { create } from "zustand";
import ENDPOINTS from "../../shared/api/endpoints";
import { persist } from "zustand/middleware";
import { AES, enc } from "crypto-js";
import { error } from "console";
import { ResponseCallback, ResponseDataCallback, decryptState, encryptState, pErrors } from "./utils";
import { AxiosInstance } from "axios";

interface IAuthStore {
  isLoggedIn: boolean;

  id: string | null;
  firstName: string | null;
  secondName: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
  role: string | null;
  isEmailConfirmed: boolean | null;
  platform: string | null;

  isLoading: boolean;

  login: (callback: ResponseCallback, params: ILoginRequest) => Promise<void>;
  register: (
    callback: ResponseCallback,
    params: IRegisterRequest
  ) => Promise<void>;
  confirmEmail: (
    callback: ResponseCallback,
    params: IConfirmEmailRequest
  ) => Promise<void>;

  logout: () => Promise<void>;


  clearAuth: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      id: null,
      firstName: null,
      secondName: null,
      username: null,
      email: null,
      avatar: null,
      role: null,
      platform: null,
      isEmailConfirmed: null,
      isLoggedIn: false,

      login: async (callback: ResponseCallback, params: ILoginRequest) => {

        set({ isLoading: true });
        try {

          const response = await $api.post<IUserData | any>(
            ENDPOINTS.AUTH.LOGIN,
            params
          );
          console.log(response);

          callback(pErrors(response.data.errors));

          if (response?.status == 200) {
            console.log(response.data);

            const userData: IUserData = response.data;
            console.log(userData);

            set({ isLoggedIn: true });
            set({
              id: userData?.id,
              username: userData?.username,
              firstName: userData?.firstName,
              secondName: userData?.secondName,
              email: userData?.email,
              role: userData?.role,
              avatar: userData?.avatar,
              isEmailConfirmed: userData?.isEmailConfirmed,
              platform: userData?.platform,
            });


            console.log(document.cookie);
          } else {
            callback(pErrors(response.data.errors));
          }
        } catch (error: any) {
          callback(pErrors(['unknown_error']));

        }

        set({ isLoading: false });
      },

      register: async (
        callback: ResponseCallback,
        params: IRegisterRequest
      ) => {
        set({ isLoading: true });

        try {
          const response = await $api.post<any>(ENDPOINTS.USER.REGISTER, params, { withCredentials: false });


          if (response?.status == 200) {
            const userData: IUserData = response.data;
            console.log(userData);

            callback([]);
            set({
              id: userData?.id,
              username: userData?.username,
              email: userData?.email,
              role: userData?.role,
              isEmailConfirmed: userData?.isEmailConfirmed,
              platform: userData?.platform,
            });
          } else {
            callback(pErrors(response.data.errors));
          }
        } catch (error: any) {
          callback(pErrors(['unknown_error']));

        }

        set({ isLoading: false });
      },

      confirmEmail: async (
        callback: ResponseCallback,
        params: IConfirmEmailRequest
      ) => {
        try {
          const response = await $api.post<any>(
            ENDPOINTS.USER.CONFIRM_EMAIL,
            params,
            { withCredentials: false }
          );
          if (response?.status == 200) {
            callback([]);
          } else {
            callback(pErrors(['unknown_error']));
          }
        } catch (error: any) {
          callback(pErrors(['unknown_error']));

        }

        set({ isLoading: false });
      },

      logout: async () => {
        console.log("oki");
        await $api.delete<any>(ENDPOINTS.AUTH.LOGOUT, {
          method: "DELETE",
        });

        const { clearAuth } = get();
        clearAuth();
      },

      clearAuth: () => {
        set({ role: null, isLoggedIn: false });
        localStorage.removeItem("auth");
      },
    }),
    {
      name: "auth",
      version: 1,
      storage: {
        getItem: (key) => decryptState(localStorage.getItem(key)),
        setItem: (key, value) => localStorage.setItem(key, encryptState(value)),
        removeItem: (key) => localStorage.removeItem(key),
      },
    }
  )
);
