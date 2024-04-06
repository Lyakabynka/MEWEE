import { useState } from 'react';

export const useErrors = (): [string[], (errors: string[]) => void, (errors: string[], delay?: number) => void] => {
    const [errors, setErrors] = useState<string[]>([]);

    const clearErrors = () => {
        setErrors([]);
    };

    const setAutoClearErrors = (newErrors: string[], delay: number = 3000) => {
        setErrors(newErrors);
        setTimeout(clearErrors, delay);
    };

    return [errors, setErrors, setAutoClearErrors];
};