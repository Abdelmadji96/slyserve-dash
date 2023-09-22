import connection from "../db.js";

export const addBiology = (req, res) => {
  try {
    const soign = req.body;
    const dt = new Date();
    const query = "Insert into biology VALUES (DEFAULT,?,?,?,?,?)";

    connection.query(
      query,
      [
        soign.code_barre,
        dt,
        soign.description,
        soign.fichier,
        soign.patient_id, 
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

export const getBiology = (req, res) => {
  let query =
    "Select biology.id as biology_id,code_barre,fichier,date_biology,description from biology where biology.id_patient = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else res.status(201).json({ results });
  });
};
