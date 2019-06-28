console.log("scatterapp.js is loaded");

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

function buildScatter(param){

    //clear svg
    var svg = d3.select("#scatter");
    svg.selectAll("*").remove();


    // append svg and group
    svg = d3.select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //console.log(`buildScatter used ${param}`);


    // load data
    d3.json("api/listings").then(function(data) {
        //if(error) throw error;

        if (param == "All Cities") {
            var filteredData = data;
        } else {
            filteredData = data.filter(function(datum) {
                //console.log(datum.selection);   
                return datum.selection == param;
            });
        }

        //console.log(filteredData);

        //parse data
        filteredData.forEach(function(d) {
            d.distance = +d.distance;
            d.price = +d.price;
            d.room_id = +d.room_id;
            // d.room_type = +d.room_type;
        });

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

    xLinearScale.domain([d3.min(filteredData, xValue)-1, d3.max(filteredData, xValue)+1]);
    yLinearScale.domain([d3.min(filteredData, yValue)-1, d3.max(filteredData, yValue)+1]);

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
        .data(filteredData)
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
                return "#FF5A5F";
            else if (d.room_type === "Private room")   
                return "#00A699";
            else 
                return "#FC642D"; 
        })
        .style("opacity", ".5")
        .on("mouseover", toolTip.show)
        .on("mouseout", toolTip.hide);

    });

}

//buildScatter("All Cities");

