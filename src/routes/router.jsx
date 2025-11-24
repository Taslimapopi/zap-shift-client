import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/coverage/Coverage";
import AuthLauOut from "../layout/AuthLauOut";

import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import DasboardLayOut from "../layout/DasboardLayOut";
import MyParcels from "../pages/Dashboard/MyParcels";
import Payment from "../pages/Dashboard/Payment";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";

export const router = createBrowserRouter([
    {
        path:'/',
        Component: RootLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'/rider',
                element: <PrivateRoute><Rider></Rider></PrivateRoute>
            },
            {
                path:'/send-parcel',
                element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: ()=>fetch('/serviceCenter.json').then(res=>res.json())
            },
            {
                path:'/coverage',
                Component: Coverage,
                loader: ()=>fetch('/serviceCenter.json').then(res=>res.json())
            }
        ]
    },
    {
        path:'/',
        Component: AuthLauOut,
        children:[
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><DasboardLayOut></DasboardLayOut></PrivateRoute>,
        children:[
            {
                path:'my-parcels',
                element:<MyParcels></MyParcels>
            },
            {
                path:'payment/:parcelId',
                Component: Payment,
            },
            {
                path:'payment-history',
                Component: PaymentHistory
            },
            {
                path:'payment-success',
                Component: PaymentSuccess
            },
            {
                path:'payment-cancelled',
                Component: PaymentCancelled
            }
        ]
    }
])