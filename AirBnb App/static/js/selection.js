console.log("I am working");

function buildPlot(selection) {

  // append svg and group
  // var svg = d3.select("#scatter")
  // .append("svg")
  // .attr("height", svgHeight)
  // .attr("width", svgWidth);

  // var chartGroup = svg.append("g")
  // .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  d3.json("api/listings").then(function(error,data) {
    if(error) throw error;

        filteredData = data.filter(function(datum) {
            console.log(datum[7]);   
            return datum[7] == selection;
        });
    
  
  console.log(filteredData);

});

}


  

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/api/selection").then((selection) => {
    selection.forEach((choice) => {
      selector
        .append("option")
        .text(choice.selection)
        .property("value", choice.selection);
    });

    // Use the first sample from the list to build the initial plots
    const defaultChoice = "New-orleans, United states";
    // buildCharts(firstChoice);
    // buildMetadata(firstChoice);
    buildPlot(defaultChoice);
  });
}

function optionChanged(newChoice) {
  // Fetch new data each time a new sample is suildPlot(newChoice);
  buildPlot(newChoice);
  console.log(`The option changed to ${newChoice}` )
}

// Initialize the dashboard
init();

