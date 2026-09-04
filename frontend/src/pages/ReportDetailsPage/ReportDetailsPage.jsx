import { Link, useLoaderData } from "react-router-dom";
import ReportLocationMap from "../../components/map/ReportLocationMap.jsx";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Circle,
} from "lucide-react";

import "./ReportDetailsPage.css";

const statusConfig = {
  submitted: {
    label: "Submitted",
  },
  under_review: {
    label: "Under Review",
  },
  in_progress: {
    label: "In Progress",
  },
  resolved: {
    label: "Resolved",
  },
};

const statusSteps = [
  {
    key: "submitted",
    label: "Submitted",
    description: "Your report has been submitted successfully.",
  },
  {
    key: "under_review",
    label: "Under Review",
    description: "The report is being reviewed by the concerned team.",
  },
  {
    key: "in_progress",
    label: "In Progress",
    description: "Action is being taken to resolve the problem.",
  },
  {
    key: "resolved",
    label: "Resolved",
    description: "The reported problem has been resolved.",
  },
];

function formatDate(date) {
  if (!date) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatValue(value) {
  if (!value || value === "unknown") {
    return "Unknown";
  }

  return value;
}

export default function ReportDetailsPage() {
  const data = useLoaderData();
  const report = data?.report;

  if (!report) {
    return (
      <main className="report-details-page">
        <div className="report-details-container">
          <div className="report-details-empty">
            <FileText size={42} />
            <h1>Report not found</h1>
            <p>
              We couldn't find the report you're looking for.
            </p>

            <Link
              to="/my-reports"
              className="back-to-reports-button"
            >
              <ArrowLeft size={18} />
              Back to My Reports
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.key === report.status
  );

  return (
    <main className="report-details-page">
      <div className="report-details-container">

        {/* Back */}
        <Link
          to="/my-reports"
          className="details-back-link"
        >
          <ArrowLeft size={18} />
          <span>Back to My Reports</span>
        </Link>

        {/* Header */}
        <section className="report-details-header">
          <div className="details-header-content">
            <div className="details-title-row">
              <div className="details-title-icon">
                <FileText size={22} />
              </div>

              <div>
                <p className="details-eyebrow">
                  Community Problem Report
                </p>

                <h1>{report.description}</h1>
              </div>
            </div>

            <span className="details-status-badge">
              {statusConfig[report.status]?.label ||
                "Submitted"}
            </span>
          </div>

          <div className="details-header-meta">
            <div className="details-meta-item">
              <CalendarDays size={16} />
              <span>
                Reported on {formatDate(report.createdAt)}
              </span>
            </div>

            <div className="details-meta-item">
              <Clock3 size={16} />
              <span>
                Last updated {formatDate(report.updatedAt)}
              </span>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="details-card">
          <div className="details-section-title">
            <FileText size={19} />
            <h2>Problem Description</h2>
          </div>

          <p className="details-description">
            {report.description}
          </p>
        </section>

        {/* Evidence */}
        <section className="details-card">
          <div className="details-section-title">
            <FileText size={19} />
            <h2>Evidence</h2>
          </div>

          {report.media?.length > 0 ? (
            <div className="details-media-grid">
              {report.media.map((item, index) => (
                <div
                  className="details-media-item"
                  key={item.publicId || index}
                >
                  {item.type === "image" && item.url ? (
                    <img
                      src={item.url}
                      alt={`Report evidence ${index + 1}`}
                    />
                  ) : (
                    <div className="details-media-placeholder">
                      <FileText size={30} />
                      <span>Media unavailable</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-media">
              <FileText size={24} />
              <span>No evidence uploaded.</span>
            </div>
          )}
        </section>

        {/* Location */}
        <section className="details-card">
          <div className="details-section-title">
            <MapPin size={19} />
            <h2>Problem Location</h2>
          </div>

          <div className="location-content">
            <div className="location-info">
              <div className="location-icon">
                <MapPin size={20} />
              </div>

              <div>
                <span className="location-label">
                  Reported Location
                </span>

                <p>
                  {report.location?.address ||
                    "Location not available"}
                </p>
              </div>
            </div>
          <ReportLocationMap
              coordinates={report.location?.coordinates}
            />
            
          </div>
        </section>

        {/* Report information */}
        <section className="details-card">
          <div className="details-section-title">
            <AlertTriangle size={19} />
            <h2>Report Information</h2>
          </div>

          <div className="report-info-grid">
            <InfoItem
              label="Impact"
              value={formatValue(
                report.impact?.affectedRange
              )}
            />

            <InfoItem
              label="Duration"
              value={formatValue(report.duration)}
            />

            <InfoItem
              label="Urgency"
              value={
                report.urgency === "urgent"
                  ? "Urgent"
                  : report.urgency === "attention"
                  ? "Needs Attention"
                  : "Normal"
              }
              valueClass={`urgency-${report.urgency}`}
            />
          </div>
        </section>

        {/* Status */}
        <section className="details-card">
          <div className="details-section-title">
            <CheckCircle2 size={19} />
            <h2>Report Status</h2>
          </div>

          <div className="status-timeline">
            {statusSteps.map((step, index) => {
              const isCompleted =
                index <= currentStatusIndex;

              const isCurrent =
                index === currentStatusIndex;

              return (
                <div
                  className={`timeline-item ${
                    isCompleted
                      ? "completed"
                      : ""
                  } ${
                    isCurrent ? "current" : ""
                  }`}
                  key={step.key}
                >
                  <div className="timeline-marker">
                    {isCompleted ? (
                      <CheckCircle2 size={22} />
                    ) : (
                      <Circle size={22} />
                    )}
                  </div>

                  <div className="timeline-content">
                    <h3>{step.label}</h3>

                    <p>{step.description}</p>

                    {isCurrent && (
                      <span className="current-status">
                        Current status
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Report ID */}
        <div className="report-id">
          Report ID: <strong>{report.id}</strong>
        </div>
      </div>
    </main>
  );
}

function InfoItem({
  label,
  value,
  valueClass = "",
}) {
  return (
    <div className="report-info-item">
      <span>{label}</span>

      <strong className={valueClass}>
        {value}
      </strong>
    </div>
  );
}