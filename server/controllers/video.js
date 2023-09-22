import twilio from "twilio";
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

import dotenv from "dotenv";

dotenv.config();
const generateToken = (videoConfig) => {
  return new AccessToken(
    videoConfig.TWILIO_ACCOUNT_SID,
    videoConfig.TWILIO_API_KEY,
    videoConfig.TWILIO_API_SECRET
  );
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== "undefined") {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }

  let token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};

const getToken = (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const videoConfig = {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
  };
  const token = videoToken(identity, room, videoConfig);
  sendTokenResponse(token, res);
};

export default getToken;
