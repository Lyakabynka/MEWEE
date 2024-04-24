import CryptoJS from 'crypto-js';

export const encryptImage = async (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result?.toString();
            if (base64) {
                const encryptedData = CryptoJS.AES.encrypt(base64, "secret_key").toString();
                resolve(encryptedData);
            } else {
                reject(new Error("Failed to read file."));
            }
        };
        reader.onerror = () => {
            reject(new Error("Failed to read file."));
        };
        reader.readAsDataURL(file);
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
