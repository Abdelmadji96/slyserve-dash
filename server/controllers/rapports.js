import connection from "../db.js";

export const addRapport = (req, res) => {
  try {
    const compteRendu = req.body;
    const dt = new Date();
    const query = "Insert into rapports VALUES (DEFAULT,?,?,?,?,?)";

    connection.query(
      query,
      [
        dt,
        compteRendu.patient_id,
        compteRendu.code_barre,
        compteRendu.fichier,
        compteRendu.description,
      ],
      (err, results) => {
        if (err) res.status(403).json({ error: err });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRapports = (req, res) => {
  let query =
    "Select rapports.id as rapport_id,code_barre,fichier,date_rapport,description from rapports where rapports.patient_id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else res.status(201).json({ results });
  });
};
