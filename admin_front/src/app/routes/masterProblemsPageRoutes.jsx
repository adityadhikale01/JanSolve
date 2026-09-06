import MasterProblemsPage from "../../pages/MasterProblemsPage/MasterProblemsPage.jsx";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
import { masterProblemsLoader } from "../../loaders/masterProblemsLoader.jsx";
export const MasterProblemsPageRoutes = [
 
  {
    path: "master-problems",
    element: (
      <ProtectedRoute>
        <MasterProblemsPage />
      </ProtectedRoute>
    ),
    loader: masterProblemsLoader,
  },
];
