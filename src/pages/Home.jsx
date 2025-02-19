import { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function Home() {
    // Stores the list of posts fetched from Appwrite.
    // Initially set to an empty array ([]).

    const [posts, setPosts] = useState([])

    //     Runs once on component mount ([] dependency array).
    // Calls appwriteService.getPosts() to fetch all posts.
    // If posts exist, it updates posts using setPosts(posts.documents).
    // Fix: The incorrect .catch.then syntax was corrected to .then().catch().
    // Logs errors in the console if fetching fails.
    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });

    }, [])

    //     If posts is empty, it displays a message prompting users to log in.
    // Early return → Prevents rendering the post list if no posts exist.
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home

// 🎯 Summary
// ✅ Fetches posts from Appwrite on component mount.
// ✅ Stores them in state (posts) using useState().
// ✅ Handles errors gracefully with .catch().
// ✅ Displays a login message if no posts exist.
// ✅ Uses PostCard to show each post in a responsive grid layout.

// This component serves as the homepage, displaying all available blog posts! 🚀