import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import RequireAuth from "./pages/RequireAuth";
import OrderManagment from "./pages/OrderManagment";
import Settings from "./pages/Settings";
import DriverManagment from "./pages/DriverManagment";

function App() {
  const theme = createTheme({
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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Define the layout route with nested routes */}
          <Route element={<RequireAuth auth={false} />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<RequireAuth auth={true} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<OrderManagment />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/drivermanagement" element={<DriverManagment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
