export enum OrderType {
  Live = "LIVE",
  Processing = "PROCESSING",
  Assigned = "ASSIGNED",
  Rejected = "REJECTED",
  All = "ALL",
}

export type Order = {
  orderData: OrderData;
  addressData: AddressData;
};

export type OrderData = {
  orderId: number;
  storeId: number;
  orderCode: string;
  orderUrl: string;
  orderStatus: number;
  currencyCode: string;
  transactionReference: string;
  transactionAmount: number;
  transactionAmountString: string;
  orderTotal: string;
};

export type AddressData = {
  name: string;
  contactNumber: string;
  email: string;
  street: string;
  district: string;
  formattedAddress: string;
  latitude: string;
  longitude: string;
  countryCode: string;
  country: string;
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
