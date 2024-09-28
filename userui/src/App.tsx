import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import RequireAuth from "./pages/RequireAuth";
import OrderManagment from "./pages/OrderManagment";
import Settings from "./pages/Settings";
import DriverManagment from "./pages/DriverManagment";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { SnackbarProvider } from "./components/SnackBar";
import { theme } from "./utils/theme";
import { useAppSelector } from "./store/hook";
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
            <Route element={<RequireAuth auth={true} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/order" element={<OrderManagment />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/drivermanagement" element={<DriverManagment />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
