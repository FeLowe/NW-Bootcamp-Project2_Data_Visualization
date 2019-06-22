console.log("I am working");

function buildPlot() {
    /* data route */
  var url = "/api/listings";
  d3.json(url).then(function(response) {

    console.log(response);

    var data = response;
      

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

    Plotly.newPlot("plot", data, layout);
  });
}

buildPlot();
