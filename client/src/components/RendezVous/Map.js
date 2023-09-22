import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { LinearProgress } from "@material-ui/core";
export default function Map({ latitude, longitude }) {
  const center =
    latitude && longitude
      ? { lat: latitude, lng: longitude }
      : { lat: 36, lng: 3 };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAyd9MfKsyDjtn9mlB8aLD_FKTMILWTiWY",
  });

  const container = { minHeight: "20vh" };
  if (!isLoaded) return <LinearProgress color="primary" />;
  if (loadError) return "Error Map";

  return (
    <GoogleMap
      mapContainerStyle={container}
      zoom={10}
      center={center}
      gestureHandling="greedy"
    >
      <Marker position={center}></Marker>
    </GoogleMap>
  );
}
