// import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

// The LogoutBtn component is responsible for logging out the user when clicked.
// It interacts with Appwrite authentication services and updates the Redux store.

// useDispatch: Allows dispatching actions to the Redux store.
// authService: Handles authentication-related operations using Appwrite.
// logout (from authSlice.js): Redux action to update the authentication state.

function LogoutBtn() {
    const dispatch = useDispatch()

//     Calls authService.logout(), which logs the user out via Appwrite.
//     Once successful, it dispatches the logout action to update the Redux state.
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn

// Summary
// ✅ Logs out the user using Appwrite's authentication service.
// ✅ Updates Redux state by dispatching the logout action.
// ✅ Provides a user-friendly logout button.