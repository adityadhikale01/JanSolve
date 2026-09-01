import { authRoutes } from "./authRoutes.jsx";
import { ReportProblemRoutes } from "./ReportProblem.jsx";
export const routes = [
  ...authRoutes, 
  ...ReportProblemRoutes,
  {
    path: "*",
    element: <div>404</div>,
  },
];