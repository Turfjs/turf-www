import React, { useEffect } from "react";

export default function ExampleMap(props) {
  useEffect(() => {
    L.mapbox.accessToken =
      "pk.eyJ1IjoidHVyZmpzIiwiYSI6ImNrZWp2ODRvNzFqMHoyeHJ6b3Jpc29iczQifQ.YdYb6a6rA5aCtkmDZ5wn_g";

    // Remove any old map that might have been initialised.
    // https://github.com/Leaflet/Leaflet/issues/3962#issuecomment-500680902
    var container = L.DomUtil.get("turfMap");
    if (container != null) {
      container._leaflet_id = null;
    }

    // Initialise map and set base style layer.
    const turfMap = L.mapbox.map("turfMap");
    // colour - mapbox://styles/mapbox/streets-v12
    // greyscale - mapbox://styles/mapbox/light-v11
    // dark - mapbox://styles/mapbox/dark-v11
    turfMap.addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/light-v11"));

    // Create a feature group to add all our layers to. We'll
    // use this below to get the overall bounds of all layers
    // to zoom the map appropriately.
    const fg = L.featureGroup([]).addTo(turfMap);

    // Add empty control layers to the map. We'll use these below
    // to allow switching on and off of each addToMap feature.
    const control = L.control.layers([], []).addTo(turfMap);

    for (const [name, geojson] of Object.entries(props.addToMap)) {
      const geojsonLayer = L.mapbox.featureLayer(geojson);
      geojsonLayer.eachLayer((layer) => {
        if (layer.feature.properties) {
          if (Object.keys(layer.feature.properties).length > 0) {
            layer.bindPopup(JSON.stringify(layer.feature.properties));
          }
        }
      });
      control.addOverlay(geojsonLayer, name);
      fg.addLayer(geojsonLayer);
    }

    turfMap.fitBounds(fg.getBounds(), { padding: [30, 30] });
  });

  return <div id="turfMap" style={{ height: "325px" }}></div>;
}
