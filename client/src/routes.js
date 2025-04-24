import AboutUs from "./pages/AboutUs"
import Admin from "./pages/Admin/Admin"
import Basket from "./pages/Basket/Basket"
import HistoryOrder from "./pages/ComplitedOrders/HistoryOrder"
import Order from "./pages/Order/Order"
import OrderStages from "./pages/Order/stagesOrder/OrderStages"
import Profile from "./pages/Profile"
import Store from "./pages/Store"
import Terms from "./pages/Terms"
import { ABOUTUS_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, HISTORYORDER_ROUTE, ORDERSTAGES_ROUTE, ORDER_ROUTE, PROFILE_ROUTE, STORE_ROUTE, TERMS_ROUTE } from "./utils/consts"

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    },
    {
        path: ORDERSTAGES_ROUTE,
        element: <OrderStages/>
    }
]
export const authRoutes = [
    {
        path: ORDER_ROUTE,
        element: <Order/>
    },
    {
        path: PROFILE_ROUTE,
        element: <Profile/>
    },
    {
        path: HISTORYORDER_ROUTE,
        element: <HistoryOrder/>
    }
]

export const publicRoutes = [
    {
        path: STORE_ROUTE,
        element: <Store/>
    },
    {
        path: ABOUTUS_ROUTE,
        element: <AboutUs/>
    },
    {
        path: TERMS_ROUTE,
        element: <Terms/>
    },
    {
        path: BASKET_ROUTE,
        element: <Basket/>
    }
]