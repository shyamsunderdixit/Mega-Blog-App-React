import { useState, useEffect } from "react"
import { Container, PostForm } from "../components"
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from "react-router-dom"

// This React component allows users to edit a blog post by fetching its details from Appwrite based on the slug in the URL.

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

//     How it Works:
// Runs when slug changes (thanks to [slug, navigate] dependency array).
// Checks if slug exists:
// ✅ If YES → Calls appwriteService.getPost(slug), fetching post data from the database.
// ✅ If post is found → Updates post state using setPost(post).
// ❌ If NO → Redirects (navigate("/")) to the homepage.
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost

// 🎯 Summary
// ✅ Extracts slug from URL using useParams().
// ✅ Fetches post data using appwriteService.getPost(slug).
// ✅ Stores it in state (post) using useState().
// ✅ Redirects to / if slug is invalid using useNavigate().
// ✅ Passes the post to PostForm for editing.

// This component ensures users can edit an existing post seamlessly. 🚀