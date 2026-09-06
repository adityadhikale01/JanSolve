// import { useLoaderData } from "react-router-dom";
// import { useState } from "react";
// import "./MasterProblemsPage.css";

// function statusLabel(status) {
//   return status
//     ?.replaceAll("_", " ")
//     .replace(/\b\w/g, (letter) =>
//       letter.toUpperCase()
//     );
// }

// function severityLabel(severity) {
//   return (
//     severity?.charAt(0).toUpperCase() +
//       severity?.slice(1) || "Moderate"
//   );
// }

// export default function MasterProblemsPage() {
//   const { masterProblems, count } =
//     useLoaderData();

//   const [selectedProblem, setSelectedProblem] =
//     useState(null);

//   return (
//     <div className="master-problems-page">
//       <header className="master-problems-header">
//         <div>
//           <div className="master-problems-breadcrumb">
//             <span>Admin</span>
//             <span>›</span>
//             <span>Master Problems</span>
//           </div>

//           <h1>Master Problems</h1>

//           <p>
//             Validated societal challenges formed from
//             related reports.
//           </p>
//         </div>

//         <div className="master-problems-count">
//           <span>Total Problems</span>
//           <strong>{count}</strong>
//         </div>
//       </header>

//       <section className="master-problems-list">
//         <div className="master-problems-list-header">
//           <div>
//             <h2>Societal Problems</h2>

//             <p>
//               Consolidated problems currently tracked
//               by the platform.
//             </p>
//           </div>
//         </div>

//         {masterProblems.length === 0 ? (
//           <div className="master-problems-empty">
//             <strong>No master problems yet</strong>

//             <span>
//               Verified reports can be grouped into
//               master problems from the Reports module.
//             </span>
//           </div>
//         ) : (
//           <div className="master-problems-table-wrapper">
//             <table className="master-problems-table">
//               <thead>
//                 <tr>
//                   <th>Problem</th>
//                   <th>Domain</th>
//                   <th>Location</th>
//                   <th>Severity</th>
//                   <th>Status</th>
//                   <th />
//                 </tr>
//               </thead>

//               <tbody>
//                 {masterProblems.map((problem) => (
//                   <tr key={problem._id}>
//                     <td>
//                       <div className="master-problem-title">
//                         <strong>{problem.title}</strong>

//                         <span>
//                           {problem.summary}
//                         </span>
//                       </div>
//                     </td>

//                     <td>
//                       <div className="master-problem-domain">
//                         <strong>
//                           {problem.domain}
//                         </strong>

//                         {problem.subdomain && (
//                           <span>
//                             {problem.subdomain}
//                           </span>
//                         )}
//                       </div>
//                     </td>

//                     <td>
//                       <span className="master-problem-location">
//                         {problem.location?.address ||
//                           "Location unavailable"}
//                       </span>
//                     </td>

//                     <td>
//                       <span
//                         className={`master-problem-severity master-problem-severity--${problem.severity}`}
//                       >
//                         {severityLabel(
//                           problem.severity
//                         )}
//                       </span>
//                     </td>

//                     <td>
//                       <span className="master-problem-status">
//                         {statusLabel(problem.status)}
//                       </span>
//                     </td>

//                     <td>
//                       <button
//                         type="button"
//                         className="master-problem-view"
//                         onClick={() =>
//                           setSelectedProblem(problem)
//                         }
//                       >
//                         View
//                         <span>→</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>

//       {selectedProblem && (
//         <MasterProblemDrawer
//           problem={selectedProblem}
//           onClose={() =>
//             setSelectedProblem(null)
//           }
//         />
//       )}
//     </div>
//   );
// }

// function MasterProblemDrawer({
//   problem,
//   onClose,
// }) {
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Details API will be connected in the next step.
//   // For now the drawer displays the loaded problem.

//   return (
//     <>
//       <div
//         className="master-problem-backdrop"
//         onClick={onClose}
//       />

//       <aside className="master-problem-drawer">
//         <header className="master-problem-drawer-header">
//           <div>
//             <span>Master Problem</span>

//             <h2>{problem.title}</h2>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//           >
//             ×
//           </button>
//         </header>

//         <div className="master-problem-drawer-body">
//           <div className="master-problem-drawer-status">
//             <span>
//               {statusLabel(problem.status)}
//             </span>

