function buildSummary(city) {

    // Use `d3.json` to fetch the metadata for a sample
    d3.json("/api/selection").then(function(summary_response){
      
      if (CustomElementRegistry == "All Cities") {
        var filteredData = [];
        
      } else {
        filteredData = summary_response.filter(function(datum) {
            //console.log(datum.selection);   
            return datum.selection === city;
        });
        
      }

      // console.log(metadata_response)
      // Use d3 to select the panel with id of `#sample-metadata`
      var summary_selector = d3.select("#sample-metadata");
      // Use `.html("") to clear any existing metadata
      summary_selector.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(filteredData[0]).forEach(([key, value]) => {
        summary_selector
        .append("h5")
        .text(`${key}: ${value}`)
        .property("key", key)
        .property("value", value);
        
        console.log("key:", key, "value:", value);
      })
    })
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
  }
  
