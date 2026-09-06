import {
  Layers3,
  ArrowRight,
} from "lucide-react";

import {
  recentMasterProblems,
} from "../../data/dashboardDummyData";

import { Link } from "react-router-dom";


function getPriorityClass(priority) {

  switch (priority.toLowerCase()) {

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


export default function MasterProblems() {

  return (
    <div className="dashboard-panel dashboard-master-panel">

      {/* Header */}

      <div className="dashboard-panel-header">

        <div className="dashboard-section-title-row">

          <div className="dashboard-section-icon">
            <Layers3 size={18} />
          </div>

          <div>

            <h2>
              Recent Master Problems
            </h2>

            <p>
              AI-grouped unique societal problems
            </p>

          </div>

        </div>


        <Link
          to="/master-problems"
          className="dashboard-text-button"
        >
          View all
          <ArrowRight size={13} />
        </Link>

      </div>


      {/* List */}

      <div className="dashboard-master-list">

        {recentMasterProblems.map((problem) => (

          <Link
            key={problem.id}
            to={`/master-problems/${problem.id}`}
            className="dashboard-master-row"
          >

            <span className="dashboard-master-id">
              {problem.id}
            </span>


            <span className="dashboard-master-title">

              <strong>
                {problem.title}
              </strong>

              <span>
                {problem.reports} citizen reports grouped
              </span>

            </span>


            <span className="dashboard-master-district">
              {problem.district}
            </span>


            <span
              className={`dashboard-priority ${getPriorityClass(
                problem.priority
              )}`}
            >
              {problem.priority}
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