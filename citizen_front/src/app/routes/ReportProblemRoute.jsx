import ReportProblem from "../../pages/ReportProblem/ReportProblem.jsx";
import { ReportProblemAction } from "../../actions/reportProblemAction.jsx";
import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
export const ReportProblemRoutes = [
  {
    //index: true,
    path: "/issues/new",
    element: (
      <ProtectedRoute>
        <ReportProblem />
      </ProtectedRoute>
    ),
    action:ReportProblemAction
  },
];