export type DriverPayload = {
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
  age: number;
  vehicle_type: string;
  fleet_id: number
};

export type DriverUpdatePayload = {
  id: number;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
  age: number;
  fleet_id: number;
  vehicle_type: string;
};

export type Driver = {
  id: number;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
  age: number;
};

export type DriverAPIResponse = {
  total: number;
  totalPagess: number;
  currentPage: number;
  data: Driver[];
};
