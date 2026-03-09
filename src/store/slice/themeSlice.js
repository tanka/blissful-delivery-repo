import { createSlice } from "@reduxjs/toolkit";
import { THEME_KEY_NAME } from "../../utility/constants";

const initialState = {
  theme: localStorage.getItem(THEME_KEY_NAME) || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY_NAME, state.theme);
      document.body.setAttribute("data-bs-theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
