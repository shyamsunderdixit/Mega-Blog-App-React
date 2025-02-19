// import React from 'react'
import { Container, PostForm } from '../components'

// The AddPost component is responsible for rendering a page where users can add a new blog post.
// Container: A wrapper component to center the content and maintain consistent padding.
// PostForm: A form component that allows users to input details for a new post.

function AddPost() {
    // console.log("hey buddy this is addpost");

    return (
        <div className='py-8'>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost

// How It Works in the App :-
// When the user navigates to the "Add Post" page, this component is loaded.
// The PostForm component handles the actual post creation process.
// The page is styled with padding for a better user experience.