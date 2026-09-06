
import { authRoutes } from "./authRoutes.jsx";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import AdminSectionPage from "../../pages/AdminSectionPage/AdminSectionPage.jsx";

const adminRoutes = [
  // "dashboard",
  // "reports",
  // "master-problems",
  "universities",
  "assignments",
  "projects",
  "analytics",
  "settings",
].map((section) => ({
  path: section,
  element: (
    <ProtectedRoute>
      <AdminSectionPage section={section} />
    </ProtectedRoute>
  ),
}));
import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import { ReportsPageRoutes } from "./ReportsPageRoutes.jsx";
import { MasterProblemsPageRoutes } from "./masterProblemsPageRoutes.jsx";
export const routes = [
  {
    index: true,
    element: <Dashboard/>,
    path: "dashboard", 
  },
  ...authRoutes,
  ...ReportsPageRoutes,
  ...MasterProblemsPageRoutes
 ,
  {
    path: "*",
    element: <div>404</div>,
  },
];
