console.log("I am working");

city = [];
country  = [];
lat  = [];
lon = [];
price  = [];
room_id  = [];
room_type = [];
selection = [];

function buildPlot(selection) {
  
  // if the default selection is chosen (no filter)
  if (selection = "All Cities") {

    // Plotly attempt
    // var url = "/api/listings";
    // d3.json(url).then(function(response) {
  
    //   console.log(response);
  
    //   var data = response;
  
    //   for(row in data){
    //     // city.push(row[0]);
    //     // country.push(row[1]);
    //     lat.push(row[2]);
    //     lon.push(row[3]);
    //     // price.push(row[4]);
    //     // room_id.push(row[5]);
    //     // room_type.push(row[6]);
    //     // selection.push(row[7]);
    //   };
  
      
    //    data = [{
    //        type: "scattergeo",
    //        locationmode: "USA-states",
    //       //  city: city,
    //       //  country: country,
    //        lat: lat,
    //        lon: lon,
    //       //  price: price,
    //       //  room_id,
    //       //  room_type,
    //       //  selection,
    //        hoverinfo: "text",
    //        marker: {
    //            "size": 50,
    //            "line": {
    //                "color": "rgb(8,8,8)",
    //                "width": 1
    //            }
    //        }
    //     }];
        
  
    //   var layout = {
    //     scope: "usa",
    //     title: "Listings",
    //     showlegend: false,
    //     height: 600,
    //           // width: 980,
    //     geo: {
    //       scope: "usa",
    //       projection: {
    //         type: "albers usa"
    //       },
    //       showland: true,
    //       landcolor: "rgb(217, 217, 217)",
    //       subunitwidth: 1,
    //       countrywidth: 1,
    //       subunitcolor: "rgb(255,255,255)",
    //       countrycolor: "rgb(255,255,255)"
    //     }
    //   };
  
    //   Plotly.newPlot("plot", data, layout);
    // });
    
    // Leaflet attempt
    // Create a map object
    var myMap = L.map("map", {
      center: [15.5994, -28.6731],
      zoom: 3
    });

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets-basic",
      accessToken: "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ"
    }).addTo(myMap);

    // Country data
    var url = "/api/listings";
    d3.json(url).then(function(response) {
  
      // Loop through the cities array and create one marker for each listing
      for (var i = 0; i < response.length; i++) {

        // Add circles to map
        L.circle([response[i].lat, response[i].lon], {
          fillOpacity: 0.75,
          color: "white",
          fillColor: color,
          // Adjust radius
          radius: 500
        }).bindPopup("<h1>" + response[i].room_id + "</h1>").addTo(myMap);
      };
    })
  };
}
  
  

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/api/selection").then((selection) => {
    selection.forEach((choice) => {
      selector
        .append("option")
        .text(choice)
        .property("value", choice);
    });

    // Use the first sample from the list to build the initial plots
    const defaultChoice = "All Cities";
    // buildCharts(firstChoice);
    // buildMetadata(firstChoice);
    buildPlot(defaultChoice);
  });
}

function optionChanged(newChoice) {
  // Fetch new data each time a new sample is selected
  //buildPlot(newChoice);
  //buildMetadata(newChoice);
}

// Initialize the dashboard
init();


