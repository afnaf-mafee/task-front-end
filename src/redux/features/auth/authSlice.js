import { createSlice } from "@reduxjs/toolkit";

// ✅ Centralized storage keys
const USER_KEY = "__u_8f3k9xQ1mZ7pL2v_usr__";
const TOKEN_KEY = "__t_91xkQ8m2zP7vL9d_token__";
// Helper functions (optional but cleaner)
const getUserFromStorage = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

const getTokenFromStorage = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromStorage(),
    token: getTokenFromStorage(),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      // Save to localStorage
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;