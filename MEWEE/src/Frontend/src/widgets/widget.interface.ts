export interface ButtonPropsTypes {
  text: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface modalPostDataLinkTypes {
  id: number;
  icons: any;
  url: string;
  text: string;
}

export interface CustomModalIconPropsTypes {
  id: number;
}

export interface commentDataTypes {
  id: number;
  avatarIcon: any;
  commentText: string;
}

export interface CommentBarPropsTypes {
  id?: number;
  title?: string;
  hiden?: number | null;
  appearance: boolean;
  commentDataRender: commentDataTypes[];
}

export interface smileDataTypes {
  id: number;
  smile: any;
}
