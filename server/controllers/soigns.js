import connection from "../db.js";

export const addSoign = (req, res) => {
  try {
    const soign = req.body;
    const dt = new Date();
    const query = "Insert into soigns VALUES (DEFAULT,?,?,?,?,?)";

    connection.query(
      query,
      [
        dt,
        soign.code_barre,
        soign.description,
        soign.patient_id, 
        soign.fichier,
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

export const getSoigns = (req, res) => {
  let query =
    "Select soigns.id as soign_id,code_barre,fichier,date_soign,description from soigns where soigns.id_patient = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else res.status(201).json({ results });
  });
};
