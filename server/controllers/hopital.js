import bcrypt from "bcryptjs";
import connection from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkUnique = (req, res) => {
  try {
    let clinique = req.body;
    let query = "select id from clinique where telephone = ? or email = ?";
    connection.query(
      query,
      [clinique.telephone, clinique.email],
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
    var clinique = req.body;
    var query = "insert into clinique values (DEFAULT,?,?,?,?,?,?,?,?,?)";
    var mdp = bcrypt.hashSync(clinique.mdp, 10);
    connection.query(
      query,
      [
        clinique.numeroTelephone,
        clinique.email,
        mdp,
        clinique.nomRue,
        clinique.wilaya,
        clinique.commune,
        clinique.latitude,
        clinique.longitude,
        clinique.notificationsToken,
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
    let query = "select * from clinique where telephone = ?";

    connection.query(query, [user.telephone], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              clinique: {
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
    let query = "select * from clinique where email = ?";

    connection.query(query, [user.email], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              clinique: {
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
    let clinique = req.body;
    let query = `Select clinique.email,clinique.telephone,
    clinique.nom_de_rue,clinique.latitude,clinique.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from clinique 
    left join wilaya on clinique.wilaya_id = wilaya.id 
    left join commune on clinique.commune_id = commune.id where clinique.wilaya_id = ? `;
    connection.query(query, [clinique.wilaya_id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchByWilayaCommune = (req, res) => {
  try {
    let clinique = req.body;
    let query = `Select clinique.email,clinique.telephone,
    clinique.nom_de_rue,clinique.latitude,clinique.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from clinique 
    left join wilaya on clinique.wilaya_id = wilaya.id 
    left join commune on clinique.commune_id = commune.id where clinique.wilaya_id = ? and clinique.commune_id = ?`;
    connection.query(
      query,
      [clinique.wilaya_id, clinique.commune_id],
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
    let query = "Update clinique set notificationsToken = ?  where id = ?";
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
    let clinique = req.body;
    let query =
      "Update clinique set nom_de_rue = ? , wilaya_id = ? , commune_id = ?  where id = ?";
    connection.query(
      query,
      [
        clinique.nom_de_rue,
        clinique.wilaya_id,
        clinique.commune_id,
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
    let clinique = req.body;
    let query = "Update clinique set email = ?  where id = ?";
    connection.query(query, [clinique.email, req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ message: "success" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePassword = (req, res) => {
  try {
    let clinique = req.body;
    const mdp = bcrypt.hashSync(clinique.password, 10);
    let query = "Update clinique set mot_de_passe = ?  where id = ?";
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
    const clinique = req.body;
    if (clinique.mot_de_passe) {
      const mdp = bcrypt.hashSync(clinique.mot_de_passe, 10);
      let query = `Update clinique set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? , mot_de_passe = ? where id = ?`;
      connection.query(
        query,
        [
          clinique.nom_de_rue,
          clinique.wilaya_id,
          clinique.commune_id,
          clinique.latitude,
          clinique.longitude,
          clinique.email,
          mdp,
          req.params.id,
        ],
        (err, results) => {
          if (err) res.status(403).json({ error: err.errno });
          else res.status(201).json({ message: "success" });
        }
      );
    } else {
      let query = `Update clinique set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? where id = ?`;
      connection.query(
        query,
        [
          clinique.nom_de_rue,
          clinique.wilaya_id,
          clinique.commune_id,
          clinique.latitude,
          clinique.longitude,
          clinique.email,
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
    let query = "select telephone from clinique where telephone = ?";
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
    let clinique = req.body;
    client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+213${req.body.telephone}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.valid) {
          const mdp = bcrypt.hashSync(clinique.password, 10);
          let query =
            "Update clinique set mot_de_passe = ?  where telephone = ?";
          connection.query(
            query,
            [mdp, clinique.telephone],
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
