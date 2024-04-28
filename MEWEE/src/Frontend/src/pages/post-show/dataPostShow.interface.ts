export interface postDataTypes {
  id: string;
  userId: string;
  username: string;
  profileImageUrl: string;
  location: string;
  category: string;
  imageUrl: string;
  description: string;
  likesCount: number;
  comments: number;
  shares: number;
  // Add content property if necessary
  title: string;
  content?: string;
  attachment? : string;
  createdAt: string;
}

export interface postDataProps {
  dataObject: postDataTypes;
}
