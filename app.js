let map;

function initMap() {
  navigator.geolocation.getCurrentPosition(position => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    map = new google.maps.Map(document.getElementById("map"), {
      center: userLocation,
      zoom: 11
    });

    new google.maps.Marker({
      position: userLocation,
      map,
      title: "You are here"
    });
  }, () => {
    alert("Location access denied. Using default location.");
    initDefault();
  });
}

function initDefault() {
  const fallback = { lat: 37.7749, lng: -122.4194 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: fallback,
    zoom: 10
  });
}

function loadTracks() {
  const service = new google.maps.places.PlacesService(map);

  service.textSearch({
    query: "dirt bike track OR motocross",
    location: map.getCenter(),
    radius: 50000
  }, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(place => addMarker(place));
    } else {
      alert("No tracks found nearby.");
    }
  });
}

function addMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  });

  const info = new google.maps.InfoWindow({
    content: `
      <strong>${place.name}</strong><br>
      ${place.formatted_address || ""}
    `
  });

  marker.addListener("click", () => {
    info.open(map, marker);
  });
}
