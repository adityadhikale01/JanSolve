import { Navigate } from "react-router-dom";
import { authRoutes } from "./authRoutes.jsx";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import AdminSectionPage from "../../pages/AdminSectionPage/AdminSectionPage.jsx";
import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import { ReportsPageRoutes } from "./ReportsPageRoutes.jsx";
import { MasterProblemsPageRoutes } from "./masterProblemsPageRoutes.jsx";

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
export const routes = [
  {
    index: true,
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  ...authRoutes,
  ...ReportsPageRoutes,
  ...MasterProblemsPageRoutes,
  ...adminRoutes,
  {
    path: "*",
    element: <div>404</div>,
  },
];
