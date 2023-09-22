import bcrypt from "bcryptjs";
import connection from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkUnique = (req, res) => {
  try {
    let pharmacie = req.body;
    let query = "select id from pharmacie where telephone = ? or email = ?";
    connection.query(
      query,
      [pharmacie.telephone, pharmacie.email],
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
    var pharmacie = req.body;
    var query =
      "insert into pharmacie values (DEFAULT,?,?,?,?,?,?,?,?,?,?,DEFAULT)";
    var mdp = bcrypt.hashSync(pharmacie.mdp, 10);
    connection.query(
      query,
      [
        pharmacie.numeroTelephone,
        pharmacie.email,
        mdp,
        pharmacie.nomRue,
        pharmacie.wilaya,
        pharmacie.commune,
        pharmacie.latitude,
        pharmacie.longitude,
        pharmacie.agrement,
        pharmacie.notificationsToken,
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
    let query = "select * from pharmacie where telephone = ?";

    connection.query(query, [user.telephone], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              pharmacie: {
                ...results[0],
                mot_de_passe: undefined,
              },
              token: jwt.sign(
                { userId: user.telephone, id: results[0].id },
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
    let query = "select * from pharmacie where email = ?";

    connection.query(query, [user.email], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              pharmacie: {
                ...results[0],
                mot_de_passe: undefined,
              },
              token: jwt.sign(
                { userId: user.email, id: results[0].id },
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

export const searchByWilaya = (req, res) => {
  try {
    let pharmacie = req.body;
    let query = `Select pharmacie.en_guarde,pharmacie.email,pharmacie.telephone,
    pharmacie.nom_de_rue,pharmacie.latitude,pharmacie.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from pharmacie 
    left join wilaya on pharmacie.wilaya_id = wilaya.id 
    left join commune on pharmacie.commune_id = commune.id where pharmacie.wilaya_id = ? ${
      pharmacie.en_guarde ? " and pharmacie.en_guarde = ?" : ""
    }`;
    connection.query(
      query,
      [pharmacie.wilaya_id, pharmacie.en_guarde],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ results });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchByWilayaCommune = (req, res) => {
  try {
    let pharmacie = req.body;
    let query = `Select pharmacie.en_guarde, pharmacie.email,pharmacie.telephone,
    pharmacie.nom_de_rue,pharmacie.latitude,pharmacie.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from pharmacie 
    left join wilaya on pharmacie.wilaya_id = wilaya.id 
    left join commune on pharmacie.commune_id = commune.id where pharmacie.wilaya_id = ? and pharmacie.commune_id = ? ${
      pharmacie.en_guarde ? " and pharmacie.en_guarde = ?" : ""
    }`;
    connection.query(
      query,
      [pharmacie.wilaya_id, pharmacie.commune_id, pharmacie.en_guarde],
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
    let query = "Update pharmacie set notificationsToken = ?  where id = ?";
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

export const updateAdresse = (req, res) => {
  try {
    let pharmacie = req.body;
    let query =
      "Update pharmacie set nom_de_rue = ? , wilaya_id = ? , commune_id = ?  where id = ?";
    connection.query(
      query,
      [
        pharmacie.nom_de_rue,
        pharmacie.wilaya_id,
        pharmacie.commune_id,
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
    let pharmacie = req.body;
    let query = "Update pharmacie set email = ?  where id = ?";
    connection.query(query, [pharmacie.email, req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ message: "success" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePassword = (req, res) => {
  try {
    let pharmacie = req.body;
    const mdp = bcrypt.hashSync(pharmacie.password, 10);
    let query = "Update pharmacie set mot_de_passe = ?  where id = ?";
    connection.query(query, [mdp, req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ message: "success" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateProfile = (req, res) => {
  try {
    const pharmacie = req.body;
    let query = `select * from pharmacie where ( email = ? or telephone = ? ) and id != ?`;
    connection.query(
      query,
      [pharmacie.email, pharmacie.telephone, req.params.id],
      (err, results) => {
        if (err) {
          res.status(403).json({ error: err.errno });
        } else {
          if (results.length > 0) {
            res
              .status(403)
              .json({ message: "email or phone number already in use" });
          } else {
            if (pharmacie.mot_de_passe) {
              const mdp = bcrypt.hashSync(pharmacie.mot_de_passe, 10);
              query = `Update pharmacie set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? , mot_de_passe = ? , en_guarde = ? , telephone = ?  where id = ?`;
              connection.query(
                query,
                [
                  pharmacie.nom_de_rue,
                  pharmacie.wilaya_id,
                  pharmacie.commune_id,
                  pharmacie.latitude,
                  pharmacie.longitude,
                  pharmacie.email,
                  mdp,
                  pharmacie.en_guarde,
                  pharmacie.telephone,
                  req.params.id,
                ],
                (err1, results1) => {
                  if (err1) res.status(403).json({ error: err1.errno });
                  else res.status(201).json({ message: "success" });
                }
              );
            } else {
              query = `Update pharmacie set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? , en_guarde = ? , telephone = ?  where id = ?`;
              connection.query(
                query,
                [
                  pharmacie.nom_de_rue,
                  pharmacie.wilaya_id,
                  pharmacie.commune_id,
                  pharmacie.latitude,
                  pharmacie.longitude,
                  pharmacie.email,
                  pharmacie.en_guarde,
                  pharmacie.telephone,
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

export const getPasswordResetConfirmationCode = (req, res) => {
  try {
    let query = "select telephone from pharmacie where telephone = ?";
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
    let pharmacie = req.body;
    client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+213${req.body.telephone}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.valid) {
          const mdp = bcrypt.hashSync(pharmacie.password, 10);
          let query =
            "Update pharmacie set mot_de_passe = ?  where telephone = ?";
          connection.query(
            query,
            [mdp, pharmacie.telephone],
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

// get the night position of a pharmacy
export const GetnightPosition = (req, res) => {
  const { pharmacy_id } = req.params;
  connection.query(
    //"select * from commune where wilaya_id = ?",
    "select en_guarde from pharmacie where pharmacie.id = ?",
    [pharmacy_id],
    (err, rows) => {
      if (!err) {
        res.status(200).send(rows);
      } else {
        res.status(403).send(err);
      }
    }
  );
};
// modify pharmacy user night position

export const ModifyNightPosition = (req, res) => {
  const { id, value } = req.params;
  console.log(id);
  console.log(value);
  connection.query(
    //"select * from commune where wilaya_id = ?",
    //"select en_guarde from pharmacie where pharmacie.id = ?",
    "Update pharmacie set pharmacie.en_guarde= ?  where pharmacie.id= ?",
    [value, id],
    (err, rows) => {
      if (!err) {
        res.status(201).json({ message: "success" });
      } else {
        res.status(403).json({ error: err });
      }
    }
  );
};
