// Create a URL for the site
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Add the earthquake data
d3.json(url).then(function(data) {
    console.log(data)
    createFeatures(data.features);
});

// Create a marker
function markerSize(circle) {
    return circle * 5;
}

// Create a clause to determine marker color
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
        layer.bindPopup("Magnitude:" + feature.properties.mag + "<br>Depth:" + feature.geometry.coordinates[2] + "<br>Location:" + feature.properties.place + "<br>Date:" + new Date(feature.properties.time))
    }
    var earthquakes = L.geoJSON(earthquakeData, {
        // Add marker
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        // Add color and size to each marker
        style: function (feature) {
            return {
                color: 'black',
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 1,
                weight: 1,
                radius: markerSize(feature.properties.mag),
                stroke: false
            }
        },
        // Add to each marker
        onEachFeature: onEachFeature
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
        var div = L.DomUtil.create("div", "info legend");
        var grades = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'];
        var colors = [
                'green',
                'limegreen',
                'yellow',
                'orange',
                'red',
                'darkred'
                ];
            var labels = [];
            // Create a loop for the depths
            grades.forEach(function(grade, index){
                labels.push("<div class = 'row'><li style=\"background-color: " + colors[index] +  "; width: 20px"+ "; height: 15px" + "\"></li>" + "<li>" + grade + "</li></div>");
            })
          
            div.innerHTML += "<ul>" + labels.join("") +"</ul>";
            return div;
    };
    legend.addTo(myMap);
};
