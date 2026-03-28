const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const route = [
  { lat: 13.0827, lng: 80.2707 },
  { lat: 13.0845, lng: 80.2720 },
  { lat: 13.0870, lng: 80.2750 },
  { lat: 13.0900, lng: 80.2780 }
];

let index = 0;

async function moveBus(){

  let location = route[index];

  try{

    await fetch("http://localhost:5000/update-bus-location",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        busId:"Bus101",
        latitude:location.lat,
        longitude:location.lng
      })
    });

    console.log("🚍 Bus moved to:",location);

  }catch(err){

    console.log("Error sending location:",err);

  }

  index++;

  if(index >= route.length){
    index = 0;
  }

}

setInterval(moveBus,5000);