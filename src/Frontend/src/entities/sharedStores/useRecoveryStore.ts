import { EnumUserRole, ILoginRequest, IRegisterRequest, IUserData } from "../index";
import { create } from "zustand";
import { $api, decodeJwtToken } from "../../shared";
import ENDPOINTS from "../../shared/api/endpoints";
import { persist } from "zustand/middleware";
import { ResponseCallback, pErrors } from "./utils";




export interface IPhoneRecoveryRequest{
    phoneNumber: string;
    code: string;
}


interface IRecoveryStore {
    email: string | null;
    verificationCode: string | null;
    isLoading: boolean;

    verificateCode: (response: ResponseCallback,  params: { code: string }) => Promise<void>;
    confirmEmail: (callback: ResponseCallback,  params: { email: string }) => Promise<void>;
    setNewPassword: (callback: ResponseCallback,  params: { password: string }) => Promise<void>;
}
export const useRecoveryStore = create<IRecoveryStore>()(persist((set, get) => ({
    
    email: null,
    verificationCode: null,
    isLoading: false,

    verificateCode: async (callback: ResponseCallback,  params: { code: string }) =>
    {
        set({ isLoading: true, verificationCode: params.code });
        const request = {code: params.code, email: get().email};
        const response = await $api.post<any>(ENDPOINTS.RECOVERY.VERIFY_CODE, request);
        
        callback(pErrors(response.data.errors));

        set({ isLoading: false });
    },
    
    confirmEmail: async (callback: ResponseCallback,  params: { email: string }) => {

        set({ isLoading: true, email: params.email });

        const response = await $api.post<any>(ENDPOINTS.RECOVERY.CONFIRM_EMAIL, params);
        
        callback(pErrors(response.data.errors));

        set({ isLoading: false });

    },
    setNewPassword: async (callback: ResponseCallback,  params: { password: string }) => {

        set({ isLoading: true });

        const request = { email: get().email, code: get().verificationCode, newPassword: params.password};
        const response = await $api.post<any>(ENDPOINTS.RECOVERY.SET_NEW_PASSWORD, request);
        
        callback(pErrors(response.data.errors));

        set({ isLoading: false });

    },
    

}), {
    name: 'recovery',
    version: 1,
}));