//             <span
//               className={`master-problem-severity master-problem-severity--${problem.severity}`}
//             >
//               {severityLabel(problem.severity)}
//             </span>
//           </div>

//           <section>
//             <label>Problem Summary</label>

//             <p>{problem.summary}</p>
//           </section>

//           <section>
//             <label>Classification</label>

//             <div className="master-problem-info-grid">
//               <div>
//                 <span>Domain</span>
//                 <strong>{problem.domain}</strong>
//               </div>

//               <div>
//                 <span>Subdomain</span>
//                 <strong>
//                   {problem.subdomain || "—"}
//                 </strong>
//               </div>

//               <div>
//                 <span>Problem Type</span>
//                 <strong>
//                   {problem.problemType || "—"}
//                 </strong>
//               </div>
//             </div>
//           </section>

//           <section>
//             <label>Location</label>

//             <p>
//               {problem.location?.address ||
//                 "Location unavailable"}
//             </p>
//           </section>

//           <section>
//             <label>Related Reports</label>

//             <div className="master-problem-report-count">
//               <strong>—</strong>
//               <span>
//                 reports currently linked
//               </span>
//             </div>
//           </section>
//         </div>
//       </aside>
//     </>
//   );
// }

import { useState } from "react";
import {
  useLoaderData,
} from "react-router-dom";

import {
  fetchWithAuth,
} from "../../auth/fetchWithAuth.jsx";

import "./MasterProblemsPage.css";

const API_URL =
  import.meta.env.VITE_API_URL;

/* =========================================================
   HELPERS
========================================================= */

