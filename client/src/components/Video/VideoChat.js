import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Room from "./Room";
import { useDispatch, useSelector } from "react-redux";
import { getVideoToken } from "../../actions/user.actions";
import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { GET_VIDEO_TOKEN_RESET } from "../../actions/user.types";

import Navbar from "../NavBar/Navbar";
import { MedecinGetRDVByLink } from "../../actions/professionnel.actions";
const VideoChat = (props) => {
  const dispatch = useDispatch();
  const roomName = props.match.params.id;

  const { success: successGetRDV, loading: loadingGetRDV, rdv } = useSelector(
    (state) => state.medecinGetRDVByIDReducer
  );
  useEffect(() => {
    dispatch(MedecinGetRDVByLink(roomName));
  }, [dispatch, roomName]);

  const { particulier, login: loginParticulier } = useSelector(
    (state) => state.loginParticulierReducer
  );
  const { medecin } = useSelector((state) => state.loginMedecinReducer);
  const username = loginParticulier
    ? `${particulier.particulier.nom} ${particulier.particulier.prenom}`
    : `${medecin.medecin.nom} ${medecin.medecin.prenom}`;

  console.log(roomName);
  const {
    videoToken,
    success: successToken,
    loading: loadingToken,
  } = useSelector((state) => state.videoToken);

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username && successGetRDV && rdv.length !== 0) {
      dispatch(getVideoToken(username, roomName));
    }
  }, [dispatch, username, roomName, successGetRDV]);
  const startVideo = () => {
    setLoading(true);

    if (videoToken || successToken) {
      Video.connect(videoToken, {
        name: roomName,
      })
        .then((room) => {
          setRoom(room);
          setLoading(false);
        })
        .catch((err) => console.log("Erreur", err));
    }
  };

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          console.log(trackPub.track);
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }

      dispatch({ type: GET_VIDEO_TOKEN_RESET });
      loginParticulier
        ? props.history.push("/particulier/mesrdv")
        : props.history.push("/monplanning");
      return null;
    });
  }, []);

  return (
    <div>
      <Navbar navbar />
      <div className="content-container">
        <Container maxWidth="lg">
          <Card style={{ marginBottom: "50px" }}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="/images/sly_update_1.png" alt="logo" height="60" />
                <Typography
                  variant="h4"
                  style={{ marginLeft: "10px" }}
                  color="primary"
                >
                  Téléconsultation SLY SERVE
                </Typography>
              </div>
            </CardContent>
          </Card>

          {room ? (
            <Room
              roomName={roomName}
              room={room}
              handleLogout={handleLogout}
              rdv={rdv}
            />
          ) : (
            <Card>
              <CardContent
                style={{ display: "flex", justifyContent: "center" }}
              >
                {loading || loadingGetRDV ? (
                  <CircularProgress color="primary" />
                ) : (
                  <>
                    {successGetRDV && rdv.length !== 0 ? (
                      <div>
                        <Typography variant="h6" gutterBottom={4}>
                          {" "}
                          Medecin :
                          {` ${rdv[0].nom_medecin} ${rdv[0].prenom_medecin}`}
                        </Typography>
                        <Typography variant="h6" gutterBottom={4}>
                          Patient :{" "}
                          {`${rdv[0].nom_patient} ${rdv[0].prenom_patient}`}
                        </Typography>
                        <Typography> :</Typography>
                        <button
                          className="btn btn-outline-danger"
                          onClick={startVideo}
                          disabled={loadingToken}
                        >
                          Lancer téléconsultation
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="h6" gutterBottom={4}>
                          Aucune téléconsultation disponible
                        </Typography>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            if (loginParticulier)
                              props.history.push("/particulier/mesrdv");
                            else props.history.push("/monplanning");
                          }}
                        >
                          Retour
                        </button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </Container>
      </div>
    </div>
  );

  // !loadingToken && room ? (
  //   <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         margin: "15px",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <img src="/images/sly_update_1.png" alt="logo" height="60" />
  //       <Typography variant="h4" style={{ marginLeft: "10px" }} color="primary">
  //         Téléconsultation SLY SERVE
  //       </Typography>
  //     </div>
  //     <div className="content-container">
  //       <Room roomName={roomName} room={room} handleLogout={handleLogout} />
  //     </div>
  //   </div>
  // ) : (
  //   <div>
  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         margin: "15px",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <img src="/images/sly_update_1.png" alt="logo" height="60" />
  //       <Typography variant="h4" style={{ marginLeft: "10px" }} color="primary">
  //         Téléconsultation SLY SERVE
  //       </Typography>
  //     </div>
  //     <div className="content-container">
  //       <Container maxWidth="lg">
  //         <Card>
  //           <CardContent>
  //             <CircularProgress color="primary" />
  //           </CardContent>
  //         </Card>
  //       </Container>
  //     </div>
  //   </div>
  // );
};

export default VideoChat;
