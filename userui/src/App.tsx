import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Layout } from "./pages/AppRoutes";
import { SideBar } from "./components/SideBar";
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
          <Route element={<Layout />}>
            <Route path="/" element={<SignIn />} /> {/* Default route */}
            <Route path="/signup" element={<SignUp />} /> {/* Sign Up route */}
            <Route path="/sidebar" element={<SideBar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
