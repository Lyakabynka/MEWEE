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
  createdAt: Date;
  updatedAt: Date;
}

export interface prfileItemDataPropsTypes {
  profileItemData: prfileItemDataTypes[];
}
