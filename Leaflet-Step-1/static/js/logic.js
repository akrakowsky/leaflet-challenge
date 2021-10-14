// Create a URL for the site
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Add the earthquake data
d3.json(url).then(function(data) {
    createFeatures(data.features);
});

// Create a marker
function markerSize(circle) {
    return circle * 5;
}

// Create a loop to determine marker size
function chooseColor(depth) {
    if (depth < 10) {
        return "green"
    }
    else if (depth < 30) {
        return "limegreen"
    }
    else if (depth < 50) {
        return "yellow"
    }
    else if (depth < 70) {
        return "orange"
    }
    else if (depth < 90) {
        return "red"
    }
    else {return "darkred"}
}
// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
var myMap = L.map("map", {
    center: [38.58, -121.49],
    zoom: 5
  });

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
  
// Add earthquake data
d3.json(url).then(function(data) {
    console.log(data)
    // Create a loop
    for (var i = 0; i < data.features.length; i++){
        // Find the coordinate for each earthquake
        coords = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]]
    }
});
