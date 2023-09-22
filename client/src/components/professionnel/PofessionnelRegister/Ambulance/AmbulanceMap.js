import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { LinearProgress } from "@material-ui/core";
import { Container, Card, CardContent, Typography } from "@material-ui/core";
import Navbar from "../../NavBar/Navbar";
import StepsPro from "./StepsPro";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PROFESSIONNEL } from "../../../actions/professionnel.types";

export default function MapAmbulance(props) {
  const [center, setCenter] = useState({ lat: 36, lng: 3 });
  const [marker, setMarker] = useState(center);
  const { professionnel, table } = useSelector(
    (state) => state.saveProfessionnel
  );

  if (!professionnel) {
    props.history.push("/register/type");
  }
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAyd9MfKsyDjtn9mlB8aLD_FKTMILWTiWY",
  });
  const dispatch = useDispatch();

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
    const pro = {
      ...professionnel,
      latitude: marker.lat,
      longitude: marker.lng,
    };
    dispatch({
      type: SAVE_PROFESSIONNEL,
      payload: {
        professionnel: pro,
        table,
      },
    });
    props.history.push("/register/identity");
  };
  if (loadError) return "Error Map";

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container>
          <StepsPro step1={true} step2={false} step3={false} />
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
