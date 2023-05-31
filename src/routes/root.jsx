import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex h-full">
      <nav className="fixed left-0 h-screen w-36 pt-36 flex flex-col border-r-2 gap-4 bg-green-200 pl-4 text-xl">
        <NavLink to={`/contacts`} className="text-blue-500 hover:text-blue-700">
          Contacts
        </NavLink>
        <NavLink to={'/charts'} className="text-blue-500 hover:text-blue-700">
          Charts
        </NavLink>
      </nav>
      <div className="flex-grow ml-36">
      <Outlet />
      </div>
    </div>
  );
}