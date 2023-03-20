import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";

function Navbar() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register")
    return <></>;

  return (
    <div className="w3-bar w3-light-grey w3-border w3-margin-bottom">
      <NavItem path="/" value="Home" />
      <div className="w3-dropdown-hover">
        <button className="w3-button">Exercises</button>
        <div className="w3-dropdown-content w3-bar-block w3-card-4 w3-light-grey">
          <NavItem path="/exercise/add" value="Add exercise" />
          <NavItem path="/exercise/view" value="View exercises" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
