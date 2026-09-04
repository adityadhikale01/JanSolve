import "./MasterproblemIcon.css";

import L from "leaflet";
function createMasterProblemIcon(
  reportCount,
  hasMyReport
) {
  return L.divIcon({
    className: "master-problem-marker-wrapper",

    html: `
      <div class="
        master-problem-marker
        ${hasMyReport ? "mine" : ""}
      ">
        <span>${reportCount}</span>
      </div>
    `,

    iconSize: [48, 58],

    iconAnchor: [24, 58],

    popupAnchor: [0, -52],
  });
}