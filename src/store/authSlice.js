import { createSlice } from "@reduxjs/toolkit"; 

// ✅ Appwrite handles real authentication (login/logout with backend).
// ✅ Redux stores authentication state (to show UI changes like "Login" or "Logout").
// auth.js (Appwrite) → Handles real authentication (backend).
// authSlice.js (Redux) → Manages UI authentication state.

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;