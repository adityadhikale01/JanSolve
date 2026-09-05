import { authRoutes } from "./authRoutes.jsx";
import {MyReportsRoutes} from "./MyReportsRoutes.jsx";
import { ReportProblemRoutes } from "./ReportProblemRoute.jsx";
import { NearbyIssuesRoutes } from "./NearbyIssuesRoutes.jsx";
export const routes = [
  ...authRoutes, 
  ...ReportProblemRoutes,
  ...MyReportsRoutes,
  ...NearbyIssuesRoutes,
  {
    path: "*",
    element: <div>404</div>,
  },
];