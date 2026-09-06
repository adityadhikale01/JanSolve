import {
  STATUS_CLASS,
  STATUS_LABELS,
  URGENCY_CLASS,
  URGENCY_LABELS,
} from "./reportHelpers.js";

export function StatCard({ label, value, type }) {
  return (
    <div className={`report-stat-card report-stat-card--${type}`}>
      <div className="report-stat-card__top">
        <span>{label}</span>
      </div>

      <strong>{value}</strong>
    </div>
  );
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`report-status ${
        STATUS_CLASS[status] || "report-status--submitted"
      }`}
    >
      <span className="report-status__dot" />
      {STATUS_LABELS[status] || status || "Unknown"}
    </span>
  );
}

export function UrgencyBadge({ urgency }) {
  return (
    <span
      className={`report-urgency ${
        URGENCY_CLASS[urgency] || "report-urgency--normal"
      }`}
    >
      {URGENCY_LABELS[urgency] || urgency || "Normal"}
    </span>
  );
}
