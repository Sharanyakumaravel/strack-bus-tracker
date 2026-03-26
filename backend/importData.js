<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>STrack Bus Tracker</title>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>

<style>
body{
    margin:0;
    font-family: Arial, sans-serif;
    background:black;
    color:white;
    text-align:center;
}

h1{
    padding:10px;
}

#map{
    height:500px;
    width:90%;
    margin:auto;
}

#arrival{
    margin-top:10px;
    font-size:18px;
}
</style>
</head>

<body>

<h1>STrack Live Bus Tracking</h1>

<div id="map"></div>

<p id="arrival">Bus arrival time will appear here</p>

<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<script>

// Create map
var map = L.map('map').setView([10.7905, 78.7047], 13);

// Map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'Map data © OpenStreetMap contributors'
}).addTo(map);

let marker;

// Function to load bus data
async function loadBusLocation(){

    try{

        const response = await fetch("https://strack-bus-tracker.onrender.com/bus-locations");

        const data = await response.json();

        if(data.length > 0){

            const bus = data[0];

            const lat = bus.latitude;
            const lon = bus.longitude;

            if(marker){
                map.removeLayer(marker);
            }

            marker = L.marker([lat,lon]).addTo(map)
            .bindPopup("Bus ID: "+bus.busId)
            .openPopup();

            map.setView([lat,lon],13);

            document.getElementById("arrival").innerText =
            "Bus Last Updated: "+ new Date(bus.timestamp).toLocaleTimeString();

        }

    }
    catch(error){
        console.log("Error fetching bus location",error);
    }

}

// Load first time
loadBusLocation();

// Auto refresh every 5 seconds
setInterval(loadBusLocation,5000);

</script>

</body>
</html>