import { Outlet, Navigate } from "react-router";
export const AuthLayout = () => {
  const isAuth = false;
  return (
    <>
      {
        isAuth ?
          (<Navigate to={'/'} />)
          : (
            <>
            <div className="flex flex-1 justify-around  items-center  py-10">
              <section>
                <Outlet />
              </section>
              <img src="/public/assets/images/side-img.svg"  alt="logo" className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat  " />
            </div>
            </>

          )}

    </>
  )
}
