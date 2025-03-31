import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
        const userData = await authService.getCurrentUser();
        if (userData) {
            dispatch(login({ userData })); // User is logged in
        } else {
            dispatch(logout()); // Ensure logout is dispatched for unauthenticated users
        }
        setLoading(false); // Stop loading in all cases
    };

    fetchUser();
}, [dispatch]);


  if (loading) return null; // Prevent rendering until authentication is checked

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
