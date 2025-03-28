import { useState, useEffect } from "react";
import {useDispatch} from "react-redux"
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import {Outlet} from 'react-router-dom'

// 📌 What Happens Here?
// Runs authService.getCurrentUser() on page load (useEffect with [] dependency array).
// If user is logged in, dispatch(login({ userData })) stores user data in Redux.
// If user is logged out, dispatch(logout()) clears the user data.
// Finally, setLoading(false) → Stops loading once authentication is checked.

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({ userData })); // User is logged in
        } else {
          dispatch(logout()); // No user, clear session
        }
      })
      .catch((error) => console.error("Error fetching user:", error.message))
      .finally(() => setLoading(false));
}, []);

  

  return !loading ? (
    <div className="w-screen h-screen flex flex-col bg-gray-400"><div>
      </div>
        <Header />
        <main className="flex-1 flex justify-center items-center">
          {/* <Outlet /> → Dynamically loads different pages based on routes. */}
          <Outlet />
        </main>
        <Footer />
      </div>
  ) : null
}

export default App; 

// ✅ Summary
// 🔹 What This App.js Does
// Checks if the user is logged in on page load (useEffect).
// Stores user info in Redux if authenticated (login).
// Removes user data if not authenticated (logout).
// Waits for authentication to complete before showing the UI.
// Displays a consistent layout with a Header, Footer, and dynamic pages (Outlet).
// This ensures that the app always checks authentication first before showing any content. 🚀