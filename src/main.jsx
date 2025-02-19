// Imports Required Dependencies
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// React & ReactDOM → Required for rendering the app.
// App → The main app component (contains Header, Footer, Outlet).
// index.css → Global styles.
// Provider → Redux store provider for state management.
// store.js → Configures Redux store.
// RouterProvider & createBrowserRouter → Handles client-side routing.

// Imports Page Components
// Imports all pages and components needed for routing.
// AuthLayout → Handles authentication-based route protection.
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";

// 📌 How the Routing Works
// All routes are nested inside /, wrapped by <App /> (so it includes the header and footer).
// Routes with authentication:
// AuthLayout authentication={false} → Public routes (e.g., Login, Signup).
// AuthLayout authentication={true} → Protected routes (e.g., Add Post, Edit Post).
// Dynamic routes:
// "/edit-post/:slug" → Edit a post by its slug.
// "/post/:slug" → View a post by its slug.
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            // {
            //     path: "/add-post",
            //     element: <AddPost />,
            // },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
        ],
    },
])

// React.StrictMode → Helps detect potential issues in development.
// Provider store={store} → Wraps the app inside Redux, making global state available.
// RouterProvider router={router} → Enables React Router.
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)

// ✅ Summary
// 🔹 What This File Does
// Sets up Redux for global state management.
// Defines routes using createBrowserRouter().
// Wraps the app with authentication-based route protection (AuthLayout).
// Renders the entire app inside <App />, ensuring proper layout.
// This structure ensures efficient routing, authentication protection, and global state management. 🚀