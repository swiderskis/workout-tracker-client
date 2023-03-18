import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";

function Navbar() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register")
    return <></>;

  return (
    <div className="w3-bar w3-light-grey w3-border w3-margin-bottom">
      <NavItem path="/" value="Home" />
      <NavItem path="/add-exercise" value="Add exercise" />
    </div>
  );
}

export default Navbar;
