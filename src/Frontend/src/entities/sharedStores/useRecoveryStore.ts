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
import { ResponseCallback, pErrors } from "./utils";

export interface IPhoneRecoveryRequest {
  phoneNumber: string;
  code: string;
}

interface IRecoveryStore {
  email: string | null;
  verificationCode: string | null;
  isLoading: boolean;

  verificateCode: (
    response: ResponseCallback,
    params: { code: string }
  ) => Promise<void>;
  confirmEmail: (
    callback: ResponseCallback,
    params: { email: string }
  ) => Promise<void>;
  setNewPassword: (
    callback: ResponseCallback,
    params: { password: string }
  ) => Promise<void>;
}
export const useRecoveryStore = create<IRecoveryStore>()(
  persist(
    (set, get) => ({
      email: null,
      verificationCode: null,
      isLoading: false,

      verificateCode: async (
        callback: ResponseCallback,
        params: { code: string }
      ) => {
        set({ isLoading: true, verificationCode: params.code });
        const request = { code: params.code, email: get().email };

        try {
          const response = await $api.post<any>(
            ENDPOINTS.RECOVERY.VERIFY_CODE,
            request,
            { withCredentials: false }
          );

          if (response.status === 200) {
            callback(pErrors([]));
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
        params: { email: string },
      ) => {
        set({ isLoading: true, email: params.email });

        try {
          const response = await $api.post<any>(
            ENDPOINTS.RECOVERY.CONFIRM_EMAIL,
            { email: params.email },
            { withCredentials: false }
          );

          // Check if the response is successful
          if (response.status === 200) {
            // Handle successful response
            callback(pErrors([]));
          } else {
            // Handle other non-200 responses
            callback(pErrors(response.data.errors));
          }
        } catch (error: any) {
          // Handle Axios error
          callback(pErrors(['unknown_error']));

        }

        set({ isLoading: false });
      },

      setNewPassword: async (
        callback: ResponseCallback,
        params: { password: string }
      ) => {
        set({ isLoading: true });

        const request = {
          email: get().email,
          code: get().verificationCode,
          newPassword: params.password,
        };

        try {
          const response = await $api.post<any>(
            ENDPOINTS.RECOVERY.SET_NEW_PASSWORD,
            request
          );

          if (response.status === 200) {
            callback(pErrors([]));
          } else {
            callback(pErrors(response.data.errors));
          }
        } catch (error: any) {
          callback(pErrors(['unknown_error']));

        }

        set({ isLoading: false });
      },
    }),
    {
      name: "recovery",
      version: 1,
    }
  )
);
