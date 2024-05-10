export interface ButtonPropsTypes {
  text: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface modalPostDataLinkTypes {
  id: number;
  icons: any;
  customSymbols?: string;
  onClick: ()=>void;
  url: string;
  text: string;
}

export interface CustomModalIconPropsTypes {
  id: number;
  links?: modalPostDataLinkTypes[];
}

export interface commentDataTypes {
  id: string;
  avatarIcon: any;
  content: string;
  userId: string;
  replyCommentId: string;
}

export interface CommentBarPropsTypes {
  id?: string;
  replyId?: string;
  title?: string;
  hiden?: string | null;
  appearance: boolean;
  commentDataRender: commentDataTypes[];
  onUpdated: () => void;
}

export interface smileDataTypes {
  id: number;
  smile: any;
}

export interface imagesDataTypes {
  id: string;
  content: string;
  imgPath1: any;
  imgPath2: any;
}

export interface videoDataTypes {
  id: string;
  imgPath1?: string;
  imgPath2?: string;
}

export interface photoVideoSlidersPropTypes {
  title?: string;
  retouch?: boolean;
  sliderData: imagesDataTypes[];
}
