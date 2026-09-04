import {fetchWithAuth} from "../auth/fetchWithAuth.jsx";
const API_URL = import.meta.env.VITE_API_URL;

const IMPACT_VALUES = [
  "just_me",
  "few",
  "10_50",
  "50_100",
  "100_plus",
  "unknown",
];

const DURATION_VALUES = [
  "today",
  "few_days",
  "1_4_weeks",
  "more_than_month",
  "unknown",
];

const URGENCY_VALUES = [
  "normal",
  "attention",
  "urgent",
];

const isValidLocation = (location) => {
  const coordinates = location?.coordinates;

  if (
    location?.type !== "Point" ||
    !Array.isArray(coordinates) ||
    coordinates.length !== 2
  ) {
    return false;
  }

  const [longitude, latitude] = coordinates;

  return (
    typeof longitude === "number" &&
    typeof latitude === "number" &&
    !Number.isNaN(longitude) &&
    !Number.isNaN(latitude) &&
    longitude >= -180 &&
    longitude <= 180 &&
    latitude >= -90 &&
    latitude <= 90
  );
};

const isValidMedia = (media) =>
  Array.isArray(media) &&
  media.every(
    (item) =>
      (item.type === "image" || item.type === "video") &&
      typeof item.url === "string" &&
      item.url.startsWith("https://") &&
      typeof item.publicId === "string" &&
      item.publicId.length > 0
);

export async function ReportProblemAction({ request }) {
  try {
    const formData = await request.formData();
    const reportValue = formData.get("report");
    const submissionId = formData.get("submissionId");

    if (typeof reportValue !== "string") {
      return {
        success: false,
        error: "Report data was missing. Please try again.",
      };
    }

    const report = JSON.parse(reportValue);
    const description = String(report.description || "").trim();
    const affectedRange = report.impact?.affectedRange;

    if (description.length < 10 || description.length > 500) {
      return {
        success: false,
        error:
          "Please describe the problem in 10 to 500 characters.",
      };
    }

    if (!isValidLocation(report.location)) {
      return {
        success: false,
        error: "Please select a valid problem location.",
      };
    }

    if (!isValidMedia(report.media)) {
      return {
        success: false,
        error:
          "Evidence upload details were incomplete. Please try again.",
      };
    }

    if (!IMPACT_VALUES.includes(affectedRange)) {
      return {
        success: false,
        error: "Please select a valid community impact.",
      };
    }

    if (!DURATION_VALUES.includes(report.duration)) {
      return {
        success: false,
        error: "Please select a valid duration.",
      };
    }

    if (!URGENCY_VALUES.includes(report.urgency)) {
      return {
        success: false,
        error: "Please select a valid urgency.",
      };
    }


    // Send the report data to the backend
    const response = await fetchWithAuth(`${API_URL}/api/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       reportValue
      }),
    });

    console.log("Report submission response:", response);
    return {
      success: true,
      submissionId,
      report: {
        description,
        location: report.location,
        media: report.media,
        impact: {
          affectedRange,
        },
        duration: report.duration,
        urgency: report.urgency,
      },
    };
  } catch {
    return {
      success: false,
      error: "Report data could not be read. Please try again.",
    };
  }
}
