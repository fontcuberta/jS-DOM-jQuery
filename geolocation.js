function onLocation (position){
    console.log('Latitude: ' + position.coords.latitude);
    console.log('Longitude: ' + position.coords.longitude);
    document.getElementById('position').innerHTML = 'Lat: '
        + position.coords.latitude + ' Lon: '
        + position.coords.longitude
}

function onError(error){
    console.log(error);
}

function onWatch(position){
  console.log('Latitude: ' + position.coords.latitude);
  console.log('Longitude: ' + position.coords.longitude);
  document.getElementById('position').innerHTML = 'Lat: '
      + '<p id="lat">' + position.coords.latitude + '</p> Lon: '
      + '<p id="lon">' + position.coords.longitude + '</p>'
}

var options = {
  enableHighAccuracy: true
}

var map;

$('p').on('click', function(){
  initMap()
})

navigator.geolocation.getCurrentPosition(onWatch, onError, options);

// function initMap() {
//   var lat = document.getElementById('lat');
//   var lon = document.getElementById('lon');
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: parseInt($(lat).val()), lng: parseInt($(lon).val())},
//     zoom: 8
//   });
// }
