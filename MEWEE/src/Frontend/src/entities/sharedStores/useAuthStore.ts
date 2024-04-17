import {
  IConfirmEmailRequest,
  ILoginRequest,
  IRegisterRequest,
  IUserData,
} from "..";
import { $api, decodeJwtToken } from "../../shared";
import { create } from "zustand";
import ENDPOINTS from "../../shared/api/endpoints";
import { persist } from "zustand/middleware";
import { AES, enc } from "crypto-js";
import { error } from "console";

const encryptState = (state: any) => {
  const encryptedState = AES.encrypt(
    JSON.stringify(state),
    "secret-key-from-environment"
  );
  return encryptedState.toString();
};

const decryptState = (encryptedState: any) => {
  const decryptedState = AES.decrypt(
    encryptedState,
    "secret-key-from-environment"
  );
  return JSON.parse(decryptedState.toString(enc.Utf8));
};

const pErrors = (errors: object) =>
  errors !== null && errors !== undefined
    ? Object.values(errors).flatMap((error) =>
        Array.isArray(error) ? error : [error]
      )
    : [];

type Callback = (errors: string[]) => void;
interface IAuthStore {
  isLoggedIn: boolean;
  id: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  isEmailConfirmed: boolean | null;
  resetErrorInfo: string | null;
  errorMessage: string | null;
  platform: string | null;
  isLoading: boolean;

  login: (callback: Callback, params: ILoginRequest) => Promise<void>;
  register: (callback: Callback, params: IRegisterRequest) => Promise<void>;
  confirmEmail: (
    callback: Callback,
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
      username: null,
      email: null,
      role: null,
      platform: null,
      isEmailConfirmed: null,
      isLoggedIn: false,
      resetErrorInfo: null,
      errorMessage: null,
      login: async (callback: Callback, params: ILoginRequest) => {
        const response = await $api.post<IUserData | any>(
          ENDPOINTS.AUTH.LOGIN,
          params
        );
        console.log(response.data);

        callback(pErrors(response.data.errors));

        if (response?.status == 200) {
          console.log(response.data);

          const userData: IUserData = response.data;
          console.log(userData);

          set({
            id: userData?.id,
            username: userData?.username,
            email: userData?.email,
            role: userData?.role,
            isEmailConfirmed: userData?.isEmailConfirmed,
            platform: userData?.platform,
          });

          set({ isLoggedIn: true });
        }

        set({ isLoading: false });
      },

      register: async (callback: Callback, params: IRegisterRequest) => {
        set({ isLoading: true });

        const response = await $api.post<any>(ENDPOINTS.USER.REGISTER, params);

        callback(pErrors(response.data.errors));

        if (response?.status == 200) {
          const userData: IUserData = response.data;
          console.log(userData);

          set({
            id: userData?.id,
            username: userData?.username,
            email: userData?.email,
            role: userData?.role,
            isEmailConfirmed: userData?.isEmailConfirmed,
            platform: userData?.platform,
          });
        }

        set({ isLoading: false });
      },

      confirmEmail: async (
        callback: Callback,
        params: IConfirmEmailRequest
      ) => {
        const response = await $api.post<any>(
          ENDPOINTS.USER.CONFIRM_EMAIL,
          params
        );
        console.log(response.data);
        console.log(response.data.errors);

        callback(pErrors(response.data.errors));

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
      serialize: (state) => encryptState(state),
      deserialize: (state) => decryptState(state),
    }
  )
);
