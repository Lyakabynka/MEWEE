export interface dataSideBarTypes {
  id: number;
  url: string;
  text: string;
  category: string;
}

export interface groupDataPropTypes {
  data: dataSideBarTypes[];
  onCategoryChanged: (id: string) => void;
}

export interface dataGroupItemTypes {
  groups: any;
  members: any;
}

export interface dataGroupItemPropTypes {
  category: string;
  data: any;
}
