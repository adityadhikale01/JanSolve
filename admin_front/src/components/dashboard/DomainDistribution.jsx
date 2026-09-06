import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import {
  ArrowRight,
  Target,
} from "lucide-react";

import {
  domainData,
  dashboardStats,
} from "../../data/dashboardDummyData";

import { Link } from "react-router-dom";


const DOMAIN_COLORS = [
  "#3c9889",
  "#4e7f95",
  "#d8ad61",
  "#bb6d78",
  "#4b9c82",
  "#73977f",
  "#777ca7",
  "#6a9cb0",
  "#9aa9b2",
  "#b3bec5",
];


export default function DomainDistribution() {

  return (
    <div className="dashboard-panel dashboard-domain-panel">

      <div className="dashboard-panel-header">

        <div className="dashboard-section-title-row">

          <div className="dashboard-section-icon">
            <Target size={18} />
          </div>

          <div>

            <h2>
              Problems by Domain
            </h2>

            <p>
              AI-classified societal challenges
            </p>

          </div>

        </div>


        <Link
          to="/reports"
          className="dashboard-text-button"
        >
          View all
          <ArrowRight size={14} />
        </Link>

      </div>


      <div className="dashboard-domain-chart">

        <div className="dashboard-domain-pie">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={domainData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="82%"
                paddingAngle={2}
                stroke="none"
              >

                {domainData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      DOMAIN_COLORS[index %
                        DOMAIN_COLORS.length]
                    }
                  />
                ))}

              </Pie>


              <Tooltip />

            </PieChart>

          </ResponsiveContainer>


          <div className="dashboard-pie-center">

            <strong>
              {dashboardStats.totalReports.toLocaleString()}
            </strong>

            <span>
              Reports
            </span>

          </div>

        </div>


        <div className="dashboard-domain-legend">

          {domainData.map((domain, index) => (

            <div
              className="dashboard-domain-legend-item"
              key={domain.name}
            >

              <span
                className={`dashboard-domain-dot dashboard-domain-dot-${index}`}
              />

              <span className="dashboard-domain-name">
                {domain.name}
              </span>

              <strong>
                {domain.count}
              </strong>

              <small>
                {domain.percentage}%
              </small>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}