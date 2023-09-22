import express from "express";
import connection from "../db.js";
import bcrypt from "bcryptjs";
const router = express.Router();
import twilio from "twilio";
import { config } from "../config.js";

const client = twilio(config.accountSID, config.authToken);

router.post("/register/particulier", async (req, res) => {
  const {
    genre,
    nom,
    prenom,
    dateDeNaissance,
    email,
    motDePasse,
    nomDeRue,
    wilaya,
    commune,
  } = req.body;

  await connection.query(
    "Select * from particulier where email = ?",
    [email],
    (err, rows) => {
      if (rows.length !== 0) {
        res.status(400).send("Utilisateur existe déja");
      } else {
        const hashed_password = bcrypt.hashSync(motDePasse, 10);
        connection.query(
          "insert into particulier (genre,nom,prenom,date_de_naissance,email,mot_de_passe,nom_de_rue,wilaya_id,commune_id) values (?,?,?,?,?,?,?,?,?)",
          [
            genre,
            nom,
            prenom,
            dateDeNaissance,
            email,
            hashed_password,
            nomDeRue,
            wilaya,
            commune,
          ],
          (err, rows) => {
            if (!err) {
              return res.status(200).send(rows);
            } else {
              return res.status(403).send(err);
            }
          }
        );
      }
    }
  );

  // await connection.query(
  //   "insert into donneur_sang (genre,nom,prenom,date_de_naissance,email,mot_de_passe,nom_de_rue,wilaya_id,commune_id) values (?,?,?,?,?,?,?,?,?,?)",
  //   [
  //     genre,
  //     nom,
  //     prenom,
  //     dateDeNaissance,
  //     email,
  //     hashed_password,
  //     nomDeRue,
  //     wilaya,
  //     commune,
  //   ],
  //   (err, rows) => {
  //     if (!err) {
  //       res.status(200).send(rows);
  //     } else {
  //       res.send(err);
  //     }
  //   }
  // );
});

router.get("/wilayas", async (req, res) => {
  await connection.query("select * from wilaya", (err, rows) => {
    if (!err) {
      res.status(200).send(rows);
    } else {
      res.status(403).send(err);
    }
  });
});

router.post("/communes", async (req, res) => {
  const { wilaya_id } = req.body;
  await connection.query(
    "select * from commune where wilaya_id = ?",
    [wilaya_id],
    (err, rows) => {
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(403).send(err);
      }
    }
  );
});

router.post("/sendcode", (req, res) => {
  try {
    client.verify
      .services(config.serviceID)
      .verifications.create({
        to: `+213${req.body.telephone}`,
        channel: "sms",
      })
      .then((data) => {
        res.status(200).send(data);
      });
  } catch (error) {
    res.status(403).send({ error });
  }
});

router.post("/verifycode", (req, res) => {
  try {
    client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+213${req.body.telephone}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.valid) {
          res.status(200).send(true);
        } else {
          res.status(200).send(false);
        }
      });
  } catch (error) {
    res.status(403).send({ error });
  }
});
export default router;
