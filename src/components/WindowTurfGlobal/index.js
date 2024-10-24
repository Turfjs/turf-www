import React from "react";

export default function WindowTurfGlobal(props) {
  const { turf } = props;

  if (! window.turf) {
    window.turf = turf;
    console.log("🧪 Experiment with Turf right here in the console! Try typing %cturf.distance([1, 1], [2, 2]);", "font-weight: bold");
  }

  return <></>;
}
