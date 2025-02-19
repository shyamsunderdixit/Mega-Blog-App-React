import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
// useParams → Extracts the post slug (ID) from the URL.
// useNavigate → Redirects users if needed.
// appwriteService → Interacts with Appwrite for fetching/deleting posts.
// parse (html-react-parser) → Converts post content (HTML) into JSX.
// useSelector → Gets logged-in user data from Redux.

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    // userData → Retrieves the logged-in user's info from Redux.
    const userData = useSelector((state) => state.auth.userData);

    // First, we check if post and userData exist (to prevent errors).
    // Then, we compare:   post.userId === userData.$id
//  post.userId → The ID of the user who created the post.
// userData.$id → The ID of the currently logged-in user.
// If they match, isAuthor is true, meaning the user owns the post.
// If they don't match, isAuthor is false, meaning the user is not the author.

// Why This Is Important
// If isAuthor is true, we show the "Edit" and "Delete" buttons.
// If isAuthor is false, the user can only view the post but cannot edit or delete it.
    const isAuthor = post && userData ? post.userID === userData.$id : false;

// Calls appwriteService.getPost(slug) to fetch the post.
// If the post exists, updates the post state.
// If not, redirects to the home page (/).
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

//     Calls appwriteService.deletePost(post.$id) to remove the post.
// If successful, also deletes the featured image.
// Redirects the user to the home page.
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

//     Checks if post exists, then renders the content.
// Displays the post image using appwriteService.getFilePreview().
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {/* If user is the author, show Edit and Delete buttons.
                    Edit button → Redirects to /edit-post/{postId}.
                    Delete button → Calls deletePost() to remove the post. */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

// 🎯 Summary
// ✅ Fetches the post using slug.
// ✅ Checks if the user is the author.
// ✅ Allows authors to edit/delete the post.
// ✅ Displays post title, image, and content.
// ✅ Redirects if the post doesn't exist.

// This component is responsible for viewing a single post and managing author actions (edit/delete).