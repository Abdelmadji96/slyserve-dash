import bcrypt from "bcryptjs";
import connection from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkUnique = (req, res) => {
  try {
    let paramedical = req.body;
    let query = "select id from paramedical where telephone = ? or email = ?";
    connection.query(
      query,
      [paramedical.telephone, paramedical.email],
      (err, result) => {
        if (err) {
          res.status(403).send(err.errno);
        } else {
          if (result.length === 0) res.status(201).json({ message: "success" });
          else res.status(200).json({ message: "fail" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const register = (req, res) => {
  try {
    var paramedical = req.body;
    var query =
      "insert into paramedical values (DEFAULT,?,?,?,?,?,?,?,?,?,?,NULL,NULL,NULL,?,?,?,DEFAULT,DEFAULT,DEFAULT,?)";
    var mdp = bcrypt.hashSync(paramedical.mdp, 10);
    connection.query(
      query,
      [
        paramedical.genre,
        paramedical.nom,
        paramedical.prenom,
        paramedical.dateN,
        paramedical.numeroTelephone,
        mdp,
        paramedical.specialite,
        paramedical.nomRue,
        paramedical.wilaya,
        paramedical.commune,
        paramedical.latitude,
        paramedical.longitude,
        paramedical.email,
        paramedical.notificationsToken,
      ],
      function (error, results) {
        if (error) res.status(401).json({ error: error });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const loginTelephone = (req, res) => {
  try {
    let user = JSON.parse(JSON.stringify(req.body));
    let query = "select * from paramedical where telephone = ?";

    connection.query(query, [user.telephone], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              paramedical: {
                ...results[0],
                mot_de_passe: undefined,
                agrement: undefined,
                valide: undefined,
              },
              token: jwt.sign(
                {
                  userId: user.telephone,
                  paramedical: true,
                  id: results[0].id,
                },
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

export const loginEmail = (req, res) => {
  try {
    let user = JSON.parse(JSON.stringify(req.body));
    let query = "select * from paramedical where email = ?";

    connection.query(query, [user.email], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              paramedical: {
                ...results[0],

                mot_de_passe: undefined,
                agrement: undefined,
                valide: undefined,
              },
              token: jwt.sign(
                { userId: user.email, paramedical: true, id: results[0].id },
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

export const updateHoraireTravail = (req, res) => {
  try {
    let { horaires, dureeSeance } = req.body;
    let query = "delete from horaires_travail where paramedical_id = ?";
    connection.query(query, [req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else {
        query =
          "Insert into horaires_travail (jour,ouverture,fermeture,paramedical_id) Values ? ";
        const values = horaires.map((h) => [
          h.jour.id,
          h.ouverture,
          h.fermeture,
          req.user.id,
        ]);
        connection.query(query, [values], (err, results) => {
          if (err) res.status(403).json({ error: err.errno });
          else {
            if (dureeSeance) {
              query = "Update paramedical set duree_seance = ? where  id = ? ";
              connection.query(
                query,
                [dureeSeance, req.user.id],
                (err, results) => {
                  if (err) res.status(403).json({ error: err.errno });
                }
              );
            }
            res.status(201).json({ message: "success" });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRDVHoraires = (req, res) => {
  try {
    const { day, paramedical } = req.body;
    const weekday = new Date(day).getDay();

    let query =
      "Select jour,ouverture,fermeture from horaires_travail where paramedical_id = ? and jour = ?";
    connection.query(query, [paramedical, weekday], (err, res1) => {
      if (err) res.status(403).json({ error: err });
      else {
        query =
          "Select heure_rdv from rendez_vous where paramedical_id = ? and date_rdv = ? and annule = 0";
        connection.query(query, [paramedical, day], (err, res2) => {
          if (err) res.status(403).json({ error: err });
          else {
            connection.query(
              "select duree_seance from paramedical where id = ?",
              [paramedical],
              (err, dureeSeance) => {
                if (err) res.status(403).json({ error: err });
                else
                  res.status(201).json({
                    horaires: res1,
                    rdvs: res2,
                    dureeSeance: dureeSeance[0],
                  });
              }
            );
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateAdresse = (req, res) => {
  try {
    let paramedical = req.body;
    let query =
      "Update paramedical set nom_de_rue = ? , wilaya_id = ? , commune_id = ?  where id = ?";
    connection.query(
      query,
      [
        paramedical.nom_de_rue,
        paramedical.wilaya_id,
        paramedical.commune_id,
        req.user.id,
      ],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateEmail = (req, res) => {
  try {
    let paramedical = req.body;
    let query = "Update paramedical set email = ?  where id = ?";
    connection.query(
      query,
      [paramedical.email, req.user.id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePassword = (req, res) => {
  try {
    let paramedical = req.body;
    const mdp = bcrypt.hashSync(paramedical.password, 10);
    let query = "Update paramedical set password = ?  where id = ?";
    connection.query(query, [mdp, req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ message: "success" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateTarifs = (req, res) => {
  try {
    let paramedical = req.body;
    let query =
      "Update paramedical set tarif_video = ? ,tarif_cabinet = ? where id = ? ";
    connection.query(
      query,
      [paramedical.tarif_video, paramedical.tarif_cabinet, req.user.id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateLangues = (req, res) => {
  try {
    let paramedical = req.body;
    console.log(paramedical.langues);
    let query = "Update paramedical set langues_parlees = ?  where id = ?";
    connection.query(
      query,
      [paramedical.langues, req.user.id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateFormations = (req, res) => {
  try {
    let paramedical = req.body;
    let query = "Update paramedical set formations = ?  where id = ?";
    connection.query(
      query,
      [paramedical.formations, req.user.id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePresentation = (req, res) => {
  try {
    let paramedical = req.body;
    let query = "Update paramedical set presentation = ?  where id = ?";
    connection.query(
      query,
      [paramedical.presentation, req.user.id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const updateDureeSeance = (req, res) => {
  try {
    let paramedical = req.body;
    let query = "Update paramedical set duree_seance = ?  where id = ?";
    connection.query(
      query,
      [paramedical.duree_seance, req.user.id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

// export const getPatients = (req, res) => {
//   try {
//     let query =
//       "Select distinct particulier.id,particulier.nom,particulier.prenom,particulier.telephone,particulier.genre,particulier.date_de_naissance from particulier Left join rendez_vous on particulier.id = rendez_vous.patient_id where rendez_vous.paramedical_id = ? ";
//     connection.query(query, [req.user.id], (err, results) => {
//       if (err) res.status(403).json({ error: err.errno });
//       else res.status(201).json({ results });
//     });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

export const ajouterPatient = (req, res) => {
  try {
    const patient = req.body;
    let query =
      "Insert into patient Values (DEFAULT,?,?,?,?,?,?,?,?,?,DEFAULT)";
    connection.query(
      query,
      [
        patient.genre,
        patient.nom,
        patient.prenom,
        patient.telephone,
        patient.date_de_naissance,
        patient.nom_de_rue,
        patient.wilaya_id,
        patient.commune_id,
        req.user.id,
      ],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPatients = (req, res) => {
  try {
    let query = "Select * from patient where paramedical_id = ?";
    connection.query(query, [req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateNotificationsToken = (req, res) => {
  try {
    let query = "Update paramedical set notificationsToken = ?  where id = ?";
    connection.query(
      query,
      [req.body.notificationsToken, req.user.id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateProfile = (req, res) => {
  try {
    const paramedical = req.body;
    if (paramedical.mot_de_passe) {
      const mdp = bcrypt.hashSync(paramedical.mot_de_passe, 10);
      let query = `Update paramedical set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? , mot_de_passe = ? where id = ?`;
      connection.query(
        query,
        [
          paramedical.nom_de_rue,
          paramedical.wilaya_id,
          paramedical.commune_id,
          paramedical.latitude,
          paramedical.longitude,
          paramedical.email,
          mdp,
          req.params.id,
        ],
        (err, results) => {
          if (err) res.status(403).json({ error: err.errno });
          else res.status(201).json({ message: "success" });
        }
      );
    } else {
      let query = `Update paramedical set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? where id = ?`;
      connection.query(
        query,
        [
          paramedical.nom_de_rue,
          paramedical.wilaya_id,
          paramedical.commune_id,
          paramedical.latitude,
          paramedical.longitude,
          paramedical.email,
          req.params.id,
        ],
        (err, results) => {
          if (err) res.status(403).json({ error: err.errno });
          else res.status(201).json({ message: "success" });
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPasswordResetConfirmationCode = (req, res) => {
  try {
    let query = "select telephone from paramedical where telephone = ?";
    connection.query(query, [req.body.telephone], (err, result) => {
      if (err) {
        res.status(403).send(err.errno);
      } else {
        if (result.length == 0) {
          res.status(403).json({ message: "no user found" });
        } else {
          client.verify
            .services(config.serviceID)
            .verifications.create({
              to: `+213${req.body.telephone}`,
              channel: "sms",
            })
            .then(() => {
              res.status(201).json({ message: "success" });
            })
            .catch((error) => {
              res.status(500).json({ error });
            });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const confirmPasswordReset = (req, res) => {
  try {
    let paramedical = req.body;
    client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+213${req.body.telephone}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.valid) {
          const mdp = bcrypt.hashSync(paramedical.password, 10);
          let query =
            "Update paramedical set mot_de_passe = ?  where telephone = ?";
          connection.query(
            query,
            [mdp, paramedical.telephone],
            (err1, results1) => {
              if (err1) res.status(403).json({ error: err1.errno });
              else res.status(201).json({ message: "success" });
            }
          );
        } else {
          res.status(403).json({ message: "invalid code" });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};
