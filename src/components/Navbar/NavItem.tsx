import { Link } from "react-router-dom";

interface NavItemProps {
  path: string;
  value: string;
}

function NavItem(props: NavItemProps) {
  return (
    <Link to={props.path} className="w3-bar-item w3-button">
      {props.value}
    </Link>
  );
}
export default NavItem;
