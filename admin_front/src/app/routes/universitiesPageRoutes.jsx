import MasterProblemsPage from "../../pages/MasterProblemsPage/MasterProblemPage.jsx";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";

export const UniversitiesPageRoutes = [
 
  {
    path: "master-problems",
    element: (
      <ProtectedRoute>
        <MasterProblemsPage />
      </ProtectedRoute>
    ),
  
  },
];