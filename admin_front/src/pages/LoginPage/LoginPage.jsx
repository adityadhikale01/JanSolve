import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import "./Loginpage.css";

import { useEffect } from "react";
import { useAuth } from "../../auth/useAuth.jsx";
import ErrorBlock from "../../components/errorBlock/ErrorBlock.jsx";

export default function LoginPage() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const from = redirectTo.startsWith("/") ? redirectTo : "/dashboard";

  useEffect(() => {
    if (!actionData?.success) return;

    login(actionData.user, actionData.accessToken);
    navigate(from, { replace: true });
  }, [actionData, from, login, navigate]);

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="auth-page">
      <section className="auth-intro" aria-label="Admin authentication">
        <span className="auth-kicker">Admin Portal</span>
        <h1>Welcome back to JanSolve</h1>
        <p>
          Sign in to manage reports, assignments, university partners, and
          resolution insights from the admin workspace.
        </p>
      </section>

      <section className="auth-card">
        <div className="auth-card-header">
          <span className="auth-card-label">Sign in</span>
          <h2>Access your account</h2>
          <p>Use your admin credentials to continue.</p>
        </div>

        <ErrorBlock messageToShow={!actionData?.success ? actionData?.message : ""} />

        <Form method="post" className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            className="loginPage-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Logging in..."
              : "Login"}
          </button>
        </Form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </div>
  );
}
