import { useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  Users,
  X,
} from "lucide-react";

import "leaflet/dist/leaflet.css";
import "./NearbyIssuesPage.css";

/* =========================================================
   DUMMY MASTER PROBLEMS
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

const NASHIK_CENTER = [20.0059, 73.7797];

/* =========================================================
   MARKER
========================================================= */

function createMasterProblemIcon(problem) {
  return L.divIcon({
    className: "n-issues-marker-wrapper",

    html: `
      <div class="n-issues-marker ${
        problem.hasMyReport ? "n-issues-marker--mine" : ""
      }">
        <span class="n-issues-marker-count">
          ${problem.reportCount}
        </span>
      </div>
    `,

    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -25],
  });
}

/* =========================================================
   MAP CONTROLLER
========================================================= */

function NIssuesMapController({ selectedProblem }) {
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
  const statusMap = {
    submitted: "Submitted",
    under_review: "Under Review",
    in_progress: "In Progress",
    resolved: "Resolved",
  };

  return statusMap[status] || "Unknown";
}

function formatUrgency(urgency) {
  const urgencyMap = {
    urgent: "Urgent",
    attention: "Needs Attention",
    normal: "Normal",
  };

  return urgencyMap[urgency] || "Normal";
}

/* =========================================================
   PAGE
========================================================= */

