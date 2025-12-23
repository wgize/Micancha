import { Box } from "@chakra-ui/react";
import MapGL, { Marker } from "react-map-gl";
import { useState } from "react";

export default function PageMap() {
  const [viewport, setViewport] = useState({
    latitude: -13.5226, // Cusco
    longitude: -71.9675,
    zoom: 13, // un poco más cerca que 12
  });

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  console.log("Token Mapbox:", MAPBOX_TOKEN);
  const [marker, setMarker] = useState({
    latitude: -13.528,
    longitude: -71.954,
  });

  return (
    <Box
      w="100%"
      h="500px"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      mb={6}
    >
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN} // <-- CORRECTO EN v6
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable
          onDragEnd={(e) =>
            setMarker({ longitude: e.lngLat[0], latitude: e.lngLat[1] })
          }
          offsetLeft={-20}
          offsetTop={-40}
        >
          <div style={{ color: "#ef4444", fontSize: "32px" }}>📍</div>
        </Marker>
      </MapGL>
    </Box>
  );
}
