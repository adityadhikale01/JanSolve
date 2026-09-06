import {
  FileText,
  Clock3,
  ShieldCheck,
  Layers3,
  FolderKanban,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

import {
  dashboardStats,
} from "../../data/dashboardDummyData";

import { Link } from "react-router-dom";


const stats = [
  {
    key: "totalReports",
    title: "Total Reports",
    subtitle: "Citizen & community submissions",
    value: dashboardStats.totalReports,
    trend: "+12.4%",
    trendText: "this month",
    icon: FileText,
    className: "dashboard-stat-reports",
    link: "/reports",
  },

  {
    key: "pendingReview",
    title: "Pending Review",
    subtitle: "Requires admin attention",
    value: dashboardStats.pendingReview,
    trend: "+18",
    trendText: "since yesterday",
    icon: Clock3,
    className: "dashboard-stat-pending",
    link: "/reports?status=submitted",
  },

  {
    key: "validatedReports",
    title: "Validated Problems",
    subtitle: "Successfully verified",
    value: dashboardStats.validatedReports,
    trend: "71.4%",
    trendText: "validation rate",
    icon: ShieldCheck,
    className: "dashboard-stat-validated",
    link: "/reports?status=validated",
  },

  {
    key: "masterProblems",
    title: "Master Problems",
    subtitle: "Unique societal problems",
    value: dashboardStats.masterProblems,
    trend: "+48",
    trendText: "this month",
    icon: Layers3,
    className: "dashboard-stat-master",
    link: "/master-problems",
  },

  {
    key: "activeProjects",
    title: "Active Projects",
    subtitle: "Solutions under development",
    value: dashboardStats.activeProjects,
    trend: "24",
    trendText: "institutions",
    icon: FolderKanban,
    className: "dashboard-stat-projects",
    link: "/projects",
  },

  {
    key: "solutionsDeployed",
    title: "Solutions Deployed",
    subtitle: "Solutions reaching communities",
    value: dashboardStats.solutionsDeployed,
    trend: "+5",
    trendText: "this quarter",
    icon: Rocket,
    className: "dashboard-stat-deployed",
    link: "/projects?status=deployed",
  },
];


export default function DashboardStats() {

  return (
    <section className="dashboard-stats-grid">

      {stats.map((stat) => {

        const Icon = stat.icon;

        return (
          <Link
            key={stat.key}
            to={stat.link}
            className={`dashboard-stat-card ${stat.className}`}
          >

            <div className="dashboard-stat-top">

              <div className="dashboard-stat-icon">
                <Icon size={17} />
              </div>

              <ArrowUpRight
                size={14}
                className="dashboard-stat-arrow"
              />

            </div>


            <div className="dashboard-stat-value">
              {stat.value.toLocaleString()}
            </div>


            <div className="dashboard-stat-title">
              {stat.title}
            </div>


            <div className="dashboard-stat-bottom">

              <span className="dashboard-stat-subtitle">
                {stat.subtitle}
              </span>

              <span className="dashboard-stat-trend">
                {stat.trend}

                <small>
                  {stat.trendText}
                </small>
              </span>

            </div>

          </Link>
        );
      })}

    </section>
  );
}