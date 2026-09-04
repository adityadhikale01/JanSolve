import { useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Filter,
  MapPin,
  Navigation,
  Search,
  Users,
  X,
} from "lucide-react";

import "leaflet/dist/leaflet.css";
import "./NearbyIssuesPage.css";

/* =========================================================
   DUMMY MASTER PROBLEMS
   ---------------------------------------------------------
   These are demo records only.
   Coordinates are based around real Nashik localities.
   Report counts/statuses are synthetic.
========================================================= */

const DUMMY_MASTER_PROBLEMS = [
  {
    id: "mp-001",
    title: "Severe potholes on Dwarka service road",
    category: "Road Infrastructure",
    subcategory: "Potholes",

    location: {
      coordinates: [73.7970, 19.9943],
      address: "Dwarka Circle, Nashik",
    },

    reportCount: 18,
    status: "in_progress",
    urgency: "urgent",

    hasMyReport: false,

    description:
      "Multiple large potholes are affecting vehicle movement and creating safety concerns for commuters.",

    updatedAt: "2026-09-03T10:30:00.000Z",
  },

  {
    id: "mp-002",
    title: "Waterlogging near Nimani Bus Stand",
    category: "Water & Drainage",
    subcategory: "Waterlogging",

    location: {
      coordinates: [73.79682, 20.01168],
      address: "Nimani Bus Stand, Panchavati",
    },

    reportCount: 14,
    status: "under_review",
    urgency: "attention",

    hasMyReport: false,

    description:
      "Rainwater accumulation is affecting movement around the bus stand and nearby roads.",

    updatedAt: "2026-09-02T14:20:00.000Z",
  },

  {
    id: "mp-003",
    title: "Damaged road surface on College Road",
    category: "Road Infrastructure",
    subcategory: "Road Damage",

    location: {
      coordinates: [73.76056, 20.00381],
      address: "College Road, Nashik",
    },

    reportCount: 11,
    status: "submitted",
    urgency: "attention",

    hasMyReport: true,

    description:
      "Damaged road sections and potholes are causing difficulty for motorists and pedestrians.",

    updatedAt: "2026-09-03T08:45:00.000Z",
  },

  {
    id: "mp-004",
    title: "Road section damaged near NMC headquarters",
    category: "Road Infrastructure",
    subcategory: "Road Damage",

    location: {
      coordinates: [73.77548, 20.00026],
      address: "Pandit Colony, near Rajiv Gandhi Bhavan",
    },

    reportCount: 9,
    status: "in_progress",
    urgency: "urgent",

    hasMyReport: false,

    description:
      "A damaged section of road is disrupting traffic movement and requires restoration.",

    updatedAt: "2026-09-03T12:15:00.000Z",
  },

  {
    id: "mp-005",
    title: "Garbage accumulation in Panchavati area",
    category: "Sanitation",
    subcategory: "Solid Waste",

    location: {
      coordinates: [73.80381, 20.00838],
      address: "Panchavati, Nashik",
    },

    reportCount: 21,
    status: "under_review",
    urgency: "attention",

    hasMyReport: false,

    description:
      "Recurring garbage accumulation and irregular waste clearance have been reported in the area.",

    updatedAt: "2026-09-02T16:40:00.000Z",
  },

  {
    id: "mp-006",
    title: "Irregular water supply in Satpur",
    category: "Water Supply",
    subcategory: "Water Availability",

    location: {
      coordinates: [73.71836, 20.00111],
      address: "Satpur MIDC area, Nashik",
    },

    reportCount: 7,
    status: "submitted",
    urgency: "attention",

    hasMyReport: false,

    description:
      "Low-pressure or irregular water supply has been reported in parts of the area.",

    updatedAt: "2026-09-01T09:30:00.000Z",
  },

  {
    id: "mp-007",
    title: "Road excavation affecting traffic movement",
    category: "Road Infrastructure",
    subcategory: "Road Excavation",

    location: {
      coordinates: [73.7976, 19.9960],
      address: "Dwarka area, Nashik",
    },

    reportCount: 13,
    status: "in_progress",
    urgency: "attention",

    hasMyReport: false,

    description:
      "Road excavation and unfinished restoration are affecting traffic and pedestrian movement.",

    updatedAt: "2026-09-03T11:10:00.000Z",
  },

  {
    id: "mp-008",
    title: "Drainage blockage causing stagnant water",
    category: "Water & Drainage",
    subcategory: "Drainage",

    location: {
      coordinates: [73.79468, 20.00981],
      address: "Panchavati Karanja, Nashik",
    },

    reportCount: 16,
    status: "submitted",
    urgency: "urgent",

    hasMyReport: false,

    description:
      "Blocked drainage is causing stagnant water and increasing sanitation concerns.",

    updatedAt: "2026-09-03T07:50:00.000Z",
  },
];

