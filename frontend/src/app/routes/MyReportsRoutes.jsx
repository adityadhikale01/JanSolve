import MyReportsPage from "../../pages/MyReportsPage/MyReportsPage.jsx";
import { myReportsLoader } from "../../loaders/myReportsLoader.jsx";
import ReportDetailsPage from "../../pages/ReportDetailsPage/ReportDetailsPage.jsx";
import { reportDetailsLoader } from "../../loaders/reportDetailsLoader.jsx";
export const MyReportsRoutes = [
  {
    //index: true,
    path: "/my-reports",
    element: <MyReportsPage />,
    loader:myReportsLoader,
  },
  {
  path: "my-reports/:reportId",
  element: <ReportDetailsPage />,
  loader: reportDetailsLoader,
},
];