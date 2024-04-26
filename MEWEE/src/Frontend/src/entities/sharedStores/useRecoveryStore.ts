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
        const response = await $api.post<any>(
          ENDPOINTS.RECOVERY.VERIFY_CODE,
          request
        );

        callback(pErrors(response.data.errors));

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
            { withCredentials: true }
          );
          
          // Check if the response is successful
          if (response.status === 200) {
            // Handle successful response
          } else {
            // Handle other non-200 responses
            callback(pErrors(['unknown_error']));
          }
        } catch (error:any) {
          // Handle Axios errors
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Server responded with error:", error.response.status);
            // Handle specific error codes or show a generic error message
            if (error.response.status === 500) {
              // Handle 500 Internal Server Error
            } else {
              // Handle other HTTP error codes
              callback(pErrors(['unknown_error']));
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
            // Handle network-related errors
            callback(pErrors(['network_error']));
          } else {
            // Something else happened in making the request that triggered an error
            console.error("Error in request:", error.message);
            // Handle other types of errors
            callback(pErrors(['unknown_error']));
          }
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
        const response = await $api.post<any>(
          ENDPOINTS.RECOVERY.SET_NEW_PASSWORD,
          request
        );

        callback(pErrors(response.data.errors));

        set({ isLoading: false });
      },
    }),
    {
      name: "recovery",
      version: 1,
    }
  )
);
