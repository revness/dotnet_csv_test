import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className=" bg-white shadow">
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/files">Files</NavLink>
          <NavLink to="/data">Data</NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
