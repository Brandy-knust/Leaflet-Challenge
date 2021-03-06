// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(`feature:${data}`)
    console.log(`mag:${data.features[0].properties.mag}`)
    createFeatures(data.features);
});
function createFeatures(earthquakeData) {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    // var markers = []
        function markerColor (depth){
        var color = "";
        if (depth > 90) {
            color = "#11873C";
        }
        else if (depth > 70) {
            color = "#54D081";
        }
        else if (depth > 50) {
            color = "#84E1A6";
        }
        else if (depth > 30) {
            color = "#B9E28F";
        }
        else {
            color = "#D9ECC6";
        }
        return color;
    }
        function pointToLayer (earthquake, coords) {
            return L.circleMarker(coords, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: markerColor(earthquake.geometry.coordinates[2]),
            weight: 1,
            opacity: 0.7,
            // Adjust radius
            radius: (earthquake.properties.mag) * 4
        })};
        function onEachFeature (earthquake, popUp) {
            popUp.bindPopup("<h3>" + earthquake.properties.place +
            "</h3><hr><p>" + (earthquake.properties.mag) + "</p>")
        };
        // Create a GeoJSON layer containing the features array on the earthquakeData object
        var earthQuakes = L.geoJSON(earthquakeData, {
            pointToLayer: pointToLayer,
            onEachFeature: onEachFeature       
            })
        createMap(earthQuakes);
}
        // Run the onEachFeature function once for each piece of data in the array
        // Sending our earthquakes layer to the createMap function
function createMap(earthquakes) {
            var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
                attribution: "?? <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> ?? <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
                tileSize: 512,
                maxZoom: 18,
                zoomOffset: -1,
                id: "mapbox/streets-v11",
                accessToken: API_KEY
            });
            var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
                attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery ?? <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                maxZoom: 18,
                id: "dark-v10",
                accessToken: API_KEY
            });
            var baseMaps = {
                "Street Map": streetmap,
                "Dark Map": darkmap
            };
            var overlayMaps = {
                Earthquakes: earthquakes
            };
            var myMap = L.map("mapid", {
                center: [
                    37.09, -95.71
                ],
                zoom: 5,
                layers: [streetmap, darkmap, earthquakes]
            });
            L.control.layers(baseMaps, overlayMaps, {
                collapsed: false
            }).addTo(myMap);
        }