import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

export default function ListingMap({ listing }) {
  if (!listing?.geometry?.coordinates) {
    return <p>Location not available.</p>;
  }

  const [lng, lat] = listing.geometry.coordinates;
  if(!lat || !lng) {
    return <p>Location not available.</p>;
  }
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={true}
      className="map-container"
    >
       <TileLayer
    attribution='&copy; OpenStreetMap contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

      <Marker position={[lat, lng]}>
        <Popup>
          <strong>{listing.title}</strong>
          <br />
          {listing.location}
        </Popup>
      </Marker>
    </MapContainer>
  );
}