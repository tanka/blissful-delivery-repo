/**
 * Helper methodes for cart management,
 * including localStorage handling and total calculations.
 */

import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../utility/constants";

// to get the stored cart from localStorage, ensuring it returns an array and handles errors gracefully
const getStoredCart = () => {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEYS.STORAGE_KEY_CART);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    if (Array.isArray(parsedCart)) {
      return parsedCart;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error retrieving cart from localStorage:", err);
    localStorage.removeItem(STORAGE_KEYS.STORAGE_KEY_CART);
    return [];
  }
};

// save cart items to localStorage, ensuring it handles errors gracefully and returns the saved cart
const saveCart = (items) => {
  try {
    localStorage.setItem(STORAGE_KEYS.STORAGE_KEY_CART, JSON.stringify(items));
  } catch (err) {
    console.warn("Error saving cart to localStorage:", err);
  }
};

const calculateTotals = (items = []) => {
  let totalItems = 0;
  let totalPrice = 0;
  items.forEach((item) => {
    totalItems += item.quantity;
    totalPrice += item.quantity * item.price;
  });
  return { totalItems, totalPrice };
};

//
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getStoredCart() || [],
    ...calculateTotals(getStoredCart()),
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        state.items = state.items.map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                quantity:
                  existingItem.quantity + (action.payload.quantity || 1),
              }
            : item,
        );
        // existingItem.quantity += action.payload.quantity || 1;
        console.log("Updated item quantity:", existingItem.quantity);
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      Object.assign(state, calculateTotals(state.items));
      saveCart(state.items);
    },

    // incrementQuantit
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      Object.assign(state, calculateTotals(state.items));
      saveCart(state.items);
    },

    // decrementQuantity

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        state.items = state.items.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item,
        );
      }
      Object.assign(state, calculateTotals(state.items));
      saveCart(state.items);
    },

    // clear cart
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      saveCart(state.items);
      localStorage.removeItem(STORAGE_KEYS.STORAGE_KEY_CART);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
