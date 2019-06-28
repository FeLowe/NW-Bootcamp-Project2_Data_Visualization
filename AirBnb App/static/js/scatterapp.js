// @TODO: YOUR CODE HERE!

// set margins
var svgWidth = 500;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

function buildScatter(selection){



// append svg and group
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// load data
d3.json("api/listings", function(error, data) {
    if(error) throw error;

    if (selection == "All Cities") {
         var filteredData = data;
    } else {
        filteredData = data.filter(function(datum) {
            console.log(datum[7]);   
            return datum[7] == selection;
        });
    }

    //parse data
    filteredData.forEach(function(d) {
        d.distance = +d.distance;
        d.price = +d.price;
        d.room_id = +d.room_id;
        // d.room_type = +d.room_type;
    });

// d3.csv("static/data.csv", function(error, data) {
//         if(error) throw error;
    
//         //parse data
//         data.forEach(function(d) {
//             d.distance = +d.distance;
//             d.price = +d.price;
//         });

// setup x
var xValue = function(d) { return d.distance;},
    xLinearScale = d3.scaleLinear().range([0, width]),
    xMap = function(d) { return xLinearScale(xValue(d));},
    xAxis = d3.axisBottom(xLinearScale);

// setup y
var yValue = function(d) { return d.price;},
    yLinearScale = d3.scaleLinear().range([height, 0]),
    yMap = function(d) {return yLinearScale(yValue(d));},
    yAxis = d3.axisLeft(yLinearScale);

// setup toolTip
var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .html(function(d) { return d["room_type"] + "<br> distance: " + xValue(d) + "<br> price: " + yValue(d)});

xLinearScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
yLinearScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

chartGroup.call(toolTip);

// append x
chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)

// append y
 chartGroup.append("g")
    .classed("y-axis", true)
    .attr("transform", "translate(0)")
    .call(yAxis)

// x and y axis title
chartGroup.append("text")
    .attr("y", (margin.bottom + height))
    .attr("x", (width / 2))
    .text("Distance from City Center");

chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0-(height/2))
    .attr("y", 0-margin.left+40)
    .text("Price");

// create dots
chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "bubble")
    .attr("cx", xMap)
    .attr("cy", yMap)
    .attr("r", 10)
    .style("fill", function(d,i){
        //console.log(d);
        //console.log(i);
        if (d.room_type === "Entire home/apt")
            return "blue";
        else if (d.room_type === "Private room")   
            return "orange";
        else 
            return "green"; 
    })
    .style("opacity", ".5")
    .on("mouseover", toolTip.show)
    .on("mouseout", toolTip.hide);

});

}

function init() {
      // Use "all cities" to build the initial plots
      const defaultChoice = "All Cities";
      console.log("The scatter is not filtered")
      buildScatter(defaultChoice);
    
    };
  
//   function optionChanged(newChoice) {
//     // Fetch new data each time a new sample is selected
//     console.log(`the scatter is filtered by ${newChoice}`)
//     buildScatter(newChoice);
//   }
  
  // Initialize the dashboard
  init();

