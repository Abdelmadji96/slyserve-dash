import connection from "../db.js";

export const addVaccin = (req, res) => {
  try {
    const compteRendu = req.body;
    const dt = new Date();
    const query = "Insert into vaccins VALUES (DEFAULT,?,?,?,?,?)";

    connection.query(
      query,
      [
        dt,
        compteRendu.patient_id,
        compteRendu.fichier,
        compteRendu.description,
        compteRendu.code_barre,
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

export const getVaccins = (req, res) => {
  let query =
    "Select vaccins.id as vaccin_id,code_barre,fichier,date_vaccin,description from vaccins where vaccins.patient_id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else res.status(201).json({ results });
  });
};
