import { Link } from "react-router"
import { Button } from "../ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

 const TopBar = () => {
    const {user}=useUserContext();
    const {mutate:signOut}=useSignOutAccount()
    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <img
                        src="/public/assets/images/logo.svg"
                        alt="logo"
                        width={130}
                        height={325}
                    />
                </Link>

                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        className="shad-button_ghost"
                        onClick={()=>signOut()}
                    >
                        <img src="/public/assets/icons/logout.svg" alt="logout" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                        <img
                            src={ user.imageUrl || "/public/assets/icons/profile-placeholder.svg"}
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default TopBar