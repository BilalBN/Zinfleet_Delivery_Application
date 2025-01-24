import { Fleet } from "./fleet";

export enum OrderType {
  Live = "LIVE",
  Processing = "PROCESSING",
  Assigned = "ASSIGNED",
  Rejected = "REJECTED",
  All = "ALL",
}

export type Order = {
  id: number;
  orderId: number;
  amount: number;
  quantity: number;
  date: string;
  shop: string;
  pickUp: string;
  delivery: string;
  rejectedBy?: string;
  assignee?: string;
  orderStatus?: number;
  orderTotal: number;
  fleet: Fleet;
  createdAt: string
};

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  width: string;
  align?: "left" | "right" | "center";
  render?: (row: any) => JSX.Element | string;
};

export type OrderAPIResponse = {
  total: number;
  totalPagess: number;
  currentPage: number;
  data: Order[];
};
