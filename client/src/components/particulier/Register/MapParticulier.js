import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {
  Container,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import Navbar from "../../NavBar/Navbar";

export default function MapParticulier(props) {
  const [center, setCenter] = useState({ lat: 36, lng: 3 });
  const [marker, setMarker] = useState(center);
  const particulier = JSON.parse(localStorage.getItem("particulierInfos"));
  if (!particulier) {
    props.history.push("/register/type");
  }
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDYpCQDbGKQuXz7pADtgxrh3g7Tq14mdRg",
  });
  const onMapClick = useCallback((e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setCenter({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }, []);
  const onMarkerDrag = useCallback((e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }, []);

  const container = { minHeight: "50vh", margin: "30px 0" };

  const onSubmit = () => {
    localStorage.setItem(
      "particulierInfos",
      JSON.stringify({
        ...particulier,
        latitude: marker.lat,
        longitude: marker.lng,
      })
    );
    props.history.push("/register/particulier/identite");
  };
  if (loadError) return "Error Map";

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container>
          <Card style={{ marginTop: "50px" }}>
            {!isLoaded && <LinearProgress color="primary" />}
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom={10}>
                Choisissez votre position sur la carte
              </Typography>
              <Typography variant="body1">
                Cliquez sur la carte pour choisir votre emplacement , vous
                pouvez aussi deplacer le marqueur sur la carte.
              </Typography>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={container}
                  zoom={7}
                  center={center}
                  onClick={onMapClick}
                >
                  <Marker
                    position={{ lat: marker.lat, lng: marker.lng }}
                    draggable={true}
                    onDrag={onMarkerDrag}
                  ></Marker>
                </GoogleMap>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.history.push("/register/medecin")}
                >
                  Retour
                </button>
                <button className="btn btn-outline-danger" onClick={onSubmit}>
                  Suivant
                </button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}
