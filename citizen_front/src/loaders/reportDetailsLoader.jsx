import { fetchWithAuth } from "../auth/fetchWithAuth.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export async function reportDetailsLoader({ params }) {
  const { reportId } = params;

  if (!reportId) {
    throw new Response("Report ID is required.", {
      status: 400,
    });
  }

  const url = `${API_URL}/api/reports/${reportId}`;

  console.log("=================================");
  console.log("reportDetailsLoader EXECUTED");
  console.log("Report ID:", reportId);
  console.log("Request URL:", url);
  console.log("=================================");

  const response = await fetchWithAuth(url, {
    method: "GET",
  });

  console.log("Response status:", response.status);
  console.log("Response URL:", response.url);

  const data = await response.json();

  console.log("reportDetailsLoader data:", data);

  if (!response.ok) {
    throw new Response(
      data?.message || "Failed to load report.",
      {
        status: response.status,
        statusText:
          data?.message || "Failed to load report.",
      }
    );
  }

  return data;
}