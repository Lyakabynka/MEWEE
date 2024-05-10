export interface postDataTypes {
  id: string;
  authorId: string;
  username: string;
  profileImageUrl: string;
  location: string;
  category: string;
  imageUrl: string;
  description: string;
  likesCount: number;
  comments: number;
  shares: number;
  type: string;
  // Add content property if necessary
  title: string;
  content?: string;
  attachment? : string;
  createdAt: string;
}

export interface postDataProps {
  dataObject: postDataTypes;
}
