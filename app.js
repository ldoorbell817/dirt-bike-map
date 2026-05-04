let map;

// 🧠 "Trail Database"
const trails = [
  {
    name: "Club Moto MX",
    type: "mx",
    difficulty: "advanced",
    coords: [37.7016, -121.7650]
  },
  {
    name: "Argyll MX Park",
    type: "mx",
    difficulty: "intermediate",
    coords: [38.4440, -121.8200]
  },
  {
    name: "Corral Hollow OHV Area",
    type: "trail",
    difficulty: "intermediate",
    coords: [37.6200, -121.5600]
  },
  {
    name: "Del Puerto Canyon Trails",
    type: "trail",
    difficulty: "advanced",
    coords: [37.4550, -121.1100]
  },
  {
    name: "Local Beginner Practice Area",
    type: "trail",
    difficulty: "beginner",
    coords: [37.6500, -121.7000]
  }
];

// 🎨 marker colors by difficulty
function getColor(difficulty) {
  if (difficulty === "beginner") return "green";
  if (difficulty === "intermediate") return "orange";
  return "red"; // advanced
}

function initMap(lat, lng) {
  map = L.map('map').setView([lat, lng], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup("📍 You are here");
}

// 🏍️ load trails with filters
function showTrails() {
  const difficultyFilter = document.getElementById("difficulty").value;

  trails.forEach(trail => {
    if (difficultyFilter !== "all" && trail.difficulty !== difficultyFilter) {
      return;
    }

    const color = getColor(trail.difficulty);

    const icon = L.circleMarker(trail.coords, {
      radius: 8,
      color: color,
      fillColor: color,
      fillOpacity: 0.9
    }).addTo(map);

    icon.bindPopup(`
      <b>🏍️ ${trail.name}</b><br>
      Type: ${trail.type}<br>
      Difficulty: <b>${trail.difficulty}</b>
    `);
  });
}

// 📍 user location
function findNearby() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      if (!map) {
        initMap(lat, lng);
      }

      showTrails();
    }, () => {
      initMap(37.7749, -122.4194);
      showTrails();
    });
  }
}
