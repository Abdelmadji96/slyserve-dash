import connection from "../db.js";
import async from "async";
export const addOrdonnance = (req, res) => {
  try {
    const ordonnance = req.body;
    const medicaments = ordonnance.medicaments;
    const dt = new Date();
    const query = "Insert into ordonnance VALUES (DEFAULT,?,?,?,?,?)";

    connection.query(
      query,
      [
        dt,
        ordonnance.medecin_id,
        ordonnance.patient_id,
        ordonnance.code_barre,
        ordonnance.fichier,
      ],
      (err, results) => {
        if (err) res.status(403).json({ error: err });
        else {
          const query =
            "insert into medicaments (nom,description,ordonnance_id) VALUES ?";
          const values = medicaments.map((m) => [
            m.nom,
            m.description,
            results.insertId,
          ]);
          connection.query(query, [values], (err, results) => {
            if (err) res.status(403).json({ error: err });
            else res.status(201).json({ message: "success" });
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getMedicaments = (ordonnance, callback) => {
  try {
    let query = "Select * from medicaments where ordonnance_id = ? ";
    connection.query(query, [ordonnance.ordonnance_id], (err, medicaments) => {
      if (err) return callback(err);
      else {
        return callback(null, {
          infos: ordonnance,
          medicaments,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getOdonnances = (req, res) => {
  let query =
    "Select ordonnance.id as ordonnance_id,code_barre,fichier,date_ordonnance,medecin.nom as nom_medecin,medecin.prenom as prenom_medecin,medecin.nomRue as adresse, specialite.nom_fr as specialite from ordonnance left join medecin on medecin.id = ordonnance.medecin_id left join specialite on specialite.id = medecin.specialite_id where ordonnance.patient_id = ?";
  connection.query(query, [req.user.id], (err, ordonnances) => {
    if (err) res.status(403).json({ error: err });
    else {
      async.map(ordonnances, getMedicaments, (err, results) => {
        if (err) res.status(403).json({ error: err });
        else res.status(201).json({ results });
      });
    }
  });
};

export const particulierGetOrdonnanceDetails = (req, res) => {
  try {
    let query =
      "Select nom,description from medicaments where ordonnance_id = ?";
    connection.query(query, [req.params.id], (err, results) => {
      if (err) res.status(403).json({ error: err });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteOrdonnance = (req, res) => {
  try {
    const ordonnanceId = req.params.id;
    let query = "Delete from ordonnance where  id = ?";
    connection.query(query, [ordonnanceId], (err, results) => {
      if (err) res.status(403).json({ error: err });
      else res.status(201).json({ message: "success" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
