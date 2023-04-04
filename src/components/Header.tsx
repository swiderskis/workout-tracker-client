import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w3-container w3-green w3-margin-bottom">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>Workout Tracker</h1>
      </Link>
    </div>
  );
}

export default Header;
