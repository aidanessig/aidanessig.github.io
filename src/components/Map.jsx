import React, { useEffect, useRef } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import mapboxgl from "mapbox-gl";
import jobs from "../data/jobs";

import "mapbox-gl/dist/mapbox-gl.css";

// Set Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWlkYW5lc3NpZyIsImEiOiJjbTgzc3QwdTMwNm5xMmhvcDA1b29mMWdmIn0.10R55q6rox06tBgJFq9N-A"; // Replace with your actual token

const categoryColors = {
  studied: "#00FF00", // Green
  "work-technical": "#FF0000", // Red
  "work-other": "#FFD700", // Yellow
};

const Map = ({ filters, selectedJob, setSelectedJob }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new window.Map());

  useEffect(() => {
    // map has not yet been initialized
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-95, 39], // Default center
        zoom: 2.8,
        pitch: 10,
        bearing: 0,
        projection: "globe",
      });

      mapRef.current.on("load", () => {
        mapRef.current.resize();
      });
    }
  }, []);

  useEffect(() => {
    // ensure map is full loaded
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    // assigning the matching jobs to the user's filters
    const filteredJobs = jobs.filter(
      (job) =>
        filters.categories.includes(job.category) && // matches selected category
        filters.regions.includes(job.region) && // matches selected region
        job.years.some(
          (year) => year >= filters.yearRange[0] && year <= filters.yearRange[1] // falls in the year range
        )
    );

    // remove previous markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // add new markers for filtered jobs
    filteredJobs.forEach((job) => {
      const markerColor =
        selectedJob?.id === job.id
          ? "#007BFF"
          : categoryColors[job.category] || "#FF5733";

      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat(job.coordinates)
        .addTo(mapRef.current);

      marker.jobData = job; // store job data in marker
      markersRef.current.set(job.id, marker); // track marker

      marker.getElement().addEventListener("mouseover", () => {
        marker.getElement().classList.add("hovered-marker"); // work around to get pointer on hover
      });

      marker.getElement().addEventListener("click", () => {
        // when clicked, either remove it or make it the selected job
        setSelectedJob((prevJob) => (prevJob?.id === job.id ? null : job));
      });
    });

    const layers = mapRef.current.getStyle().layers;

    // going through the layers to remove old ones
    if (layers) {
      layers.forEach((layer) => {
        if (layer.id.startsWith("line-")) {
          if (mapRef.current.getLayer(layer.id)) {
            mapRef.current.removeLayer(layer.id);
          }
          if (mapRef.current.getSource(layer.id)) {
            mapRef.current.removeSource(layer.id);
          }
        }
      });
    }

    // create GeoJSON structure for lines
    const categoryLines = {};

    // group coordinates by category
    filteredJobs.forEach((job) => {
      if (!categoryLines[job.category]) {
        categoryLines[job.category] = [];
      }
      categoryLines[job.category].push(job.coordinates);
    });

    // add new lines to the map to connect markers
    Object.entries(categoryLines).forEach(([category, coordinates]) => {
      if (coordinates.length > 1) {
        mapRef.current.addSource(`line-${category}`, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        });

        mapRef.current.addLayer({
          id: `line-${category}`,
          type: "line",
          source: `line-${category}`,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": categoryColors[category] || "#1976d2",
            "line-width": 3, // Line thickness
            "line-opacity": 0.8, // Slight transparency
          },
        });
      }
    });

    if (selectedJob && !filteredJobs.some((job) => job.id === selectedJob.id)) {
      setSelectedJob(null);
    }

    if (filteredJobs.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredJobs.forEach((job) => bounds.extend(job.coordinates));

      mapRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 10,
        duration: 500,
      });
    }
  }, [filters]);

  const updateMarkers = () => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const filteredJobs = jobs.filter(
      (job) =>
        filters.categories.includes(job.category) &&
        filters.regions.includes(job.region) &&
        job.years.some(
          (year) => year >= filters.yearRange[0] && year <= filters.yearRange[1]
        )
    );

    // remove old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // add new markers with proper colors
    filteredJobs.forEach((job) => {
      const markerColor = selectedJob?.id === job.id ? "#007BFF" : categoryColors[job.category] || "#FF5733";

      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat(job.coordinates)
        .addTo(mapRef.current);

      marker.jobData = job;
      markersRef.current.set(job.id, marker);

      marker.getElement().addEventListener("mouseover", () => {
        marker.getElement().classList.add("hovered-marker");
      });

      marker.getElement().addEventListener("click", () => {
        setSelectedJob((prevJob) => (prevJob?.id === job.id ? null : job));
      });
    });

    // fit to bounds when no job is selected
    if (!selectedJob && filteredJobs.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredJobs.forEach((job) => bounds.extend(job.coordinates));

      mapRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 10,
        duration: 500,
      });
    }
  };

  useEffect(() => {
    updateMarkers();
  }, [filters, selectedJob]);


  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    if (selectedJob) {
      // Zoom in on selected marker
      mapRef.current.flyTo({
        center: selectedJob.coordinates,
        zoom: 15,
        essential: true,
        duration: 500,
      });
    } else {
      // Zoom out to fit all markers
      const bounds = new mapboxgl.LngLatBounds();
      markersRef.current.forEach((marker) => bounds.extend(marker.getLngLat()));

      if (markersRef.current.size > 0) {
        mapRef.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 10,
          duration: 500,
        });
      }
    }
  }, [selectedJob]);

  return (
    <>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      {selectedJob && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10, 
            width: "300px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setSelectedJob(null)}
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              color: "black",
              borderRadius: "50%",
              padding: 0,
              width: "32px",
              height: "32px",
            }}
          >
            ✖
          </IconButton>

          {/* Job Image */}
          <Box
            sx={{
              height: "100px",
              width: "%", 
              backgroundImage: `url(${selectedJob.image})`,
              backgroundSize: selectedJob.imageBackgroundSize, 
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat", 
              display: "flex",
              justifyContent: "center", 
              alignItems: "center",
              mb: -1,
            }}
          />

          {/* Job Details */}
          <Box sx={{ padding: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", fontSize: selectedJob.companyFontSize }}
            >
              {selectedJob.company}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              {selectedJob.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {selectedJob.description}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Map;
