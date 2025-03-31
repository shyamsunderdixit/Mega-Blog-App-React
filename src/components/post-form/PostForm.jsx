/* eslint-disable react/prop-types */
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// react-hook-form → Manages form state and validation.
// appwriteService → Handles Appwrite interactions (e.g., creating, updating posts).
// useNavigate → For navigating between pages in React Router.
// useSelector → Accesses Redux state to get the logged-in user.
// useCallback → Optimizes functions to prevent unnecessary re-renders.

// This component is responsible for handling both creating and editing a blog post in your Appwrite-based blogging application.

export default function PostForm({ post }) {
    // Initializes the form with default values.
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            // Deletes the previous image if a new one is uploaded
            if (file && post.featuredImage) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // Ensures an image is uploaded before proceeding
            if (data.image?.[0]) {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                            // console.log("UserData:", userData); // Debugging to see user data
                            // console.log("Creating Post with Data:", { ...data, userID: userData?.$id });
                    const dbPost = await appwriteService.createPost({ ...data, userID: userData.$id });
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);
    
    // SPECIALLY FOR Subscription's useEffect
    // 🔹 What is watch() Doing?
    // watch() from react-hook-form monitors form fields for changes.
    // In this case, it watches the "title" field.
    // If the title changes, the slug is updated dynamically using setValue().
    
    // 🔹 Why Do We Need a Subscription?
    // watch() returns a subscription that continuously listens for changes.
    // When the component unmounts (removed from the screen), we unsubscribe to prevent memory leaks.
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // Ensures controlled behavior for RTE content
    useEffect(() => {
        setValue("content", getValues("content"));
    }, [setValue, getValues]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* Left Side (2/3 Width) */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* Right Side (1/3 Width) */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

// 🔹 Summary
// ✅ Uses react-hook-form for form state & validation.
// ✅ Handles both creating & updating posts.
// ✅ Automatically generates slugs based on the title.
// ✅ Uploads featured images & deletes old ones if editing.
// ✅ Auto-updates slug while typing.
// ✅ Navigates to the post after submission.

// 🔹 Step-by-Step Execution
// The effect runs when the component mounts.
// It subscribes to watch(), listening for title changes.
// If the user types in the "title" field:
// The slugTransform() function generates a slug from the title.
// setValue("slug", newSlug) updates the slug field dynamically.
// When the component unmounts, the subscription.unsubscribe() is called to clean up.
