export default function ReportFilters({
  filters,
  domainOptions,
  onChange,
  onReset,
}) {
  const hasActiveFilters =
    filters.search ||
    filters.status !== "all" ||
    filters.urgency !== "all" ||
    filters.domain !== "all";

  function updateFilter(field, value) {
    onChange((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <div className="report-filters">
      <div className="report-filter-search">
        <span>&#8981;</span>

        <input
          type="text"
          value={filters.search}
          onChange={(event) =>
            updateFilter("search", event.target.value)
          }
          placeholder="Search reports, users, locations..."
        />
      </div>

      <select
        value={filters.status}
        onChange={(event) =>
          updateFilter("status", event.target.value)
        }
      >
        <option value="all">All Statuses</option>
        <option value="submitted">Submitted</option>
        <option value="under_review">Under Review</option>
        <option value="information_requested">
          Information Requested
        </option>
        <option value="verified">Verified</option>
        <option value="assigned">Assigned</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="rejected">Rejected</option>
      </select>

      <select
        value={filters.urgency}
        onChange={(event) =>
          updateFilter("urgency", event.target.value)
        }
      >
        <option value="all">All Urgency</option>
        <option value="normal">Normal</option>
        <option value="attention">Attention</option>
        <option value="urgent">Urgent</option>
      </select>

      <select
        value={filters.domain}
        onChange={(event) =>
          updateFilter("domain", event.target.value)
        }
      >
        <option value="all">All Domains</option>

        {domainOptions.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          className="report-filter-reset"
          onClick={onReset}
        >
          Reset
        </button>
      )}
    </div>
  );
}
