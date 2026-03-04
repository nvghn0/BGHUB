import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Home</h2>

        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>

      <hr />

      <div style={{ marginTop: "20px" }}>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/grocery")}
        >
          Go to Grocery
        </button>

        <button onClick={() => navigate("/cart")}>
          Go to Cart
        </button>
      </div>
    </div>
  );
}