import { useContext, useState } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Email and Password required");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password
      });

      console.log("Login Success:", res.data);

      // save token + role
      login(res.data.token, res.data.role);

      // redirect based on role
      if (res.data.role === "admin") {
        navigate("/P5K4B7/dashboard");
      } else {
        navigate("/");
      }

    }
    catch (error) {

      console.log("Login Error:", error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }
    finally {
      setLoading(false);
    }

  };

  return (

    <div style={{ maxWidth: "400px", margin: "auto" }}>

      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </div>

  );

}