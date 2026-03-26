<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>STrack Bus Tracker</title>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<style>

body{
margin:0;
font-family:Arial;
text-align:center;
}

#map{
height:500px;
width:100%;
}

</style>

</head>

<body>

<h2>🚍 STrack Live Bus Tracker</h2>

<div id="map"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>

// Create Map
var map = L.map('map').setView([10.7905,78.7047],13);

// Map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
attribution:'© OpenStreetMap'
}).addTo(map);


// ===========================
// Bus Route Coordinates
// ===========================

var route = [
[10.7905,78.7047],
[10.7920,78.7070],
[10.7950,78.7100],
[10.7980,78.7130]
];

// Draw route line
var routeLine = L.polyline(route,{
color:'blue',
weight:5
}).addTo(map);


// ===========================
// Bus Stops
// ===========================

var stops = [
[10.7905,78.7047],
[10.7950,78.7100],
[10.7980,78.7130]
];

stops.forEach(stop=>{
L.marker(stop)
.addTo(map)
.bindPopup("Bus Stop");
});


// ===========================
// Bus Marker
// ===========================

var busMarker;


// ===========================
// Load Bus Location
// ===========================

async function loadBus(){

try{

const response = await fetch("http://localhost:5000/bus-locations");

const buses = await response.json();

if(buses.length>0){

const bus = buses[0];

const lat = bus.latitude;
const lng = bus.longitude;

if(busMarker){
map.removeLayer(busMarker);
}

busMarker = L.marker([lat,lng])
.addTo(map)
.bindPopup("🚍 Bus ID: "+bus.busId)
.openPopup();

map.setView([lat,lng],14);

}

}catch(error){
console.log(error);
}

}


// First load
loadBus();

// Refresh every 5 seconds
setInterval(loadBus,5000);

</script>

</body>
</html>