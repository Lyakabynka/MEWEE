import { create } from "zustand";
import { posts } from "../../pages/home/dataHome";
import { ResponseCallback, ResponseDataCallback, decryptState, encryptState, pErrors } from "./utils";
import { $api, ENDPOINTS } from "../../shared/exportSharedMorules";
import { useAuthStore } from "./useAuthStore";
import { get } from "http";

interface ICreatePostRequest
{
  title: string;
  content: string;
  attachment: string;
}

interface IPoststore {
  isLoading: boolean;
  posts: any;

  createPost: (callback: ResponseCallback, request: ICreatePostRequest) => Promise<void>;
  getPosts: (callback: ResponseCallback, id: any) => Promise<void>;
  findPosts: (callback: ResponseCallback, query: string, pagination: any) => Promise<void>;
  likePost:  (callback: ResponseCallback, postId: string) => Promise<void>;
}

export const usePostsStore = create<IPoststore>((set) => ({
  isLoading: false,
  posts: null,

  createPost: async (callback: ResponseCallback, request: ICreatePostRequest) => { 
    
    const response = await $api.post<any>(ENDPOINTS.USER.POST, request);
    console.log(response);

    callback(pErrors(response.data.errors));

    if (response?.status == 200) {
      console.log(response.data);
    }

    set({ isLoading: false });
  },
  getPosts: async (callback: ResponseCallback, id: any) => { 
    
    const response = await $api.post<any>(ENDPOINTS.USER.GET_POSTS, {userId: id});
    console.log(response);

    callback(pErrors(response.data.errors));

    if (response?.status == 200) {
      console.log(response.data);
      set({ posts: response.data });
    }

    set({ isLoading: false });
  },
  findPosts: async (callback: ResponseCallback, query: string, pagination: any) => { 

    const response = await $api.post<any>(ENDPOINTS.HOME.FIND_POSTS, {searchQuery: query, pagination: pagination});
    console.log(response);

    
    if (response?.status == 200) {
      console.log(response.data);
      set({ posts: response.data });
    }


    callback(pErrors(response.data.errors));

    set({ isLoading: false });
  },
  likePost: async (callback: ResponseCallback, postId: string) => { 

    const response = await $api.post<any>(ENDPOINTS.HOME.LIKE_POST, {postId: postId});
    console.log(response);

    
    if (response?.status == 200) {
      console.log(response.data);
    }


    callback(pErrors(response.data.errors));

    set({ isLoading: false });
  },
}));