function statusLabel(status) {
  if (!status) {
    return "Unknown";
  }

  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function severityLabel(severity) {
  if (!severity) {
    return "Moderate";
  }

  return (
    severity.charAt(0).toUpperCase() +
    severity.slice(1)
  );
}

function formatDate(date) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function getLocationText(location) {
  if (!location) {
    return "Location unavailable";
  }

  if (location.address) {
    return location.address;
  }

  if (
    Array.isArray(location.coordinates) &&
    location.coordinates.length === 2
  ) {
    const longitude =
      Number(location.coordinates[0]);

    const latitude =
      Number(location.coordinates[1]);

    if (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude)
    ) {
      return `${latitude.toFixed(
        4
      )}, ${longitude.toFixed(4)}`;
    }
  }

  return "Location unavailable";
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function MasterProblemsPage() {
  const loaderData = useLoaderData();

  const masterProblems =
    loaderData?.masterProblems || [];

  const count =
    loaderData?.count ||
    masterProblems.length;

  const [
    selectedProblem,
    setSelectedProblem,
  ] = useState(null);

  const [
    selectedProblemDetails,
    setSelectedProblemDetails,
  ] = useState(null);

  const [
    detailsLoading,
    setDetailsLoading,
  ] = useState(false);

  const [
    detailsError,
    setDetailsError,
  ] = useState("");

  /* =======================================================
     OPEN MASTER PROBLEM
  ======================================================= */

  async function handleOpenProblem(
    problem
  ) {
    setSelectedProblem(problem);

    setSelectedProblemDetails(null);
    setDetailsError("");
    setDetailsLoading(true);

    try {
      const response =
        await fetchWithAuth(
          `${API_URL}/api/admin/master-problems/${problem._id}`,
          {
            method: "GET",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to load master problem details."
        );
      }

      setSelectedProblemDetails(
        data
      );
    } catch (error) {
      console.error(
        "Master problem detail error:",
        error
      );

      setDetailsError(
        error.message ||
          "Failed to load master problem details."
      );
    } finally {
      setDetailsLoading(false);
    }
  }

  /* =======================================================
     CLOSE DRAWER
  ======================================================= */

  function handleCloseDrawer() {
    setSelectedProblem(null);
    setSelectedProblemDetails(null);
    setDetailsError("");
  }

  return (
    <div className="master-problems-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="master-problems-header">
        <div>
          <div className="master-problems-breadcrumb">
            <span>Admin</span>
            <span>›</span>
            <span>Master Problems</span>
          </div>

          <h1>Master Problems</h1>

          <p>
            Validated societal challenges formed
            from related reports.
          </p>
        </div>

        <div className="master-problems-count">
          <span>Total Problems</span>

          <strong>{count}</strong>
        </div>
      </header>

      {/* ===================================================
          MASTER PROBLEM LIST
      =================================================== */}

      <section className="master-problems-list">
        <div className="master-problems-list-header">
          <div>
            <h2>Societal Problems</h2>

            <p>
              Consolidated problems currently tracked
              by the platform.
            </p>
          </div>
        </div>

        {masterProblems.length === 0 ? (
          <div className="master-problems-empty">
            <strong>
              No master problems yet
            </strong>

            <span>
              Verified reports can be grouped into
              master problems from the Reports module.
            </span>
          </div>
        ) : (
          <div className="master-problems-table-wrapper">
            <table className="master-problems-table">
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Domain</th>
                  <th>Location</th>
                  <th>Reports</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {masterProblems.map(
                  (problem) => (
                    <tr
                      key={problem._id}
                    >
                      {/* =================================
                          PROBLEM
                      ================================= */}

                      <td>
                        <div className="master-problem-title">
                          <strong>
                            {problem.title}
                          </strong>

                          <span>
                            {problem.summary}
                          </span>
                        </div>
                      </td>

                      {/* =================================
                          DOMAIN
                      ================================= */}

                      <td>
                        <div className="master-problem-domain">
                          <strong>
                            {problem.domain}
                          </strong>

                          {problem.subdomain && (
                            <span>
                              {
                                problem.subdomain
                              }
                            </span>
                          )}
                        </div>
                      </td>

                      {/* =================================
                          LOCATION
                      ================================= */}

                      <td>
                        <span className="master-problem-location">
                          {getLocationText(
                            problem.location
                          )}
                        </span>
                      </td>

                      {/* =================================
                          REPORT COUNT
                      ================================= */}

                      <td>
                        <span className="master-problem-report-badge">
                          {problem.relatedReportsCount ||
                            0}
                        </span>
                      </td>

                      {/* =================================
                          SEVERITY
                      ================================= */}

                      <td>
                        <span
                          className={`master-problem-severity master-problem-severity--${
                            problem.severity ||
                            "moderate"
                          }`}
                        >
                          {severityLabel(
                            problem.severity
                          )}
                        </span>
                      </td>

                      {/* =================================
                          STATUS
                      ================================= */}

                      <td>
                        <span
                          className={`master-problem-status master-problem-status--${problem.status}`}
                        >
                          {statusLabel(
                            problem.status
                          )}
                        </span>
                      </td>

                      {/* =================================
                          VIEW
                      ================================= */}

                      <td>
                        <button
                          type="button"
                          className="master-problem-view"
                          onClick={() =>
                            handleOpenProblem(
                              problem
                            )
                          }
                        >
                          View

                          <span>→</span>
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ===================================================
          DRAWER
      =================================================== */}

      {selectedProblem && (
        <MasterProblemDrawer
          problem={
            selectedProblem
          }
          details={
            selectedProblemDetails
          }
          loading={
            detailsLoading
          }
          error={
            detailsError
          }
          onClose={
            handleCloseDrawer
          }
        />
      )}
    </div>
  );
}

/* =========================================================
   MASTER PROBLEM DRAWER
========================================================= */

function MasterProblemDrawer({
  problem,
  details,
  loading,
  error,
  onClose,
}) {
  const reports =
    details?.reports || [];

  const actualProblem =
    details?.masterProblem ||
    problem;

  return (
    <>
      {/* BACKDROP */}

      <div
        className="master-problem-backdrop"
        onClick={onClose}
      />

      {/* DRAWER */}

      <aside className="master-problem-drawer">
        {/* ===============================================
            HEADER
        =============================================== */}

        <header className="master-problem-drawer-header">
          <div>
            <span>
              Master Problem
            </span>

            <h2>
              {actualProblem.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        {/* ===============================================
            BODY
        =============================================== */}

        <div className="master-problem-drawer-body">
          {/* =============================================
              STATUS
          ============================================= */}

          <div className="master-problem-drawer-status">
            <span>
              {statusLabel(
                actualProblem.status
              )}
            </span>

            <span
              className={`master-problem-severity master-problem-severity--${
                actualProblem.severity ||
                "moderate"
              }`}
            >
              {severityLabel(
                actualProblem.severity
              )}
            </span>
          </div>

          {/* =============================================
              SUMMARY
          ============================================= */}

          <section>
            <label>
              Problem Summary
            </label>

            <p>
              {actualProblem.summary ||
                "No summary available."}
            </p>
          </section>

          {/* =============================================
              CLASSIFICATION
          ============================================= */}

          <section>
            <label>
              Classification
            </label>

            <div className="master-problem-info-grid">
              <div>
                <span>
                  Domain
                </span>

                <strong>
                  {actualProblem.domain ||
                    "—"}
                </strong>
              </div>

              <div>
                <span>
                  Subdomain
                </span>

                <strong>
                  {
                    actualProblem.subdomain ||
                    "—"
                  }
                </strong>
              </div>

              <div>
                <span>
                  Problem Type
                </span>

                <strong>
                  {
                    actualProblem.problemType ||
                    "—"
                  }
                </strong>
              </div>
            </div>
          </section>

          {/* =============================================
              LOCATION
          ============================================= */}

          <section>
            <label>
              Location
            </label>

            <div className="master-problem-location-card">
              <strong>
                {getLocationText(
                  actualProblem.location
                )}
              </strong>

              {Array.isArray(
                actualProblem.location
                  ?.coordinates
              ) &&
                actualProblem.location
                  .coordinates.length ===
                  2 && (
                  <span>
                    Lat:{" "}
                    {Number(
                      actualProblem.location
                        .coordinates[1]
                    ).toFixed(5)}
                    {" · "}
                    Lng:{" "}
                    {Number(
                      actualProblem.location
                        .coordinates[0]
                    ).toFixed(5)}
                  </span>
                )}
            </div>
          </section>

          {/* =============================================
              CREATED BY
          ============================================= */}

          <section>
            <label>
              Created
            </label>

            <div className="master-problem-created">
              <strong>
                {actualProblem.createdBy
                  ?.name ||
                  "Admin"}
              </strong>

              <span>
                {formatDate(
                  actualProblem.createdAt
                )}
              </span>
            </div>
          </section>

          {/* =============================================
              RELATED REPORTS
          ============================================= */}

          <section>
            <div className="master-problem-related-header">
              <label>
                Related Reports
              </label>

              {!loading &&
                !error && (
                  <span>
                    {reports.length} report
                    {reports.length === 1
                      ? ""
                      : "s"}
                  </span>
                )}
            </div>

            {/* -------------------------------------------
                LOADING
            ------------------------------------------- */}

            {loading && (
              <div className="master-problem-related-loading">
                Loading linked reports...
              </div>
            )}

            {/* -------------------------------------------
                ERROR
            ------------------------------------------- */}

            {!loading && error && (
              <div className="master-problem-related-error">
                {error}
              </div>
            )}

            {/* -------------------------------------------
                EMPTY
            ------------------------------------------- */}

            {!loading &&
              !error &&
              reports.length === 0 && (
                <div className="master-problem-related-empty">
                  <strong>
                    No reports linked
                  </strong>

                  <span>
                    This master problem currently
                    has no linked reports.
                  </span>
                </div>
              )}

            {/* -------------------------------------------
                REPORT LIST
            ------------------------------------------- */}

            {!loading &&
              !error &&
              reports.length > 0 && (
                <div className="master-problem-reports-list">
                  {reports.map(
                    (report) => (
                      <div
                        key={report._id}
                        className="master-problem-report-card"
                      >
                        <div className="master-problem-report-card-top">
                          <span>
                            #
                            {String(
                              report._id
                            )
                              .slice(-6)
                              .toUpperCase()}
                          </span>

                          <span>
                            {formatDate(
                              report.createdAt
                            )}
                          </span>
                        </div>

                        <p>
                          {
                            report.description
                          }
                        </p>

                        <div className="master-problem-report-card-bottom">
                          <span>
                            {report.createdBy
                              ?.name ||
                              "Unknown stakeholder"}
                          </span>

                          <span
                            className={`master-problem-report-status master-problem-report-status--${report.status}`}
                          >
                            {statusLabel(
                              report.status
                            )}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
          </section>
        </div>
      </aside>
    </>
  );
}