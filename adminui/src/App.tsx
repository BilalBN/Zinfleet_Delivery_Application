import "./App.css";
import { Layout } from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0066AD",
      },
    },
    typography: {
      button: {
        textTransform: "none",
        fontFamily: 'Poppins, Arial, sans-serif',
      },
      h1: {
        fontFamily: 'Poppins, Arial, sans-serif',
        fontWeight: 700,  // Optional: Use bold weight for h1
      },
      body1: {
        fontFamily: 'Poppins, Arial, sans-serif',
      }
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
          <Route element={<Layout />}>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
