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

// Create a loop to determine marker color
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

// Create the pop-up
function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("Magnitude:" + feature.properties.mag + "<br>Depth:" + feature.properties.depth + "<br>Location:" + feature.properties.place + "<br>Date:" + new Date(feature.properties.time))
    }
    var earthquakes = L.geoJSON(earthquakeData, {
        // Add marker
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        // Add color and size to each marker
        stle: function (feature) {
            return {
                fillColor: chooseColor(feature.properties.depth),
                fillOpacity: 1,
                weight: 1,
                radius: markerSize(feature.properties.mag),
                stroke: false
            }
        },
        // Add to each marker
        onEachFeature: on EachFeature
    });
    // Create map
    createMap(earthquakes);
}

// Create the map layer
function createMap(earthquakes) {
    // Create light layer
    var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        //size of image-set to default 
        tileSize: 512,
        //how many times you can zoom into
        maxZoom: 18,
        zoomOffset: -1,
        //tpye of map
        id: "mapbox/light-v10",
        //API Key
        accessToken: API_KEY
    });

    // Create a basemap for light and additional layers if needed
    var baseMaps = {
        "LightMap": lightMap
    };

    // Create an overlay map for the markers
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
        center: [38.58, -121.49],
        zoom: 5,
        layers: [lightMap, earthquakes]
      });
    
    // Create layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // Create a legend in lower right corner
    var legend = L.control({ position: "bottomright" });
    console.log(legend);
    legend.onAdd = function() {
        var div = L.
    }

}

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
