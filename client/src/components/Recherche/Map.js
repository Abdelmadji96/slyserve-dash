import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import { LinearProgress, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
export default function Map(props) {
  const { t } = useTranslation();
  const { professionnel, logo } = props;
  const [selected, setSelected] = useState(null);

  const getCenter = (professionnel) => {
    let sumLat = 0;
    let sumLon = 0;
    if (professionnel.length !== 0) {
      professionnel.map((m) => {
        sumLat = sumLat + m.latitude;
        sumLon = sumLon + m.longitude;
      });
      return {
        lat: sumLat / professionnel.length,
        lng: sumLon / professionnel.length,
      };
    } else {
      return {
        lat: 36,
        lng: 3,
      };
    }
  };
  const center = professionnel && getCenter(professionnel);

  const markers = professionnel;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAyd9MfKsyDjtn9mlB8aLD_FKTMILWTiWY",
  });

  const container = { minHeight: "50vh", height: "100%" };
  if (!isLoaded) return <LinearProgress color="primary" />;
  if (loadError) return "Error Map";

  return professionnel ? (
    <GoogleMap
      mapContainerStyle={container}
      zoom={6.5}
      center={center}
      gestureHandling="greedy"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          onClick={() => {
            setSelected(marker);
          }}
          icon={{
            url: logo,
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        ></Marker>
      ))}

      {selected && selected.specialite ? (
        <InfoWindow
          onCloseClick={() => setSelected(null)}
          position={{ lat: selected.latitude, lng: selected.longitude }}
        >
          <div>
            <Typography variant="body1" gutterBottom={2}>
              {selected.nom} {selected.prenom}
            </Typography>
            <Typography variant="body2" gutterBottom={4}>
              {selected.specialite}
            </Typography>

            <button
              className="btn btn-outline-danger"
              style={{ fontSize: "12px" }}
              onClick={() =>
                props.history.push(`/search/type/medecin/${selected.id}/info`, {
                  from: "/search/type/medecin",
                })
              }
            >
              {t("rdv_btn")}
            </button>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  ) : (
    <GoogleMap
      mapContainerStyle={container}
      zoom={6}
      zom
      center={{ lat: 36, lng: 3 }}
      gestureHandling="greedy"
    />
  );
}
