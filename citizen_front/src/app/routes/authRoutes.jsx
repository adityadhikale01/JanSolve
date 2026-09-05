import RegisterPage from "../../pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "../../pages/LoginPage/LoginPage.jsx";

import { registerAction } from "../../actions/registerAction.jsx";
import { loginAction } from "../../actions/loginAction.jsx";

export const authRoutes = [
  {
    path: "register",
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: "login",
    element: <LoginPage />,
    action: loginAction,
  },
];