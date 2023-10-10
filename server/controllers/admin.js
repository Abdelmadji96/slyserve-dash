import connection from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = (req, res) => {
  try {
    let admin = JSON.parse(JSON.stringify(req.body));
    let query = "select * from admin where email = ?";

    connection.query(query, [admin.email], function (error, results) {
      console.log('iciiii', results, admin);
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(admin.mdp, results[0].mdp)) {
            res.status(201).json({
              admin: {
                ...results[0],
                mdp: undefined,
              },
              token: jwt.sign(
                { userId: admin.username, id: results[0].id },
                process.env.secret,
                {
                  expiresIn: "9999 years", //"24h",
                }
              ),
            });
          } else
            res
              .status(401)
              .json({ message: "Email ou mot de passe incorrect !" });
        } else res.status(401).json({ message: "Email incorrect !" });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getParticuliers = (req, res) => {
  try {
    let query = `Select particulier.nom,particulier.prenom,
    particulier.telephone,particulier.email,
    particulier.wilaya,particulier.nomRue,
    particulier.commune,wilaya.nom_fr as wilaya,commune.nom_fr as commune
    from particulier left join wilaya on particulier.wilaya = wilaya.id 
    left join commune on particulier.commune = commune.id `;
    connection.query(query, [], (err, results) => {
      console.log('iciiiiii', err, results);
      if (err) res.status(403).json({ error: err.errno });
      else res.status(200).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRDVs = (req, res) => {
  try {
    let query = `Select rendez_vous.type_rdv,rendez_vous.date_rdv,
    rendez_vous.heure_rdv,rendez_vous.annule,particulier.nom as nom_patient,
    particulier.prenom as prenom_patient,particulier.telephone as telephone_patient,medecin.nom as nom_medecin,
    medecin.prenom as prenom_medecin,medecin.telephone as telephone_medecin from rendez_vous
     left join particulier on rendez_vous.patient = particulier.id 
     left join medecin on rendez_vous.medecin = medecin.id`;
    connection.query(query, [], (err, results) => {
      if (err) res.status(403).json({ error: err });
      else res.status(200).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};