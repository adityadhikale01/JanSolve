import { fetchWithAuth } from "../../../auth/fetchWithAuth.jsx";

const API_URL = import.meta.env.VITE_API_URL;

async function request(url, options = {}) {
  const response = await fetchWithAuth(
    `${API_URL}${url}`,
    options
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "AI request failed."
    );
  }

  return data;
}

export function classifyReport(reportId) {
  return request(
    `/api/admin/ai/reports/${reportId}/classify`,
    {
      method: "POST",
    }
  );
}

export function getMasterProblemMatches(reportId) {
  return request(
    `/api/admin/ai/reports/${reportId}/master-matches`,
    {
      method: "GET",
    }
  );
}

export function getUniversityRecommendations(
  masterProblemId
) {
  return request(
    `/api/admin/ai/master-problems/${masterProblemId}/universities`,
    {
      method: "GET",
    }
  );
}