let map;
let userLocation;

// Sample dirt bike locations (you can expand this later)
const spots = [
  {
    name: "Club Moto MX",
    type: "mx",
    coords: [37.7016, -121.7650]
  },
  {
    name: "Argyll MX Park",
    type: "mx",
    coords: [38.4440, -121.8200]
  },
  {
    name: "OHV Trail Zone (Corral Hollow)",
    type: "trail",
    coords: [37.6200, -121.5600]
  }
];

function initMap(lat, lng) {
  map = L.map('map').setView([lat, lng], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([lat, lng]).addTo(map)
    .bindPopup("📍 You are here")
    .openPopup();
}

function showSpots(filter) {
  spots.forEach(spot => {
    if (filter === "all" || spot.type === filter) {
      L.marker(spot.coords)
        .addTo(map)
        .bindPopup(`🏍️ ${spot.name}`);
    }
  });
}

function findNearby() {
  const filter = document.getElementById("filter").value;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      if (!map) {
        initMap(lat, lng);
      }

      showSpots(filter);
    }, () => {
      alert("Location blocked. Showing default area.");
      initMap(37.7749, -122.4194);
      showSpots(filter);
    });
  }
}
