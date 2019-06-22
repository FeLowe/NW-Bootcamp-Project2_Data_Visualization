function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    
    var url = `/metadata/${sample}`;
    d3.json(url).then(function(response) {

      var metadata = response;

      // Use d3 to select the panel with id of `#sample-metadata`
      var panel = d3.select("#sample-metadata");

      // Use `.html("") to clear any existing metadata

      panel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
      Object.entries(metadata).forEach(([key, value]) => {

      var line = panel.append("div");
      line.text(`${key}: ${value}`);

       });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


    });

    
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    var url = `/samples/${sample}`;
    d3.json(url).then(function(response) {
      var data = response; 

      console.log(data);

      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
      
      var labels = data.otu_ids.slice(0,10);
      var values = data.sample_values.slice(0,10);
      var hoverText = data.otu_labels.slice(0,10);

      var pieTrace = [{
        values : values,
        labels : labels,
        type : "pie",
        hovertext : hoverText
      }];
  
      var pieLayout = {
          title: `${sample}`,
      };
      
      Plotly.newPlot("pie", pieTrace, pieLayout, {responsive: true});

      // @TODO: Build a Bubble Chart using the sample data

      var x = data.otu_ids;
      var y = data.sample_values;
      var markerSize = data.sample_values;
      var markerColors = data.otu_ids;
      var textValues = data.otu_labels;

      var bubbleTrace = [{
        x: x,
        y: y,
        text: textValues,
        mode: "markers",
        marker: {
          size: markerSize,
          color: markerColors,
        },
        text: textValues
      }];

      var bubbleLayout = {
          title: "",
      };

      Plotly.newPlot("bubble", bubbleTrace , bubbleLayout, {responsive: true});
      
    });
    
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
