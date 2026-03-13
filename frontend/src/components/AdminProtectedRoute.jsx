import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {

  const { role, isLoggedIn } = useContext(AuthContext);

    // not logged in
      if (!isLoggedIn) {
          return <Navigate to="/login" />;
            }

              // logged in but not admin
                if (role !== "admin") {
                    return <Navigate to="/" />;
                      }

                        // admin access
                          return children;
                          };

                          export default AdminProtectedRoute;