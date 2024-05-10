export interface dialogDataTypes {
  id: number;
  avatar: any;
  name: string;
  lastMessage: string;
  time: string;
  valueMessage?: string;
  newMessade?: boolean;
  check: boolean;
}

export interface modalDialogsDataLinkTypes {
  id: number;
  icons: any;
  url: string;
  text: string;
}

export interface dialogsDataPropTypes {
  onOpenChat: (chatId: string) => void;
  dialogData: dialogDataTypes[];
  modalDialogsData?: modalDialogsDataLinkTypes[];
  sideBarType: boolean;
  openChat: boolean;
}
