import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/files">Files</NavLink>
      <NavLink to="/data">Data</NavLink>
    </div>
  );
};

export default NavBar;
