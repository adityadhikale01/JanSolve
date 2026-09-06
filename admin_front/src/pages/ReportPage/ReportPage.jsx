import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { fetchWithAuth } from "../../auth/fetchWithAuth.jsx";
import "./ReportPage.css";
import ReportActionModal from "../../components/reports/ReportActionModel.jsx";
const API_URL = import.meta.env.VITE_API_URL;

const STATUS_LABELS = {
  submitted: "Submitted",
  under_review: "Under Review",
  information_requested: "Information Requested",
  verified: "Verified",
  assigned: "Assigned",
  in_progress: "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

const STATUS_CLASS = {
  submitted: "report-status--submitted",
  under_review: "report-status--review",
  information_requested: "report-status--info",
  verified: "report-status--verified",
  assigned: "report-status--assigned",
  in_progress: "report-status--progress",
  resolved: "report-status--resolved",
  rejected: "report-status--rejected",
};

const URGENCY_LABELS = {
  normal: "Normal",
  attention: "Attention",
  urgent: "Urgent",
};

const URGENCY_CLASS = {
  normal: "report-urgency--normal",
  attention: "report-urgency--attention",
  urgent: "report-urgency--urgent",
};

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getShortId(id) {
  if (!id) return "—";
  return `#${id.slice(-6).toUpperCase()}`;
}

function getLocationText(location) {
  if (!location) return "Location unavailable";

  if (location.address) {
    return location.address;
  }

  if (Array.isArray(location.coordinates)) {
    return `${location.coordinates[1]?.toFixed(4)}, ${location.coordinates[0]?.toFixed(4)}`;
  }

  return "Location unavailable";
}

function StatCard({ label, value, type }) {
  return (
    <div className={`report-stat-card report-stat-card--${type}`}>
      <div className="report-stat-card__top">
        <span>{label}</span>
      </div>

      <strong>{value}</strong>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`report-status ${
        STATUS_CLASS[status] || "report-status--submitted"
      }`}
    >
      <span className="report-status__dot" />
      {STATUS_LABELS[status] || status}
    </span>
  );
}

function UrgencyBadge({ urgency }) {
  return (
    <span
      className={`report-urgency ${
        URGENCY_CLASS[urgency] || "report-urgency--normal"
      }`}
    >
      {URGENCY_LABELS[urgency] || urgency}
    </span>
  );
}



