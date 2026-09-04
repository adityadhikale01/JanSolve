import { authRoutes } from "./authRoutes.jsx";
import {MyReportsRoutes} from "./MyReportsRoutes.jsx";
import { ReportProblemRoutes } from "./ReportProblemRoute.jsx";
export const routes = [
  ...authRoutes, 
  ...ReportProblemRoutes,
  ...MyReportsRoutes,
  {
    path: "*",
    element: <div>404</div>,
  },
];