import ReportProblem from "../../pages/ReportProblem/ReportProblem.jsx";
import { ReportProblemAction } from "../../actions/reportProblemAction.jsx";
export const ReportProblemRoutes = [
  {
    //index: true,
    path: "/issues/new",
    element: <ReportProblem />,
    action:ReportProblemAction
  },
];