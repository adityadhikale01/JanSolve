import { StatusBadge, UrgencyBadge } from "./ReportBadges.jsx";
import {
  formatDate,
  getLocationText,
  getMasterProblemId,
  getShortId,
} from "./reportHelpers.js";

export default function ReportDrawer({
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
  const canTakeDecision = report.status === "under_review";
  const masterProblemId = getMasterProblemId(report);
  const masterProblem = masterProblemId
    ? masterProblems.find(
        (problem) => String(problem._id) === String(masterProblemId)
      )
    : null;
  const isVerified = report.status === "verified";
  const isRejected = report.status === "rejected";

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
            &times;
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
              {report.description || "No problem description available."}
            </p>
          </section>

          <section className="report-detail-section">
            <div className="report-detail-grid">
              <div className="report-detail-item">
                <span>Submitted By</span>
                <strong>{report.createdBy?.name || "Unknown user"}</strong>
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
                <strong>{report.impact?.affectedRange || "Unknown"}</strong>
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
              <div className="report-location__icon">&#8982;</div>
              <div>
                <strong>{getLocationText(report.location)}</strong>

                {Array.isArray(report.location?.coordinates) &&
                  report.location.coordinates.length >= 2 && (
                    <small>
                      Lat: {Number(report.location.coordinates[1]).toFixed(5)}
                      {" "}
                      &middot;{" "}
                      Lng: {Number(report.location.coordinates[0]).toFixed(5)}
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
                    key={`${media.publicId || media.url || "media"}-${index}`}
                    href={media.url}
                    target="_blank"
                    rel="noreferrer"
                    className="report-media-card"
                  >
                    {media.type === "video" ? (
                      <video src={media.url} muted playsInline />
                    ) : (
                      <img
                        src={media.url}
                        alt={`Report evidence ${index + 1}`}
                      />
                    )}
                    <span>{media.type || "media"}</span>
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
                    <strong>{report.classification.subdomain}</strong>
                  </div>
                )}

                {report.classification.problemType && (
                  <div>
                    <span>Problem Type</span>
                    <strong>{report.classification.problemType}</strong>
                  </div>
                )}

                {typeof report.classification.confidence === "number" && (
                  <div>
                    <span>Confidence</span>
                    <strong>
                      {Math.round(report.classification.confidence * 100)}%
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
                      {report.verification.verifiedBy.name || "Admin"}
                    </strong>
                  </div>
                )}

                {report.verification.verifiedAt && (
                  <div>
                    <span>Reviewed On</span>
                    <strong>{formatDate(report.verification.verifiedAt)}</strong>
                  </div>
                )}

                {report.verification.adminNote && (
                  <div>
                    <span>Admin Note</span>
                    <p>{report.verification.adminNote}</p>
                  </div>
                )}

                {report.verification.rejectionReason && (
                  <div>
                    <span>Rejection Reason</span>
                    <p>{report.verification.rejectionReason}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="report-detail-section report-master-problem-section">
            <div className="report-detail-section__heading">
              <div className="report-section-heading">
                <span>MASTER PROBLEM</span>
                <h3>Societal Challenge Link</h3>
              </div>
            </div>

            {!isVerified && !isRejected && (
              <div className="report-master-info-box">
                <strong>Verification required</strong>
                <p>Only verified reports can be linked to a master problem.</p>
              </div>
            )}

            {isRejected && (
              <div className="report-master-info-box">
                <strong>Master problem unavailable</strong>
                <p>Rejected reports cannot be linked to a master problem.</p>
              </div>
            )}

            {isVerified &&
              (masterProblem ? (
                <div className="report-master-linked">
                  <div className="report-master-linked-status">
                    <span className="report-master-check">&#10003;</span>
                    <span>Linked to Master Problem</span>
                  </div>

                  <h4>{masterProblem.title || "Untitled Master Problem"}</h4>

                  <div className="report-master-meta">
                    {masterProblem.domain && <span>{masterProblem.domain}</span>}
                    {masterProblem.domain && masterProblem.severity && (
                      <span>&bull;</span>
                    )}
                    {masterProblem.severity && (
                      <span>{masterProblem.severity}</span>
                    )}
                  </div>

                  {masterProblem.location?.address && (
                    <p className="report-master-location">
                      {masterProblem.location.address}
                    </p>
                  )}

                  <div className="report-master-actions">
                    <button type="button" onClick={onViewMasterProblems}>
                      View Problems
                    </button>
                    <button type="button" onClick={onChangeMasterProblem}>
                      Change
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => onUnlinkMasterProblem(report)}
                    >
                      Unlink
                    </button>
                  </div>
                </div>
              ) : (
                <div className="report-master-unlinked">
                  <div className="report-master-empty-icon">+</div>
                  <div>
                    <strong>No Master Problem Linked</strong>
                    <p>
                      This verified report has not yet been grouped into a
                      consolidated societal challenge.
                    </p>
                  </div>

                  <div className="report-master-actions">
                    <button type="button" onClick={onFindMasterProblem}>
                      Find Existing
                    </button>
                    <button
                      type="button"
                      className="primary"
                      onClick={onCreateMasterProblem}
                    >
                      Create New Problem
                    </button>
                  </div>
                </div>
              ))}
          </section>
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
