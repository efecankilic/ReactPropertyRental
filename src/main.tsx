import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import { AuthContextProvider } from "./components/auth/AuthContext.tsx";
import MyBookings from "./pages/MyBookings.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Details from "./pages/Details.tsx";
import Checkout from "./components/Checkout.tsx";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "details/:property_id", element: <Details /> },
      { path: "payment", element: <Checkout /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: "bookings", element: <MyBookings /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
