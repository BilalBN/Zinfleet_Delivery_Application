export type Shop = {
  name: string;
  address: string;
  warehouseAddress: string;
  fleet_id: number;
  userName: string;
  password: string;
};

export type ShopPayload = {
  name: string;
  address: string;
  warehouse_address: string;
  fleet_id: number;
  username: string;
  password: string;
};

export type ShopUpdatePayload = {
  id: number;
  name: string;
  address: string;
  warehouse_address: string;
  fleet_id: number;
  username: string;
};
export type ShopItem = {
  createdAt: string;
  id: number;
  name: string;
  address: string;
  warehouse_address: string;
  fleet_id: number;
  createdBy: number;
};

export type ShopAPIResponse={
  total: number;
  totalPagess: number;
  currentPage: number;
  data: ShopItem[];
}