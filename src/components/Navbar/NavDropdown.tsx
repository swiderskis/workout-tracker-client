interface NavDropdownProps {
  name: string;
  children: JSX.Element | JSX.Element[];
}

function NavDropdown(props: NavDropdownProps) {
  return (
    <div className="w3-dropdown-hover">
      <button className="w3-button">{props.name}</button>
      <div className="w3-dropdown-content w3-bar-block w3-card-4 w3-light-grey">
        {props.children}
      </div>
    </div>
  );
}

export default NavDropdown;
