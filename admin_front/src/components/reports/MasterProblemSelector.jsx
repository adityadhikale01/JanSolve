import { useMemo, useState } from "react";
import "./MasterProblemSelector.css";

function MasterProblemSelector({
  report,
  masterProblems,
  onClose,
  onLinked,
}) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const filteredProblems = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return masterProblems;

    return masterProblems.filter((problem) => {
      return (
        problem.title?.toLowerCase().includes(value) ||
        problem.domain?.toLowerCase().includes(value) ||
        problem.subdomain?.toLowerCase().includes(value) ||
        problem.location?.address?.toLowerCase().includes(value)
      );
    });
  }, [masterProblems, search]);

  const handleLink = async () => {
    if (!selectedId) {
      setError("Please select a master problem.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/admin/reports/${report._id}/link-master-problem`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            masterProblemId: selectedId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to link master problem."
        );
      }

      onLinked(data.report);

      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mp-selector-overlay" onClick={onClose}>
      <div
        className="mp-selector-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mp-selector-header">
          <div>
            <span className="mp-selector-eyebrow">
              LINK MASTER PROBLEM
            </span>

            <h2>Find Existing Problem</h2>

            <p>
              Select the validated societal challenge that this
              report belongs to.
            </p>
          </div>

          <button
            className="mp-selector-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="mp-selector-report">
          <span>REPORT</span>

          <p>{report.description}</p>
        </div>

        <div className="mp-selector-search">
          <input
            type="text"
            placeholder="Search by problem, domain or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="mp-selector-list">
          {filteredProblems.length === 0 ? (
            <div className="mp-selector-empty">
              <strong>No matching master problems</strong>
              <span>
                Try another search or create a new master problem.
              </span>
            </div>
          ) : (
            filteredProblems.map((problem) => {
              const isSelected =
                selectedId === problem._id;

              return (
                <button
                  key={problem._id}
                  type="button"
                  className={`mp-selector-card ${
                    isSelected ? "is-selected" : ""
                  }`}
                  onClick={() => setSelectedId(problem._id)}
                >
                  <div className="mp-selector-radio">
                    {isSelected && <span />}
                  </div>

                  <div className="mp-selector-card-content">
                    <div className="mp-selector-card-title">
                      {problem.title}
                    </div>

                    <div className="mp-selector-card-meta">
                      <span>{problem.domain}</span>

                      {problem.subdomain && (
                        <>
                          <i>•</i>
                          <span>{problem.subdomain}</span>
                        </>
                      )}

                      {problem.severity && (
                        <>
                          <i>•</i>
                          <span>{problem.severity}</span>
                        </>
                      )}
                    </div>

                    {problem.location?.address && (
                      <div className="mp-selector-location">
                        {problem.location.address}
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {error && (
          <div className="mp-selector-error">
            {error}
          </div>
        )}

        <div className="mp-selector-footer">
          <button
            type="button"
            className="mp-selector-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="mp-selector-link"
            onClick={handleLink}
            disabled={!selectedId || loading}
          >
            {loading ? "Linking..." : "Link Master Problem"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MasterProblemSelector;