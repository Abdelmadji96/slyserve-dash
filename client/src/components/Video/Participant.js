import React, { useState, useEffect, useRef } from "react";
import { IconButton, Typography } from "@material-ui/core";
import { CallEndOutlined } from "@material-ui/icons";
const Participant = ({
  participant,
  handleLogout,
  toggleAudio,
  toggleVideo,
  audioText,
  videoText,
  display,
  style,
}) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div>
      {!display && (
        <Typography variant="h4" gutterBottom={8} align="center">
          {participant.identity}
        </Typography>
      )}

      <video ref={videoRef} autoPlay={true} style={style} />
      <audio ref={audioRef} autoPlay={true} />
      {display && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleLogout}
            style={{ marginRight: "30px" }}
            color="primary"
          >
            <CallEndOutlined style={{ fontSize: "30px" }} />
          </IconButton>

          <IconButton
            color="secondary"
            onClick={toggleAudio}
            style={{ marginRight: "30px" }}
          >
            {audioText}
          </IconButton>
          <IconButton color="secondary" onClick={toggleVideo}>
            {videoText}
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Participant;
