import { EnumUserRole, ILoginRequest, IRegisterRequest, IUserData } from "..";
import { create } from "zustand";
import { $api, decodeJwtToken } from "../../shared";
import ENDPOINTS from "../../shared/api/endpoints";
import { persist } from "zustand/middleware";

export interface IEmailRecoveryRequest {
  email: string;
  code: string;
}
export interface IPhoneRecoveryRequest {
  phoneNumber: string;
  code: string;
}

interface IRecoveryStore {
  isEmailConfirmed: boolean | null;
  isLoading: boolean;

  errorField: string | null;
  errorMessage: string | null;

  usingEmail: (params: IEmailRecoveryRequest) => Promise<void>;
  usingPhone: (params: IPhoneRecoveryRequest) => Promise<void>;

  //clearAuth: () => void;
  resetErrorInfo: () => void;
}

export const useRecoveryStore = create<IRecoveryStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      isEmailConfirmed: null,
      errorField: null,
      errorMessage: null,

      usingEmail: async (params: IEmailRecoveryRequest) => {
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
      usingPhone: async (params: IPhoneRecoveryRequest) => {},
      // clearAuth: () => {
      //     localStorage.removeItem('recovery');
      // },
      resetErrorInfo: () => {
        set({ isLoading: false, errorField: null, errorMessage: null });
      },
    }),
    {
      name: "recovery",
      version: 1,
      //serialize: state => encryptState(state),
      //deserialize: state => decryptState(state)
    }
  )
);