function ReportDrawer({
  report,
  onClose,
  onAction,
  actionLoading,
}) {
  if (!report) return null;

  const canReview =
    report.status === "submitted" ||
    report.status === "information_requested";

  const canTakeDecision = report.status === "under_review";

  return (
    <>
      <div className="report-drawer-backdrop" onClick={onClose} />

      <aside className="report-drawer">
        <div className="report-drawer__header">
          <div>
            <span className="report-drawer__eyebrow">
              Report {getShortId(report._id)}
            </span>

            <h2>Report Details</h2>
          </div>

          <button
            type="button"
            className="report-drawer__close"
            onClick={onClose}
            aria-label="Close report details"
          >
            ×
          </button>
        </div>

        <div className="report-drawer__body">
          <div className="report-drawer__status-row">
            <StatusBadge status={report.status} />

            <UrgencyBadge urgency={report.urgency} />
          </div>

          <section className="report-detail-section">
            <div className="report-detail-section__heading">
              <span>Problem Statement</span>
            </div>

            <p className="report-detail-description">
              {report.description}
            </p>
          </section>

          <section className="report-detail-section">
            <div className="report-detail-grid">
              <div className="report-detail-item">
                <span>Submitted By</span>

                <strong>
                  {report.createdBy?.name || "Unknown user"}
                </strong>

                {report.createdBy?.email && (
                  <small>{report.createdBy.email}</small>
                )}
              </div>

              <div className="report-detail-item">
                <span>Submitted On</span>
                <strong>{formatDate(report.createdAt)}</strong>
              </div>

              <div className="report-detail-item">
                <span>Affected Range</span>
                <strong>
                  {report.impact?.affectedRange || "Unknown"}
                </strong>
              </div>

              <div className="report-detail-item">
                <span>Duration</span>
                <strong>{report.duration || "Unknown"}</strong>
              </div>
            </div>
          </section>

          <section className="report-detail-section">
            <div className="report-detail-section__heading">
              <span>Location</span>
            </div>

            <div className="report-location">
              <div className="report-location__icon">⌖</div>

              <div>
                <strong>{getLocationText(report.location)}</strong>

                {report.location?.coordinates && (
                  <small>
                    Lat: {report.location.coordinates[1]?.toFixed(5)}
                    {" · "}
                    Lng: {report.location.coordinates[0]?.toFixed(5)}
                  </small>
                )}
              </div>
            </div>
          </section>

          <section className="report-detail-section">
            <div className="report-detail-section__heading">
              <span>Evidence</span>

              <small>
                {report.media?.length || 0} attachment
                {report.media?.length === 1 ? "" : "s"}
              </small>
            </div>

            {report.media?.length ? (
              <div className="report-media-grid">
                {report.media.map((media, index) => (
                  <a
                    key={`${media.publicId || media.url}-${index}`}
                    href={media.url}
                    target="_blank"
                    rel="noreferrer"
                    className="report-media-card"
                  >
                    {media.type === "video" ? (
                      <video src={media.url} muted />
                    ) : (
                      <img
                        src={media.url}
                        alt={`Report evidence ${index + 1}`}
                      />
                    )}

                    <span>{media.type}</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="report-empty-evidence">
                No evidence attached to this report.
              </div>
            )}
          </section>

          <section className="report-detail-section">
            <div className="report-detail-section__heading">
              <span>AI Classification</span>
            </div>

            {report.classification?.domain ? (
              <div className="report-ai-card">
                <div>
                  <span>Domain</span>
                  <strong>{report.classification.domain}</strong>
                </div>

                {report.classification.subdomain && (
                  <div>
                    <span>Subdomain</span>
                    <strong>
                      {report.classification.subdomain}
                    </strong>
                  </div>
                )}

                {report.classification.problemType && (
                  <div>
                    <span>Problem Type</span>
                    <strong>
                      {report.classification.problemType}
                    </strong>
                  </div>
                )}

                {typeof report.classification.confidence ===
                  "number" && (
                  <div>
                    <span>Confidence</span>
                    <strong>
                      {Math.round(
                        report.classification.confidence * 100
                      )}
                      %
                    </strong>
                  </div>
                )}
              </div>
            ) : (
              <div className="report-ai-empty">
                AI classification is not available yet.
              </div>
            )}
          </section>

          {report.verification && (
            <section className="report-detail-section">
              <div className="report-detail-section__heading">
                <span>Verification</span>
              </div>

              <div className="report-verification">
                {report.verification.verifiedBy && (
                  <div>
                    <span>Reviewed By</span>

                    <strong>
                      {report.verification.verifiedBy.name ||
                        "Admin"}
                    </strong>
                  </div>
                )}

                {report.verification.verifiedAt && (
                  <div>
                    <span>Reviewed On</span>

                    <strong>
                      {formatDate(
                        report.verification.verifiedAt
                      )}
                    </strong>
                  </div>
                )}

                {report.verification.adminNote && (
                  <div>
                    <span>Admin Note</span>

                    <p>
                      {report.verification.adminNote}
                    </p>
                  </div>
                )}

                {report.verification.rejectionReason && (
                  <div>
                    <span>Rejection Reason</span>

                    <p>
                      {report.verification.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <div className="report-drawer__footer">
          {canReview && (
            <button
              type="button"
              className="report-action report-action--review"
              disabled={actionLoading}
              onClick={() => onAction("review", report)}
            >
              {actionLoading ? "Updating..." : "Start Review"}
            </button>
          )}

          {canTakeDecision && (
            <>
              <button
                type="button"
                className="report-action report-action--verify"
                disabled={actionLoading}
                onClick={() => onAction("verify", report)}
              >
                Verify Report
              </button>

              <button
                type="button"
                className="report-action report-action--info"
                disabled={actionLoading}
                onClick={() => onAction("request-info", report)}
              >
                Request Information
              </button>

              <button
                type="button"
                className="report-action report-action--reject"
                disabled={actionLoading}
                onClick={() => onAction("reject", report)}
              >
                Reject
              </button>
            </>
          )}

          {!canReview && !canTakeDecision && (
            <div className="report-drawer__locked">
              No verification action is available for this status.
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default function ReportPage() {
  const loaderData = useLoaderData();
  const [reports, setReports] = useState(
    loaderData?.reports || []
  );

  const [selectedReportId, setSelectedReportId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  //New States 
    const [actionModal, setActionModal] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [reportStats, setReportStats] = useState(
      loaderData?.stats || {}
    );

  const stats = reportStats;

  const selectedReport = useMemo(
    () =>
      reports.find(
        (report) => report._id === selectedReportId
      ) || null,
    [reports, selectedReportId]
  );


  function handleAction(action, report) {
    if (!report?._id) return;

    if (action === "review") {
      executeAction(action, report, {});
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    setActionModal({
      action,
      report,
    });
  }

  async function executeAction(action, report, body) {
    try {
      setActionLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetchWithAuth(
        `${API_URL}/api/admin/reports/${report._id}/${action}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to update report."
        );
      }

      setReports((currentReports) =>
        currentReports.map((item) =>
          item._id === report._id
            ? {
                ...item,
                status: data.status,
                verification:
                  data.verification || item.verification,
              }
            : item
        )
      );

      setActionModal(null);

      setSuccessMessage(
      getActionSuccessMessage(action)
      );
      // New Updated status of the report
      setReports((currentReports) =>
      currentReports.map((item) =>
        item._id === report._id
          ? {
              ...item,
              status: data.status,
              verification:
                data.verification || item.verification,
            }
          : item
      )
    );

    setReportStats((currentStats) => {
      const previousStatus = report.status;
      const newStatus = data.status;

      if (previousStatus === newStatus) {
        return currentStats;
      }

      return {
        ...currentStats,
        [previousStatus]: Math.max(
          0,
          (currentStats[previousStatus] || 0) - 1
        ),
        [newStatus]:
          (currentStats[newStatus] || 0) + 1,
      };
    });
    } catch (error) {
      console.error("Report action error:", error);

      setErrorMessage(
        error.message || "Something went wrong."
      );
    } finally {
      setActionLoading(false);
    }
  }
  function getActionSuccessMessage(action) {
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
  function handleModalConfirm(value) {
  if (!actionModal) return;

  const { action, report } = actionModal;

  let body = {};

  if (action === "verify") {
    body = {
      note: value,
    };
  }

  if (action === "reject") {
    body = {
      reason: value,
    };
  }

  if (action === "request-info") {
    body = {
      message: value,
    };
  }

  executeAction(action, report, body);
}

  return (
    <div className="report-page">
      <header className="report-page__header">
        <div>
          <div className="report-page__breadcrumb">
            <span>Admin</span>
            <span>›</span>
            <span>Reports</span>
          </div>

          <h1>Reports</h1>

          <p>
            Review, validate and manage citizen-submitted
            societal challenges.
          </p>
        </div>
      </header>

      <section className="report-stats">
        <StatCard
          label="Total Reports"
          value={stats.total || 0}
          type="total"
        />

        <StatCard
          label="Under Review"
          value={stats.under_review || 0}
          type="review"
        />

        <StatCard
          label="Verified"
          value={stats.verified || 0}
          type="verified"
        />

        <StatCard
          label="Rejected"
          value={stats.rejected || 0}
          type="rejected"
        />
      </section>

      <section className="report-list-section">
        <div className="report-list-header">
          <div>
            <h2>Recent Reports</h2>

            <p>
              {reports.length} report
              {reports.length === 1 ? "" : "s"} received
            </p>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="report-empty-state">
            <div className="report-empty-state__icon">✓</div>

            <h3>No reports found</h3>

            <p>
              There are currently no citizen reports to
              review.
            </p>
          </div>
        ) : (
          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Report</th>
                  <th>Submitted By</th>
                  <th>Classification</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr key={report._id}>
                    <td>
                      <div className="report-table__problem">
                        <strong>
                          {getShortId(report._id)}
                        </strong>

                        <span>
                          {report.description}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="report-table__user">
                        <strong>
                          {report.createdBy?.name ||
                            "Unknown"}
                        </strong>

                        <span>
                          {report.createdBy?.email ||
                            "—"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="report-classification">
                        <strong>
                          {report.classification?.domain ||
                            "Unclassified"}
                        </strong>

                        {report.classification
                          ?.subdomain && (
                          <span>
                            {
                              report.classification
                                .subdomain
                            }
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <UrgencyBadge
                        urgency={report.urgency}
                      />
                    </td>

                    <td>
                      <StatusBadge
                        status={report.status}
                      />
                    </td>

                    <td>
                      <span className="report-table__date">
                        {formatDate(report.createdAt)}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="report-view-button"
                        onClick={() =>
                          setSelectedReportId(
                            report._id
                          )
                        }
                      >
                        View
                        <span>→</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ReportDrawer
        report={selectedReport}
        onClose={() => setSelectedReportId(null)}
        onAction={handleAction}
        actionLoading={actionLoading}
      />
      {successMessage && (
  <div className="report-toast report-toast--success">
    <span>✓</span>

    <div>
      <strong>Success</strong>
      <p>{successMessage}</p>
    </div>

    <button
      type="button"
      onClick={() => setSuccessMessage("")}
      aria-label="Dismiss notification"
    >
      ×
    </button>
  </div>
)}

      {errorMessage && (
        <div className="report-toast report-toast--error">
          <span>!</span>

          <div>
            <strong>Action failed</strong>
            <p>{errorMessage}</p>
          </div>

          <button
            type="button"
            onClick={() => setErrorMessage("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
      <ReportActionModal
        action={actionModal?.action}
        report={actionModal?.report}
        loading={actionLoading}
        onClose={() => {
          if (!actionLoading) {
            setActionModal(null);
          }
        }}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}