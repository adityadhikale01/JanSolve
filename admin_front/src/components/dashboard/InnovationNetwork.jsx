import {
  Building2,
  GraduationCap,
  Users,
  UserRoundCheck,
  ArrowRight,
} from "lucide-react";

import {
  innovationNetwork,
} from "../../data/dashboardDummyData";

import { Link } from "react-router-dom";


export default function InnovationNetwork() {

  return (
    <div className="dashboard-panel dashboard-network-panel">

      <div className="dashboard-panel-header">

        <div className="dashboard-section-title-row">

          <div className="dashboard-section-icon">
            <Building2 size={18} />
          </div>

          <div>

            <h2>
              Innovation Network
            </h2>

            <p>
              Higher education participation
            </p>

          </div>

        </div>


        <Link
          to="/institutions"
          className="dashboard-text-button"
        >
          Explore
          <ArrowRight size={13} />
        </Link>

      </div>


      <div className="dashboard-network-grid">

        <div className="dashboard-network-stat">

          <div className="dashboard-network-icon">
            <Building2 size={16} />
          </div>

          <strong>
            {innovationNetwork.universities}
          </strong>

          <span>
            Universities registered
          </span>

        </div>


        <div className="dashboard-network-stat">

          <div className="dashboard-network-icon">
            <GraduationCap size={16} />
          </div>

          <strong>
            {innovationNetwork.activeInstitutions}
          </strong>

          <span>
            Active institutions
          </span>

        </div>


        <div className="dashboard-network-stat">

          <div className="dashboard-network-icon">
            <UserRoundCheck size={16} />
          </div>

          <strong>
            {innovationNetwork.facultyMentors}
          </strong>

          <span>
            Faculty mentors
          </span>

        </div>


        <div className="dashboard-network-stat">

          <div className="dashboard-network-icon">
            <Users size={16} />
          </div>

          <strong>
            {innovationNetwork.studentParticipants}
          </strong>

          <span>
            Student participants
          </span>

        </div>

      </div>


      <div className="dashboard-network-footer">

        <span>

          <i className="dashboard-network-online-dot" />

          24 institutions currently active

        </span>

        <span>
          Updated today
        </span>

      </div>

    </div>
  );
}