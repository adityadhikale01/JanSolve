import { fetchWithAuth } from "../auth/fetchWithAuth.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export async function myReportsLoader() {
  try {
    const url = `${API_URL}/api/reports/my`;

    // console.log("=================================");
    // console.log("myReportsLoader EXECUTED");
    // console.log("API_URL:", API_URL);
    // console.log("Request URL:", url);
    // console.log("=================================");

    const response = await fetchWithAuth(url, {
      method: "GET",
    });

    // console.log("Response status:", response.status);
    // console.log("Response URL:", response.url);
    // console.log(
    //   "Response content type:",
    //   response.headers.get("content-type")
    // );

    const data = await response.json();

    console.log("myReportsLoader data:", data);

    if (!response.ok) {
      throw new Response(
        data?.message || "Failed to load your reports.",
        {
          status: response.status,
          statusText:
            data?.message || "Failed to load your reports.",
        }
      );
    }

    return data;
  } catch (error) {
    console.error("myReportsLoader error:", error);
    throw error;
  }
}