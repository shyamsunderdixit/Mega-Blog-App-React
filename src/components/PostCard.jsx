/* eslint-disable react/prop-types */
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

// The PostCard component is responsible for displaying individual blog posts in a card format.
// Each post card contains an image, a title, and a clickable link that redirects the user to the full post.

// Link (from React Router): Used to navigate to the full post page when a user clicks on the post card.

// Props ($id, title, featuredImage):
// $id: The unique identifier for the post (used in the URL).
// title: The title of the post.
// featuredImage: The image associated with the post.

// The entire post card is wrapped in a <Link>, making it clickable.
// Clicking the card navigates to /post/{postId}, which loads the Post page.

function PostCard({$id, title, featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                    className="rounded-xl"
                    />
                </div>
                <h2 className="text-xl font-bold">
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard

// Summary of How It Works
// ✅ Fetches post data (title, featuredImage) as props.
// ✅ Uses appwriteService.getFilePreview(featuredImage) to get the image URL.
// ✅ Displays the image and title inside a nicely styled card.
// ✅ Wraps everything in a clickable <Link>, which redirects to the full post page (/post/{postId}).