import CryptoJS from "crypto-js";

export const encryptImage = async (base64Data: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const encryptedData = CryptoJS.AES.encrypt(base64Data, "secret_key").toString();
        resolve(encryptedData);
    });
};



export const decryptImage = (encryptedData: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const decryptedData = CryptoJS.AES.decrypt(encryptedData, "secret_key").toString(CryptoJS.enc.Utf8);
            resolve(decryptedData);
        } catch (error) {
            reject(error);
        }
    });
};
