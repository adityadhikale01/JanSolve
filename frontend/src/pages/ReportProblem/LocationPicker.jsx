import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";

import {
  Crosshair,
  MapPin,
  RefreshCw,
} from "lucide-react";

import "./LocationPicker.css";

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

const DEFAULT_POSITION = [20.0059, 73.7797];

function MapController({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 17, {
        duration: 0.8,
      });
    }
  }, [map, position]);

  return null;
}

function MapClickHandler({ onLocationChange }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      onLocationChange({
        latitude: lat,
        longitude: lng,
      });
    },
  });

  return null;
}

function LocationPicker({
  value,
  onChange,
}) {
  const [position, setPosition] = useState(
    value
      ? [
          value.coordinates[1],
          value.coordinates[0],
        ]
      : null
  );

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ----------------------------------
  // Get user's current location
  // ----------------------------------

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "Location services are not supported by this browser."
      );

      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const latitude =
          location.coords.latitude;

        const longitude =
          location.coords.longitude;

        const newPosition = [
          latitude,
          longitude,
        ];

        setPosition(newPosition);

        onChange({
          coordinates: [
            longitude,
            latitude,
          ],

          address: "Current location",
        });

        setLoading(false);
      },

      () => {
        setError(
          "Unable to get your location. Please allow location access or select the location manually."
        );

        setLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  // ----------------------------------
  // Handle map selection
  // ----------------------------------

  const handleLocationChange = ({
    latitude,
    longitude,
  }) => {
    const newPosition = [
      latitude,
      longitude,
    ];

    setPosition(newPosition);

    onChange({
      coordinates: [
        longitude,
        latitude,
      ],

      address: "Selected location",
    });
  };

  return (
    <div className="location-picker">

      {/* Location status */}

      <div className="location-picker-header">
        <div className="location-status">
          <div className="location-status-icon">
            <MapPin size={18} />
          </div>

          <div>
            <strong>
              {position
                ? "Problem location selected"
                : "Where is the problem?"}
            </strong>

            <span>
              {position
                ? "You can move the pin or tap another location."
                : "Use your current location or select the location on the map."}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="location-current-button"
          onClick={getCurrentLocation}
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCw
                size={16}
                className="spin"
              />

              Locating...
            </>
          ) : (
            <>
              <Crosshair size={16} />

              Use my location
            </>
          )}
        </button>
      </div>

      {/* Map */}

      <div className="location-map-wrapper">
        <MapContainer
          center={
            position ||
            DEFAULT_POSITION
          }
          zoom={position ? 17 : 13}
          scrollWheelZoom
          className="location-map"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {position && (
            <Marker
              position={position}
              draggable
              eventHandlers={{
                dragend: (event) => {
                  const marker =
                    event.target;

                  const coordinates =
                    marker.getLatLng();

                  handleLocationChange({
                    latitude:
                      coordinates.lat,

                    longitude:
                      coordinates.lng,
                  });
                },
              }}
            />
          )}

          <MapClickHandler
            onLocationChange={
              handleLocationChange
            }
          />

          <MapController
            position={position}
          />
        </MapContainer>

        {!position && (
          <div className="map-instruction">
            <MapPin size={16} />
            Tap on the map to mark the problem
          </div>
        )}
      </div>

      {/* Coordinates */}

      {position && (
        <div className="selected-location">
          <MapPin size={16} />

          <div>
            <strong>
              Location selected
            </strong>

            <span>
              {position[0].toFixed(6)},{" "}
              {position[1].toFixed(6)}
            </span>
          </div>
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="location-error">
          {error}
        </div>
      )}

    </div>
  );
}

export default LocationPicker;