/* =========================================================
   MAP CONFIG
========================================================= */

const NASHIK_CENTER = [20.0059, 73.7797];

/* =========================================================
   CUSTOM MASTER PROBLEM MARKER
========================================================= */

function createMasterProblemIcon(problem) {
  const markerClass = problem.hasMyReport
    ? "master-marker my-problem"
    : "master-marker";

  return L.divIcon({
    className: "master-marker-wrapper",

    html: `
      <div class="${markerClass}">
        <span class="master-marker-count">
          ${problem.reportCount}
        </span>
      </div>
    `,

    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
  });
}

/* =========================================================
   MAP FLY CONTROLLER
========================================================= */

function MapController({ selectedProblem }) {
  const map = useMap();

  if (selectedProblem) {
    const [longitude, latitude] =
      selectedProblem.location.coordinates;

    map.flyTo([latitude, longitude], 16, {
      duration: 0.8,
    });
  }

  return null;
}

/* =========================================================
   HELPERS
========================================================= */

function formatStatus(status) {
  switch (status) {
    case "submitted":
      return "Submitted";

    case "under_review":
      return "Under Review";

    case "in_progress":
      return "In Progress";

    case "resolved":
      return "Resolved";

    default:
      return "Unknown";
  }
}

function formatUrgency(urgency) {
  switch (urgency) {
    case "urgent":
      return "Urgent";

    case "attention":
      return "Needs Attention";

    default:
      return "Normal";
  }
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function NearbyIssuesPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProblem, setSelectedProblem] =
    useState(null);

  const [showFilters, setShowFilters] =
    useState(false);

  /* -------------------------------------------------------
     CATEGORY LIST
  ------------------------------------------------------- */

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        DUMMY_MASTER_PROBLEMS.map(
          (problem) => problem.category
        )
      ),
    ];
  }, []);

  /* -------------------------------------------------------
     FILTER MASTER PROBLEMS
  ------------------------------------------------------- */

  const filteredProblems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return DUMMY_MASTER_PROBLEMS.filter((problem) => {
      const matchesCategory =
        selectedCategory === "All" ||
        problem.category === selectedCategory;

      const matchesSearch =
        !query ||
        problem.title.toLowerCase().includes(query) ||
        problem.location.address
          .toLowerCase()
          .includes(query) ||
        problem.category
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  /* -------------------------------------------------------
     SELECT PROBLEM
  ------------------------------------------------------- */

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
  };

  return (
    <main className="nearby-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="nearby-header">

        <div>
          <div className="nearby-eyebrow">
            <MapPin size={16} />
            Community Map
          </div>

          <h1>Nearby Issues</h1>

          <p>
            Explore active community problems around Nashik.
            Each marker represents a grouped problem reported
            by multiple citizens.
          </p>
        </div>

        <div className="nearby-summary">

          <div className="summary-item">
            <strong>{filteredProblems.length}</strong>
            <span>Master Problems</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-item">
            <strong>
              {filteredProblems.reduce(
                (total, problem) =>
                  total + problem.reportCount,
                0
              )}
            </strong>

            <span>Citizen Reports</span>
          </div>

        </div>

      </section>

      {/* ===================================================
          SEARCH + FILTER
      =================================================== */}

      <section className="nearby-toolbar">

        <div className="nearby-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search problems or locations..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />

          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => setSearchQuery("")}
              type="button"
            >
              <X size={16} />
            </button>
          )}

        </div>

        <button
          type="button"
          className="filter-toggle"
          onClick={() =>
            setShowFilters((previous) => !previous)
          }
        >
          <Filter size={17} />
          Filters
        </button>

      </section>

      {/* ===================================================
          FILTERS
      =================================================== */}

      {showFilters && (
        <section className="category-filters">

          <span className="filter-label">
            Category
          </span>

          <div className="category-buttons">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>
            ))}

          </div>

        </section>
      )}

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <section className="nearby-content">

        {/* =================================================
            MAP
        ================================================= */}

        <div className="nearby-map-container">

          <MapContainer
            center={NASHIK_CENTER}
            zoom={13}
            scrollWheelZoom
            className="nearby-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController
              selectedProblem={selectedProblem}
            />

            {filteredProblems.map((problem) => {
              const [
                longitude,
                latitude,
              ] = problem.location.coordinates;

              return (
                <Marker
                  key={problem.id}
                  position={[
                    latitude,
                    longitude,
                  ]}
                  icon={createMasterProblemIcon(
                    problem
                  )}
                  eventHandlers={{
                    click: () =>
                      handleProblemSelect(problem),
                  }}
                >

                  <Popup>

                    <div className="master-popup">

                      <div className="popup-top">

                        <span className="popup-category">
                          {problem.category}
                        </span>

                        {problem.hasMyReport && (
                          <span className="popup-you">
                            Your Report
                          </span>
                        )}

                      </div>

                      <h3>
                        {problem.title}
                      </h3>

                      <p className="popup-description">
                        {problem.description}
                      </p>

                      <div className="popup-location">
                        <MapPin size={15} />
                        {problem.location.address}
                      </div>

                      <div className="popup-stats">

                        <div>
                          <Users size={15} />

                          <span>
                            {problem.reportCount} reports
                          </span>
                        </div>

                        <span
                          className={`popup-status ${problem.status}`}
                        >
                          {formatStatus(
                            problem.status
                          )}
                        </span>

                      </div>

                      {problem.hasMyReport && (
                        <div className="popup-personal">

                          <CheckCircle2 size={15} />

                          You reported this problem

                        </div>
                      )}

                    </div>

                  </Popup>

                </Marker>
              );
            })}

          </MapContainer>

          {/* MAP LEGEND */}

          <div className="map-legend">

            <div className="legend-title">
              Map Legend
            </div>

            <div className="legend-item">
              <span className="legend-marker normal" />
              <span>Master Problem</span>
            </div>

            <div className="legend-item">
              <span className="legend-marker personal" />
              <span>You reported this problem</span>
            </div>

          </div>

        </div>

        {/* =================================================
            PROBLEM LIST
        ================================================= */}

        <aside className="nearby-list">

          <div className="list-header">

            <div>
              <h2>Master Problems</h2>

              <p>
                {filteredProblems.length} problems nearby
              </p>
            </div>

            <div className="list-count">
              {filteredProblems.length}
            </div>

          </div>

          <div className="problem-list">

            {filteredProblems.length === 0 ? (

              <div className="empty-state">

                <Search size={30} />

                <h3>No problems found</h3>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              filteredProblems.map((problem) => (

                <button
                  type="button"
                  key={problem.id}
                  className={
                    selectedProblem?.id === problem.id
                      ? "problem-card selected"
                      : "problem-card"
                  }
                  onClick={() =>
                    handleProblemSelect(problem)
                  }
                >

                  <div className="problem-card-header">

                    <span className="problem-category">
                      {problem.category}
                    </span>

                    {problem.hasMyReport && (
                      <span className="your-report-badge">
                        You reported
                      </span>
                    )}

                  </div>

                  <h3>
                    {problem.title}
                  </h3>

                  <div className="problem-location">

                    <MapPin size={15} />

                    <span>
                      {problem.location.address}
                    </span>

                  </div>

                  <div className="problem-card-footer">

                    <div className="report-count">

                      <Users size={15} />

                      <strong>
                        {problem.reportCount}
                      </strong>

                      <span>
                        citizen reports
                      </span>

                    </div>

                    <span
                      className={`problem-status ${problem.status}`}
                    >
                      {formatStatus(
                        problem.status
                      )}
                    </span>

                  </div>

                  <div className="problem-urgency">

                    <AlertTriangle size={14} />

                    {formatUrgency(
                      problem.urgency
                    )}

                  </div>

                  <ChevronRight
                    className="problem-arrow"
                    size={18}
                  />

                </button>

              ))
            )}

          </div>

        </aside>

      </section>

    </main>
  );
}