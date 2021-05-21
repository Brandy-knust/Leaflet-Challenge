// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(`feature:${data}`)
  console.log(`feature:${data.features[0].properties.mag}`)
  createFeatures(data.features);
});
var earthquakes = []
function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  // var markers = []
  earthquakeData.forEach(earthquake => {
    var color = "";
    
    console.log(`coordinates ${earthquake}`)
    if (earthquake.geometry.coordinates[2] > 90) {
      color = "red";
    }
    else if (earthquake.geometry.coordinates[2] > 70) {
      color = "orange";
    }
    else if (earthquake.geometry.coordinates[2] > 50) {
      color = "yellow";
    }
    else if (earthquake.geometry.coordinates[2] > 30) {
      color = "lime";
    }
    else {
      color = "green";
    }

    console.log(`color: ${color}`)

    L.circle(earthquake.geometry.coordinates, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: (earthquake.properties.mag) * 1200
    }).bindPopup("<h3>" + earthquake.properties.place +
      "</h3><hr><p>" + (earthquake.properties.mag) + "</p>");

    

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);

    function createMap(earthquakes) {

      var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      });

      var overlayMaps = {
        Earthquakes: earthquakes
      };

      var myMap = L.map("mapid", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
      });

      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
    }
  })}