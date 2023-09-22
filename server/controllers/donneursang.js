import bcrypt from "bcryptjs";
import connection from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkUnique = (req, res) => {
  try {
    let donneur_sang = req.body;
    let query =
      "select id from particulier where donneur_sang = 1 and telephone = ? or email = ?"; //"select id from donneur_sang where telephone = ? or email = ?";
    connection.query(
      query,
      [donneur_sang.telephone, donneur_sang.email],
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
    var donneur_sang = req.body;
    var query =
      "insert into donneur_sang values (DEFAULT,?,?,?,?,?,?,?,?,?,?,?,?,?,DEFAULT)";
    var mdp = bcrypt.hashSync(donneur_sang.mdp, 10);
    connection.query(
      query,
      [
        donneur_sang.genre,
        donneur_sang.nom,
        donneur_sang.prenom,
        donneur_sang.dateN,
        donneur_sang.numeroTelephone,
        donneur_sang.email,
        mdp,
        donneur_sang.nomRue,
        donneur_sang.wilaya,
        donneur_sang.commune,
        donneur_sang.groupeSanguin,
        donneur_sang.latitude,
        donneur_sang.longitude,
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
  console.log(req.body);
  try {
    var donneur_sang = req.body;
    var query =
      "insert into donneur_sang values (DEFAULT,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var mdp = bcrypt.hashSync(donneur_sang.mdp, 10);
    connection.query(
      query,
      [
        donneur_sang.genre,
        donneur_sang.nom,
        donneur_sang.prenom,
        donneur_sang.dateN,
        donneur_sang.email,
        mdp,
        donneur_sang.nomRue,
        donneur_sang.wilaya,
        donneur_sang.commune,
        donneur_sang.numeroTelephone,
        donneur_sang.latitude,
        donneur_sang.longitude,
        1,
        donneur_sang.gs,
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
    let query =
      "select * from particulier where donneur_sang = 1 and telephone = ?"; //"select * from donneur_sang where telephone = ?";

    connection.query(query, [user.telephone], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              donneur_sang: {
                ...results[0],
                mot_de_passe: undefined,
              },
              token: jwt.sign(
                {
                  userId: user.telephone,
                  donneur_sang: true,
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
    let query =
      "select * from particulier where donneur_sang = 1 and email = ?"; //"select * from donneur_sang where email = ?";

    connection.query(query, [user.email], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              donneur_sang: {
                ...results[0],
                mot_de_passe: undefined,
              },
              token: jwt.sign(
                { userId: user.email, donneur_sang: true, id: results[0].id },
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

export const donneur_sangDetails = (req, res) => {
  try {
    let query = "Select * from donneur_sang where id = ?";
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
    const donneur_sang = req.body;
    if (donneur_sang.mot_de_passe) {
      const mdp = bcrypt.hashSync(donneur_sang.mot_de_passe, 10);
      let query = `Update particulier set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? , mot_de_passe = ? where donneur_sang = 1 and id = ?`;
      //`Update donneur_sang set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? , mot_de_passe = ? where id = ?`;
      connection.query(
        query,
        [
          donneur_sang.nom_de_rue,
          donneur_sang.wilaya_id,
          donneur_sang.commune_id,
          donneur_sang.latitude,
          donneur_sang.longitude,
          donneur_sang.email,
          mdp,
          req.params.id,
        ],
        (err, results) => {
          if (err) res.status(403).json({ error: err.errno });
          else res.status(201).json({ message: "success" });
        }
      );
    } else {
      let query = `Update donneur_sang set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? where id = ?`;
      //`Update donneur_sang set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? where id = ?`;
      connection.query(
        query,
        [
          donneur_sang.nom_de_rue,
          donneur_sang.wilaya_id,
          donneur_sang.commune_id,
          donneur_sang.latitude,
          donneur_sang.longitude,
          donneur_sang.email,
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
    let query = "Select * from proche where donneur_sang_id = ?";
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
    console.log(req.body);
    let donneur_sang = req.body;
    // let query = `Select donneur_sang.nom,donneur_sang.prenom,
    // donneur_sang.email,donneur_sang.telephone,
    // donneur_sang.groupe_sanguin,
    // donneur_sang.nom_de_rue,donneur_sang.latitude,donneur_sang.longitude,
    // wilaya.nom_fr as wilaya,commune.nom_fr as commune from donneur_sang
    // left join wilaya on donneur_sang.wilaya_id = wilaya.id
    // left join commune on donneur_sang.commune_id = commune.id where donneur_sang.wilaya_id = ?`;
    let query = `Select particulier.nom,particulier.prenom,
    particulier.email,particulier.telephone,
    particulier.groupe_sanguin,
    particulier.nom_de_rue,particulier.latitude,particulier.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from particulier 
    left join wilaya on particulier.wilaya_id = wilaya.id 
    left join commune on particulier.commune_id = commune.id where particulier.donneur_sang = 1 and particulier.wilaya_id = ?`;
    connection.query(query, [donneur_sang.wilaya_id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchByWilayaType = (req, res) => {
  try {
    console.log(req.body);
    let donneur_sang = req.body;
    // let query = `Select donneur_sang.nom,donneur_sang.prenom,
    // donneur_sang.email,donneur_sang.telephone,
    // donneur_sang.groupe_sanguin,
    // donneur_sang.nom_de_rue,donneur_sang.latitude,donneur_sang.longitude,
    // wilaya.nom_fr as wilaya,commune.nom_fr as commune from donneur_sang
    // left join wilaya on donneur_sang.wilaya_id = wilaya.id
    // left join commune on donneur_sang.commune_id = commune.id where donneur_sang.wilaya_id = ? and donneur_sang.groupe_sanguin = ?`;
    let query = `Select particulier.nom,particulier.prenom,
    particulier.email,particulier.telephone,
    particulier.groupe_sanguin,
    particulier.nom_de_rue,particulier.latitude,particulier.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from particulier 
    left join wilaya on particulier.wilaya_id = wilaya.id 
    left join commune on particulier.commune_id = commune.id where particulier.donneur_sang = 1 and particulier.wilaya_id = ? and particulier.groupe_sanguin = ?`;
    connection.query(
      query,
      [donneur_sang.wilaya_id, donneur_sang.groupe_sanguin],
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
    let donneur_sang = req.body;
    let query = `Select donneur_sang.email,donneur_sang.telephone,
    donneur_sang.nom_de_rue,donneur_sang.latitude,donneur_sang.longitude,
    donneur_sang.groupe_sanguin,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from donneur_sang 
    left join wilaya on donneur_sang.wilaya_id = wilaya.id 
    left join commune on donneur_sang.commune_id = commune.id where donneur_sang.wilaya_id = ? and donneur_sang.commune_id = ?`;
    connection.query(
      query,
      [donneur_sang.wilaya_id, donneur_sang.commune_id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ results });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchByWilayaCommuneType = (req, res) => {
  try {
    let donneur_sang = req.body;
    let query = `Select donneur_sang.email,donneur_sang.telephone,
    donneur_sang.nom_de_rue,donneur_sang.latitude,donneur_sang.longitude,
    donneur_sang.groupe_sanguin,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from donneur_sang 
    left join wilaya on donneur_sang.wilaya_id = wilaya.id 
    left join commune on donneur_sang.commune_id = commune.id where donneur_sang.wilaya_id = ? and donneur_sang.commune_id = ? and donneur_sang.groupe_sanguin = ?`;
    connection.query(
      query,
      [
        donneur_sang.wilaya_id,
        donneur_sang.commune_id,
        donneur_sang.groupe_sanguin,
      ],
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
    let query = "Update donneur_sang set notificationsToken = ?  where id = ?";
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

export const getPasswordResetConfirmationCode = (req, res) => {
  try {
    let query = "select telephone from donneursang where telephone = ?";
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
    let donneursang = req.body;
    client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+213${req.body.telephone}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.valid) {
          const mdp = bcrypt.hashSync(donneursang.password, 10);
          let query =
            "Update donneursang set mot_de_passe = ?  where telephone = ?";
          connection.query(
            query,
            [mdp, donneursang.telephone],
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
