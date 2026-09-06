import {
  isRouteErrorResponse,
  useRouteError,
  Link,
} from "react-router-dom";

import "./ErrorPage.css";
import Navbar from "../../components/Layout/Navbar/Navbar";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "Something went wrong!";
  let message = "An unexpected error occurred.";
    
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 400:
        title = "Bad Request";
        message = error.data?.message || "Invalid request.";
        break;

      case 401:
        title = "Unauthorized";
        message = error.data?.message || "Please login first.";
        break;

      case 403:
        title = "Forbidden";
        message = error.data?.message || "You don't have permission.";
        break;

      case 404:
        title = "Not Found";
        message = error.data?.message || "The requested page was not found.";
        break;

      case 500:
        title = "Server Error";
        message = error.data?.message || "Something went wrong on the server.";
        break;

      default:
        title = `${error.status}`;
        message = error.statusText;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <>
    <Navbar/>
    <div className="error-page">
      <h1>{title}</h1>

      <p>{message}</p>

      <Link to="/" className="home-btn">
        Go Home
      </Link>
    </div>
    </>
  );
}