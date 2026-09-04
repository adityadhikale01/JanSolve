import { useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import {
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  MapPin,
  AlertTriangle,
} from "lucide-react";

import "./MyReportsPage.css";

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Submitted",
    value: "submitted",
  },
  {
    label: "Under Review",
    value: "under_review",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Resolved",
    value: "resolved",
  },
];

const statusConfig = {
  submitted: {
    label: "Submitted",
    className: "status-submitted",
  },

  under_review: {
    label: "Under Review",
    className: "status-review",
  },

  in_progress: {
    label: "In Progress",
    className: "status-progress",
  },

  resolved: {
    label: "Resolved",
    className: "status-resolved",
  },
};

const urgencyConfig = {
  normal: {
    label: "Normal",
    className: "urgency-normal",
  },

  attention: {
    label: "Needs Attention",
    className: "urgency-attention",
  },

  urgent: {
    label: "Urgent",
    className: "urgency-urgent",
  },
};

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


export default function MyReportsPage() {
  /*
   * Data comes directly from React Router loader.
   *
   * Expected loader response:
   *
   * {
   *   success: true,
   *   count: 2,
   *   reports: [...]
   * }
   */
  const data = useLoaderData();
  console.log("MyReportsPage data:", data);
  const reports = data?.reports || [];

  const [activeFilter, setActiveFilter] = useState("all");

  /*
   * Client-side filtering.
   *
   * We do NOT make another backend request when
   * the citizen clicks a status filter.
   */
  const filteredReports = useMemo(() => {
    if (activeFilter === "all") {
      return reports;
    }

    return reports.filter(
      (report) => report.status === activeFilter
    );
  }, [reports, activeFilter]);

  return (
    <main className="my-reports-page">
      <div className="my-reports-container">

        {/* =========================
            Page Header
        ========================== */}

        <section className="my-reports-header">
          <div>
            <div className="my-reports-title-row">
              <FileText
                size={24}
                strokeWidth={2}
              />

              <h1>My Reports</h1>
            </div>

            <p>
              Track the problems you've reported to your
              community.
            </p>
          </div>
        </section>


        {/* =========================
            Filters
        ========================== */}

        <section
          className="report-filters"
          aria-label="Report status filters"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`report-filter ${
                activeFilter === filter.value
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter(filter.value)
              }
            >
              {filter.label}
            </button>
          ))}
        </section>


        {/* =========================
            Report Count
        ========================== */}

        <div className="reports-summary">
          <span>
            {filteredReports.length}{" "}
            {filteredReports.length === 1
              ? "report"
              : "reports"}
          </span>
        </div>


        {/* =========================
            Reports
        ========================== */}

        <section className="reports-list">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
              />
            ))
          ) : (
            <EmptyReportsState
              hasReports={reports.length > 0}
              activeFilter={activeFilter}
            />
          )}
        </section>
      </div>
    </main>
  );
}


/* =====================================================
   Report Card
===================================================== */

function ReportCard({ report }) {
  const status =
    statusConfig[report.status] ||
    statusConfig.submitted;

  const urgency =
    urgencyConfig[report.urgency] ||
    urgencyConfig.normal;

  /*
   * Find the first image from the media array.
   */
  const image = report.media?.find(
    (item) => item.type === "image"
  );
  console.log("ReportCard image:", image);
  return (
    <article className="report-card">

      {/* =========================
          Evidence
      ========================== */}

      <div className="report-card-media">
        {image?.url ? (
          <img
            src={image.url}
            alt="Report evidence"
            className="report-card-image"
          />
        ) : (
          <div className="report-card-no-image">
            <FileText size={28} />
          </div>
        )}
      </div>


      {/* =========================
          Content
      ========================== */}

      <div className="report-card-content">

        {/* Top Row */}

        <div className="report-card-top">

          <div className="report-card-title-wrapper">

            <h2>
              {report.description}
            </h2>

            <div className="report-card-location">
              <MapPin size={15} />

              <span>
                {report.location?.address ||
                  "Location not available"}
              </span>
            </div>

          </div>


          {/* Status */}

          <span
            className={`report-status ${status.className}`}
          >
            {status.label}
          </span>

        </div>


        {/* =========================
            Metadata
        ========================== */}

        <div className="report-card-meta">

          <div className="report-meta-item">
            <CalendarDays size={15} />

            <span>
              {formatDate(report.createdAt)}
            </span>
          </div>


          <div className="report-meta-item">
            <Clock3 size={15} />

            <span>
              Duration:{" "}
              {formatValue(report.duration)}
            </span>
          </div>


          <div className="report-meta-item">
            <AlertTriangle size={15} />

            <span className={urgency.className}>
              {urgency.label}
            </span>
          </div>

        </div>


        {/* =========================
            Bottom
        ========================== */}

        <div className="report-card-bottom">

          <div className="report-impact">
            Impact:{" "}
            <strong>
              {formatValue(
                report.impact?.affectedRange
              )}
            </strong>
          </div>


          {/* More Details */}

          <Link
            to={`/my-reports/${report.id}`}
            className="more-details-button"
          >
            More Details

            <ChevronRight size={17} />
          </Link>

        </div>

      </div>
    </article>
  );
}


/* =====================================================
   Empty State
===================================================== */

function EmptyReportsState({
  hasReports,
  activeFilter,
}) {
  const filter =
    filters.find(
      (item) => item.value === activeFilter
    );

  return (
    <div className="empty-reports">

      <div className="empty-reports-icon">
        <FileText size={28} />
      </div>

      <h2>
        {hasReports
          ? `No ${filter?.label.toLowerCase()} reports`
          : "No reports yet"}
      </h2>

      <p>
        {hasReports
          ? "You don't have any reports in this category."
          : "You haven't submitted any community problem reports yet."}
      </p>

    </div>
  );
}