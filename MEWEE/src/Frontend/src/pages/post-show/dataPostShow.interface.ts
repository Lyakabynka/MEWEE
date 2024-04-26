export interface postDataTypes {
  id: string;
  username: string;
  profileImageUrl: string;
  postDate: string;
  location: string;
  imageUrl: string;
  description: string;
  likesCount: number;
  comments: number;
  shares: number;
  // Add content property if necessary
  title: string;
  content?: string;
  attachment? : string;
}

export interface postDataProps {
  dataObject: postDataTypes;
}
