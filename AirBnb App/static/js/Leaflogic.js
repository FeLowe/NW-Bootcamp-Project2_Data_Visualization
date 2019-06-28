function buildMap(param){

  console.log("Leaflogic.js is loaded");

  
  // Store API query variables
  var baseURL = "http://localhost:5000";
  var apiListings = "/api/listings";

  // Assemble API query URL
  var url = baseURL + apiListings;
  //console.log("heres our api", url);

  // Grab the data with d3
  d3.json(url).then(function(response) {

    //console.log(response[0]);

    if (param == "All Cities") {
      var filteredData = response;
      var filteredCenter = [0,0];
      var filteredZoom = 2;
    } else {
      filteredData = response.filter(function(datum) {
          //console.log(datum.selection);   
          return datum.selection == param;
      });
      
      //console.log(filteredData);
      filteredCenter = [filteredData[0].lat, filteredData[0].lon];
      filteredZoom = 8;
      
    }


    // Creating map object
    var myMap = L.map("map", {
      center: filteredCenter,
      zoom: filteredZoom
    });

    // Adding tile layer to the map
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    }).addTo(myMap);

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // Loop through data
    for (var i = 0; i < filteredData.length; i++) {

      // Set the data location property to a variable
      var location = filteredData[i];

      // Check for location property
      if (location) {

        // Add a new marker to the cluster group and bind a pop-up
        //console.log('hello about to create mark!!!', response[i]);
        markers.addLayer(L.marker([filteredData[i].lat, filteredData[i].lon])
          .bindPopup(filteredData[i].room_id));
      }

    }

    // Add our marker cluster layer to the map
    //console.log('about to add markers to the mpa!!', markers);
    myMap.addLayer(markers);

  });

}

//buildMap("Rome, Italy");