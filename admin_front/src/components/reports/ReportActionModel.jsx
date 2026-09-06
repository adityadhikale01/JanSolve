import { useEffect, useState } from "react";
import "./ReportActionModel.css";

const ACTION_CONFIG = {
  verify: {
    title: "Verify Report",
    description:
      "Confirm that this problem has been reviewed and validated.",
    fieldLabel: "Verification note",
    placeholder: "Add an optional note for the verification record...",
    buttonLabel: "Verify Report",
    buttonClass: "verify",
    required: false,
  },

  reject: {
    title: "Reject Report",
    description:
      "This report will be marked as rejected. Please provide a clear reason.",
    fieldLabel: "Rejection reason",
    placeholder: "Explain why this report is being rejected...",
    buttonLabel: "Reject Report",
    buttonClass: "reject",
    required: true,
  },

  "request-info": {
    title: "Request Information",
    description:
      "Tell the citizen what additional information is required to continue the review.",
    fieldLabel: "Message to citizen",
    placeholder:
      "Example: Please provide a clearer photograph of the affected area...",
    buttonLabel: "Send Request",
    buttonClass: "info",
    required: true,
  },
};

export default function ReportActionModal({
  action,
  report,
  loading = false,
  onClose,
  onConfirm,
}) {
  const [value, setValue] = useState("");

  const config = ACTION_CONFIG[action];

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [loading, onClose]);

  if (!action || !report || !config) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (config.required && !value.trim()) {
      return;
    }

    onConfirm(value.trim());
  }

  return (
    <div
      className="report-action-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        className="report-action-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-action-title"
      >
        <div className="report-action-modal__header">
          <div>
            <span className="report-action-modal__eyebrow">
              Report Action
            </span>

            <h2 id="report-action-title">
              {config.title}
            </h2>
          </div>

          <button
            type="button"
            className="report-action-modal__close"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="report-action-modal__body">
            <div className="report-action-modal__report">
              <span>Report</span>

              <strong>
                #{report._id?.slice(-6).toUpperCase()}
              </strong>

              <p>{report.description}</p>
            </div>

            <p className="report-action-modal__description">
              {config.description}
            </p>

            <label
              className="report-action-modal__label"
              htmlFor="report-action-message"
            >
              {config.fieldLabel}

              {config.required && (
                <span className="required">*</span>
              )}
            </label>

            <textarea
              id="report-action-message"
              value={value}
              onChange={(event) =>
                setValue(event.target.value)
              }
              placeholder={config.placeholder}
              rows={5}
              maxLength={1000}
              disabled={loading}
              autoFocus
            />

            <div className="report-action-modal__counter">
              {value.length}/1000
            </div>
          </div>

          <div className="report-action-modal__footer">
            <button
              type="button"
              className="report-action-modal__cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`report-action-modal__submit report-action-modal__submit--${config.buttonClass}`}
              disabled={
                loading ||
                (config.required && !value.trim())
              }
            >
              {loading ? (
                <>
                  <span className="report-action-modal__spinner" />
                  Processing...
                </>
              ) : (
                config.buttonLabel
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
