import { authRoutes } from "./authRoutes.jsx";
export const routes = [
  ...authRoutes, 
  {
    path: "*",
    element: <div>404</div>,
  },
];