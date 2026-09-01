import { redirect } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export async function registerAction({ request }) {
  const formData = await request.formData();

  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // API call to register the user
  const response= await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  // If the response is not successful, no redirect
  //Status code 400 indicates validation errors, so we handle it separately
  if (response.status === 400) {
    const errorData = await response.json();
    errorData.succesfulRedirect = false; // Indicate that the redirect should not happen
    return errorData; // Return the validation errors to the component
  }

  // Other server errors
  if (!response.ok) {
    throw new Response("Something went wrong", {
      status: response.status,
    });
  }

  // If the response is successful, redirect to the login page

  const data=await response.json();
  return redirect("/login");
}