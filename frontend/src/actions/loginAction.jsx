import { redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export async function loginAction({ request }) {

  const formData = await request.formData();
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include", // Include credentials for cookies
    });
    
    const data = await response.json();

  // return data; // Return the data to the component for further processing
   return data;
  } catch (error) {
    console.error(error);
    throw new Response("Something went wrong", { status: 500 });
  }
}