/* eslint-disable react/prop-types */
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
// import 'tinymce/tinymce';

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                    apiKey='4jealqe5zjvlk0d07aymhsijdxli8zchity7a2rdwj5ta1q4'
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />

        </div>
    )
}

// 📌 What Does This Component Do?
// ✅ Uses TinyMCE as a rich text editor
// ✅ Integrates with react-hook-form for form handling
// ✅ Allows users to write & format blog content
// ✅ Supports images, lists, links, tables, and more

// 📝 How It Works in Your Blogging App
// 1️⃣ User opens the "Add Post" page.
// 2️⃣ This RTE component appears, allowing them to write blog content.
// 3️⃣ When they type, TinyMCE updates the form state using react-hook-form.
// 4️⃣ When they click Submit, the content saves in Appwrite’s database.
// 5️⃣ Later, the blog post displays formatted text in the frontend.

// 🚀 Summary
// ✅ TinyMCE is used as a rich text editor
// ✅ Controller from react-hook-form connects it to the form
// ✅ Users can format text, add images, and write posts easily
// ✅ TinyMCE handles styling, content updates, and user input