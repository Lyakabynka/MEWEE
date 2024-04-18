import {
  EnumUserRole,
  ILoginRequest,
  IRegisterRequest,
  IUserData,
} from "../index";
import { create } from "zustand";
import { $api, decodeJwtToken } from "../../shared/exportSharedMorules";
import ENDPOINTS from "../../shared/api/endpoints";
import { persist } from "zustand/middleware";
import { AES, enc } from "crypto-js";
export interface IEmailRequest {
  email: string;
}

interface IEmailStore {
  isEmailConfirmed: boolean | null;

  isLoading: boolean;

  errorField: string | null;
  errorMessage: string | null;

  checkEmail: (params: IEmailRequest) => Promise<void>;

  clearAuth: () => void;
  resetErrorInfo: () => void;
}

export const useEmailStore = create<IEmailStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      email: null,
      isEmailConfirmed: null,
      errorField: null,
      errorMessage: null,

      checkEmail: async (params: IEmailRequest) => {
        set({ isLoading: true });
        console.log(params);
        const response = await $api.post<any>(
          ENDPOINTS.USER.CONFIRM_EMAIL,
          params
        );

        if (response?.status == 409) {
          const error = response.data.error;
          set({ errorField: error.errorCode, errorMessage: error.message });
        }
        console.log(response?.data);

        set({ isLoading: false, errorMessage: response?.data });
      },

      clearAuth: () => {
        localStorage.removeItem("email");
      },
      resetErrorInfo: () => {
        set({ isLoading: false, errorField: null, errorMessage: null });
      },
    }),
    {
      name: "email",
      version: 1,
      //serialize: state => encryptState(state),
      //deserialize: state => decryptState(state)
    }
  )
);
