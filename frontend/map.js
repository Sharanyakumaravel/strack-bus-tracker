// Create map
var map = L.map('map').setView([10.7905, 78.7047], 13);

// Map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);


// ROUTE LINE (PASTE HERE)
const route = [
[10.7905,78.7047],
[10.7920,78.7065],
[10.7940,78.7090]
];

L.polyline(route,{
color:"blue",
weight:5
}).addTo(map);


// BUS MARKERS
let busMarkers = {};

function updateBusLocation(){

fetch("http://localhost:5000/api/buses")
.then(res => res.json())
.then(data => {

data.forEach(bus => {

if(!busMarkers[bus._id]){

busMarkers[bus._id] = L.marker([bus.latitude, bus.longitude])
.addTo(map)
.bindPopup(bus.busName);

}else{

busMarkers[bus._id].setLatLng([bus.latitude, bus.longitude]);

}

});

});

}

setInterval(updateBusLocation,3000);

