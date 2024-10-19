import { createTheme } from "@mui/material";
import { User, UserType } from "../types/user";

type Color = {
  primary: string;
  secondary: string;
  default: string;
};
export const theme = createTheme({
  palette: {
    primary: {
      main: "#04009A",
    },
  },
  typography: {
    // Set global font family
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    // Override for all MUI tables
    MuiTable: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, Arial, sans-serif", // Ensure table uses this font
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, Arial, sans-serif", // Applies to all table cells
          fontSize: "14px", // You can specify a size for table text
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "5px 20px",
          fontSize: "14px",
          fontFamily: "Poppins, Arial, sans-serif", // Ensure button uses the same font
        },
      },
    },
  },
});
const data = localStorage.getItem("user");
const user = data ? (JSON.parse(data) as User) : null;

const Fleet: Color = {
  primary: "#04009A",
  secondary: "#A5A2FF36",
  default: "#6E6E6E",
};

const Admin: Color = {
  primary: "#0066AD",
  secondary: "#D7E4ED",
  default: "#6E6E6E",
};

const Warehouse: Color = {
  primary: "#04009A",
  secondary: "#A5A2FF36",
  default: "#6E6E6E",
};
const currentColors = (): Color => {
  if (user) {
    return user.type === UserType.ADMIN_USER ? Admin : user.type === UserType.FLEET_USER ? Fleet : Warehouse;
  }
  return Admin;
};

export const colors = currentColors();
