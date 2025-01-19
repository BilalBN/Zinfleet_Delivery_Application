
export interface User {
    name: string;
    email: string;
    companyName: string;
    type: UserType;
    fleet_id: number
  }

  export enum UserType {
    ADMIN_USER = "ADMIN_USER",
    FLEET_USER = "FLEET_USER",
    WAREHOUSE_USER = "WAREHOUSE_USER",
  }