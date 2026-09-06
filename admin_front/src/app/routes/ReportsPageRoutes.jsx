import ReportPage from "../../pages/ReportPage/ReportPage.jsx";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import { adminReportsLoader } from "../../loaders/adminReportsLoader.jsx";
export const ReportsPageRoutes = [
 
  {
    path: "reports",
    element: (
      <ProtectedRoute>
        <ReportPage />
      </ProtectedRoute>
    ),
    loader: adminReportsLoader,
  },
];
