import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/grocery">Grocery</Link>
      <Link to="/orders">My Orders</Link>

      {user ? (
        <>
          <button onClick={logoutUser}>Logout</button> 

          {user.role === "admin" && (
            <Link to="/admin">Admin Panel</Link>
          )}

          {user?.role === "admin" && (
              <a href="/admin/orders">Admin Orders</a>
              )}
          
        </>

      
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/cart">Cart</Link>
          
        </>
      )}
    </div>
  );
};

export default Navbar;
