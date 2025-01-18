export type FleetPayload = {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
};
export type FleetUpdatePayload = {
  id: number;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
};

export type Fleet = {
  id: number;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  total_drivers: number;
  total_shops: number;
};

export type FleetApiResponse = {
  total: number;
  totalPagess: number;
  currentPage: number;
  data: Fleet[];
};
