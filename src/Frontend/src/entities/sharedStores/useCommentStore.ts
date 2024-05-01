import { create } from "zustand";
import { ResponseCallback, ResponseDataCallback, pErrors } from "./utils";
import { $api, EMPTY_GUID, ENDPOINTS } from "../../shared/exportSharedMorules";

interface ICommentStore {
  isLoading: boolean;
  comments: Record<string, any[]>; // Ensure comments is always present
  createComment: (callback: ResponseCallback, postId: string, replyCommentId: string, content: string) => Promise<void>;
  getComments: (callback: ResponseDataCallback, postId: string, page: number, pageSize: number) => Promise<void>;
}

export const useCommentStore = create<ICommentStore>((set, get) => ({
  isLoading: false,
  comments: {}, // Initialize comments as an empty object

  createComment: async (callback: ResponseCallback, postId: string, replyCommentId: string, content: string) =>
  {
      const response = await $api.post<any>(ENDPOINTS.POST.CREATE_COMMENT, { postId: postId, replyCommentId: replyCommentId === "" ? EMPTY_GUID: replyCommentId, content: content });
      //console.log(response);

      //callback(pErrors(response.data.errors));

      if (response?.status === 200) {
        //console.log(response.data);
        callback([]);

//        callback();
      }
      callback(pErrors(response.data.errors));
      console.log(get().comments);
  },
  getComments: async (callback: ResponseDataCallback, postId: string, page: number, pageSize: number) => {
    try {
      const response = await $api.post<any>(ENDPOINTS.POST.GET_COMMENTS, { postId, pagination: { page, pageSize } });
      //console.log(response);
  
      if (response?.status === 200) {
        //console.log(response.data);
  
        // Clear existing comments for the postId
        set((state) => ({
          ...state,
          comments: {
            ...state.comments,
            [postId]: [],
          },
        }));
  
        // Update state with the new comments grouped by postId
        set((state) => ({
          ...state,
          comments: {
            ...state.comments,
            [postId]: response.data,
          },
        }));
  
        callback(get().comments[postId], []);
      }
      else callback(get().comments[postId], pErrors(response.data.errors));
      //console.log(get().comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      //callback(null);
    }
  
    set((state) => ({ ...state, isLoading: false }));
  },
}));
