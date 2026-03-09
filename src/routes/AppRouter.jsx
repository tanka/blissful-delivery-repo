import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Cart from "../pages/cart/Cart.jsx";
import Checkout from "../pages/cart/Checkout.jsx";
import MenuItemManagement from "../pages/menu/MenuItemManagement.jsx";
import MenuItemDetails from "../pages/menu/menuItemDetails.jsx";
import OrderConfirmation from "../pages/order/OrderConfirmation.jsx";
import OrderManagement from "../pages/order/OrderManagement.jsx";
import { ROLES, ROUTES } from "../utility/constants.jsx";
import RoleBasedRoutes from "./RoleBasedRoutes.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Home />} />
    <Route path={ROUTES.LOGIN} element={<Login />} />
    <Route path={ROUTES.REGISTER} element={<Register />} />
    <Route
      path={ROUTES.CART}
      element={
        <RoleBasedRoutes>
          <Cart />
        </RoleBasedRoutes>
      }
    />
    <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
    <Route
      path={ROUTES.MENU_MANAGEMENT}
      element={
        <RoleBasedRoutes allowedRoles={[ROLES.ADMIN]}>
          <MenuItemManagement />
        </RoleBasedRoutes>
      }
    />
    <Route path={ROUTES.MENU_DETAIL} element={<MenuItemDetails />} />
    <Route path={ROUTES.ORDER_CONFIRMATION} element={<OrderConfirmation />} />
    <Route
      path={ROUTES.ORDER_MANAGEMENT}
      element={
        <RoleBasedRoutes allowedRoles={[ROLES.ADMIN]}>
          <OrderManagement />
        </RoleBasedRoutes>
      }
    />
  </Routes>
);
export default AppRoutes;
