import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "../styles/Map.css";
import historyData from "../data/history.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWlkYW5lc3NpZyIsImEiOiJjbTgzc3QwdTMwNm5xMmhvcDA1b29mMWdmIn0.10R55q6rox06tBgJFq9N-A";

const typeColorMap = {
  "Studied": "#4dabf7",             // light blue
  "Work (technical)": "#e03131",    // red
  "Work (other)": "#f59f00",        // light yellow/orange
};

// detect if we're on a touch device
const isMobile = window.matchMedia("(pointer: coarse)").matches;

const Map = () => {
  const mapContainer = useRef(null);
  

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe",
      center: [-30, 45],
      zoom: isMobile ? 1.2 : 3,
      attributionControl: false
    });

    map.on("style.load", () => {

      map.setFog({});

      // convert history.json to GeoJSON
      const geojson = {
        type: "FeatureCollection",
        features: historyData.map((item) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.location.lon, item.location.lat],
          },
          properties: {
            name: item.name,
            type: item.type,
            role: item.role,
            description: item.description,
          },
        })),
      };

      map.addSource("historyPoints", {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: "historyPointsLayer",
        type: "circle",
        source: "historyPoints",
        paint: {
          "circle-radius": 6,
          "circle-color": [
            "match",
            ["get", "type"],
            "Studied", typeColorMap["Studied"],
            "Work (technical)", typeColorMap["Work (technical)"],
            "Work (other)", typeColorMap["Work (other)"],
            "#ffffff" // fallback color
          ],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#000000",
        },
      });

      let popup;

      if (isMobile) {
        // mobile: use click
        map.on("click", "historyPointsLayer", (e) => {
          const feature = e.features[0];
          const { name, type, role, description } = feature.properties;

          const popupNode = document.createElement("div");
          popupNode.style.fontFamily = "'Inter', sans-serif";
          popupNode.style.color = "#000";
          popupNode.style.backgroundColor = "#fff";
          popupNode.style.padding = "6px";
          popupNode.style.borderRadius = "6px";
          popupNode.style.fontSize = "0.875rem";
          popupNode.style.lineHeight = "1.4";
          popupNode.style.maxWidth = "240px";

          popupNode.innerHTML = `
            <strong style="font-size: 1rem;">${name}</strong><br/>
            <em>${role}</em><br/>
            <p style="margin: 4px 0 0 0; padding: 0;">${description}</p>
          `;

          if (popup) popup.remove(); // Close any existing
          popup = new mapboxgl.Popup({ offset: 10 })
            .setLngLat(feature.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map);
        });
      } else {
        // desktop: use hover
        map.on("mouseenter", "historyPointsLayer", (e) => {
          map.getCanvas().style.cursor = "pointer";

          const feature = e.features[0];
          const { name, type, role, description } = feature.properties;

          const popupNode = document.createElement("div");
          popupNode.style.fontFamily = "'Inter', sans-serif";
          popupNode.style.color = "#000";
          popupNode.style.backgroundColor = "#fff";
          popupNode.style.padding = "6px";
          popupNode.style.borderRadius = "6px";
          popupNode.style.fontSize = "0.875rem";
          popupNode.style.lineHeight = "1.4";
          popupNode.style.maxWidth = "240px";

          popupNode.innerHTML = `
          <strong style="font-size: 1rem;">${name}</strong><br/>
          <em>${role}</em><br/>
          <p style="margin: 4px 0 0 0; padding: 0;">${description}</p>
        `;

          popup = new mapboxgl.Popup({ offset: 10, closeButton: false })
            .setLngLat(feature.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map);
        });

        map.on("mouseleave", "historyPointsLayer", () => {
          map.getCanvas().style.cursor = "";
          if (popup) {
            popup.remove();
            popup = null;
          }
        });
      }
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="map-container" />;
};

export default Map;
