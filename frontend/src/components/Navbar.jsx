import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      
      {/* LEFT */}
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>MyStore</Link>
        <Link to="/grocery" style={styles.link}>Grocery</Link>
        <Link to="/orders" style={styles.link}>My Orders</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        {user ? (
          <>
            {/* ADMIN LINKS */}
            {user.role === "admin" && (
              <>
                <button
                  style={styles.adminBtn}
                  onClick={() => navigate("/admin")}
                >
                  Admin Panel
                </button>

                <button
                  style={styles.adminBtn}
                  onClick={() => navigate("/admin/orders")}
                >
                  Admin Orders
                </button>

                <button
                  style={styles.adminBtn}
                  onClick={() => navigate("/admin/grocery")}
                >
                  Manage Grocery
                </button>
              </>
            )}

            {/* LOGOUT */}
            <button style={styles.logout} onClick={logoutUser}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#111",
    color: "#fff",
    alignItems: "center",
  },

  left: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  right: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  logo: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#4CAF50",
    textDecoration: "none",
  },

  link: {
    color: "#fff",
    textDecoration: "none",
  },

  adminBtn: {
    padding: "6px 10px",
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },

  logout: {
    padding: "6px 10px",
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};
