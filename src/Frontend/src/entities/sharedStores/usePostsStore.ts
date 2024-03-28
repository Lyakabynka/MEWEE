import { create } from "zustand";
import { posts } from "./posts";

interface IPoststore {
    isLoading: boolean;
    errorMessage: string | null;
    data: typeof posts | null;
    getPosts: () => Promise<void>;
}

export const usePostsStore = create<IPoststore>((set) => ({
    isLoading: false,
    errorMessage: null,
    data: null,

    getPosts: async () => {
        set({ isLoading: true, errorMessage: null, data: null });
        try {
            // Simulating an asynchronous API call by setting a timeout
            setTimeout(() => {
                set({ isLoading: false, data: posts });
            }, 1000); // Simulated 1 second delay
        } catch (error) {
            set({ isLoading: false, errorMessage: 'Network error' });
        }
    }
}));
