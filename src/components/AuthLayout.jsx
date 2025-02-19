import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && !authStatus) {
            // If authentication is required and user is not logged in, go to login
            navigate("/login");
        } else if (!authentication && authStatus) {
            // If authentication is NOT required, but user is logged in, redirect to home
            navigate("/");
        }

        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

Protected.propTypes = {
    children: PropTypes.node, // React children elements
    authentication: PropTypes.bool, // Boolean value
};

//     📌 What Does This Component Do?
// ✅ Checks if the user is logged in or not.
// ✅ Redirects to /login if the user is not authenticated.
// ✅ Redirects to / if the user is logged in and trying to access a public page.
// ✅ Shows "Loading..." while checking authentication.

// 🔹 Step-by-Step Explanation
// 1️⃣ Gets the login status from Redux (authStatus).
// 2️⃣ Uses useEffect to check authentication whenever authStatus changes.
// 3️⃣ Decides where to navigate:

// If authentication is required (authentication = true) and the user is logged out, go to /login.
// If authentication is not required (authentication = false), but the user is logged in, go to /.
// 4️⃣ Renders children if the check is done.