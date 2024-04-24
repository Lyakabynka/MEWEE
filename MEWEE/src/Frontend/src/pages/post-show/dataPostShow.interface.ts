export interface postDataTypes {
  id: number;
  username: string;
  profileImageUrl: string;
  postDate: string;
  location: string;
  imageUrl: string;
  description: string;
  likes: number;
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
