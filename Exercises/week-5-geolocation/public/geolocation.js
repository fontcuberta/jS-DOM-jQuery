var map;

if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}

function onLocation(position){
  // We can't just directly feed the position into our google map
  // The objects are formatted differently, google maps is looking for
  // an object with "lat" and "lng" keys.
  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  createMap(myPosition);
  setupAutocomplete();
}

function onError(err){
  console.log("What are you using, IE 7??", err);
}

function createMap(position){
  map = new google.maps.Map($('#map')[0], {
    center: position,
    zoom: 17
  });
  createMarker(position);
}

function createMarker(position) {
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
    savePosition(position, "positions")
}

function setupAutocomplete(){
  var input = $('#get-places')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    var coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    };
    createMarker(coords);
    console.log(place);
    if (place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    } else {
      alert("The place has no location...?")
    }
  });
}

function savePosition(position, key){
    //--we didnt save anything before
    if (window.localStorage.getItem(key) == null) {
        saveToLocalStorage([position], key);
    } else { //--get the object, clear key in LS, add pos to array, save it
        var obj_positions = getLocalStorage(key);
        clearLocalStorage(key);
        obj_positions.push(position)
        saveToLocalStorage(obj_positions, key);
    }
}

function saveToLocalStorage(obj, key){
    var json_positions = JSON.stringify(obj);
    window.localStorage.setItem(key, json_positions);
}

function getLocalStorage(key) {
  var str_positions = window.localStorage.getItem(key);
  return obj_positions = JSON.parse(str_positions);
}

function clearLocalStorage(key) {
    window.localStorage.removeItem(key);
}
