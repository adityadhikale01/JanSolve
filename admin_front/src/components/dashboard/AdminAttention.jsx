import {
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import {
  attentionReports,
} from "../../data/dashboardDummyData";

import { Link } from "react-router-dom";


function getPriorityClass(priority) {

  switch (priority.toLowerCase()) {

    case "critical":
      return "dashboard-priority-critical";

    case "high":
      return "dashboard-priority-high";

    case "medium":
      return "dashboard-priority-medium";

    case "low":
      return "dashboard-priority-low";

    default:
      return "dashboard-priority-medium";
  }
}


export default function AdminAttention() {

  return (
    <div className="dashboard-panel dashboard-attention-panel">

      {/* Header */}

      <div className="dashboard-panel-header">

        <div className="dashboard-section-title-row">

          <div className="dashboard-attention-icon">
            <AlertCircle size={17} />
          </div>

          <div>

            <h2>
              Needs Admin Attention
            </h2>

            <p>
              Reports requiring immediate review, verification or action
            </p>

          </div>

        </div>


        <Link
          to="/reports"
          className="dashboard-text-button"
        >
          View all reports
          <ArrowRight size={13} />
        </Link>

      </div>


      {/* Header row */}

      <div className="dashboard-attention-list">

        <div className="dashboard-attention-row dashboard-attention-heading">

          <span>
            ID
          </span>

          <span>
            Problem
          </span>

          <span>
            Priority
          </span>

          <span>
            Status
          </span>

          <span>
            Age
          </span>

          <span />

        </div>


        {attentionReports.map((report) => (

          <Link
            key={report.id}
            to={`/reports/${report.id}`}
            className="dashboard-attention-row"
          >

            <span className="dashboard-attention-id">
              {report.id}
            </span>


            <span className="dashboard-attention-title">

              <strong>
                {report.title}
              </strong>

              <span>
                {report.district} · {report.domain}
              </span>

            </span>


            <span
              className={`dashboard-priority ${getPriorityClass(
                report.priority
              )}`}
            >
              {report.priority}
            </span>


            <span className="dashboard-status">
              {report.status}
            </span>


            <span className="dashboard-age">
              {report.age}
            </span>


            <ArrowRight
              size={13}
              className="dashboard-row-arrow"
            />

          </Link>

        ))}

      </div>

    </div>
  );
}