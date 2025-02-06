import React from 'react';
import * as turf from "turf-next";
import ExampleMap from "@site/src/components/ExampleMap";

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ExampleMap,
  turf,
  ...React,
};
export default ReactLiveScope;
