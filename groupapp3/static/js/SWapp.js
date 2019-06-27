var entirePlace = 0;
var sharedPlace = 0;
var privatePlace = 0;

// load data
d3.json("/api/listings", function(error, data) {
    if(error) throw error;

    

    //parse data
    data.forEach(function(d) {
        // d.room_type = +d.room_type;
        // d.selection = +d.selection;

        if (d.room_type == "Entire home/apt") {
            console.log("Entire");
            entirePlace += 1;
            
        }
        else if (d.room_type == "Shared room") {
            sharedPlace += 1;
            console.log("Shared");
            
        }
        else {
            privatePlace += 1;
            console.log("Private");

        }
            // -------------------------------------------------
        // }
        // var data_count = d3.nest()
        // .key(function(d) {
        //     return d.room_type;
        //   })
        //   // .key(function(d) { return d.priority; })
        //   .rollup(function(leaves) {
        //     return leaves.length;
        //   })
        //   .entries(data);
     
        // data_count.forEach(function(element) {
        //   console.log(element);
        // var total = data.reduce(function(count, entry) {
        //     return count + (entry.room_type === 'Entire home/apt' ? 1 : 0);
        //  }, 0);
    
        // });
        // console.log(total)
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
    console.log("This is entire place",entirePlace);
    console.log("this is shared place",sharedPlace);
    console.log("this is private place",privatePlace);
 });


