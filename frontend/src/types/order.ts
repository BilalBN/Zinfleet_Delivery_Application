export enum OrderType {
  Live = "LIVE",
  Processing = "PROCESSING",
  Assigned = "ASSIGNED",
  Rejected = "REJECTED",
  All = "ALL",
}

export type Order = {
  id: number;
  amount: number;
  quantity: number;
  date: string;
  shop: string;
  pickUp: string;
  delivery: string;
  rejectedBy?: string; // Optional because not all entries have rejectedBy
  assignee?: string; // Optional because not all entries have assignee
  status?: boolean
};

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  width: string;
  align?: 'left'|'right'|'center';
  render?: (row: any) => JSX.Element | string;
};
