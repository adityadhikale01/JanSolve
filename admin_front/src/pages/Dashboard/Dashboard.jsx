import {
  DashboardStats,
  InnovationPipeline,
  DomainDistribution,
  MaharashtraProblemMap,
  AIIntelligence,
  AdminAttention,
  MasterProblems,
  InnovationNetwork,
  SocialImpact,
} from "../../components/dashboard";

import "./Dashboard.css";


export default function Dashboard() {

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">

        <div className="dashboard-header-left">

          <div className="dashboard-breadcrumb">
            <span>Admin</span>
            <span>›</span>
            <span>Dashboard</span>
          </div>

          <h1>
            Dashboard
          </h1>

          <p>
            Statewide overview of societal challenges,
            innovation and impact.
          </p>

        </div>


        <div className="dashboard-header-right">

          <div className="dashboard-date-filter">

            <span>
              Reporting period
            </span>

            <strong>
              Last 30 days
            </strong>

          </div>


          <div className="dashboard-live-status">

            <span className="dashboard-live-dot" />

            System operational

          </div>


          <span className="dashboard-updated">
            Updated 2 min ago
          </span>

        </div>

      </header>


      {/* Statistics */}
      <DashboardStats />


      {/* Pipeline + Domain */}
      <section className="dashboard-main-grid">

        <InnovationPipeline />

        <DomainDistribution />

      </section>


      {/* Map + AI */}
      <section className="dashboard-main-grid">

        <MaharashtraProblemMap />

        <AIIntelligence />

      </section>


      {/* Master Problems + Attention */}
      <section className="dashboard-main-grid">

        <MasterProblems />

        <AdminAttention />

      </section>


      {/* Network + Impact */}
      <section className="dashboard-main-grid">

        <InnovationNetwork />

        <SocialImpact />

      </section>

    </div>
  );
}