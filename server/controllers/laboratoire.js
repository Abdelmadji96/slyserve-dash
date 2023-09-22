import bcrypt from "bcryptjs";
import connection from "../db.js";
import jwt from "jsonwebtoken";

export const checkUnique = (req, res) => {
  try {
    let laboratoire = req.body;
    let query = "select id from laboratoire where telephone = ? or email = ?";
    connection.query(
      query,
      [laboratoire.telephone, laboratoire.email],
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
    var laboratoire = req.body;
    var query =
      "insert into laboratoire values (DEFAULT,?,?,?,?,?,?,?,?,?,?,?,?)";
    var mdp = bcrypt.hashSync(laboratoire.mdp, 10);
    connection.query(
      query,
      [
        laboratoire.nom,
        laboratoire.numeroTelephone,
        laboratoire.nomRue,
        laboratoire.latitude,
        laboratoire.longitude,
        laboratoire.agrement,
        laboratoire.valide,
        laboratoire.wilaya,
        laboratoire.commune,
        mdp,
        laboratoire.email,
        laboratoire.notificationsToken,
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
    let query = "select * from laboratoire where telephone = ?";

    connection.query(query, [user.telephone], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              laboratoire: {
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
    let query = "select * from laboratoire where email = ?";

    connection.query(query, [user.email], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              laboratoire: {
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
    let laboratoire = req.body;
    let query = `Select laboratoire.email,laboratoire.telephone,
    laboratoire.nom_de_rue,laboratoire.latitude,laboratoire.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from laboratoire 
    left join wilaya on laboratoire.wilaya_id = wilaya.id 
    left join commune on laboratoire.commune_id = commune.id where laboratoire.wilaya_id = ? `;
    connection.query(query, [laboratoire.wilaya_id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchByWilayaCommune = (req, res) => {
  try {
    let laboratoire = req.body;
    let query = `Select laboratoire.email,laboratoire.telephone,
    laboratoire.nom_de_rue,laboratoire.latitude,laboratoire.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from laboratoire 
    left join wilaya on laboratoire.wilaya_id = wilaya.id 
    left join commune on laboratoire.commune_id = commune.id where laboratoire.wilaya_id = ? and laboratoire.commune_id = ?`;
    connection.query(
      query,
      [laboratoire.wilaya_id, laboratoire.commune_id],
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
    let query = "Update laboratoire set notificationsToken = ?  where id = ?";
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
    const laboratoire = req.body;
    let query = `select * from laboratoire where ( email = ? or telephone = ? ) and id != ?`;
    connection.query(
      query,
      [laboratoire.email, laboratoire.telephone, req.params.id],
      (err, results) => {
        if (err) {
          res.status(403).json({ error: err.errno });
        } else {
          if (results.length > 0) {
            res
              .status(403)
              .json({ message: "email or phone number already in use" });
          } else {
            if (laboratoire.mot_de_passe) {
              const mdp = bcrypt.hashSync(laboratoire.mot_de_passe, 10);
              query = `Update laboratoire set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? , mot_de_passe = ? , telephone = ? where id = ?`;
              connection.query(
                query,
                [
                  laboratoire.nom_de_rue,
                  laboratoire.wilaya_id,
                  laboratoire.commune_id,
                  laboratoire.latitude,
                  laboratoire.longitude,
                  laboratoire.email,
                  mdp,
                  laboratoire.telephone,
                  req.params.id,
                ],
                (err1, results1) => {
                  if (err1) res.status(403).json({ error: err1.errno });
                  else res.status(201).json({ message: "success" });
                }
              );
            } else {
              query = `Update laboratoire set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? , telephone = ? where id = ?`;
              connection.query(
                query,
                [
                  laboratoire.nom_de_rue,
                  laboratoire.wilaya_id,
                  laboratoire.commune_id,
                  laboratoire.latitude,
                  laboratoire.longitude,
                  laboratoire.email,
                  laboratoire.telephone,
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
    let query = "select telephone from laboratoire where telephone = ?";
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
    let laboratoire = req.body;
    client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+213${req.body.telephone}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.valid) {
          const mdp = bcrypt.hashSync(laboratoire.password, 10);
          let query =
            "Update laboratoire set mot_de_passe = ?  where telephone = ?";
          connection.query(
            query,
            [mdp, laboratoire.telephone],
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
