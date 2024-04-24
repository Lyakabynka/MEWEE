import { AES, enc } from "crypto-js";

export const encryptState = (state: any) => {
    const encryptedState = AES.encrypt(JSON.stringify(state), "secret-key-from-environment");
    return encryptedState.toString();
};

export const decryptState = (encryptedState: any) => {
    const decryptedState = AES.decrypt(encryptedState, "secret-key-from-environment");
    return JSON.parse(decryptedState.toString(enc.Utf8));
};

export type ResponseCallback = (errors: string[]) => void;
export type ResponseDataCallback = (data: any, errors: string[]) => void;
export const pErrors = (errors: object) => (errors !== null && errors !== undefined) ? Object.values(errors).flatMap(error => Array.isArray(error) ? error : [error]) : [];
