console.log("I am working");

city = [];
country  = [];
lat  = [];
lon = [];
price  = [];
room_id  = [];
room_type = [];
selection = [];

function buildPlot() {
    /* data route */
  var url = "/api/listings";
  d3.json(url).then(function(response) {

    console.log(response);

    var data = response;

    for(row in data){
      city.push(row[0]);
      country.push(row[1]);
      lat.push(row[2]);
      lon.push(row[3]);
      price.push(row[4]);
      room_id.push(row[5]);
      room_type.push(row[6]);
      selection.push(row[7]);
    };

     


     data = {
         type: "scattergeo",
         locationmode: "USA-states",
         city: city,
         country: country,
         lat: lat,
         lon: lon,
         price: price,
         room_id,
         room_type,
         selection,
         hoverinfo: "text",
         marker: {
             "size": 50,
             "line": {
                 "color": "rgb(8,8,8)",
                 "width": 1
             }
         }
      };
      

    var layout = {
      scope: "usa",
      title: "Listings",
      showlegend: false,
      height: 600,
            // width: 980,
      geo: {
        scope: "usa",
        projection: {
          type: "albers usa"
        },
        showland: true,
        landcolor: "rgb(217, 217, 217)",
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: "rgb(255,255,255)",
        countrycolor: "rgb(255,255,255)"
      }
    };

    Plotly.newPlot("map", data, layout);
  });
}

buildPlot();
