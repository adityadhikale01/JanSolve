import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import { routes } from "./routes";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: routes,
    
  },
]);

export default router;