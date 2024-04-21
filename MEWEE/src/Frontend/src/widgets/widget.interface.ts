export interface ButtonPropsTypes {
  text: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface commentDataTypes {
  id: number;
  avatarIcon: any;
  commentText: string;
  showAnswers: string;
  answer: string;
  likeIcon: any;
}

export interface CommentBarComponentsTypes {
  commentData?: commentDataTypes[];
  title?: string;
  hiden?: Boolean;
  appearance: boolean;
}
