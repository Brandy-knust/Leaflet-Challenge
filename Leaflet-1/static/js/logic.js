// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(`feature:${data}`)
  console.log(`feature:${data.features[0].properties.mag}`)
  createFeatures(data.features);
});
function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  // var markers = []
  function markerColor(depth) {
    // earthquakeData.forEach(earthquake => {
    var color = "";

    // console.log(`coordinates ${earthquake}`)
    // if (earthquake.geometry.coordinates[2] > 90) {
    //   color = "red";
    // }
    if (depth > 90) {
      color = "#d92b2b"
    }
    else if (depth > 70) {
      color = "#f0873c";
    }
    else if (depth > 50) {
      color = "#ed7f3b";
    }
    else if (depth > 30) {
      color = "#edb63e";
    }
    else if (depth > 10) {
      color = "#beed3e";
    }
    else {
      color = "#8aed3e";
    }
    return color;
    // console.log(`color: ${color}`)
  }

  
  

  function pointToLayer (earthquake, coords) {
  return L.circleMarker(coords, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: markerColor(earthquake.geometry.coordinates[2]),
    weight: 1,
    opacity: 0.7,
    // Adjust radius
    radius: (earthquake.properties.mag)*2
  })}
  function onEachFeature (earthquake, popUp) {
    popUp.bindPopup("<h3>" + earthquake.properties.place +
    "</h3><hr><p>" + (earthquake.properties.mag) + "</p>")
  };



  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
  })
  createMap(earthquakes);
}
  // Sending our earthquakes layer to the createMap function
  
  function createMap(earthquakes) {

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      id: "mapbox/satellite-v9",
      accessToken: API_KEY
    });

    var baseMaps = {
      "Street Map": streetmap,
      "Satellite": satellite
    };

    var overlayMaps = {
      Earthquakes: earthquakes
    };

    var myMap = L.map("mapid", {
      center: [
        10, 0
      ],
      zoom: 3,
      layers: [streetmap, satellite, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    // var info = L.control({
    //   position: "bottomright"
    // });
    // info.onAdd = function() {      
    //   var div = L.DomUtil.create("div", "legend");
    //   return div;
    // };
    // info.addTo(myMap);
    var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML='Depth of Earthquake'+
    '<i style="background:#d92b2b"><p>+90:</p></i></br>'+
    '<i style="background:#f0873c"><p>70-90:</p></i></br>'+
    '<i style="background:#ed7f3b"><p>50-70:</p></i></br>'+
    '<i style="background:#edb63e"><p>30-50:</p></i></br>'+
    '<i style="background:#beed3e"><p>10-30:</p></i></br>'+
    '<i style="background:#8aed3e"><p><10:</p></i>'
    // var depth = geojson.options.depth;
    // var colors = geojson.options.color;
    // var labels = [];
    return div;
  }
    legend.addTo(myMap);
  }
