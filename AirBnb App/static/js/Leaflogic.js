// Creating map object
var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "http://localhost:5000";
var apiListings = "/api/listings";

// Assemble API query URL
var url = baseURL + apiListings;
//console.log("heres our api", url);

// Grab the data with d3
d3.json(url, function(error, response) {
  //console.log("error: ", error);
  //console.log("response: ", response);

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i];

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      //console.log('hello about to create mark!!!', response[i]);
      markers.addLayer(L.marker([response[i].lat, response[i].lon])
        .bindPopup(response[i].room_id));
    }

  }

  // Add our marker cluster layer to the map
  //console.log('about to add markers to the mpa!!', markers);
  myMap.addLayer(markers);

});
