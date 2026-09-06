export const STATUS_LABELS = {
  submitted: "Submitted",
  under_review: "Under Review",
  information_requested: "Information Requested",
  verified: "Verified",
  assigned: "Assigned",
  in_progress: "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

export const STATUS_CLASS = {
  submitted: "report-status--submitted",
  under_review: "report-status--review",
  information_requested: "report-status--info",
  verified: "report-status--verified",
  assigned: "report-status--assigned",
  in_progress: "report-status--progress",
  resolved: "report-status--resolved",
  rejected: "report-status--rejected",
};

export const URGENCY_LABELS = {
  normal: "Normal",
  attention: "Attention",
  urgent: "Urgent",
};

export const URGENCY_CLASS = {
  normal: "report-urgency--normal",
  attention: "report-urgency--attention",
  urgent: "report-urgency--urgent",
};

export const DEFAULT_FILTERS = {
  search: "",
  status: "all",
  urgency: "all",
  domain: "all",
};

export function formatDate(date) {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getShortId(id) {
  if (!id) return "-";

  return `#${String(id).slice(-6).toUpperCase()}`;
}

export function getLocationText(location) {
  if (!location) {
    return "Location unavailable";
  }

  if (location.address) {
    return location.address;
  }

  if (
    Array.isArray(location.coordinates) &&
    location.coordinates.length >= 2
  ) {
    const longitude = Number(location.coordinates[0]);
    const latitude = Number(location.coordinates[1]);

    if (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude)
    ) {
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  }

  return "Location unavailable";
}

export function getMasterProblemId(report) {
  if (!report?.masterProblemId) {
    return null;
  }

  if (
    typeof report.masterProblemId === "object" &&
    report.masterProblemId !== null
  ) {
    return report.masterProblemId._id || null;
  }

  return report.masterProblemId;
}

export function filterReports(reports, filters) {
  const search = filters.search.trim().toLowerCase();

  return reports.filter((report) => {
    const matchesSearch =
      !search ||
      report.description?.toLowerCase().includes(search) ||
      report.createdBy?.name?.toLowerCase().includes(search) ||
      report.createdBy?.email?.toLowerCase().includes(search) ||
      report.classification?.domain?.toLowerCase().includes(search) ||
      report.location?.address?.toLowerCase().includes(search);

    const matchesStatus =
      filters.status === "all" || report.status === filters.status;

    const matchesUrgency =
      filters.urgency === "all" ||
      report.urgency === filters.urgency;

    const matchesDomain =
      filters.domain === "all" ||
      report.classification?.domain === filters.domain;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesUrgency &&
      matchesDomain
    );
  });
}

export function getDomainOptions(reports) {
  const domains = reports
    .map((report) => report.classification?.domain)
    .filter(Boolean);

  return [...new Set(domains)].sort();
}

export function getActionPayload(action, value) {
  if (action === "verify") {
    return { note: value };
  }

  if (action === "reject") {
    return { reason: value };
  }

  if (action === "request-info") {
    return { message: value };
  }

  return {};
}

export function getActionSuccessMessage(action) {
  switch (action) {
    case "review":
      return "Report moved to review.";
    case "verify":
      return "Report successfully verified.";
    case "reject":
      return "Report has been rejected.";
    case "request-info":
      return "Information request sent successfully.";
    default:
      return "Report updated successfully.";
  }
}
