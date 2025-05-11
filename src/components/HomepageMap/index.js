import React, { useEffect } from "react";
import * as turf from "@turf/turf";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function pointToLayer(feature, latlng) {
  return L.circleMarker(latlng, {
    color: "#0C3952",
    fillOpacity: 0.8,
  });
}

function styleFeature(feature) {
  if (feature.geometry.type === "Polygon") {
    var sum = Math.random() * 0.3 + 0.2;
    return {
      weight: 1,
      fillOpacity: sum,
      color: "#0C3952",
    };
  } else if (feature.geometry.type === "LineString") {
    return {
      weight: 1.2,
      color: "#0C3952",
    };
  } else {
    return {
      radius: 6,
      stroke: false,
      color: "#0C3952",
      fillOpacity: 1,
    };
  }
}

const geojsonOptions = {
  pointToLayer: pointToLayer,
  style: styleFeature,
};

export default function HomepageMap(props) {
  const { turfFunction } = props;

  const { siteConfig } = useDocusaurusContext();

  const points = turf.featureCollection([
    turf.point([-74.0, 40.739], { price: 8 }),
    turf.point([-73.992, 40.742], { price: 12 }),
    turf.point([-73.997, 40.732], { price: 7 }),
    turf.point([-73.995, 40.737], { price: 13 }),
    turf.point([-73.989, 40.741], { price: 21 }),
    turf.point([-73.993, 40.734], { price: 14 }),
    turf.point([-73.988, 40.739], { price: 9 }),
  ]);

  const line = turf.lineString([
    [-74.0, 40.739],
    [-73.992, 40.742],
    [-73.997, 40.732],
    [-73.995, 40.737],
    [-73.989, 40.741],
    [-73.993, 40.734],
    [-73.988, 40.739],
  ]);

  let features;
  if (turfFunction === "tin") {
    features = turf.tin(points);
  } else if (turfFunction === "buffer") {
    features = turf.buffer(points, 200, { units: "meters" });
  } else if (turfFunction === "bezier") {
    features = turf.bezierSpline(line);
  } else if (turfFunction === "voronoi") {
    features = turf.voronoi(points, {
      bbox: turf.bbox(
        turf.transformScale(turf.bboxPolygon(turf.bbox(points)), 1.3),
      ),
    });
  }

  const addToMap = { points, features };

  useEffect(() => {
    L.mapbox.accessToken = siteConfig.customFields.mapboxAccessToken;

    // Remove any old map that might have been initialised.
    // https://github.com/Leaflet/Leaflet/issues/3962#issuecomment-500680902
    var container = L.DomUtil.get("turfMap");
    if (container != null) {
      container._leaflet_id = null;
    }

    // Initialise map and set base style layer.
    const turfMap = L.mapbox.map("turfMap", null, { zoomControl: false });
    // colour - mapbox://styles/mapbox/streets-v12
    // greyscale - mapbox://styles/mapbox/light-v11
    // dark - mapbox://styles/mapbox/dark-v11
    turfMap.addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/light-v11"));

    // Create a feature group to add all our layers to. We'll
    // use this below to get the overall bounds of all layers
    // to zoom the map appropriately.
    const fg = L.featureGroup([]).addTo(turfMap);

    for (const [name, geojson] of Object.entries(addToMap)) {
      const geojsonLayer = L.mapbox.featureLayer(geojson, geojsonOptions);
      geojsonLayer.eachLayer((layer) => {
        if (layer.feature.properties) {
          if (Object.keys(layer.feature.properties).length > 0) {
            layer.bindPopup(JSON.stringify(layer.feature.properties));
          }
        }
      });
      fg.addLayer(geojsonLayer);
    }

    turfMap.fitBounds(fg.getBounds(), { padding: [30, 30] });
  });

  return <div id="turfMap" style={{ height: "325px" }}></div>;
}
