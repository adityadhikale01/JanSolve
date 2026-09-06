import { StatusBadge, UrgencyBadge } from "./ReportBadges.jsx";
import { formatDate, getShortId } from "./reportHelpers.js";

export default function ReportTable({
  reports,
  filteredReports,
  onViewReport,
  onResetFilters,
}) {
  if (reports.length === 0) {
    return (
      <div className="report-empty-state">
        <div className="report-empty-state__icon">&#10003;</div>
        <h3>No reports found</h3>
        <p>There are currently no reports to review.</p>
      </div>
    );
  }

  if (filteredReports.length === 0) {
    return (
      <div className="report-empty-state">
        <div className="report-empty-state__icon">&#8981;</div>
        <h3>No matching reports</h3>
        <p>Try changing or resetting your filters.</p>
        <button type="button" onClick={onResetFilters}>
          Reset Filters
        </button>
      </div>
    );
  }

  return (
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
            <tr key={report._id}>
              <td>
                <div className="report-table__problem">
                  <strong>{getShortId(report._id)}</strong>
                  <span>{report.description}</span>
                </div>
              </td>

              <td>
                <div className="report-table__user">
                  <strong>{report.createdBy?.name || "Unknown"}</strong>
                  <span>{report.createdBy?.email || "-"}</span>
                </div>
              </td>

              <td>
                <div className="report-classification">
                  <strong>
                    {report.classification?.domain || "Unclassified"}
                  </strong>

                  {report.classification?.subdomain && (
                    <span>{report.classification.subdomain}</span>
                  )}
                </div>
              </td>

              <td>
                <UrgencyBadge urgency={report.urgency} />
              </td>

              <td>
                <StatusBadge status={report.status} />
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
                  onClick={() => onViewReport(report._id)}
                >
                  View
                  <span>&rarr;</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
