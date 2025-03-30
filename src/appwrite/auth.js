/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    // 1️⃣ Setup the Appwrite Client (constructor)
    // ✅ Connects your React app to Appwrite using the conf.js settings.
    // ✅ Creates an "Account" instance to handle authentication.
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // 2️⃣ Creating a New Account (createAccount)
    // ✅ Creates a new user with email, password, and name.
    // ✅ Uses ID.unique() to generate a unique user ID.
    // ✅ Auto-logs in the user after successful account creation.
    // ✅ If account creation fails, it returns null.
    // 👉 Real-life example: A new user signs up → The app logs them in automatically.
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password }); // Auto login after sign up
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // 3️⃣ Logging In (login)
    // ✅ Calls createEmailSession(email, password) to log in users.
    // ✅ If login is successful, Appwrite creates a session for the user.
    // ✅ If login fails, it throws an error.
    // 👉 Real-life example: A user enters their email/password → Appwrite checks credentials → If correct, user logs in.
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // 4️⃣ Get the Current Logged-in User (getCurrentUser)
    // ✅ Calls account.get() to fetch the logged-in user’s details (name, email, etc.).
    // ✅ If no user is logged in, it returns null.
    // 👉 Real-life example: A user refreshes the page → The app remembers their session.
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }


    // 5️⃣ Logging Out (logout)
    // ✅ Calls deleteSessions() to log out the user by removing their session.
    // 👉 Real-life example: A user clicks "Log Out" → Their session is deleted → They are redirected to the login page.
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;