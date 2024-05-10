import { create } from "zustand";
import { persist } from "zustand/middleware";
interface ISearchBarProps {

    title: string;
    setTitle: (t: string) => void;

}
export const useSearchBar = create<ISearchBarProps>()(
    persist(
        (set, get) => ({
            title: "main",

            setTitle: (t: string) => {
                console.log(t);
                set((state) => ({ ...state, title: t }));
            },

        }),
        {
            name: "searchBar",
            version: 1,
        }
    )
);
