
import LoginPage from "../../pages/LoginPage/LoginPage.jsx";
import { loginAction } from "../../actions/loginAction.jsx";
import { PublicRoute } from "../../auth/ProtectedRoute.jsx";

export const authRoutes = [
 
  {
    path: "login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
    action: loginAction,
  },
];
