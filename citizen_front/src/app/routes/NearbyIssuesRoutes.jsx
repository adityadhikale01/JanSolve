import NearbyIssuesPage from "../../pages/NearbyIssuesPage/NearbyIssuesPage.jsx";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
export const NearbyIssuesRoutes = [
  {
    path: "nearby-issues",
    element: (
      <ProtectedRoute>
        <NearbyIssuesPage />
      </ProtectedRoute>
    ),
  },
];