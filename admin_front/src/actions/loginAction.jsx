const API_URL = import.meta.env.VITE_API_URL;

export async function loginAction({ request }) {

  const formData = await request.formData();
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  console.log("Login Data:", loginData); // Log the login data for debugging
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include", // Include credentials for cookies
    });
    console.log("Response Status:", response.status); // Log the response status for debugging
    
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Unable to login. Please check your details.",
      };
    }

    return data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
