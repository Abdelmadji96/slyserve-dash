import bcrypt from "bcryptjs";
import connection from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import twilio from "twilio";
import { config } from "../config.js";

const client = twilio(config.accountSID, config.authToken);
dotenv.config();

export const checkUnique = (req, res) => {
  try {
    let ambulance = req.body;
    let query = "select id from ambulance where telephone = ? or email = ?";
    connection.query(
      query,
      [ambulance.telephone, ambulance.email],
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
    var ambulance = req.body;
    var query =
      "insert into ambulance values (DEFAULT,?,?,?,?,?,?,?,?,DEFAULT)";
    var mdp = bcrypt.hashSync(ambulance.mdp, 10);
    connection.query(
      query,
      [
        ambulance.numeroTelephone,
        ambulance.email,
        mdp,
        ambulance.nomRue,
        ambulance.wilaya,
        ambulance.commune,
        ambulance.latitude,
        ambulance.longitude,
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
    let query = "select * from ambulance where telephone = ?";

    connection.query(query, [user.telephone], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              ambulance: {
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
    let query = "select * from ambulance where email = ?";

    connection.query(query, [user.email], function (error, results) {
      if (error) res.status(400).json({ error });
      else {
        if (results.length === 1) {
          if (bcrypt.compareSync(user.mdp, results[0].mot_de_passe)) {
            res.status(201).json({
              ambulance: {
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
    let ambulance = req.body;
    let query = `Select ambulance.email,ambulance.telephone,
    ambulance.nom_de_rue,ambulance.latitude,ambulance.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from ambulance 
    left join wilaya on ambulance.wilaya_id = wilaya.id 
    left join commune on ambulance.commune_id = commune.id where ambulance.wilaya_id = ? `;
    connection.query(query, [ambulance.wilaya_id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const searchByWilayaCommune = (req, res) => {
  try {
    let ambulance = req.body;
    let query = `Select ambulance.email,ambulance.telephone,
    ambulance.nom_de_rue,ambulance.latitude,ambulance.longitude,
    wilaya.nom_fr as wilaya,commune.nom_fr as commune from ambulance 
    left join wilaya on ambulance.wilaya_id = wilaya.id 
    left join commune on ambulance.commune_id = commune.id where ambulance.wilaya_id = ? and ambulance.commune_id = ?`;
    connection.query(
      query,
      [ambulance.wilaya_id, ambulance.commune_id],
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
    let query = "Update ambulance set notificationsToken = ?  where id = ?";
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
    let ambulance = req.body;
    let query =
      "Update ambulance set nom_de_rue = ? , wilaya_id = ? , commune_id = ?  where id = ?";
    connection.query(
      query,
      [
        ambulance.nom_de_rue,
        ambulance.wilaya_id,
        ambulance.commune_id,
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
    let ambulance = req.body;
    let query = "Update ambulance set email = ?  where id = ?";
    connection.query(query, [ambulance.email, req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ message: "success" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePassword = (req, res) => {
  try {
    let ambulance = req.body;
    const mdp = bcrypt.hashSync(ambulance.password, 10);
    let query = "Update ambulance set mot_de_passe = ?  where id = ?";
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
    const ambulance = req.body;
    if (ambulance.mot_de_passe) {
      const mdp = bcrypt.hashSync(ambulance.mot_de_passe, 10);
      let query = `Update ambulance set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? , mot_de_passe = ? where id = ?`;
      connection.query(
        query,
        [
          ambulance.nom_de_rue,
          ambulance.wilaya_id,
          ambulance.commune_id,
          ambulance.latitude,
          ambulance.longitude,
          ambulance.email,
          mdp,
          req.params.id,
        ],
        (err, results) => {
          if (err) res.status(403).json({ error: err.errno });
          else res.status(201).json({ message: "success" });
        }
      );
    } else {
      let query = `Update ambulance set nom_de_rue = ? , wilaya_id = ? , commune_id = ? , latitude = ? , longitude = ? , email = ? where id = ?`;
      connection.query(
        query,
        [
          ambulance.nom_de_rue,
          ambulance.wilaya_id,
          ambulance.commune_id,
          ambulance.latitude,
          ambulance.longitude,
          ambulance.email,
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

// export const getPasswordResetConfirmationCode = (req, res) => {
//   try {
//     let query = "select telephone from ambulance where telephone = ?";
//     connection.query(query, [req.body.telephone], (err, result) => {
//       if (err) {
//         res.status(403).send(err.errno);
//       } else {
//         if (result.length == 0) {
//           res.status(403).json({ message: "no user found" });
//         } else {
//           query =
//             "select code from ambulance_password_reset_codes where telephone = ?";
//           connection.query(query, [req.body.telephone], (err1, result1) => {
//             if (err1) {
//               res.status(403).send(err1.errno);
//             } else {
//               res.status(201).json({ message: "success" });
//               let code = Math.floor(Math.random() * 899999 + 100000);
//               if (result.length == 0) {
//                 query =
//                   "insert into ambulance_password_reset_codes values ( ? , ? )";
//                 connection.query(
//                   query,
//                   [code, req.body.telephone],
//                   (err2, result2) => {
//                     if (err2) {
//                       res.status(403).send(err2.errno);
//                     } else {
//                       client.verify
//                         .services(config.serviceID)
//                         .verifications.create({
//                           to: `+213${req.body.telephone}`,
//                           channel: "sms",
//                           customCode: code.toString(),
//                           customMessage:
//                             "Votre code de confirmation Slyserve est : " +
//                             code.toString(),
//                         })
//                         .then(() => {
//                           res.status(201).json({ message: "success" });
//                         })
//                         .catch((error) => {
//                           res.status(500).json({ error });
//                         });
//                     }
//                   }
//                 );
//               } else {
//                 query =
//                   "update ambulance_password_reset_codes set code = ? where telephone = ?";
//                 connection.query(
//                   query,
//                   [code, req.body.telephone],
//                   (err3, result3) => {
//                     if (err3) {
//                       res.status(403).send(err3.errno);
//                     } else {
//                       client.verify
//                         .services(config.serviceID)
//                         .verifications.create({
//                           to: `+213${req.body.telephone}`,
//                           channel: "sms",
//                           customCode: code.toString(),
//                           customMessage:
//                             "Votre code de confirmation Slyserve est : " +
//                             code.toString(),
//                         })
//                         .then(() => {
//                           res.status(201).json({ message: "success" });
//                         })
//                         .catch((error) => {
//                           res.status(500).json({ error });
//                         });
//                     }
//                   }
//                 );
//               }
//             }
//           });
//         }
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

// export const confirmPasswordReset = (req, res) => {
//   try {
//     let ambulance = req.body;
//     let query =
//       "select code from ambulance_password_reset_codes where telephone = ?";
//     connection.query(query, [mdp, ambulance.telephone], (err, results) => {
//       if (err) {
//         res.status(403).json({ error: err.errno });
//       } else {
//         if (results[0].code == ambulance.code) {
//           const mdp = bcrypt.hashSync(ambulance.password, 10);
//           query = "Update ambulance set mot_de_passe = ?  where telephone = ?";
//           connection.query(
//             query,
//             [mdp, ambulance.telephone],
//             (err1, results1) => {
//               if (err1) res.status(403).json({ error: err1.errno });
//               else res.status(201).json({ message: "success" });
//             }
//           );
//         } else {
//           res.status(403).json({ message: "invalid code" });
//         }
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

export const getPasswordResetConfirmationCode = (req, res) => {
  try {
    let query = "select telephone from ambulance where telephone = ?";
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
    let ambulance = req.body;
    client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+213${req.body.telephone}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.valid) {
          const mdp = bcrypt.hashSync(ambulance.password, 10);
          let query =
            "Update ambulance set mot_de_passe = ?  where telephone = ?";
          connection.query(
            query,
            [mdp, ambulance.telephone],
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
