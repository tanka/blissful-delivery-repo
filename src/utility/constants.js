export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CART: "/cart",
  CHECKOUT: "/checkout",
  MENU_DETAIL: "/menu/:id",
  MENU_MANAGEMENT: "/menu-management",
  ORDER_CONFIRMATION: "/order-confirmation",
  ORDER_MANAGEMENT: "/order-management",
};

// export const API_BASE_URL = "https://localhost:7053";
export const API_BASE_URL = "http://bhattarai-001-site1.site4future.com";

export const APP_NAME = "BlissFull Deliveries";

export const SPECIAL_TAGS = [
  "",
  "Vegan",
  "Gluten-Free",
  "Spicy",
  "Chef's Special",
  "New",
  "Bestseller",
  "Top Rated",
];

export const STORAGE_KEYS = {
  TOKEN: "token-mango",
  USER: "user-mango",
  STORAGE_KEY_CART: "cart-mango",
};

export const CATEGORIES = [
  "Appetizer",
  "Main Course",
  "Desserts",
  "Beverages",
  "Salads",
  "Sides",
  "Entrees",
];

export const ROLES = {
  CUSTOMER: "Customer",
  ADMIN: "Admin",
};

export const ORDER_STATUS = {
  CONFIRMED: "Confirmed",
  READY_FOR_PICKUP: "Ready for Pickup",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_OPTIONS = [
  {
    value: ORDER_STATUS.CONFIRMED,
    label: ORDER_STATUS.CONFIRMED,
    color: "warning",
  },

  {
    value: ORDER_STATUS.READY_FOR_PICKUP,
    label: ORDER_STATUS.READY_FOR_PICKUP,
    color: "info",
  },

  {
    value: ORDER_STATUS.COMPLETED,
    label: ORDER_STATUS.COMPLETED,
    color: "success",
  },

  {
    value: ORDER_STATUS.CANCELLED,
    label: ORDER_STATUS.CANCELLED,
    color: "danger",
  },
];

export const THEME_KEY_NAME = "bs-theme-mango";
