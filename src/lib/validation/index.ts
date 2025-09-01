
import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "user name must be at least 2 characters." }),
    email: z.email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});



export const SignInValidation = z.object({
    email: z.email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});

{/**
    What z.custom() is

z.custom() is a Zod escape hatch.

It lets you define a schema for types that Zod doesn’t provide out of the box.

By default, Zod has built-in schemas like z.string(), z.number(), z.boolean(), etc.

But there’s no built-in z.file() or z.image() validator.

So z.custom<File[]>() tells TypeScript and Zod:

“This field should hold a File[] (array of File objects), but Zod itself won’t try to deeply validate the structure of File — it will just trust this type.”

Why use it here

In your form, the file is an array of uploaded File objects from the browser.

Since Zod doesn’t know what a browser File is, you use z.custom<File[]>() to accept and type-check it.

Without it, Zod would complain because z.string(), z.array(), etc. wouldn’t fit. */}