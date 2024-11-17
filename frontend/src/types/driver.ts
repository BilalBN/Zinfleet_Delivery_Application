export type DriverPayload = {
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
  age: number;
};

export type DriverUpdatePayload = {
  id: number;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
  age: number;
};

export type Driver = {
  id: number;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
  age: number;
};
