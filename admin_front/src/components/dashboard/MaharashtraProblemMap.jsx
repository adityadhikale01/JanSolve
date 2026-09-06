import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
} from "react-leaflet";

import {
  ArrowRight,
  MapPinned,
} from "lucide-react";

import {
  cityProblemData,
  districtData,
} from "../../data/dashboardDummyData";

import "leaflet/dist/leaflet.css";


function getMarkerRadius(reports) {
  if (reports >= 200) return 19;
  if (reports >= 150) return 16;
  if (reports >= 100) return 14;
  if (reports >= 70) return 12;
  if (reports >= 50) return 10;

  return 8;
}


function getSeverityColor(severity) {
  switch (severity) {
    case "high":
      return "#c45d63";

    case "medium":
      return "#b48a45";

    case "low":
    default:
      return "#438b80";
  }
}


export default function MaharashtraProblemMap() {

  const topCities = districtData.slice(0, 6);


  return (
    <div className="dashboard-panel dashboard-map-panel">

      {/* ================================================
          HEADER
      ================================================= */}

      <div className="dashboard-panel-header">

        <div className="dashboard-section-title-row">

          <div className="dashboard-section-icon">
            <MapPinned size={18} />
          </div>

          <div>

            <h2>
              Problem Distribution Across Maharashtra
            </h2>

            <p>
              Citizen reports grouped by city
            </p>

          </div>

        </div>


        <span className="dashboard-map-demo-label">
          Demo data
        </span>

      </div>


      {/* ================================================
          MAP + TOP CITIES
      ================================================= */}

      <div className="dashboard-map-content">


        {/* =================================================
            INTERACTIVE MAP
        ================================================= */}

        <div className="dashboard-leaflet-wrapper">

          <MapContainer
            center={[19.2, 75.8]}
            zoom={6}
            minZoom={5}
            maxZoom={10}
            scrollWheelZoom={true}
            zoomControl={false}
            className="dashboard-leaflet-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <ZoomControl position="bottomright" />


            {cityProblemData.map((city) => {

              const radius =
                getMarkerRadius(city.reports);

              const markerColor =
                getSeverityColor(city.severity);


              return (
                <CircleMarker
                  key={city.id}

                  center={[
                    city.latitude,
                    city.longitude,
                  ]}

                  radius={radius}

                  pathOptions={{
                    color: "#ffffff",
                    weight: 2,

                    fillColor: markerColor,
                    fillOpacity: 0.82,
                  }}
                >

                  <Popup>

                    <div className="dashboard-city-popup">

                      <div className="dashboard-city-popup-header">

                        <strong>
                          {city.city}
                        </strong>

                        <span
                          className={`dashboard-popup-severity dashboard-popup-severity-${city.severity}`}
                        >
                          {city.severity}
                        </span>

                      </div>


                      <div className="dashboard-city-popup-stat">

                        <strong>
                          {city.reports}
                        </strong>

                        <span>
                          Reports
                        </span>

                      </div>


                      <div className="dashboard-city-popup-grid">

                        <div>

                          <span>
                            Master Problems
                          </span>

                          <strong>
                            {city.masterProblems}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Top Domain
                          </span>

                          <strong>
                            {city.topDomain}
                          </strong>

                        </div>

                      </div>

                    </div>

                  </Popup>

                </CircleMarker>
              );
            })}

          </MapContainer>


          {/* Map legend */}

          <div className="dashboard-map-legend">

            <span>
              Reports
            </span>

            <div className="dashboard-map-legend-item">
              <i className="dashboard-map-dot-small" />
              Low
            </div>

            <div className="dashboard-map-legend-item">
              <i className="dashboard-map-dot-medium" />
              Medium
            </div>

            <div className="dashboard-map-legend-item">
              <i className="dashboard-map-dot-large" />
              High
            </div>

          </div>

        </div>


        {/* =================================================
            TOP CITIES
        ================================================= */}

        <div className="dashboard-top-districts">

          <div className="dashboard-top-districts-title">

            <span>
              Highest report volume
            </span>

          </div>


          {topCities.map((city) => {

            const maxReports =
              topCities[0].reports;

            const width =
              (city.reports / maxReports) * 100;


            return (
              <button
                key={city.district}
                type="button"
                className="dashboard-top-district"
              >

                <div className="dashboard-top-district-info">

                  <span>
                    {city.district}
                  </span>

                  <strong>
                    {city.reports}
                  </strong>

                </div>


                <div className="dashboard-top-district-bar">

                  <div
                    className="dashboard-top-district-fill"
                    style={{
                      width: `${width}%`,
                    }}
                  />

                </div>

              </button>
            );
          })}


          <button
            type="button"
            className="dashboard-outline-button"
          >

            Explore Maharashtra
            <ArrowRight size={14} />

          </button>

        </div>

      </div>

    </div>
  );
}