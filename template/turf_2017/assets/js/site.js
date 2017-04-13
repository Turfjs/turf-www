// FUNCTIONALITY FOR THE SIDEBAR FILTER
var input = document.getElementById('sidebarFilter');
var ul = document.getElementById("turfModules");
var listItems = ul.getElementsByTagName('li');

input.addEventListener("keyup", filterList);
function filterList() {
  var filter = input.value.toUpperCase();
  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i].className === "category") {
      continue;
    }
    var a = listItems[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      listItems[i].style.display = "";
    } else {
      listItems[i].style.display = "none";
    }
  }
}

// FUNCTIONALITY FOR THE EXAMPLE MAP
L.mapbox.accessToken = 'pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ';
var turfMap = L.mapbox.map('turfMap', 'mapbox.streets');
turfMap.scrollWheelZoom.disable();
var fg = L.featureGroup([]).addTo(turfMap);
var mapDiv = document.getElementById('turfMap');


// Add event listeners to the sidebar items
var listItemsArray = Array.prototype.slice.call(listItems);

listItemsArray.forEach(function (listItem) {
  if (listItem.classList.contains('category')) {
    return;
  }
  listItem.addEventListener("click", function (e) {
    var module = e.srcElement.hash.substr(1);
    var element = document.getElementById(module);
    handleMapMovementEvent(element);
  });
});

// Set up the scroll listeners 
var panelDivs = document.getElementsByClassName('panel');
var turfModulesOnPage = Array.prototype.slice.call(panelDivs);
var timer = null;
var mainContent = document.getElementById('mainContent');
var currentMapParent = document.getElementById('along');
handleMapMovementEvent(currentMapParent);
var currentMapId = null;

mainContent.addEventListener('scroll', function () {
  if(timer !== null) {
    clearTimeout(timer);        
  }
  timer = setTimeout(function() {
    var elementsVisible = checkModulesInViewport();
    if (elementsVisible.length > 0 ) {
      var element = elementsVisible[elementsVisible.length - 1];
      if (mapLayers[element.id]) {
        handleMapMovementEvent(element);
      }
    }
  }, 150);
}, false);

function handleMapMovementEvent (element) {

  if (mapLayers[element.id] && currentMapId !== element.id) {
    currentMapId = element.id;
    fg.clearLayers();
    moveMap(element);
    addNewLayers(element.id); 
  }
}

function checkModulesInViewport () {
  var visibleModules = [];
  turfModulesOnPage.forEach(function (module) {
    if (isInViewport(module)) {
      visibleModules.push(module);
    }
  });
  return visibleModules;
}

function isInViewport (element) {
  var rect = element.getElementsByTagName('h3')[0].getBoundingClientRect();
  return (
    rect.top >= -200 &&
    rect.bottom <= window.innerHeight + 100
    );
}

function moveMap (newParent) {
  newParent.getElementsByClassName('mapHolder')[0].appendChild(mapDiv);
}

function addNewLayers (elementId) {
  mapLayers[elementId].forEach(function (geojson) {
    var geojsonLayer = L.mapbox.featureLayer(geojson);
    geojsonLayer.eachLayer(function (layer) {
      if (layer.feature.properties){
        if (Object.keys(layer.feature.properties).length > 0){
          layer.bindPopup(JSON.stringify(layer.feature.properties));
        }
      }
    });
    fg.addLayer(geojsonLayer);
  });
  turfMap.fitBounds(fg.getBounds());
}