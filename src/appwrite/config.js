import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    //  1️⃣ Setup the Appwrite Client (`constructor`)
    // ✅ Connects your React app to Appwrite's Database & Storage using the `conf.js` settings.  
    // ✅ Creates instances of **Databases** (to handle posts) and **Storage** (to manage images/files).
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //  2️⃣ Create a New Blog Post (`createPost`)
    // ✅ **Stores a new blog post** with a title, content, image, status, and user ID.  
    // ✅ Uses `slug` as a **unique identifier** for the post.
    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    //     3️⃣ Update an Existing Post (`updatePost`)
    // ✅ **Finds an existing post** by `slug` and updates its content.  
    // ✅ Helps users **edit their blog posts** easily.
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    //     ### 4️⃣ Delete a Post (`deletePost`)
    // ✅ **Removes a blog post** from the database using its `slug`.  
    // ✅ Ensures that deleted posts **cannot be accessed anymore**. 
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    //     ### 5️⃣ Fetch a Single Post (`getPost`)
    // ✅ **Retrieves a specific blog post** using its `slug`.  
    // ✅ Useful for **displaying full post details** when a user clicks on it. 
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    //     6️⃣ Fetch All Active Posts (`getPosts`)
    // ✅ **Lists all active posts** with status `"active"`.  
    // ✅ Uses **queries** to filter results (e.g., show only published posts). 
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
        } catch (error) {
            if (error.code === 401) {
                console.warn("User is not authorized to fetch posts. Please login or signip to read posts.");
                return { documents: [] }; // Return an empty array instead of crashing
            }
            console.error("Appwrite service :: getPosts :: error", error.message);
            return null;
        }
    }
    

    // file upload service

    //     ### 7️⃣ Upload a File (`uploadFile`)
    // ✅ **Uploads an image/file** to Appwrite storage.  
    // ✅ Uses `ID.unique()` to generate a **unique file ID**. 
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    //     ### 8️⃣ Delete a File (`deleteFile`)
    // ✅ **Removes a file** from Appwrite storage permanently.  
    // ✅ Helps users **manage their uploaded images** efficiently.
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    // ### 9️⃣ Get File Preview (`getFilePreview`)
    // ✅ **Generates a preview URL** for an uploaded file.  
    // ✅ Useful for **displaying images in blog posts**. 
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

// ### 🔟 Exporting the `Service` Instance
// ✅ Creates a **single instance** (`service`) of the `Service` class.  
// ✅ Makes it **easy to import and use** database & storage functions anywhere in the app. 
const service = new Service();

export default service;