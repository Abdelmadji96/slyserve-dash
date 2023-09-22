import connection from "../db.js";

export const addImagerie = (req, res) => {
  try {
    const compteRendu = req.body;
    const dt = new Date();
    const query = "Insert into imagerie VALUES (DEFAULT,?,?,?,?,?)";

    connection.query(
      query,
      [
        dt,
        compteRendu.patient_id,
        compteRendu.fichier,
        compteRendu.code_barre,
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

export const getImageries = (req, res) => {
  let query =
    "Select imagerie.id as imagerie_id,code_barre,fichier,date_imagerie,description from imagerie where imagerie.patient_id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else res.status(201).json({ results });
  });
};
