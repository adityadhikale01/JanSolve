import { fetchWithAuth } from "../auth/fetchWithAuth.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export async function masterProblemsLoader() {
  try {
    const response = await fetchWithAuth(
      `${API_URL}/api/admin/master-problems`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Response(
        data?.message ||
          "Failed to load master problems.",
        {
          status: response.status,
          statusText:
            data?.message ||
            "Failed to load master problems.",
        }
      );
    }

    return {
      masterProblems:
        data.masterProblems || [],
      count: data.count || 0,
    };
  } catch (error) {
    console.error(
      "masterProblemsLoader error:",
      error
    );

    throw error;
  }
}