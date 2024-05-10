export interface moreTabsDataTypes {
  id: string;
  title: string;
  path: string;
}

export interface moreTabsPropsTypes {
  moreTabsData: moreTabsDataTypes[];
}


export interface switchTabsDataTypes {
  id: string;
  title: string;
  switchActive: boolean;
  description?: string;
}

export interface switchTabsPropsTypes {
  switchTabsData: switchTabsDataTypes[];
}
