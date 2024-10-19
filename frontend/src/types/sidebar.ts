export enum IconType {
  Dashboard = "Dashboard",
  Order = "Order",
  Driver = "Driver",
  Settings = "Settings",
  Shops = "Shops",
  Fleets = "Fleets",
}
export type SideBarItem = {
  label: string;
  icon: "Dashboard" | "Order" | "Driver" | "Settings" | "Shops" | "Fleets";
  path: string;
};
