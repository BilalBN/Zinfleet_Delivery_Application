import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { SnackbarProvider } from "./modules/core/components/SnackBar";
import { AdminTheme, FleetTheme, WareHousetheme } from "./utils/theme";
import { useAppSelector } from "./store/hook";
import { UserType } from "./types/user";

/**Core Modules Components */
import { SignIn } from "./modules/core/pages/SignIn";
import { SignUp } from "./modules/core/pages/SignUp";
import RequireAuth from "./modules/core/pages/RequireAuth";

/** Fleet Manager Components*/
import OrderManagment from "./modules/fleets/pages/OrderManagment";
import Settings from "./modules/fleets/pages/Settings";
import DriverManagment from "./modules/fleets/pages/DriverManagment";
import { Dashboard } from "./modules/fleets/pages/Dashboard";
/** Admin Components */
import { Orders } from "./modules/admin/pages/Orders";
import { Shops } from "./modules/admin/pages/Shops";
import { Fleets } from "./modules/admin/pages/Fleets";
import { Settings as AdminSettings } from "./modules/admin/pages/Settings";
import { Dashboard as AdminDashboard } from "./modules/admin/pages/Dashboard";
/** Warehouse Route Components */
import WareHouseDashboard from "./modules/warehouse/pages/Dashboard";
import WarehouseSettings from "./modules/warehouse/pages/Settings";

const Loader = styled.div`
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

function App() {
  const loading = useAppSelector((state) => state.root.loading);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const theme = user
    ? user.type === UserType.ADMIN_USER
      ? AdminTheme
      : user.type === UserType.FLEET_USER
        ? FleetTheme
        : user.type === UserType.WAREHOUSE_USER ? WareHousetheme : FleetTheme
    : FleetTheme;
  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : null}
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            {/* Define the layout route with nested routes */}
            <Route element={<RequireAuth auth={false} />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            {/* Redirect root to the company-specific route if authenticated */}
            {isAuthenticated && user ? (
              user?.type === UserType.FLEET_USER ? (
                <Route path="/" element={<Navigate to={`/${user?.companyName} `} />} />
              ) : user?.type === UserType.ADMIN_USER ? (
                <Route path="/" element={<Navigate to="/admin" />} />
              ) : (
                <Route path="/" element={<Navigate to="/warehouse" />} />
              )
            ) : (
              <Route path="/" element={<Navigate to="/signin" />} />
            )}

            {/* Routes for Fleet Users */}
            {isAuthenticated && user?.type === UserType.FLEET_USER ? (
              <Route element={<RequireAuth auth={true} />}>
                <Route path="/:companyName" element={<Dashboard />} />
                <Route path="/:companyName/orders" element={<OrderManagment />} />
                <Route path="/:companyName/settings" element={<Settings />} />
                <Route path="/:companyName/drivermanagement" element={<DriverManagment />} />
              </Route>
            ) : null}

            {/* Routes for Admin Users */}
            {isAuthenticated && user?.type === UserType.ADMIN_USER ? (
              <Route element={<RequireAuth auth={true} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/shops" element={<Shops />} />
                <Route path="/admin/fleets" element={<Fleets />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>
            ) : null}

            {/* Routes for Warehouse Users */}
            {isAuthenticated && user?.type === UserType.WAREHOUSE_USER ? (
              <Route element={<RequireAuth auth={true} />}>
                <Route path="/warehouse" element={<WareHouseDashboard />} />
                <Route path="/warehouse/settings" element={<WarehouseSettings />} />
              </Route>
            ) : null}
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
