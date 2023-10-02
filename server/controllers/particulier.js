import bcrypt from "bcryptjs";
import connection from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkUnique = (req, res) => {
  try {
    let particulier = req.body;
    let query = "select id from particulier where telephone = ? or email = ?";
    connection.query(
      query,
      [particulier.telephone, particulier.email],
      (err, result) => {
        if (err) {
          res.status(403).send(err);
        } else {
          if (result.length === 0) {
            res.status(201).json({ message: "success" });
          } else res.status(200).json({ message: "Particulier exist déjà" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const register = (req, res) => {
  try {
    var particulier = req.body;
    var query =
      "insert into particulier values (DEFAULT,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,DEFAULT)";
    var mdp = bcrypt.hashSync(particulier.mdp, 10);
    connection.query(
      query,
      [
        particulier.genre,
        particulier.nom,
        particulier.prenom,
        particulier.dateN,
        particulier.email,
        mdp,
        particulier.nomRue,
        particulier.wilaya,
        particulier.commune,
        particulier.numeroTelephone,
        particulier.latitude,
        particulier.longitude,
        particulier.donneur_sang,
        particulier.groupe_sanguin,
        particulier.notificationsToken,
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

export const registerDonneurSang = (req, res) => {
  try {
    var donneurSang = req.body;
    var query =
      "insert into donneur_sang values (DEFAULT,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var mdp = bcrypt.hashSync(donneurSang.mdp, 10);
    connection.query(
      query,
      [
        donneurSang.genre,
        donneurSang.nom,
        donneurSang.prenom,
        donneurSang.dateN,
        donneurSang.email,
        mdp,
        donneurSang.nomRue,
        donneurSang.wilaya,
        donneurSang.commune,
        donneurSang.numeroTelephone,
        donneurSang.latitude,
        donneurSang.longitude,
        1,
        donneurSang.gs,
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
    let query = "select * from particulier where telephone = ?";

    connection.query(query, [user.telephone], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mdp)) {
            if (results[0].valide == 1) {
              res.status(201).json({
                particulier: {
                  ...results[0],
                  mdp: undefined,
                },
                token: jwt.sign(
                  {
                    userId: user.telephone,
                    particulier: true,
                    id: results[0].id,
                  },
                  process.env.secret,
                  {
                    expiresIn: "9999 years", //"24h",
                  }
                ),
              });
            } else {
              res.status(401).json({ message: "Profil non valide !" });
            }
          } else
            res
              .status(401)
              .json({ message: "Telephone ou mot de passe incorrect !" });
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
    let query = "select * from particulier where email = ?";

    connection.query(query, [user.email], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mdp)) {
            // if (results[0].valide == 1) {
              res.status(201).json({
                particulier: {
                  ...results[0],
                  mdp: undefined,
                },
                token: jwt.sign(
                  { userId: user.email, particulier: true, id: results[0].id },
                  process.env.secret,
                  {
                    expiresIn: "9999 years", //"24h",
                  }
                ),
              });
            // } else {
            //   res.status(401).json({ message: "Profil non valide !" });
            // }
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

export const particulierDetails = (req, res) => {
  try {
    let query = "Select * from particulier where id = ?";
    connection.query(query, [req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateProfile = (req, res) => {
  try {
    const particulier = req.body;
    let query = `select * from particulier where ( email = ? or telephone = ? ) and id != ?`;
    connection.query(
      query,
      [particulier.email, particulier.telephone, req.params.id],
      (err, results) => {
        if (err) {
          res.status(403).json({ error: err.errno });
        } else {
          if (results.length > 0) {
            res
              .status(403)
              .json({ message: "email or phone number already in use" });
          } else {
            if (particulier.mot_de_passe) {
              const mdp = bcrypt.hashSync(particulier.mot_de_passe, 10);
              query = `Update particulier set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , email = ? , mot_de_passe = ? , telephone = ? , latitude = ? , longitude = ? , donneur_sang = ? , groupe_sanguin = ? where id = ?`;
              connection.query(
                query,
                [
                  particulier.nom_de_rue,
                  particulier.wilaya_id,
                  particulier.commune_id,
                  particulier.email,
                  mdp,
                  particulier.telephone,
                  particulier.latitude,
                  particulier.longitude,
                  particulier.donneur_sang,
                  particulier.groupe_sanguin,
                  req.params.id,
                ],
                (err1, results1) => {
                  if (err1) res.status(403).json({ error: err1.errno });
                  else res.status(201).json({ message: "success" });
                }
              );
            } else {
              query = `Update particulier set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , email = ? , telephone = ? , latitude = ? , longitude = ? , donneur_sang = ? , groupe_sanguin = ? where id = ?`;
              connection.query(
                query,
                [
                  particulier.nom_de_rue,
                  particulier.wilaya_id,
                  particulier.commune_id,
                  particulier.email,
                  particulier.telephone,
                  particulier.latitude,
                  particulier.longitude,
                  particulier.donneur_sang,
                  particulier.groupe_sanguin,
                  req.params.id,
                ],
                (err2, results2) => {
                  if (err2) res.status(403).json({ error: err2.errno });
                  else res.status(201).json({ message: "success" });
                }
              );
            }
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const ajouterProche = (req, res) => {
  try {
    const proche = req.body;
    let query = "Insert into proche Values (DEFAULT,?,?,?,?,?,?,?,?)";
    connection.query(
      query,
      [
        proche.genre,
        proche.nom,
        proche.prenom,
        proche.date_de_naissance,
        proche.nom_de_rue,
        proche.wilaya_id,
        proche.commune_id,
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

export const getProches = (req, res) => {
  try {
    let query = "Select * from proche where particulier_id = ?";
    connection.query(query, [req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateRDV = (req, res) => {
  try {
    const rdv = req.body;
    let query =
      "update rendez_vous set date_rdv = ? , heure_rdv = ? where id = ? and patient_id = ?";
    connection.query(
      query,
      [rdv.date_rdv, rdv.heure_rdv, rdv.id, req.user.id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const cancelRDV = (req, res) => {
  try {
    const rdv = req.body;

    let query =
      "update rendez_vous set annule = 1 where id = ? and patient_id = ?";
    connection.query(query, [rdv.rdvId, req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ message: "success" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchByWilaya = (req, res) => {
  try {
    let particulier = req.body;
    let query = `Select particulier.nom,particulier.prenom,
    particulier.email,particulier.telephone,
    particulier.groupe_sanguin,
    particulier.nom_de_rue,particulier.latitude,particulier.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from particulier 
    left join wilaya on particulier.wilaya_id = wilaya.id 
    left join commune on particulier.commune_id = commune.id where particulier.wilaya_id = ? and donneur_sang = 1`;
    connection.query(query, [particulier.wilaya_id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchByWilayaCommune = (req, res) => {
  try {
    let particulier = req.body;
    let query = `Select particulier.email,particulier.telephone,
    particulier.nom_de_rue,particulier.latitude,particulier.longitude,
    particulier.groupe_sanguin,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from particulier 
    left join wilaya on particulier.wilaya_id = wilaya.id 
    left join commune on particulier.commune_id = commune.id where particulier.wilaya_id = ? and particulier.commune_id = ? and donneur_sang = 1`;
    connection.query(
      query,
      [particulier.wilaya_id, particulier.commune_id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ results });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateNotificationsToken = (req, res) => {
  try {
    let query = "Update particulier set notificationsToken = ?  where id = ?";
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

export const payByBalance = async (req, res) => {
  try {
    let query1 = "select solde from particulier where id = ?";
    connection.query(query1, [req.user.id], (err, results1) => {
      if (err) res.status(403).json({ error: err.errno });
      else {
        if (results1[0]["solde"] >= req.body.amount) {
          let query2 = "update particulier set solde = ? where id = ?";
          connection.query(
            query2,
            [results1[0]["solde"] - req.body.amount, req.user.id],
            (err, results2) => {
              if (err) res.status(403).json({ error: err.errno });
              else
                res.status(201).json({
                  message: "success",
                  newBalance: results1[0]["solde"] - req.body.amount,
                });
            }
          );
        } else {
          res.status(403).json({
            error:
              "Insufficient funds your balance has just : " +
              results1[0]["solde"] +
              " DA",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const modifierProche = (req, res) => {
  try {
    const proche = req.body;
    let query =
      "update proche set genre = ? , nom = ? , prenom = ? , date_de_naissance = ? , nom_de_rue = ? , wilaya_id = ? , commune_id = ? where id = ?";
    connection.query(
      query,
      [
        proche.genre,
        proche.nom,
        proche.prenom,
        proche.date_de_naissance,
        proche.nom_de_rue,
        proche.wilaya_id,
        proche.commune_id,
        req.params.id,
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

export const supprimerProche = (req, res) => {
  try {
    const proche = req.body;
    let query = "delete from proche where id = ?";
    connection.query(query, [req.params.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ message: "success" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPasswordResetConfirmationCode = (req, res) => {
  try {
    let query = "select telephone from particulier where telephone = ?";
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
    let particulier = req.body;
    client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+213${req.body.telephone}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.valid) {
          const mdp = bcrypt.hashSync(particulier.password, 10);
          let query =
            "Update particulier set mot_de_passe = ?  where telephone = ?";
          connection.query(
            query,
            [mdp, particulier.telephone],
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
