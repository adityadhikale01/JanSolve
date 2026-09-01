import { Form, Link, useNavigation ,useLocation,useNavigate,useActionData} from "react-router-dom";
import "./Loginpage.css";
import { useSearchParams } from "react-router-dom";

import { useEffect } from "react";
import { useAuth } from "../../auth/useAuth.jsx";
import ErrorBlock from "../../components/errorBlock/ErrorBlock.jsx";

export default function LoginPage() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const { login } = useAuth();

const [searchParams] = useSearchParams();

const from = searchParams.get("redirect") || "/";

useEffect(() => {
  if (!actionData?.success) return;

  console.log("==============");
  console.log("Login Success");
  console.log("location.state", location.state);
  console.log("from", from);

  login(actionData.user, actionData.accessToken);

  console.log("Navigating to:", from);

  navigate(from, {
    replace: true,
  });
}, [actionData]);

  return (
    <>
    <ErrorBlock messageToShow={actionData?.message} />
    
    <div className="login-container">
              
              {actionData?.message && (   // Display the message if it exists
                <p className="error-message">{actionData.message}</p>
              )}
              {actionData?.message && (
                navigation.state === "submitting" && (
                <p className="error-message">Logging in...</p>    
              ))}
            
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Login to continue</p>

        <Form method="post" className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            className="loginPage-button"
            type="submit"
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting"
              ? "Logging in..."
              : "Login"}
          </button>
        </Form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
    </>
  );
}