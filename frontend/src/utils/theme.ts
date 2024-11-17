import { createTheme } from "@mui/material";
export const AdminTheme = createTheme({
  palette: {
    primary: {
      main: "#0066AD",
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

export const FleetTheme = createTheme({
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

export const WareHousetheme = createTheme({
  palette: {
    primary: {
      main: "#FF6E2D",
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


