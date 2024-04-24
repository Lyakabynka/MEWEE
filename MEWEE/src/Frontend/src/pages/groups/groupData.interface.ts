export interface dataSideBarTypes {
  id: number;
  url: string;
  text: string;
}

export interface groupDataPropTypes {
  data: dataSideBarTypes[];
}

export interface dataGroupItemTypes {
  id: number;
  img: any;
  title: string;
  participants: string;
}

export interface dataGroupItemPropTypes {
  data: dataGroupItemTypes[];
}
