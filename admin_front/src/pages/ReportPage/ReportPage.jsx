import { useMemo, useState } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";

import { fetchWithAuth } from "../../auth/fetchWithAuth.jsx";

import "./ReportPage.css";

import ReportActionModal from "../../components/reports/ReportActionModel.jsx";

import MasterProblemSelector from "../../components/reports/MasterProblemSelector.jsx";

import CreateMasterProblemModal from "../../components/reports/CreateMasterProblemModel.jsx";

const API_URL = import.meta.env.VITE_API_URL;

/* =========================================================
   STATUS
========================================================= */

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

/* =========================================================
   URGENCY
========================================================= */

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

/* =========================================================
   HELPERS
========================================================= */

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getShortId(id) {
  if (!id) return "—";

  return `#${String(id).slice(-6).toUpperCase()}`;
}

function getLocationText(location) {
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

function getMasterProblemId(report) {
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

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ label, value, type }) {
  return (
    <div
      className={`report-stat-card report-stat-card--${type}`}
    >
      <div className="report-stat-card__top">
        <span>{label}</span>
      </div>

      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  return (
    <span
      className={`report-status ${
        STATUS_CLASS[status] ||
        "report-status--submitted"
      }`}
    >
      <span className="report-status__dot" />

      {STATUS_LABELS[status] || status || "Unknown"}
    </span>
  );
}

/* =========================================================
   URGENCY BADGE
========================================================= */

function UrgencyBadge({ urgency }) {
  return (
    <span
      className={`report-urgency ${
        URGENCY_CLASS[urgency] ||
        "report-urgency--normal"
      }`}
    >
      {URGENCY_LABELS[urgency] || urgency || "Normal"}
    </span>
  );
}

/* =========================================================
   REPORT DRAWER
========================================================= */

function ReportDrawer({
  report,
  onClose,
  onAction,
  actionLoading,

  masterProblems,

  onFindMasterProblem,
  onCreateMasterProblem,
  onChangeMasterProblem,
  onUnlinkMasterProblem,
  onViewMasterProblems,
}) {
  if (!report) {
    return null;
  }

  const canReview =
    report.status === "submitted" ||
    report.status === "information_requested";

  const canTakeDecision =
    report.status === "under_review";

  const masterProblemId =
    getMasterProblemId(report);

  const masterProblem = masterProblemId
    ? masterProblems.find(
        (problem) =>
          String(problem._id) ===
          String(masterProblemId)
      )
    : null;

  const isVerified =
    report.status === "verified";

  const isRejected =
    report.status === "rejected";

  return (
    <>
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div
        className="report-drawer-backdrop"
        onClick={onClose}
      />

      {/* =====================================================
          DRAWER
      ===================================================== */}

      <aside className="report-drawer">
        {/* ===================================================
            HEADER
        =================================================== */}

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

        {/* ===================================================
            SCROLLABLE BODY
        =================================================== */}

        <div className="report-drawer__body">
          {/* =================================================
              STATUS
          ================================================= */}

          <div className="report-drawer__status-row">
            <StatusBadge status={report.status} />

            <UrgencyBadge
              urgency={report.urgency}
            />
          </div>

          {/* =================================================
              PROBLEM STATEMENT
          ================================================= */}

          <section className="report-detail-section">
            <div className="report-detail-section__heading">
              <span>Problem Statement</span>
            </div>

            <p className="report-detail-description">
              {report.description ||
                "No problem description available."}
            </p>
          </section>

          {/* =================================================
              SUBMISSION DETAILS
          ================================================= */}

          <section className="report-detail-section">
            <div className="report-detail-grid">
              <div className="report-detail-item">
                <span>Submitted By</span>

                <strong>
                  {report.createdBy?.name ||
                    "Unknown user"}
                </strong>

                {report.createdBy?.email && (
                  <small>
                    {report.createdBy.email}
                  </small>
                )}
              </div>

              <div className="report-detail-item">
                <span>Submitted On</span>

                <strong>
                  {formatDate(report.createdAt)}
                </strong>
              </div>

              <div className="report-detail-item">
                <span>Affected Range</span>

                <strong>
                  {report.impact?.affectedRange ||
                    "Unknown"}
                </strong>
              </div>

              <div className="report-detail-item">
                <span>Duration</span>

                <strong>
                  {report.duration || "Unknown"}
                </strong>
              </div>
            </div>
          </section>

          {/* =================================================
              LOCATION
          ================================================= */}

          <section className="report-detail-section">
            <div className="report-detail-section__heading">
              <span>Location</span>
            </div>

            <div className="report-location">
              <div className="report-location__icon">
                ⌖
              </div>

              <div>
                <strong>
                  {getLocationText(
                    report.location
                  )}
                </strong>

                {Array.isArray(
                  report.location?.coordinates
                ) &&
                  report.location.coordinates.length >=
                    2 && (
                    <small>
                      Lat:{" "}
                      {Number(
                        report.location.coordinates[1]
                      ).toFixed(5)}
                      {" · "}
                      Lng:{" "}
                      {Number(
                        report.location.coordinates[0]
                      ).toFixed(5)}
                    </small>
                  )}
              </div>
            </div>
          </section>

          {/* =================================================
              EVIDENCE
          ================================================= */}

          <section className="report-detail-section">
            <div className="report-detail-section__heading">
              <span>Evidence</span>

              <small>
                {report.media?.length || 0} attachment
                {report.media?.length === 1
                  ? ""
                  : "s"}
              </small>
            </div>

            {report.media?.length ? (
              <div className="report-media-grid">
                {report.media.map(
                  (media, index) => (
                    <a
                      key={`${
                        media.publicId ||
                        media.url ||
                        "media"
                      }-${index}`}
                      href={media.url}
                      target="_blank"
                      rel="noreferrer"
                      className="report-media-card"
                    >
                      {media.type === "video" ? (
                        <video
                          src={media.url}
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={media.url}
                          alt={`Report evidence ${
                            index + 1
                          }`}
                        />
                      )}

                      <span>
                        {media.type || "media"}
                      </span>
                    </a>
                  )
                )}
              </div>
            ) : (
              <div className="report-empty-evidence">
                No evidence attached to this
                report.
              </div>
            )}
          </section>

          {/* =================================================
              AI CLASSIFICATION
          ================================================= */}

          <section className="report-detail-section">
            <div className="report-detail-section__heading">
              <span>AI Classification</span>
            </div>

            {report.classification?.domain ? (
              <div className="report-ai-card">
                <div>
                  <span>Domain</span>

                  <strong>
                    {
                      report.classification
                        .domain
                    }
                  </strong>
                </div>

                {report.classification
                  .subdomain && (
                  <div>
                    <span>Subdomain</span>

                    <strong>
                      {
                        report.classification
                          .subdomain
                      }
                    </strong>
                  </div>
                )}

                {report.classification
                  .problemType && (
                  <div>
                    <span>Problem Type</span>

                    <strong>
                      {
                        report.classification
                          .problemType
                      }
                    </strong>
                  </div>
                )}

                {typeof report.classification
                  .confidence === "number" && (
                  <div>
                    <span>Confidence</span>

                    <strong>
                      {Math.round(
                        report.classification
                          .confidence * 100
                      )}
                      %
                    </strong>
                  </div>
                )}
              </div>
            ) : (
              <div className="report-ai-empty">
                AI classification is not
                available yet.
              </div>
            )}
          </section>

          {/* =================================================
              VERIFICATION
          ================================================= */}

          {report.verification && (
            <section className="report-detail-section">
              <div className="report-detail-section__heading">
                <span>Verification</span>
              </div>

              <div className="report-verification">
                {report.verification
                  .verifiedBy && (
                  <div>
                    <span>Reviewed By</span>

                    <strong>
                      {report.verification
                        .verifiedBy.name ||
                        "Admin"}
                    </strong>
                  </div>
                )}

                {report.verification
                  .verifiedAt && (
                  <div>
                    <span>Reviewed On</span>

                    <strong>
                      {formatDate(
                        report.verification
                          .verifiedAt
                      )}
                    </strong>
                  </div>
                )}

                {report.verification
                  .adminNote && (
                  <div>
                    <span>Admin Note</span>

                    <p>
                      {
                        report.verification
                          .adminNote
                      }
                    </p>
                  </div>
                )}

                {report.verification
                  .rejectionReason && (
                  <div>
                    <span>
                      Rejection Reason
                    </span>

                    <p>
                      {
                        report.verification
                          .rejectionReason
                      }
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* =================================================
              MASTER PROBLEM
          ================================================= */}

          <section className="report-detail-section report-master-problem-section">
            <div className="report-detail-section__heading">
              <div className="report-section-heading">
                <span>MASTER PROBLEM</span>

                <h3>
                  Societal Challenge Link
                </h3>
              </div>
            </div>

            {/* -----------------------------------------------
                NOT VERIFIED
            ----------------------------------------------- */}

            {!isVerified && !isRejected && (
              <div className="report-master-info-box">
                <strong>
                  Verification required
                </strong>

                <p>
                  Only verified reports can be
                  linked to a master problem.
                </p>
              </div>
            )}

            {/* -----------------------------------------------
                REJECTED
            ----------------------------------------------- */}

            {isRejected && (
              <div className="report-master-info-box">
                <strong>
                  Master problem unavailable
                </strong>

                <p>
                  Rejected reports cannot be
                  linked to a master problem.
                </p>
              </div>
            )}

            {/* -----------------------------------------------
                VERIFIED
            ----------------------------------------------- */}

            {isVerified && (
              <>
                {/* ===========================================
                    ALREADY LINKED
                =========================================== */}

                {masterProblem ? (
                  <div className="report-master-linked">
                    <div className="report-master-linked-status">
                      <span className="report-master-check">
                        ✓
                      </span>

                      <span>
                        Linked to Master Problem
                      </span>
                    </div>

                    <h4>
                      {masterProblem.title ||
                        "Untitled Master Problem"}
                    </h4>

                    <div className="report-master-meta">
                      {masterProblem.domain && (
                        <span>
                          {masterProblem.domain}
                        </span>
                      )}

                      {masterProblem.domain &&
                        masterProblem.severity && (
                          <span>•</span>
                        )}

                      {masterProblem.severity && (
                        <span>
                          {masterProblem.severity}
                        </span>
                      )}
                    </div>

                    {masterProblem.location
                      ?.address && (
                      <p className="report-master-location">
                        {
                          masterProblem
                            .location.address
                        }
                      </p>
                    )}

                    <div className="report-master-actions">
                      <button
                        type="button"
                        onClick={
                          onViewMasterProblems
                        }
                      >
                        View Problems
                      </button>

                      <button
                        type="button"
                        onClick={
                          onChangeMasterProblem
                        }
                      >
                        Change
                      </button>

                      <button
                        type="button"
                        className="danger"
                        onClick={() =>
                          onUnlinkMasterProblem(
                            report
                          )
                        }
                      >
                        Unlink
                      </button>
                    </div>
                  </div>
                ) : (
                  /* =========================================
                     VERIFIED BUT NOT LINKED
                  ========================================= */

                  <div className="report-master-unlinked">
                    <div className="report-master-empty-icon">
                      +
                    </div>

                    <div>
                      <strong>
                        No Master Problem Linked
                      </strong>

                      <p>
                        This verified report has
                        not yet been grouped into
                        a consolidated societal
                        challenge.
                      </p>
                    </div>

                    <div className="report-master-actions">
                      <button
                        type="button"
                        onClick={
                          onFindMasterProblem
                        }
                      >
                        Find Existing
                      </button>

                      <button
                        type="button"
                        className="primary"
                        onClick={
                          onCreateMasterProblem
                        }
                      >
                        Create New Problem
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* ===================================================
            DRAWER FOOTER
        =================================================== */}

        <div className="report-drawer__footer">
          {/* -----------------------------------------------
              START REVIEW
          ----------------------------------------------- */}

          {canReview && (
            <button
              type="button"
              className="report-action report-action--review"
              disabled={actionLoading}
              onClick={() =>
                onAction("review", report)
              }
            >
              {actionLoading
                ? "Updating..."
                : "Start Review"}
            </button>
          )}

          {/* -----------------------------------------------
              DECISION ACTIONS
          ----------------------------------------------- */}

          {canTakeDecision && (
            <>
              <button
                type="button"
                className="report-action report-action--verify"
                disabled={actionLoading}
                onClick={() =>
                  onAction("verify", report)
                }
              >
                Verify Report
              </button>

              <button
                type="button"
                className="report-action report-action--info"
                disabled={actionLoading}
                onClick={() =>
                  onAction(
                    "request-info",
                    report
                  )
                }
              >
                Request Information
              </button>

              <button
                type="button"
                className="report-action report-action--reject"
                disabled={actionLoading}
                onClick={() =>
                  onAction("reject", report)
                }
              >
                Reject
              </button>
            </>
          )}

          {/* -----------------------------------------------
              NO ACTION
          ----------------------------------------------- */}

          {!canReview &&
            !canTakeDecision && (
              <div className="report-drawer__locked">
                No verification action is
                available for this status.
              </div>
            )}
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   MAIN REPORT PAGE
========================================================= */

export default function ReportPage() {
  const loaderData = useLoaderData();

  const navigate = useNavigate();

  /* =======================================================
     REPORT DATA
  ======================================================= */

  const [reports, setReports] = useState(
    loaderData?.reports || []
  );
  const [filters, setFilters] = useState({
  search: "",
  status: "all",
  urgency: "all",
  domain: "all",
});

  const filteredReports = useMemo(() => {
  const search = filters.search
    .trim()
    .toLowerCase();

  return reports.filter((report) => {
    /* ---------------------------------------------
       SEARCH
    --------------------------------------------- */

    const matchesSearch =
      !search ||
      report.description
        ?.toLowerCase()
        .includes(search) ||
      report.createdBy?.name
        ?.toLowerCase()
        .includes(search) ||
      report.createdBy?.email
        ?.toLowerCase()
        .includes(search) ||
      report.classification?.domain
        ?.toLowerCase()
        .includes(search) ||
      report.location?.address
        ?.toLowerCase()
        .includes(search);

    /* ---------------------------------------------
       STATUS
    --------------------------------------------- */

    const matchesStatus =
      filters.status === "all" ||
      report.status === filters.status;

    /* ---------------------------------------------
       URGENCY
    --------------------------------------------- */

    const matchesUrgency =
      filters.urgency === "all" ||
      report.urgency === filters.urgency;

    /* ---------------------------------------------
       DOMAIN
    --------------------------------------------- */

    const matchesDomain =
      filters.domain === "all" ||
      report.classification?.domain ===
        filters.domain;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesUrgency &&
      matchesDomain
    );
  });
}, [reports, filters]);

  const domainOptions = useMemo(() => {
    const domains = reports
      .map(
        (report) =>
          report.classification?.domain
      )
      .filter(Boolean);

    return [
      ...new Set(domains),
    ].sort();
  }, [reports]);


  function resetFilters() {
  setFilters({
    search: "",
    status: "all",
    urgency: "all",
    domain: "all",
  });
}

  const [reportStats, setReportStats] =
    useState(loaderData?.stats || {});

  const [masterProblems, setMasterProblems] =
    useState(
      loaderData?.masterProblems || []
    );

  /* =======================================================
     SELECTED REPORT
  ======================================================= */

  const [selectedReportId, setSelectedReportId] =
    useState(null);

  /* =======================================================
     REPORT ACTION
  ======================================================= */

  const [actionLoading, setActionLoading] =
    useState(false);

  const [actionModal, setActionModal] =
    useState(null);

  /* =======================================================
     TOAST
  ======================================================= */

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  /* =======================================================
     MASTER PROBLEM UI
  ======================================================= */

  const [
    masterProblemSelectorOpen,
    setMasterProblemSelectorOpen,
  ] = useState(false);

  const [
    createMasterProblemOpen,
    setCreateMasterProblemOpen,
  ] = useState(false);

  /* =======================================================
     STATS
  ======================================================= */

  const stats = reportStats;

  /* =======================================================
     SELECTED REPORT
  ======================================================= */

  const selectedReport = useMemo(
    () =>
      reports.find(
        (report) =>
          report._id === selectedReportId
      ) || null,
    [reports, selectedReportId]
  );

  /* =======================================================
     TOAST HELPERS
  ======================================================= */

  function showSuccess(message) {
    setErrorMessage("");
    setSuccessMessage(message);
  }

  function showError(message) {
    setSuccessMessage("");
    setErrorMessage(message);
  }

  /* =======================================================
     UPDATE REPORT RELATIONSHIP
  ======================================================= */

  function handleReportLinked(
    updatedReport
  ) {
    if (!updatedReport?._id) {
      return;
    }

    setReports((currentReports) =>
      currentReports.map((report) =>
        report._id === updatedReport._id
          ? {
              ...report,
              masterProblemId:
                updatedReport.masterProblemId,
            }
          : report
      )
    );
  }

  /* =======================================================
     MASTER PROBLEM CREATED
  ======================================================= */

  function handleMasterProblemCreated({
    masterProblem,
    report,
  }) {
    if (masterProblem) {
      setMasterProblems((current) => {
        const alreadyExists = current.some(
          (item) =>
            item._id === masterProblem._id
        );

        if (alreadyExists) {
          return current;
        }

        return [
          masterProblem,
          ...current,
        ];
      });
    }

    if (report) {
      handleReportLinked(report);
    }

    setCreateMasterProblemOpen(false);

    showSuccess(
      "Master problem created and report linked successfully."
    );
  }

  /* =======================================================
     UNLINK MASTER PROBLEM
  ======================================================= */

  async function handleUnlinkMasterProblem(
    report
  ) {
    if (!report?._id) {
      return;
    }

    const confirmed = window.confirm(
      "Remove this report from the master problem?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response =
        await fetchWithAuth(
          `${API_URL}/api/admin/reports/${report._id}/unlink-master-problem`,
          {
            method: "PATCH",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to unlink master problem."
        );
      }

      handleReportLinked({
        _id: report._id,
        masterProblemId: null,
      });

      showSuccess(
        "Report unlinked successfully."
      );
    } catch (error) {
      console.error(
        "Unlink master problem error:",
        error
      );

      showError(
        error.message ||
          "Failed to unlink report."
      );
    }
  }

  /* =======================================================
     REPORT ACTION
  ======================================================= */

  function handleAction(
    action,
    report
  ) {
    if (!report?._id) {
      return;
    }

    /* -----------------------------------------------
       REVIEW DOES NOT NEED A MODAL
    ----------------------------------------------- */

    if (action === "review") {
      executeAction(
        action,
        report,
        {}
      );

      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    setActionModal({
      action,
      report,
    });
  }

  /* =======================================================
     EXECUTE REPORT ACTION
  ======================================================= */

  async function executeAction(
    action,
    report,
    body
  ) {
    try {
      setActionLoading(true);

      setErrorMessage("");
      setSuccessMessage("");

      const response =
        await fetchWithAuth(
          `${API_URL}/api/admin/reports/${report._id}/${action}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(body),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to update report."
        );
      }

      /* ---------------------------------------------
         UPDATE REPORT
      --------------------------------------------- */

      setReports((currentReports) =>
        currentReports.map((item) =>
          item._id === report._id
            ? {
                ...item,
                status:
                  data.status ||
                  item.status,
                verification:
                  data.verification ||
                  item.verification,
              }
            : item
        )
      );

      /* ---------------------------------------------
         UPDATE STATS
      --------------------------------------------- */

      setReportStats((currentStats) => {
        const previousStatus =
          report.status;

        const newStatus =
          data.status;

        if (
          !newStatus ||
          previousStatus === newStatus
        ) {
          return currentStats;
        }

        return {
          ...currentStats,

          [previousStatus]: Math.max(
            0,
            (currentStats[
              previousStatus
            ] || 0) - 1
          ),

          [newStatus]:
            (currentStats[newStatus] ||
              0) + 1,
        };
      });

      setActionModal(null);

      showSuccess(
        getActionSuccessMessage(action)
      );
    } catch (error) {
      console.error(
        "Report action error:",
        error
      );

      showError(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setActionLoading(false);
    }
  }

  /* =======================================================
     ACTION SUCCESS MESSAGE
  ======================================================= */

  function getActionSuccessMessage(
    action
  ) {
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

  /* =======================================================
     ACTION MODAL CONFIRM
  ======================================================= */

  function handleModalConfirm(value) {
    if (!actionModal) {
      return;
    }

    const {
      action,
      report,
    } = actionModal;

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

    executeAction(
      action,
      report,
      body
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="report-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="report-page__header">
        <div>
          <div className="report-page__breadcrumb">
            <span>Admin</span>

            <span>›</span>

            <span>Reports</span>
          </div>

          <h1>Reports</h1>

          <p>
            Review, validate and manage
            stakeholder-submitted societal
            challenges.
          </p>
        </div>
      </header>

      {/* ===================================================
          STATS
      =================================================== */}

      <section className="report-stats">
        <StatCard
          label="Total Reports"
          value={stats.total || 0}
          type="total"
        />

        <StatCard
          label="Under Review"
          value={
            stats.under_review || 0
          }
          type="review"
        />

        <StatCard
          label="Verified"
          value={
            stats.verified || 0
          }
          type="verified"
        />

        <StatCard
          label="Rejected"
          value={
            stats.rejected || 0
          }
          type="rejected"
        />
      </section>

      {/* ===================================================
          REPORT LIST
      =================================================== */}

      <section className="report-list-section">
        {/* <div className="report-list-header">
          <div>
            <h2>Recent Reports</h2>

            <p>
              {reports.length} report
              {reports.length === 1
                ? ""
                : "s"} received
            </p>
          </div>
        </div> */}
      <div className="report-list-header">
  <div>
    <h2>Recent Reports</h2>

    <p>
      {filteredReports.length} of{" "}
      {reports.length} report
      {reports.length === 1 ? "" : "s"}
    </p>
  </div>
</div>

{/* =====================================================
    FILTERS
===================================================== */}

<div className="report-filters">
  {/* SEARCH */}

  <div className="report-filter-search">
    <span>⌕</span>

    <input
      type="text"
      value={filters.search}
      onChange={(event) =>
        setFilters((current) => ({
          ...current,
          search: event.target.value,
        }))
      }
      placeholder="Search reports, users, locations..."
    />
  </div>

  {/* STATUS */}

  <select
    value={filters.status}
    onChange={(event) =>
      setFilters((current) => ({
        ...current,
        status: event.target.value,
      }))
    }
  >
    <option value="all">
      All Statuses
    </option>

    <option value="submitted">
      Submitted
    </option>

    <option value="under_review">
      Under Review
    </option>

    <option value="information_requested">
      Information Requested
    </option>

    <option value="verified">
      Verified
    </option>

    <option value="assigned">
      Assigned
    </option>

    <option value="in_progress">
      In Progress
    </option>

    <option value="resolved">
      Resolved
    </option>

    <option value="rejected">
      Rejected
    </option>
  </select>

  {/* URGENCY */}

  <select
    value={filters.urgency}
    onChange={(event) =>
      setFilters((current) => ({
        ...current,
        urgency: event.target.value,
      }))
    }
  >
    <option value="all">
      All Urgency
    </option>

    <option value="normal">
      Normal
    </option>

    <option value="attention">
      Attention
    </option>

    <option value="urgent">
      Urgent
    </option>
  </select>

  {/* DOMAIN */}

  <select
    value={filters.domain}
    onChange={(event) =>
      setFilters((current) => ({
        ...current,
        domain: event.target.value,
      }))
    }
  >
    <option value="all">
      All Domains
    </option>

    {domainOptions.map((domain) => (
      <option
        key={domain}
        value={domain}
      >
        {domain}
      </option>
    ))}
  </select>

  {/* RESET */}

  {(filters.search ||
    filters.status !== "all" ||
    filters.urgency !== "all" ||
    filters.domain !== "all") && (
    <button
      type="button"
      className="report-filter-reset"
      onClick={resetFilters}
    >
      Reset
    </button>
  )}
</div>
        <div className="report-list-header">
  <div>
    <h2>Recent Reports</h2>

    <p>
      {filteredReports.length} of{" "}
      {reports.length} report
      {reports.length === 1 ? "" : "s"}
    </p>
  </div>
</div>

{/* =====================================================
    FILTERS
===================================================== */}

<div className="report-filters">
  {/* SEARCH */}

  <div className="report-filter-search">
    <span>⌕</span>

    <input
      type="text"
      value={filters.search}
      onChange={(event) =>
        setFilters((current) => ({
          ...current,
          search: event.target.value,
        }))
      }
      placeholder="Search reports, users, locations..."
    />
  </div>

  {/* STATUS */}

  <select
    value={filters.status}
    onChange={(event) =>
      setFilters((current) => ({
        ...current,
        status: event.target.value,
      }))
    }
  >
    <option value="all">
      All Statuses
    </option>

    <option value="submitted">
      Submitted
    </option>

    <option value="under_review">
      Under Review
    </option>

    <option value="information_requested">
      Information Requested
    </option>

    <option value="verified">
      Verified
    </option>

    <option value="assigned">
      Assigned
    </option>

    <option value="in_progress">
      In Progress
    </option>

    <option value="resolved">
      Resolved
    </option>

    <option value="rejected">
      Rejected
    </option>
  </select>

  {/* URGENCY */}

  <select
    value={filters.urgency}
    onChange={(event) =>
      setFilters((current) => ({
        ...current,
        urgency: event.target.value,
      }))
    }
  >
    <option value="all">
      All Urgency
    </option>

    <option value="normal">
      Normal
    </option>

    <option value="attention">
      Attention
    </option>

    <option value="urgent">
      Urgent
    </option>
  </select>

  {/* DOMAIN */}

  <select
    value={filters.domain}
    onChange={(event) =>
      setFilters((current) => ({
        ...current,
        domain: event.target.value,
      }))
    }
  >
    <option value="all">
      All Domains
    </option>

    {domainOptions.map((domain) => (
      <option
        key={domain}
        value={domain}
      >
        {domain}
      </option>
    ))}
  </select>

  {/* RESET */}

  {(filters.search ||
    filters.status !== "all" ||
    filters.urgency !== "all" ||
    filters.domain !== "all") && (
    <button
      type="button"
      className="report-filter-reset"
      onClick={resetFilters}
    >
      Reset
    </button>
  )}
</div>
6. Change the table from reports to filteredReports

This is the part people often miss.

Currently:

{reports.map((report) => (

Change it to:

{filteredReports.map((report) => (

And your empty-state condition should also change.

Currently:

{reports.length === 0 ? (

That means "no reports exist."

But now we need two different cases:

No reports
No reports found
There are currently no reports.
Filters produced zero results
No matching reports
Try changing or resetting your filters.

Use:

{reports.length === 0 ? (
  <div className="report-empty-state">
    <div className="report-empty-state__icon">
      ✓
    </div>

    <h3>No reports found</h3>

    <p>
      There are currently no reports to
      review.
    </p>
  </div>
) : filteredReports.length === 0 ? (
  <div className="report-empty-state">
    <div className="report-empty-state__icon">
      ⌕
    </div>

    <h3>No matching reports</h3>

    <p>
      Try changing or resetting your
      filters.
    </p>

    <button
      type="button"
      onClick={resetFilters}
    >
      Reset Filters
    </button>
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
                {filteredReports.map((report) => (
                    <tr
                      key={report._id}
                    >
                      {/* ---------------------------------
                          REPORT
                      --------------------------------- */}

                      <td>
                        <div className="report-table__problem">
                          <strong>
                            {getShortId(
                              report._id
                            )}
                          </strong>

                          <span>
                            {
                              report.description
                            }
                          </span>
                        </div>
                      </td>

                      {/* ---------------------------------
                          USER
                      --------------------------------- */}

                      <td>
                        <div className="report-table__user">
                          <strong>
                            {
                              report
                                .createdBy
                                ?.name ||
                              "Unknown"
                            }
                          </strong>

                          <span>
                            {
                              report
                                .createdBy
                                ?.email ||
                              "—"
                            }
                          </span>
                        </div>
                      </td>

                      {/* ---------------------------------
                          CLASSIFICATION
                      --------------------------------- */}

                      <td>
                        <div className="report-classification">
                          <strong>
                            {
                              report
                                .classification
                                ?.domain ||
                              "Unclassified"
                            }
                          </strong>

                          {report
                            .classification
                            ?.subdomain && (
                            <span>
                              {
                                report
                                  .classification
                                  .subdomain
                              }
                            </span>
                          )}
                        </div>
                      </td>

                      {/* ---------------------------------
                          URGENCY
                      --------------------------------- */}

                      <td>
                        <UrgencyBadge
                          urgency={
                            report.urgency
                          }
                        />
                      </td>

                      {/* ---------------------------------
                          STATUS
                      --------------------------------- */}

                      <td>
                        <StatusBadge
                          status={
                            report.status
                          }
                        />
                      </td>

                      {/* ---------------------------------
                          DATE
                      --------------------------------- */}

                      <td>
                        <span className="report-table__date">
                          {formatDate(
                            report.createdAt
                          )}
                        </span>
                      </td>

                      {/* ---------------------------------
                          VIEW
                      --------------------------------- */}

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

                          <span>
                            →
                          </span>
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ===================================================
          REPORT DRAWER
      =================================================== */}

      <ReportDrawer
        report={selectedReport}
        onClose={() =>
          setSelectedReportId(null)
        }
        onAction={handleAction}
        actionLoading={actionLoading}
        masterProblems={
          masterProblems
        }
        onFindMasterProblem={() =>
          setMasterProblemSelectorOpen(
            true
          )
        }
        onCreateMasterProblem={() =>
          setCreateMasterProblemOpen(
            true
          )
        }
        onChangeMasterProblem={() =>
          setMasterProblemSelectorOpen(
            true
          )
        }
        onUnlinkMasterProblem={
          handleUnlinkMasterProblem
        }
        onViewMasterProblems={() =>
          navigate(
            "/master-problems"
          )
        }
      />

      {/* ===================================================
          SUCCESS TOAST
      =================================================== */}

      {successMessage && (
        <div className="report-toast report-toast--success">
          <span>✓</span>

          <div>
            <strong>
              Success
            </strong>

            <p>
              {successMessage}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setSuccessMessage("")
            }
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {/* ===================================================
          ERROR TOAST
      =================================================== */}

      {errorMessage && (
        <div className="report-toast report-toast--error">
          <span>!</span>

          <div>
            <strong>
              Action failed
            </strong>

            <p>
              {errorMessage}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setErrorMessage("")
            }
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {/* ===================================================
          REPORT ACTION MODAL
      =================================================== */}

      <ReportActionModal
        action={
          actionModal?.action
        }
        report={
          actionModal?.report
        }
        loading={
          actionLoading
        }
        onClose={() => {
          if (!actionLoading) {
            setActionModal(null);
          }
        }}
        onConfirm={
          handleModalConfirm
        }
      />

      {/* ===================================================
          MASTER PROBLEM SELECTOR
      =================================================== */}

      {masterProblemSelectorOpen &&
        selectedReport && (
          <MasterProblemSelector
            report={
              selectedReport
            }
            masterProblems={
              masterProblems
            }
            onClose={() =>
              setMasterProblemSelectorOpen(
                false
              )
            }
            onLinked={(
              updatedReport
            ) => {
              handleReportLinked(
                updatedReport
              );

              setMasterProblemSelectorOpen(
                false
              );

              showSuccess(
                "Report linked to master problem successfully."
              );
            }}
          />
        )}

      {/* ===================================================
          CREATE MASTER PROBLEM MODAL
      =================================================== */}

      {createMasterProblemOpen &&
        selectedReport && (
          <CreateMasterProblemModal
            report={
              selectedReport
            }
            onClose={() =>
              setCreateMasterProblemOpen(
                false
              )
            }
            onCreated={
              handleMasterProblemCreated
            }
          />
        )}
    </div>
  );
}