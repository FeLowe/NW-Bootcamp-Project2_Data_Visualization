var entirePlace = 0;
var sharedPlace = 0;
var privatePlace = 0;

function buildSpider(selection){
// load data
 d3.json("/api/listings" ,function(data) {
    //if(error) throw error;

    //filter by selection
    if (selection != "All Cities"){

        var filteredData = data.filter(function(datum) {
            console.log(datum[7]);   
            return datum[7] == selection;
        });

        console.log(filteredData);
    } else {
        filteredData = data;
    }
    

    //parse data
    filteredData.forEach(function(d) {
        // d.room_type = +d.room_type;
        // d.selection = +d.selection;

        if (d.room_type == "Entire home/apt") {
            // console.log("Entire");
            entirePlace += 1;
            
        }
        else if (d.room_type == "Shared room") {
            sharedPlace += 1;
            // console.log("Shared");
            
        }
        else {
            privatePlace += 1;
            // console.log("Private");

        }

    });
  
    Highcharts.chart('container', {

        chart: {
            polar: true,
            type: 'line'
        },
    
        accessibility: {
            description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
        },
    
        title: {
            text: 'Amount of each Room Types',
            x: -80
        },
    
        pane: {
            size: '80%'
        },
    
        xAxis: {
            categories: ['Entire home/apt', 'Shared room', 'Private room'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
    
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
    
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
    
        legend: {
            align: 'right',
            verticalAlign: 'middle'
        },
    
        series: [{
            name: 'Number of Rooms by Type',
            data: [entirePlace, sharedPlace, privatePlace],
            pointPlacement: 'on'
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom'
                    },
                    pane: {
                        size: '70%'
                    }
                }
            }]
        }
    
    });
    //console.log("This is entire place",entirePlace);
    //console.log("this is shared place",sharedPlace);
    //console.log("this is private place",privatePlace);
 });

}

// function init() {
//     // Grab a reference to the dropdown select element
//     var selector = d3.select("#selDataset");
  
//     // Use the list of sample names to populate the select options
//     d3.json("/api/selection", (selection) => {
//       selection.forEach((choice) => {
//         console.log(choice.selection);
//         selector
//           .append("option")
//           .text(choice.selection)
//           .property("value", choice.selection);
//       });
  
//       // Use the first sample from the list to build the initial plots
//       const defaultChoice = "All Cities";
//       // buildCharts(firstChoice);
//       // buildMetadata(firstChoice);
//       buildSpider(defaultChoice);
//     });
//   }
  
//   function optionChanged(newChoice) {
//     // Fetch new data each time a new sample is selected
//     buildSpider(newChoice);
//   }
  
//   // Initialize the dashboard
buildSpider("All Cities");
