import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

import Home from "../pages/Home/Home";
import Invite from "../pages/Invite/Invite";
import CustomerServiceCenter from "../pages/Support/CustomerServiceCenter";

import Account from "../pages/Account/Account";
import PrivateRoute from "./PrivateRoute";
import Withdraw from "../pages/Withdraw/Withdraw";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/invite",
        element: (
          <PrivateRoute>
            <Invite />
          </PrivateRoute>
        ),
      },
      {
        path: "/support",
        element: <CustomerServiceCenter />,
      },
      {
        path: "/account",
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
      },
      {
        path: "/Withdraw",
        element: (
          <PrivateRoute>
            <Withdraw />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
