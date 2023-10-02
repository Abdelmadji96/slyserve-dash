import express from "express";
import connection from "../db.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.get("/specialites", async (req, res) => {
  await connection.query("Select * from specialite", (err, rows) => {
    if (!err) {
      res.status(200).send(rows);
    } else {
      res.status(401).send(err);
    }
  });
});

router.get("/specialitesParamedical", async (req, res) => {
  await connection.query(
    "Select * from specialite_paramedical",
    (err, rows) => {
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(401).send(err);
      }
    }
  );
});

router.post("/checkexist", async (req, res) => {
  const { numeroTelephone, table } = req.body;
  await connection.query(
    `Select * from ${table} where telephone = ?`,
    [numeroTelephone],
    (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          return res.status(200).send({ success: true, msg: "" });
        } else {
          return res
            .status(200)
            .send({ success: false, msg: "Utlisateur existe deja" });
        }
      } else {
        res.status(403).send(err);
      }
    }
  );
});

router.post("/medecin/register", async (req, res) => {
  const {
    genre,
    nom,
    prenom,
    dateDeNaissance,
    numeroTelephone,
    motDePasse,
    nomDeRue,
    wilaya,
    commune,
    specialite,
  } = req.body.professionnel;
  const longitude = 36;
  const latitude = 3;
  await connection.query(
    "Select * from medecin where telephone = ?",
    [numeroTelephone],
    (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          const hashed_password = bcrypt.hashSync(motDePasse, 10);
          connection.query(
            "Insert into medecin (genre,nom,prenom,date_de_naissance,telephone,mot_de_passe,nom_de_rue,wilaya_id,commune_id,specialite_id,longitude,latitude) values (?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              genre,
              nom,
              prenom,
              dateDeNaissance,
              numeroTelephone,
              hashed_password,
              nomDeRue,
              wilaya,
              commune,
              specialite,
              longitude,
              latitude,
            ],
            (err, rows) => {
              if (!err) {
                return res.status(200).send("Utilisateur inséré");
              } else {
                return res.status(403).send(err);
              }
            }
          );
        } else {
          return res.status(403).send("Utlistaur existe deja existe déja");
        }
      }
    }
  );
});

router.post("/ambulance/register", async (req, res) => {
  const { numeroTelephone, email, motDePasse, nomDeRue, wilaya, commune } =
    req.body.professionnel;

  await connection.query(
    "Select * from ambulance where telephone = ?",
    [numeroTelephone],
    (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          const hashed_password = bcrypt.hashSync(motDePasse, 10);
          connection.query(
            "Insert into ambulance (telephone,email,mot_de_passe,nom_de_rue,wilaya_id,commune_id) values (?,?,?,?,?,?)",
            [
              numeroTelephone,
              email,
              hashed_password,
              nomDeRue,
              wilaya,
              commune,
            ],
            (err, rows) => {
              if (!err) {
                return res.status(200).send("Utilisateur inséré");
              } else {
                return res.status(403).send(err);
              }
            }
          );
        } else {
          return res.status(403).send("Utlistaur existe deja existe déja");
        }
      }
    }
  );
});

router.post("/pharmacie/register", async (req, res) => {
  const { numeroTelephone, email, motDePasse, nomDeRue, wilaya, commune } =
    req.body.professionnel;

  await connection.query(
    "Select * from pharmacie where telephone = ?",
    [numeroTelephone],
    (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          const hashed_password = bcrypt.hashSync(motDePasse, 10);
          connection.query(
            "Insert into pharmacie (telephone,email,mot_de_passe,nom_de_rue,wilaya_id,commune_id) values (?,?,?,?,?,?)",
            [
              numeroTelephone,
              email,
              hashed_password,
              nomDeRue,
              wilaya,
              commune,
            ],
            (err, rows) => {
              if (!err) {
                return res.status(200).send("Utilisateur inséré");
              } else {
                return res.status(403).send(err);
              }
            }
          );
        } else {
          return res.status(403).send("Utlistaur existe deja existe déja");
        }
      }
    }
  );
});

