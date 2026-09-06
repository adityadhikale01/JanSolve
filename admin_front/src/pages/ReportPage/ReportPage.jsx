import { useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { fetchWithAuth } from "../../auth/fetchWithAuth.jsx";
import CreateMasterProblemModal from "../../components/reports/CreateMasterProblemModel.jsx";
import MasterProblemSelector from "../../components/reports/MasterProblemSelector.jsx";
import ReportActionModal from "../../components/reports/ReportActionModel.jsx";

import { StatCard } from "./ReportBadges.jsx";
import ReportDrawer from "./ReportDrawer.jsx";
import ReportFilters from "./ReportFilters.jsx";
import ReportTable from "./ReportTable.jsx";
import {
  DEFAULT_FILTERS,
  filterReports,
  getActionPayload,
  getActionSuccessMessage,
  getDomainOptions,
} from "./reportHelpers.js";

import "./ReportPage.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function ReportPage() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  const [reports, setReports] = useState(loaderData?.reports || []);
  const [reportStats, setReportStats] = useState(loaderData?.stats || {});
  const [masterProblems, setMasterProblems] = useState(
    loaderData?.masterProblems || []
  );
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionModal, setActionModal] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [masterProblemSelectorOpen, setMasterProblemSelectorOpen] =
    useState(false);
  const [createMasterProblemOpen, setCreateMasterProblemOpen] =
    useState(false);

  const filteredReports = useMemo(
    () => filterReports(reports, filters),
    [reports, filters]
  );

  const domainOptions = useMemo(() => getDomainOptions(reports), [reports]);

  const selectedReport = useMemo(
    () =>
      reports.find((report) => report._id === selectedReportId) || null,
    [reports, selectedReportId]
  );

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  function showSuccess(message) {
    setErrorMessage("");
    setSuccessMessage(message);
  }

  function showError(message) {
    setSuccessMessage("");
    setErrorMessage(message);
  }

  function updateReport(updatedReport) {
    if (!updatedReport?._id) {
      return;
    }

    setReports((currentReports) =>
      currentReports.map((report) =>
        report._id === updatedReport._id
          ? {
              ...report,
              ...updatedReport,
            }
          : report
      )
    );
  }

  function handleReportLinked(updatedReport) {
    updateReport(updatedReport);
  }

  function handleMasterProblemCreated({ masterProblem, report }) {
    if (masterProblem) {
      setMasterProblems((current) => {
        const alreadyExists = current.some(
          (item) => item._id === masterProblem._id
        );

        return alreadyExists ? current : [masterProblem, ...current];
      });
    }

    if (report) {
      handleReportLinked(report);
    }

    setCreateMasterProblemOpen(false);
    showSuccess("Master problem created and report linked successfully.");
  }

  async function handleUnlinkMasterProblem(report) {
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

      const response = await fetchWithAuth(
        `${API_URL}/api/admin/reports/${report._id}/unlink-master-problem`,
        { method: "PATCH" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to unlink master problem.");
      }

      handleReportLinked(
        data.report || {
          _id: report._id,
          masterProblemId: null,
        }
      );
      showSuccess("Report unlinked successfully.");
    } catch (error) {
      console.error("Unlink master problem error:", error);
      showError(error.message || "Failed to unlink report.");
    }
  }

  function handleAction(action, report) {
    if (!report?._id) {
      return;
    }

    if (action === "review") {
      executeAction(action, report, {});
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setActionModal({ action, report });
  }

  async function executeAction(action, report, body) {
    try {
      setActionLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetchWithAuth(
        `${API_URL}/api/admin/reports/${report._id}/${action}`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update report.");
      }

      const updatedReport = {
        _id: report._id,
        ...(data.report || {}),
      };

      updateReport(updatedReport);
      updateStats(report.status, updatedReport.status);
      setActionModal(null);
      showSuccess(getActionSuccessMessage(action));
    } catch (error) {
      console.error("Report action error:", error);
      showError(error.message || "Something went wrong.");
    } finally {
      setActionLoading(false);
    }
  }

  function updateStats(previousStatus, newStatus) {
    if (!newStatus || previousStatus === newStatus) {
      return;
    }

    setReportStats((currentStats) => ({
      ...currentStats,
      [previousStatus]: Math.max(
        0,
        (currentStats[previousStatus] || 0) - 1
      ),
      [newStatus]: (currentStats[newStatus] || 0) + 1,
    }));
  }

  function handleModalConfirm(value) {
    if (!actionModal) {
      return;
    }

    executeAction(
      actionModal.action,
      actionModal.report,
      getActionPayload(actionModal.action, value)
    );
  }

  return (
    <div className="report-page">
      <header className="report-page__header">
        <div>
          <div className="report-page__breadcrumb">
            <span>Admin</span>
            <span>&rsaquo;</span>
            <span>Reports</span>
          </div>

          <h1>Reports</h1>

          <p>
            Review, validate and manage stakeholder-submitted societal
            challenges.
          </p>
        </div>
      </header>

      <section className="report-stats">
        <StatCard
          label="Total Reports"
          value={reportStats.total || 0}
          type="total"
        />
        <StatCard
          label="Under Review"
          value={reportStats.under_review || 0}
          type="review"
        />
        <StatCard
          label="Verified"
          value={reportStats.verified || 0}
          type="verified"
        />
        <StatCard
          label="Rejected"
          value={reportStats.rejected || 0}
          type="rejected"
        />
      </section>

      <section className="report-list-section">
        <div className="report-list-header">
          <div>
            <h2>Recent Reports</h2>
            <p>
              {filteredReports.length} of {reports.length} report
              {reports.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <ReportFilters
          filters={filters}
          domainOptions={domainOptions}
          onChange={setFilters}
          onReset={resetFilters}
        />

        <ReportTable
          reports={reports}
          filteredReports={filteredReports}
          onViewReport={setSelectedReportId}
          onResetFilters={resetFilters}
        />
      </section>

      <ReportDrawer
        report={selectedReport}
        onClose={() => setSelectedReportId(null)}
        onAction={handleAction}
        actionLoading={actionLoading}
        masterProblems={masterProblems}
        onFindMasterProblem={() => setMasterProblemSelectorOpen(true)}
        onCreateMasterProblem={() => setCreateMasterProblemOpen(true)}
        onChangeMasterProblem={() => setMasterProblemSelectorOpen(true)}
        onUnlinkMasterProblem={handleUnlinkMasterProblem}
        onViewMasterProblems={() => navigate("/master-problems")}
      />

      {successMessage && (
        <div className="report-toast report-toast--success">
          <span>&#10003;</span>
          <div>
            <strong>Success</strong>
            <p>{successMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label="Dismiss notification"
          >
            &times;
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="report-toast report-toast--error">
          <span>!</span>
          <div>
            <strong>Action failed</strong>
            <p>{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            aria-label="Dismiss notification"
          >
            &times;
          </button>
        </div>
      )}

      <ReportActionModal
        key={
          actionModal
            ? `${actionModal.report?._id}-${actionModal.action}`
            : "closed"
        }
        action={actionModal?.action}
        report={actionModal?.report}
        loading={actionLoading}
        onClose={() => {
          if (!actionLoading) {
            setActionModal(null);
          }
        }}
        onConfirm={handleModalConfirm}
      />

      {masterProblemSelectorOpen && selectedReport && (
        <MasterProblemSelector
          report={selectedReport}
          masterProblems={masterProblems}
          onClose={() => setMasterProblemSelectorOpen(false)}
          onLinked={(updatedReport) => {
            handleReportLinked(updatedReport);
            setMasterProblemSelectorOpen(false);
            showSuccess("Report linked to master problem successfully.");
          }}
        />
      )}

      {createMasterProblemOpen && selectedReport && (
        <CreateMasterProblemModal
          report={selectedReport}
          onClose={() => setCreateMasterProblemOpen(false)}
          onCreated={handleMasterProblemCreated}
        />
      )}
    </div>
  );
}
