import "./AdminSectionPage.css";

const pageCopy = {
  dashboard: {
    title: "Dashboard",
    eyebrow: "Overview",
    description: "Monitor reports, assignments, and platform activity from one place.",
  },
  reports: {
    title: "Reports",
    eyebrow: "Problem Management",
    description: "Review citizen reports and track their current resolution status.",
  },
  "master-problems": {
    title: "Master Problems",
    eyebrow: "Problem Management",
    description: "Group related reports into larger master problems for coordinated work.",
  },
  universities: {
    title: "Universities",
    eyebrow: "Innovation Network",
    description: "Manage university partners connected to JanSolve problem solving.",
  },
  assignments: {
    title: "Assignments",
    eyebrow: "Innovation Network",
    description: "Assign problems to teams and keep ownership visible.",
  },
  projects: {
    title: "Projects",
    eyebrow: "Innovation Network",
    description: "Track project progress from assignment through delivery.",
  },
  analytics: {
    title: "Analytics",
    eyebrow: "Insights",
    description: "Explore platform metrics and resolution trends.",
  },
  settings: {
    title: "Settings",
    eyebrow: "Admin",
    description: "Configure account and platform preferences.",
  },
};

export default function AdminSectionPage({ section }) {
  const content = pageCopy[section] ?? pageCopy.dashboard;

  return (
    <section className="admin-section-page">
      <div className="admin-section-header">
        <span className="admin-section-eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </div>

      <div className="admin-section-panel">
        <h2>{content.title} workspace</h2>
        <p>This admin module is ready for the next feature implementation.</p>
      </div>
    </section>
  );
}
