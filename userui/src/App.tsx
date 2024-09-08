import "./App.css";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Layout } from "./pages/AppRoutes";
function App() {
  return (
    <div>
      <div>routes</div>
      <BrowserRouter>
      <Routes>
        {/* Define the layout route with nested routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<SignIn />} /> {/* Default route */}
          <Route path="/signup" element={<SignUp />} /> {/* Sign Up route */}
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
