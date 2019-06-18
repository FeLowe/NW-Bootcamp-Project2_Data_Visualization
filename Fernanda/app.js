
// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete

// d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", bikeData);

// console.log("bikeData", bikeData)

// bikeData.forEach(function(data){
//     data.region_id = +data.region_id
//     data.capacity = +data.capacity;

//     console.log(data.region_id)
//     console.log(data.capacity)

// Amelia
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", data => bikeData);

console.log(bikeData);


// //Stock overflow -> https://stackoverflow.com/questions/22325819/d3-js-get-json-from-url
// d3.request("https://public.opendatasoft.com/api/records/1.0/search/?dataset=air-bnb-listings")
// .header("Content-Type", "application/json")
// .post(function(data) {
//    console.log(data);
// })


// url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=air-bnb-listings"
// get_url = "https://public.opendatasoft.com/api/records/1.0/search//?dataset=air-bnb-listings"

// // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// d3.json(url, rbnbData);
// d3.json(get_url, getData);

// console.log("rbnbData", rbnbData)
// console.log("getData", getData)


// // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete


// d3.json(url, function(rbnbData2) {

//     console.log(rbnbData2)
// });

// d3.json(get_url, function(getData2) {

//     console.log(getData2)
// });




//  // ----------------------------------------

// var xhr = new XMLHttpRequest();
// xhr.open('GET', "https://public.opendatasoft.com/api/records/1.0/search//?dataset=air-bnb-listings", true);
// xhr.send();
 
// xhr.onreadystatechange = processRequest;
 
// function processRequest(e) {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//         var response = JSON.parse(xhr.responseText);
//         alert(response.ip);
//         console.log(response)
//     }
// }