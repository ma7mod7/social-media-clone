
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SignInValidation } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from 'react-hot-toast';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


const SignInForm = () => {
    const navigate = useNavigate();
    const { isPending: isCreatingAccount } = useCreateUserAccount();
    const { mutateAsync: signInAccount } = useSignInAccount();
    const { checkAuthUser } = useUserContext()
    const form = useForm<z.infer<typeof SignInValidation>>({
        resolver: zodResolver(SignInValidation),
    })

    async function onSubmit(values: z.infer<typeof SignInValidation>) {

        const session = signInAccount({ email: values.email, password: values.password })
        if (!session) toast.error("Sign up failed. Please try again.")

        const isLoggendIn = await checkAuthUser();
        if (isLoggendIn) {
            form.reset();
            navigate("/")
        } else {
            return toast.error("Sign up failed. Please try again.")
        }

    }
    return (
        <div className="sm:w-420 flex-center flex-col">
            <img src="/assets/images/logo.svg" alt="logo" />

            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                Create a new account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">
                To use snapgram, Please enter your details
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input type="email" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {isCreatingAccount ? (<div className="flex-center gap-2">
                            <Loader /> Loading...
                        </div>) : "signin"}
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        don't have account?
                        <Link
                            to="/sign-up"
                            className="text-primary-500 text-small-semibold ml-1">
                            sign up
                        </Link>
                    </p>
                </form>
            </Form>
            <Toaster />
        </div>

    )
}

export default SignInForm




