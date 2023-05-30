import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex p-4">
      <nav className="flex flex-col mb-2 pl-4 basis-32 border-r-2 gap-4 bg-gray-200 h-screen">
      <NavLink to={`/contacts`} className="text-blue-500 hover:text-blue-700">
        Contacts
      </NavLink>
      <NavLink to={'/charts'} className="text-blue-500 hover:text-blue-700">
        Charts
      </NavLink>
      </nav>
    <Outlet />
    </div>
  );
}