router.post("/search/medecins", (req, res) => {
  const { wilaya, commune, specialite } = req.body;
  const sql = `SELECT medecin.id, medecin.nom,
    medecin.prenom, medecin.nomRue,medecin.tarif_cabinet,medecin.tarif_video,
    medecin.latitude,medecin.longitude,medecin.abonner_formule_1,medecin.abonner_formule_2,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune,
    specialite.nom_ar as specialite_ar,specialite.nom_fr as specialite_fr,specialite.nom_fr as specialite_en
    FROM medecin 
    LEFT JOIN wilaya ON medecin.wilaya = wilaya.id 
    LEFT JOIN commune ON medecin.commune = commune.id 
    LEFT JOIN specialite ON medecin.specialite = specialite.id 
    WHERE ${wilaya ? " medecin.wilaya = ? " : ""}${commune ? "and medecin.commune = ? " : ""
    }
    ${specialite
      ? wilaya
        ? "and medecin.specialite = ? "
        : "medecin.specialite = ? "
      : ""
    }  ORDER BY medecin.abonner_formule_1 DESC, medecin.abonner_formule_2 DESC`;
  const getParams = () => {
    if (wilaya && commune && specialite) return [wilaya, commune, specialite];
    if (wilaya && commune && !specialite) return [wilaya, commune];
    if (wilaya && !commune && specialite) return [wilaya, specialite];
    if (!wilaya && !commune && specialite) return [specialite];
    if (wilaya && !commune && !specialite) return [wilaya];
  };
  connection.query(sql, getParams(), (err, rows) => {
    console.log('azeaze', err);
    if (!err) {
      res.status(200).send(rows);
    } else {
      res.status(403).send(err);
    }
  });
});

router.post("/search/paramedicals", (req, res) => {
  const { wilaya, commune, specialite } = req.body;
  const sql = `SELECT paramedical.id, paramedical.nom,
    paramedical.prenom,paramedical.email, paramedical.telephone, paramedical.nom_de_rue,
    paramedical.latitude,paramedical.longitude,paramedical.abonner_formule_1,paramedical.abonner_formule_2,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune,
    specialite_paramedical.nom_ar as specialite_ar,specialite_paramedical.nom_fr as specialite_fr,specialite_paramedical.nom_en as specialite_en
    FROM paramedical 
    LEFT JOIN wilaya ON paramedical.wilaya_id = wilaya.id 
    LEFT JOIN commune ON paramedical.commune_id = commune.id 
    LEFT JOIN specialite_paramedical ON paramedical.specialite_id = specialite_paramedical.id 
    WHERE ${wilaya ? " paramedical.wilaya_id = ? " : ""}${commune ? "and paramedical.commune_id = ? " : ""
    }
    ${specialite
      ? wilaya
        ? "and paramedical.specialite_id = ? "
        : "paramedical.specialite_id = ? "
      : ""
    }  `;
  const getParams = () => {
    if (wilaya && commune && specialite) return [wilaya, commune, specialite];
    if (wilaya && commune && !specialite) return [wilaya, commune];
    if (wilaya && !commune && specialite) return [wilaya, specialite];
    if (!wilaya && !commune && specialite) return [specialite];
    if (wilaya && !commune && !specialite) return [wilaya];
  };
  connection.query(sql, getParams(), (err, rows) => {
    if (!err) {
      res.status(200).send(rows);
    } else {
      res.status(403).send(err);
    }
  });
});

router.get("/medecin/info/:id", (req, res) => {
  const id = req.params.id;
  let query = `SELECT medecin.id, medecin.nom,
    medecin.prenom, medecin.nomRue,
    medecin.duree_seance,
    medecin.tarif_video,medecin.tarif_cabinet,
    medecin.abonner_formule_1,medecin.abonner_formule_2,
    medecin.wilaya,medecin.commune,medecin.date_de_naissance,
    medecin.telephone,medecin.email,medecin.presentation,
    medecin.latitude,medecin.longitude,
    medecin.formations,medecin.langues_parlees,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune,
    specialite.nom_fr as specialite
    FROM medecin 
    LEFT JOIN wilaya ON medecin.wilaya = wilaya.id 
    LEFT JOIN commune ON medecin.commune = commune.id 
    LEFT JOIN specialite ON medecin.specialite = specialite.id 
    WHERE medecin.id = ?`;
  connection.query(query, [id], (err, rows) => {
    if (err) res.status(403).json({ err });
    else {
      if (rows.length !== 0) {
        query =
          "Select jour,ouverture,fermeture from horaires_travail where medecin_id = ?";
        connection.query(query, [id], (err, horaires) => {
          if (err) {
            res.status(403).json({ error: err });
          } else {
            console.log("nn");
            res.status(201).json({
              infos: rows[0],
              horaires,
            });
          }
        });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    }
  });
});

export default router;
