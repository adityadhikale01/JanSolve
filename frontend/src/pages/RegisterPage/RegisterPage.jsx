import { Form, useNavigation ,useActionData} from "react-router-dom";
import "./RegisterPage.css";
import ErrorBlock from "../../components/errorBlock/ErrorBlock.jsx";

export default function RegisterPage() {
  const navigation = useNavigation();
  const actionData = useActionData();
  console.log("Action Data:", actionData); // Log the action data for debugging

  return (
    <>
    <ErrorBlock errors={actionData?.errors} />
    <div className="register-container">
      <div className="register-card">
        <h1>Create Account</h1>
        <p>Join our community today</p>

        <Form method="post" className="register-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

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
              placeholder="Enter password"
              required
            />
          </div>

          <button
            className="registerPage-button"
            type="submit"
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting"
              ? "Registering..."
              : "Register"}
          </button>
        </Form>
      </div>
    </div>
    </>
  );
}