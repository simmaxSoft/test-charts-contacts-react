import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Root() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  
  useEffect(()=>{
    const pageName = pathname.split('/')[1]
    console.log(pageName)
    if(pageName === ''){
      navigate('/contacts')
    }
  },[pathname,navigate])

  return (
    <div className="flex h-full">
      <nav className="fixed left-0 h-screen md:w-36 w-28 pt-36 flex flex-col border-r-2 gap-4 bg-green-200 pl-4 text-xl">
        <div className="bg-green-200 w-full fixed top-0 h-14 z-100">
          <h3 className="text-2xl font-bold capitalize flex justify-center mt-2">{pathname.split('/')[1]}</h3>
        </div>
        <NavLink to={`/contacts`} className="text-blue-500 hover:text-blue-700 hover:cursor-pointer">
          Contacts
        </NavLink>
        <NavLink to={'/charts'} className="text-blue-500 hover:text-blue-700 hover:cursor-pointer">
          Charts
        </NavLink>
      </nav>
      <div className="flex-grow ml-28 md:ml-36 overflow-x-scroll mt-28">
        <Outlet />
      </div>
    </div>
  );
}