import { EnumPostType } from "../../entities";
import { postDataTypes } from "../post-show/dataPostShow.interface";

export interface modalPostDataLinkTypes {
  id: number;
  icons: any;
  url: string;
  text: string;
}

export interface FeedPostPropsTypes {
  type?: EnumPostType;
  posts: postDataTypes[] | null;
}
