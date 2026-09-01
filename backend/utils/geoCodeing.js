export async function geocode(location) {
  if (!location?.trim()) return null;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(location)}`,
    {
      headers: {
        "User-Agent": "Stayconnect/1.0 (andand1510nd@gmail.com)",
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    console.log("Geocode failed:", response.status, response.statusText);
    throw new Error("Failed to fetch coordinates");
  }

  const data = await response.json();
  console.log(data);
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return {
    latitude: Number(data[0].lat),
    longitude: Number(data[0].lon),
  };
}