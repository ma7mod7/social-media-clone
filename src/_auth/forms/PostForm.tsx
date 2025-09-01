
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import Loader from "@/components/shared/Loader"
import { useUserContext } from "@/context/AuthContext"
import toast, { Toaster } from 'react-hot-toast';
import type { Models } from "appwrite"


type PostFormProps = {
    post?: Models.Document;
    action: "Create" | "Update";
};

export const PostForm = ({ post, action }: PostFormProps) => {

    const { user } = useUserContext()
    const navigate = useNavigate()
    const { mutateAsync: createPost, isPending: isLoadingCreate } =
        useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
        useUpdatePost();
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(",") : "",
        },
    })

    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if (post && action === "Update") {
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imgId: post.imgId,
                imgUrl: post.imgUrl,
            });

            if (!updatedPost) {
                toast.error("Post failed. Please try again.");
            }
            return navigate(`/posts/${post.$id}`);
        }
        const newPost = await createPost({
            ...values,
            userId: user.id,
        })
        if (!newPost) {
            toast.error(" Please try post again.")
        }
        navigate("/")
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full  max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                                {/**
                                 * what is field?
                                 * field is an object from React Hook Form that wires up your input to the form
                                 * 
                                field includes:
                                    onChange → function to update the form state when input changes
                                    onBlur → function to mark the field as “touched”
                                    value → the current value of the input from the form state
                                    name → the field name (here: "caption")
                                    ref → a React ref for registering the input

                                    function of it:
                                    This makes the Textarea controlled by React Hook Form, so typing inside updates the form state automatically.
                                 */}
                            </FormControl >
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader fieldChange={field.onChange}
                                    mediaUrl={""} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Add Tags (separated by comma " , ")
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Art, Expression, Learn"
                                    type="text"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="button"
                        className="shad-button_dark_4"
                        onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                        disabled={isLoadingCreate ||isLoadingUpdate}>
                        {(isLoadingCreate || isLoadingUpdate) && <Loader />}
                        {action}Post
                    </Button>
                </div>
            </form>
            <Toaster />
        </Form>
    )
}




