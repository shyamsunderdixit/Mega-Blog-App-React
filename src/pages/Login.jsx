import { Login as Logincomponent } from "../components/Login"

// This component serves as the Login page of your blogging app. It imports a Login component from the components folder and renders it inside a wrapper.
function Login() {
    return (
        <div className="py-8">
            <Logincomponent />
        </div>
    )
}

export default Login