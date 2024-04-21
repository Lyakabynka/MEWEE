export interface modalPostDataLinkTypes {
  id: number;
  icons: any;
  url: string;
  text: string;
}

export interface postDataTypes {
  id: number;
  username: string;
  profileImageUrl: string;
  postDate: string;
  location: string;
  imageUrl: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  // Add content property if necessary
  content?: string;
}

export interface FeedPostPropsTypes {
  posts: postDataTypes[] | null;
  modalPostDataLinkProps: modalPostDataLinkTypes[];
}
