import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import RequireAuth from "./pages/RequireAuth";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#04009A",
      },
    },
    typography: {
      button: {
        textTransform: "none",
        fontFamily: "Poppins, Arial, sans-serif",
      },
      h1: {
        fontFamily: "Poppins, Arial, sans-serif",
        fontWeight: 700,
      },
      body1: {
        fontFamily: "Poppins, Arial, sans-serif",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: "5px 20px",
            fontSize: "14px",
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
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
