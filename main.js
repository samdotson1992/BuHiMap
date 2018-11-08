document.onload = function () {
var startPoint = [33.892931, -84.284724];
var map = L.map('map', {minZoom: 12, zoomControl: false }).setView(startPoint, 13);

var zoom_bar = new L.Control.ZoomBar({position: 'topright'}).addTo(map);

L.control.locate({position: 'topright',    strings: {
        title: "Oh no..where am I?!", 
        showPopup : true,
        flyTo : true, 
        popup: "You are here!", 
        locateOptions: {
                maxZoom: 1
}
    } }).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var m = false
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
        layer.on('mouseover', function (e) {
            m = true
            this.openPopup();
        });
        layer.on('click', function(e) {
            m = false
            this.openPopup();
        });
    
        layer.on('mouseout', function (e) {
            if (m) {
            this.closePopup(); }
        });
    }
}


}

function createCustomIcon (feature, latlng) {

var Marker = L.AwesomeMarkers.icon({
icon: feature.properties.icon,
iconColor: feature.properties.iconColor,
markerColor: feature.properties.markerColor
});

return L.marker(latlng, { icon: Marker })
}

// create an options object that specifies which function will called on each feature
let myLayerOptions = {
pointToLayer: createCustomIcon,
onEachFeature: onEachFeature,
}

L.geoJSON(stores, myLayerOptions).on('click', markerOnClick).addTo(map);

L.geoJSON(food, myLayerOptions).on('click', markerOnClick).addTo(map);

L.geoJSON(dessert, myLayerOptions).on('click', markerOnClick).addTo(map);

L.geoJSON(BuHi_buffer, myLayerOptions).on('click', markerOnClick).addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);

function markerOnClick(e) {
            map.setView([e.latlng.lat, e.latlng.lng], 16);
           document.getElementById("text").innerHTML = '<div id="place_info" >'  +
              "<br>  <div> <strong> <hl id='title'>" +  e.layer.feature.properties.name  + "</hl> </strong> <br> </div>" + '<br> <a id="link" href=' + e.layer.feature.properties.url + ">" + e.layer.feature.properties.url + "</a> <br> <br> <div  id='desc'>   <p>" +  e.layer.feature.properties.desc  + "</p> </div> </div>"  ;
                sidebar.open()
                document.getElementById("desc").click()
        }

