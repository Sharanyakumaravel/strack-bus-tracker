const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const route = [
  { lat: 13.0827, lng: 80.2707 },
  { lat: 13.0835, lng: 80.2715 },
  { lat: 13.0860, lng: 80.2740 },
  { lat: 13.0885, lng: 80.2765 }
];

let index = 0;

async function moveBus(){

  let location = route[index];

  await fetch("http://localhost:5000/update-location",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      busId:"Bus102",
      latitude:location.lat,
      longitude:location.lng
    })
  });

  console.log("🚍 Bus102 moved to:",location);

  index++;

  if(index>=route.length){
    index=0;
  }

}

setInterval(moveBus,5000);