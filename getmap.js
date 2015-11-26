if ("geolocation" in navigator) {
  var button = $('#where-am-i');
  button.on('click', getLocation);
} else {
  alert("Geolocation is not available")
}

function getLocation() {
  console.log('Getting location...');
  navigator.geolocation.getCurrentPosition(onLocation, onError, options);
}

var options = {
  enableHighAccuracy: true
};

function onLocation (position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  displayMap(lat, lon)
}

function onError(error) {
  console.log("Getting location failed: " + error);
}

function displayMap(lat, lon) {
  var url = 'https://maps.googleapis.com/maps/api/staticmap?'
              + 'markers=color:red|='
              + lat + "," + lon
              + '&zoom=18&size=800x600';

  document.getElementById('map').src = url;
}
