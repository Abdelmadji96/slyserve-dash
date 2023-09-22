import connection from "../db.js";

export const addResultatAnalyse = (req, res) => {
  try {
    const compteRendu = req.body;
    const dt = new Date();
    const query = "Insert into resultats_analyse VALUES (DEFAULT,?,?,?,?,?)";

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

export const getResultatsAnalyse = (req, res) => {
  let query =
    "Select resultats_analyse.id as resultat_analyse_id,code_barre,fichier,date_resultat,description from resultats_analyse where resultats_analyse.patient_id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else res.status(201).json({ results });
  });
};
