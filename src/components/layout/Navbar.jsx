import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import "./Navbar.scss";

function Navbar() {
  const { loggedInUser, logout } = useAuth();

  return (
    <nav>
      <div className="logo">
        <img src="/shodo_logo_vector.svg" alt="Shodo logo" />
      </div>

      {loggedInUser && (
        <>
          <div className="navItem">
            <NavLink to="/collections">Collections</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/study">Study</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/progress">Progress</NavLink>
          </div>

          <div className="navItem">
            <button onClick={logout}>Logout</button>
          </div>
        </>
      )}

      {!loggedInUser && (
        <>
          <div className="navItem">
            <NavLink to="/login">Login</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
