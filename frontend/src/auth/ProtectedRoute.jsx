import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // or your spinner
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`}
        replace
        />
    );
    /*we store the current location in the url because we 
    want to redirect user to the same page 
    after login*/
    //replace is used to replace the current history entry means user can not use browser back button
  }

  return children;
}

export default ProtectedRoute;