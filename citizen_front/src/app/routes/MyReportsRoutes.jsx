import MyReportsPage from "../../pages/MyReportsPage/MyReportsPage.jsx";
import { myReportsLoader } from "../../loaders/myReportsLoader.jsx";
import ReportDetailsPage from "../../pages/ReportDetailsPage/ReportDetailsPage.jsx";
import { reportDetailsLoader } from "../../loaders/reportDetailsLoader.jsx";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
export const MyReportsRoutes = [
  {
    //index: true,
    path: "/my-reports",
    element: (
      <ProtectedRoute>
        <MyReportsPage />
      </ProtectedRoute>
    ),
    loader:myReportsLoader,
  },
  {
  path: "my-reports/:reportId",
  element: (
    <ProtectedRoute>
      <ReportDetailsPage />
    </ProtectedRoute>
  ),
  loader: reportDetailsLoader,
},
];