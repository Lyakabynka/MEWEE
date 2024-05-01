export interface userInfoDataGalery {
  image: any;
}

export interface userInfoDataEducation {
  id: string;
  icon: any;
  text: string;
}

interface userInfoDataTypes {
  id: string;
  avatar: any;
  userName: string;
  lockal: string;
  subscribers: string;
  subscriptions: string;
  education: userInfoDataEducation[];
  gallery: userInfoDataGalery[];
}

export interface userInfoDataPropsTypes {
  userData: userInfoDataTypes;
}

export interface profileButtonsDataTypes {
  id: number;
  text: string;
}

export interface prfileItemDataTypes {
  id: string;
  title: string;
  content: string;
  attachment: string;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface prfileItemDataPropsTypes {
  profileItemData: prfileItemDataTypes[];
}

export interface reviewsStarTypes {
  id: string;
  image: any;
}

export interface portfilioDataTypes {
  id: string;
  reviewsUserAvatar: any;
  reviewsUserName: string;
  reviews: string;
  reviewsStar: reviewsStarTypes[];
}

export interface sertificateTypes {
  id: string;
  image: any;
}

export interface portfilioDataPropsTypes {
  portfilioData: portfilioDataTypes[];
  setificateData: sertificateTypes[];
}

export interface friendDataTypes {
  id: string;
  name: string;
  avatar: any;
  online: boolean;
  onlineSwitch: any;
}

export interface friendDataPropsTypes {
  friendData: friendDataTypes[];
}
