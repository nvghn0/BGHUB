import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <button onClick={logoutUser}>Logout</button>

          {user.role === "admin" && (
            <Link to="/admin">Admin Panel</Link>
          )}
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
