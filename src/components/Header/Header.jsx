import { Container, Logo, LogoutBtn } from '../index';
import React from "react"; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className="flex">
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) => 
                        item.active ? (
                            <li key={item.name}>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                >{item.name}</button>
                            </li>
                        ) : null
                        )} 
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
// 📌 How It Works?

// 1️⃣ Imports Required Components
// Container → Wraps the header for consistent layout.
// Logo → Displays the website logo.
// LogoutBtn → Handles user logout.
// useSelector → Accesses authentication state from Redux.
// useNavigate → Allows programmatic navigation using React Router.

// 2️⃣ Retrieves authStatus from Redux
// If authStatus is true → User is logged in.
// If authStatus is false → User is logged out.

// 3️⃣ Defines Navigation Items Dynamically
// Home is always visible.
// Login & Signup are only shown if the user is not logged in.
// All Posts & Add Post are only shown if the user is logged in.

// 4️⃣ Maps Navigation Items into Buttons
// If item.active is true, a button is rendered.
// Clicking a button navigates to the respective route using navigate(item.slug).

// 5️⃣ Renders LogoutBtn if Authenticated
// If authStatus is true, the logout button appears.
// Clicking it logs out the user and updates Redux state.

export default Header;

// Summary
// ✅ Fetches user authentication status from Redux.
// ✅ Generates navigation links dynamically based on authentication status.
// ✅ Uses <button> instead of <Link> to navigate programmatically.
// ✅ Includes a Logout button when the user is authenticated.