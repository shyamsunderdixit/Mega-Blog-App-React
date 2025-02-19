import { Signup as SignupComponent } from "../components"

function Signup() {
    return (
        <div className="py-8">
            <SignupComponent />
        </div>
    )
}

export default Signup

// What This Component Does
// ✅ Wraps the SignupComponent inside a styled container.
// ✅ Keeps the structure simple and reusable.
// ✅ Ensures a clear separation between the Signup page and the Signup form component.