export default function NearbyIssuesPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProblem, setSelectedProblem] =
    useState(null);

  const [showFilters, setShowFilters] = useState(false);

  /* -------------------------------------------------------
     CATEGORIES
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
     FILTER
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

  const totalReports = filteredProblems.reduce(
    (total, problem) => total + problem.reportCount,
    0
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="n-issues-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="n-issues-header">

        <div className="n-issues-header-content">

          <div className="n-issues-eyebrow">
            <MapPin size={15} />
            Community Map
          </div>

          <h1 className="n-issues-title">
            Nearby Issues
          </h1>

          <p className="n-issues-subtitle">
            Explore active community problems around Nashik.
            Each marker represents a grouped problem reported
            by multiple citizens.
          </p>

        </div>

        <div className="n-issues-summary">

          <div className="n-issues-summary-item">
            <strong>{filteredProblems.length}</strong>
            <span>Master Problems</span>
          </div>

          <div className="n-issues-summary-divider" />

          <div className="n-issues-summary-item">
            <strong>{totalReports}</strong>
            <span>Citizen Reports</span>
          </div>

        </div>

      </header>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="n-issues-toolbar">

        <div className="n-issues-search">

          <Search size={18} />

          <input
            type="text"
            value={searchQuery}
            placeholder="Search problems or locations..."
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />

          {searchQuery && (
            <button
              type="button"
              className="n-issues-search-clear"
              onClick={() => setSearchQuery("")}
            >
              <X size={16} />
            </button>
          )}

        </div>

        <button
          type="button"
          className={`n-issues-filter-button ${
            showFilters
              ? "n-issues-filter-button--active"
              : ""
          }`}
          onClick={() =>
            setShowFilters((value) => !value)
          }
        >
          <Filter size={17} />
          Filters
        </button>

      </div>

      {/* =================================================
          CATEGORY FILTERS
      ================================================= */}

      {showFilters && (
        <div className="n-issues-category-bar">

          <span className="n-issues-category-label">
            Category
          </span>

          <div className="n-issues-category-list">

            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`n-issues-category-button ${
                  selectedCategory === category
                    ? "n-issues-category-button--active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>
            ))}

          </div>

        </div>
      )}

      {/* =================================================
          MAP + LIST
      ================================================= */}

      <section className="n-issues-workspace">

        {/* =================================================
            MAP
        ================================================= */}

        <div className="n-issues-map-section">

          <MapContainer
            center={NASHIK_CENTER}
            zoom={13}
            scrollWheelZoom
            className="n-issues-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <NIssuesMapController
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
                  position={[latitude, longitude]}
                  icon={createMasterProblemIcon(
                    problem
                  )}
                  eventHandlers={{
                    click: () =>
                      setSelectedProblem(problem),
                  }}
                >
                  <Popup>

                    <div className="n-issues-popup">

                      <div className="n-issues-popup-top">

                        <span className="n-issues-popup-category">
                          {problem.category}
                        </span>

                        {problem.hasMyReport && (
                          <span className="n-issues-popup-mine">
                            You reported
                          </span>
                        )}

                      </div>

                      <h3 className="n-issues-popup-title">
                        {problem.title}
                      </h3>

                      <p className="n-issues-popup-description">
                        {problem.description}
                      </p>

                      <div className="n-issues-popup-location">
                        <MapPin size={14} />
                        <span>
                          {problem.location.address}
                        </span>
                      </div>

                      <div className="n-issues-popup-footer">

                        <div className="n-issues-popup-reports">
                          <Users size={14} />
                          {problem.reportCount} reports
                        </div>

                        <span
                          className={`n-issues-status n-issues-status--${problem.status}`}
                        >
                          {formatStatus(
                            problem.status
                          )}
                        </span>

                      </div>

                      {problem.hasMyReport && (
                        <div className="n-issues-popup-personal">
                          <CheckCircle2 size={14} />
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

          <div className="n-issues-map-legend">

            <div className="n-issues-map-legend-title">
              Map Legend
            </div>

            <div className="n-issues-map-legend-item">
              <span className="n-issues-legend-dot n-issues-legend-dot--normal" />
              Master Problem
            </div>

            <div className="n-issues-map-legend-item">
              <span className="n-issues-legend-dot n-issues-legend-dot--mine" />
              You reported this problem
            </div>

          </div>

        </div>

        {/* =================================================
            MASTER PROBLEM LIST
        ================================================= */}

        <aside className="n-issues-sidebar">

          <div className="n-issues-sidebar-header">

            <div>
              <h2>Master Problems</h2>

              <p>
                {filteredProblems.length} problems nearby
              </p>
            </div>

            <span className="n-issues-sidebar-count">
              {filteredProblems.length}
            </span>

          </div>

          <div className="n-issues-problem-list">

            {filteredProblems.length === 0 ? (

              <div className="n-issues-empty">

                <Search size={28} />

                <h3>No problems found</h3>

                <p>
                  Try changing your search or category
                  filter.
                </p>

              </div>

            ) : (

              filteredProblems.map((problem) => (

                <button
                  type="button"
                  key={problem.id}
                  className={`n-issues-problem-card ${
                    selectedProblem?.id === problem.id
                      ? "n-issues-problem-card--selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedProblem(problem)
                  }
                >

                  <div className="n-issues-problem-top">

                    <span className="n-issues-problem-category">
                      {problem.category}
                    </span>

                    {problem.hasMyReport && (
                      <span className="n-issues-you-badge">
                        You reported
                      </span>
                    )}

                  </div>

                  <h3 className="n-issues-problem-title">
                    {problem.title}
                  </h3>

                  <div className="n-issues-problem-location">
                    <MapPin size={14} />
                    <span>
                      {problem.location.address}
                    </span>
                  </div>

                  <div className="n-issues-problem-bottom">

                    <div className="n-issues-report-count">
                      <Users size={14} />

                      <strong>
                        {problem.reportCount}
                      </strong>

                      <span>
                        citizen reports
                      </span>
                    </div>

                    <span
                      className={`n-issues-status n-issues-status--${problem.status}`}
                    >
                      {formatStatus(
                        problem.status
                      )}
                    </span>

                  </div>

                  <div className="n-issues-urgency">

                    <AlertTriangle size={13} />

                    {formatUrgency(
                      problem.urgency
                    )}

                  </div>

                  <ChevronRight
                    size={17}
                    className="n-issues-card-arrow"
                  />

                </button>

              ))
            )}

          </div>

        </aside>

      </section>

    </div>
  );
}