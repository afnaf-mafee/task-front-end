import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import EarnApp from "../pages/Random/EarnApp";
import Home from "../pages/Home/Home";
import Invite from "../pages/Invite/Invite";
import CustomerServiceCenter from "../pages/Support/CustomerServiceCenter";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout/>,
        children: [{
            path:"/",
            element: <Home/>
    },{
            path:"/home",
            element:<Home/>

        },{
            path:"/signup",
            element: <Register/>
        },{
            path:"/login",
            element: <Login/>
        },{
            path:"/invite",
            element: <Invite/>
        },{
            path:"/support",
            element: <CustomerServiceCenter/>
        }]
    }
])