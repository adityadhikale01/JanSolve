import { fetchWithAuth } from "../auth/fetchWithAuth.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export async function adminReportsLoader() {
  try {
    const reportsUrl = `${API_URL}/api/admin/reports`;
    const statsUrl = `${API_URL}/api/admin/reports/stats`;

    const [reportsResponse, statsResponse] =
      await Promise.all([
        fetchWithAuth(reportsUrl, {
          method: "GET",
        }),

        fetchWithAuth(statsUrl, {
          method: "GET",
        }),
      ]);

    const reportsData = await reportsResponse.json();
    const statsData = await statsResponse.json();

    console.log("Admin reports:", reportsData);
    console.log("Admin report stats:", statsData);

    if (!reportsResponse.ok) {
      throw new Response(
        reportsData?.message ||
          "Failed to load admin reports.",
        {
          status: reportsResponse.status,
          statusText:
            reportsData?.message ||
            "Failed to load admin reports.",
        }
      );
    }

    if (!statsResponse.ok) {
      throw new Response(
        statsData?.message ||
          "Failed to load report statistics.",
        {
          status: statsResponse.status,
          statusText:
            statsData?.message ||
            "Failed to load report statistics.",
        }
      );
    }

    return {
      reports: reportsData.reports || [],
      count: reportsData.count || 0,
      stats: statsData.stats || {},
    };
  } catch (error) {
    console.error("adminReportsLoader error:", error);
    throw error;
  }
}