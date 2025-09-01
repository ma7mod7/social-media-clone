import { Toaster } from "react-hot-toast";
import { AuthLayout } from "./_auth/AuthLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import { Home, Explore, Saved, CreatePost, Profile, EditPost, PostDetails, UpdatedProfile, AllUsers } from "./_root/pages";
import { RootLayout } from "./_root/RootLayout";
import "./globals.css"
import { Routes, Route } from "react-router";

function App() {

  return (
    <>
      <Routes>
        {/*public rotues */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>


        {/*private rotues */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdatedProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
