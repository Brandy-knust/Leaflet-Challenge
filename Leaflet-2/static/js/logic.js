var myMap = L.map("mapid", {
    center: [40.7128, -74.0059],
    zoom: 11
});

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

d3.json(queryUrl).then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
})

function createFeatures(earthquakeData) {
    var earthquakes = L.geoJSON(earthquakeData, {
    })




    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);
    earthquakes.addTo(myMap);
    createMap(earthquakes);
}
function createMap(earthquakes, {
})
// createMap(myMap);
// var data = []


// var earthquakes = [] 
// function onEachFeature(feature, layer) {
//     // does this feature have a property named popupContent?
//     layer.bindPopup(feature.properties.mag);
//     }


// var geojsonFeature = {
//     "type": "Feature",
//     "properties": {
//         "name": "Coors Field",
//         "amenity": "Baseball Stadium",
//         "popupContent": "This is where the Rockies play!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [-104.99404, 39.75621]
//     }
// };

// L.geoJSON(earthquakes, {
//     onEachFeature: onEachFeature
// }).addTo(myMap);

