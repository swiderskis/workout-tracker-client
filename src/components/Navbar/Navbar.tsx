import { useLocation, useNavigate } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import NavItem from "./NavItem";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    localStorage.removeItem("token");

    navigate("/login");
  };

  if (location.pathname === "/login" || location.pathname === "/register")
    return <></>;

  return (
    <div className="w3-bar w3-light-grey w3-border w3-margin-bottom">
      <NavItem path="/" value="Home" />
      <NavDropdown name="Exercises">
        <NavItem path="/exercise/add" value="Add exercise" />
        <NavItem path="/exercise/view" value="View exercises" />
      </NavDropdown>
      <NavDropdown name="Routine">
        <NavItem path="/routine/create" value="Create new routine" />
        <NavItem path="/routine/list" value="View routine(s)" />
      </NavDropdown>
      <NavDropdown name="Session">
        <NavItem path="/session/log" value="Log new session" />
        <NavItem path="/session/list" value="View sessions" />
      </NavDropdown>
      <button
        className="w3-button w3-ripple"
        style={{ float: "right" }}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
