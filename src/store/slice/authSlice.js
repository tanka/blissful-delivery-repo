import { getUserInfoFromToken, isTokenExpired } from "../../utility/jwtUtility";
import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../utility/constants";

const getInitialAuthState = () => {
  const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
  if (
    !storedToken ||
    storedToken === "undefined" ||
    storedToken === "null" ||
    isTokenExpired(storedToken)
  ) {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }

  let user = null;
  if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
    try {
      user = JSON.parse(storedUser);
    } catch (err) {
      console.error("Error parsing stored user from localStorage:", err);
      user = getUserInfoFromToken(storedToken);
    }
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  }

  return {
    user,
    token: storedToken,
    isAuthenticated: !!storedToken && !!user,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: { ...getInitialAuthState() },
  reducers: {
    setAuth: (state, action) => {
      const { user, token } = action.payload;
      console.log("Setting auth with user:", user, "and token:", token);
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!(token && user);

      if (token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      }

      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      }
    },

    logout: (state) => {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions; // BUILT iN REDUCER ACTIONS
export default authSlice.reducer;
