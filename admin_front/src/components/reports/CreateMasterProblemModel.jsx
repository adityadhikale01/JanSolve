import { useState } from "react";
import "./CreateMasterProblemModel.css";

function CreateMasterProblemModal({
  report,
  onClose,
  onCreated,
}) {
  const API_URL = import.meta.env.VITE_API_URL;

  const classification = report.classification || {};

  const [form, setForm] = useState({
    title: "",
    summary: report.description || "",

    domain: classification.domain || "",
    subdomain: classification.subdomain || "",
    problemType: classification.problemType || "",

    severity:
      report.urgency === "urgent"
        ? "high"
        : report.urgency === "attention"
        ? "moderate"
        : "low",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Master problem title is required.");
      return;
    }

    if (!form.domain.trim()) {
      setError("Domain is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ------------------------------------------------------
      // STEP 1: CREATE MASTER PROBLEM
      // ------------------------------------------------------

      const createResponse = await fetch(
        `${API_URL}/api/admin/master-problems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "accessToken"
            )}`,
          },
          body: JSON.stringify({
            title: form.title.trim(),
            summary: form.summary.trim(),

            domain: form.domain.trim(),

            subdomain:
              form.subdomain.trim() || null,

            problemType:
              form.problemType.trim() || null,

            location: report.location,

            severity: form.severity,
          }),
        }
      );

      const createData =
        await createResponse.json();

      if (!createResponse.ok) {
        throw new Error(
          createData?.message ||
            "Failed to create master problem."
        );
      }

      const newMasterProblem =
        createData.masterProblem;

      // ------------------------------------------------------
      // STEP 2: LINK REPORT TO NEW MASTER PROBLEM
      // ------------------------------------------------------

      const linkResponse = await fetch(
        `${API_URL}/api/admin/reports/${report._id}/link-master-problem`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "accessToken"
            )}`,
          },
          body: JSON.stringify({
            masterProblemId:
              newMasterProblem._id,
          }),
        }
      );

      const linkData =
        await linkResponse.json();

      if (!linkResponse.ok) {
        throw new Error(
          linkData?.message ||
            "Master problem was created but report could not be linked."
        );
      }

      onCreated({
        masterProblem: newMasterProblem,
        report: linkData.report,
      });

      onClose();
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Something went wrong while creating the master problem."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="create-mp-overlay"
      onClick={onClose}
    >
      <div
        className="create-mp-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="create-mp-header">
          <div>
            <span className="create-mp-eyebrow">
              NEW MASTER PROBLEM
            </span>

            <h2>Create Master Problem</h2>

            <p>
              Convert this verified report into a
              consolidated societal challenge.
            </p>
          </div>

          <button
            type="button"
            className="create-mp-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form
          className="create-mp-form"
          onSubmit={handleSubmit}
        >
          <div className="create-mp-field">
            <label>Problem Title *</label>

            <input
              value={form.title}
              onChange={(event) =>
                updateField(
                  "title",
                  event.target.value
                )
              }
              placeholder="e.g. Limited Irrigation Access in Gumla"
            />
          </div>

          <div className="create-mp-field">
            <label>Problem Summary *</label>

            <textarea
              rows="4"
              value={form.summary}
              onChange={(event) =>
                updateField(
                  "summary",
                  event.target.value
                )
              }
            />
          </div>

          <div className="create-mp-grid">
            <div className="create-mp-field">
              <label>Domain *</label>

              <input
                value={form.domain}
                onChange={(event) =>
                  updateField(
                    "domain",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="create-mp-field">
              <label>Subdomain</label>

              <input
                value={form.subdomain}
                onChange={(event) =>
                  updateField(
                    "subdomain",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="create-mp-field">
              <label>Problem Type</label>

              <input
                value={form.problemType}
                onChange={(event) =>
                  updateField(
                    "problemType",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="create-mp-field">
              <label>Severity</label>

              <select
                value={form.severity}
                onChange={(event) =>
                  updateField(
                    "severity",
                    event.target.value
                  )
                }
              >
                <option value="low">
                  Low
                </option>

                <option value="moderate">
                  Moderate
                </option>

                <option value="high">
                  High
                </option>

                <option value="critical">
                  Critical
                </option>
              </select>
            </div>
          </div>

          <div className="create-mp-location">
            <span>LOCATION</span>

            <strong>
              {report.location?.address ||
                "Location available"}
            </strong>
          </div>

          {error && (
            <div className="create-mp-error">
              {error}
            </div>
          )}

          <div className="create-mp-footer">
            <button
              type="button"
              className="create-mp-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-mp-submit"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create & Link Problem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMasterProblemModal;