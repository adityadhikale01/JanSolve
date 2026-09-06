import MasterProblemsPage from "../../pages/MasterProblemsPage/MasterProblemPage.jsx";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";

export const MasterProblemsPageRoutes = [
 
  {
    path: "master-problems",
    element: (
      <ProtectedRoute>
        <MasterProblemsPage />
      </ProtectedRoute>
    ),
  
  },
];
