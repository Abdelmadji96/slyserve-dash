import express from "express";
import cors from 'cors';

import connection from "./db.js";
import proRouter from "./routes/professionnel.route.js";
import partRouter from "./routes/particuliers.route.js";
import medecinRouter from "./routes/medecin.js";
import ambulanceRouter from "./routes/ambulance.js";
import pharmacieRouter from "./routes/pharmacie.js";
import hopitalRouter from "./routes/hopital.js";
import laboRouter from "./routes/laboratoire.js";
import particulierRouter from "./routes/particulier.js";
import upload from "./routes/upload.js";
import videoRouter from "./routes/video.js";
import wilayaRouter from "./routes/wilaya.js";
import communeRouter from "./routes/commune.js";
import rdvRouter from "./routes/rdv.js";
import ordonnanceRouter from "./routes/ordonnace.js";
import ordonnanceCompteRendu from "./routes/compte_rendu.js";
import abonnementRouter from "./routes/abonnement.js";
import paymentRouter from "./routes/payment.js";
import adminRouter from "./routes/admin.js";
import paramedicalRouter from "./routes/paramedical.js";
import donneursangRouter from "./routes/donneursang.js";
import resultatsAnalyseRouter from "./routes/resultatsAnalyse.js";
// import soingsRouter from "./routes/soings.js";
// import biologyRouter from "./routes/biology.js";
import rapportsRouter from "./routes/rapports.js";
import imagerieRouter from "./routes/imagerie.js";
import vaccinsRouter from "./routes/vaccins.js";
import treatmentsRouter from "./routes/soigns.js";
import biologyRouter from "./routes/biology.js";
import recordsRouter from "./routes/records.js";
import prescriptionsRouter from "./routes/prescriptions.js";
import dotenv from "dotenv";
import path from "path";

// import http from "http";
// import * as socketio from "socket.io/dist";
// import { ExpressPeerServer } from "peer";

dotenv.config();
const app = express();

const devOrigins = process.env.CORS_FRONTEND_DEV_DOMAINS?.split(' ');
console.log('devOrigins', devOrigins);
app.use(cors({ devOrigins, optionsSuccessStatus: 200, credentials: true }));


app.use(express.json());
connection.connect((err) => {
  if (err) {
    console.log("Not connected " + err);
  } else {
    console.log("Connected");
  }
});

process.env.TZ = "Africa/Algiers";

const __dirname = path.resolve();

app.use("/professionnels", proRouter);
app.use("/particuliers", partRouter);
app.use("/api/medecin", medecinRouter);
app.use("/api/ambulance", ambulanceRouter);
app.use("/api/upload", upload);
app.use("/api/video", videoRouter);
app.use("/api/pharmacie", pharmacieRouter);
app.use("/api/clinique", hopitalRouter);
app.use("/api/labo", laboRouter);
app.use("/api/particulier", particulierRouter);
app.use("/api/wilayas", wilayaRouter);
app.use("/api/communes", communeRouter);
app.use("/api/rdv", rdvRouter);
app.use("/api/ordonnance", ordonnanceRouter);
app.use("/api/compterendu", ordonnanceCompteRendu);
app.use("/api/abonnement", abonnementRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/paramedical", paramedicalRouter);
app.use("/api/donneursang", donneursangRouter);
app.use("/api/resultatsAnalyse", resultatsAnalyseRouter);
//app.use("/api/soings", soingsRouter);
//app.use("/api/biology", biologyRouter);
app.use("/api/rapports", rapportsRouter);
app.use("/api/imagerie", imagerieRouter);
app.use("/api/vaccins", vaccinsRouter);
app.use("/api/soigns", treatmentsRouter);
app.use("/api/biology", biologyRouter);
app.use("/api/records", recordsRouter);
app.use("/api/prescriptions", prescriptionsRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started");
});

// const server = http.createServer(app);
// const io = socketio(server).sockets;

// const customGenerationFunction = () =>
//   (Math.random().toString(36) + "00000000000000000000000").substr(2, 16);

// const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: "/",
//   generateClientId: customGenerationFunction,
// });

// app.use("/mypeer", peerServer);

// io.on("connection", ({}) => {});
