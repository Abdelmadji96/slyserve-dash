import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import { Container, Card, CardContent, Typography } from "@material-ui/core";
import {
  VideocamOutlined,
  VideocamOffOutlined,
  MicNoneOutlined,
  MicOffOutlined,
} from "@material-ui/icons";
import moment from "moment";

const Room = ({ room, handleLogout, rdv }) => {
  const [participants, setParticipants] = useState([]);
  const [videoText, setVideoText] = useState(
    <VideocamOutlined style={{ fontSize: "30px" }} />
  );
  const [audioText, setAudioText] = useState(
    <MicNoneOutlined style={{ fontSize: "30px" }} />
  );
  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const toggleAudio = () => {
    room.localParticipant.audioTracks.forEach((track) => {
      if (track.isTrackEnabled) {
        track.track.disable();
        setAudioText(
          <MicOffOutlined style={{ fontSize: "30px" }} color="primary" />
        );
      } else {
        track.track.enable();
        setAudioText(<MicNoneOutlined style={{ fontSize: "30px" }} />);
      }
    });
  };
  const toggleVideo = () => {
    room.localParticipant.videoTracks.forEach((track) => {
      if (track.isTrackEnabled) {
        track.track.disable();
        setVideoText(
          <VideocamOffOutlined style={{ fontSize: "30px" }} color="primary" />
        );
      } else {
        track.track.enable();
        setVideoText(<VideocamOutlined style={{ fontSize: "30px" }} />);
      }
    });
  };
  const styleRemote = {
    width: "100%",
  };
  const styleLocalParticipant = {
    width: "15%",
    position: "absolute",
    marginTop: "-11.5%",
  };
  const remoteParticipants = participants.map((participant) => (
    <Participant
      key={participant.sid}
      participant={participant}
      display={false}
      style={styleRemote}
    />
  ));
  return (
    <Container maxWidth="lg">
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom={8}>
            Séance{" "}
            {`${moment(new Date(rdv[0].date_rdv)).format("DD/MM/YYYY")} à ${
              rdv[0].heure_rdv
            } `}
          </Typography>
          <div>{remoteParticipants}</div>

          {room ? (
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
              handleLogout={handleLogout}
              toggleAudio={toggleAudio}
              toggleVideo={toggleVideo}
              audioText={audioText}
              videoText={videoText}
              display={true}
              style={
                remoteParticipants.length === 0
                  ? styleRemote
                  : styleLocalParticipant
              }
            />
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Room;
