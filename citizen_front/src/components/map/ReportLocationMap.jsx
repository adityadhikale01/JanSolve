import { MapContainer, Marker, TileLayer } from "react-leaflet";

import L from "leaflet";

import "./ReportLocationMap.css";

// Fix Leaflet marker icons when using Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ReportLocationMap({ coordinates }) {
  if (
    !Array.isArray(coordinates) ||
    coordinates.length !== 2
  ) {
    return (
      <div className="report-location-map-error">
        Location coordinates are not available.
      </div>
    );
  }

  // Backend stores GeoJSON as:
  // [longitude, latitude]
  //
  // React Leaflet expects:
  // [latitude, longitude]

  const [longitude, latitude] = coordinates;

  const position = [latitude, longitude];

  return (
    <div className="report-location-map-wrapper">
      <MapContainer
        center={position}
        zoom={17}
        scrollWheelZoom={true}
        className="report-location-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} />
      </MapContainer>
    </div>
  );
}

export default ReportLocationMap;