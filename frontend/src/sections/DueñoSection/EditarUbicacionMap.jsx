// src/sections/DueñoSection/EditarUbicacionMap.jsx
import { useState, useCallback } from "react";
import Map, { Marker } from "react-map-gl";
import { Box, Button, Text } from "@chakra-ui/react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function EditarUbicacionMap({ canchaId, lat, lng, onSave }) {
  const [marker, setMarker] = useState({ lat: Number(lat), lng: Number(lng) });

  const handleDragEnd = useCallback((event) => {
    setMarker({ lat: event.lngLat.lat, lng: event.lngLat.lng });
  }, []);

  const handleGuardar = async () => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/canchas/${canchaId}/ubicacion`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(marker),
      }
    );
    onSave(marker); // callback para refrescar padre
  };

  return (
    <Box>
      <Text fontWeight="bold" mb={2}>
        Arrastra el marcador para fijar la ubicación exacta
      </Text>
      <Map
        initialViewState={{
          latitude: marker.lat,
          longitude: marker.lng,
          zoom: 16,
        }}
        style={{ width: "100%", height: 300, borderRadius: "8px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          latitude={marker.lat}
          longitude={marker.lng}
          draggable
          onDragEnd={handleDragEnd}
          color="#319795"
        />
      </Map>
      <Button mt={3} colorScheme="teal" onClick={handleGuardar}>
        Guardar ubicación
      </Button>
    </Box>
  );
}
