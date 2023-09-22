import connection from "../db.js";

export const addPrescription = (req, res) => {
  try {
    const prescription = req.body;
    const dt = new Date();
    const query = "Insert into prescriptions VALUES (DEFAULT,?,?,?,?,?)";

    connection.query(
      query,
      [
        dt,
        prescription.fichier,
        prescription.code_barre,
        prescription.patient_id, 
        prescription.description,
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

export const getPrescriptions = (req, res) => {
  let query =
    "Select * from prescriptions where patient_id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else res.status(201).json({ results });
  });
};
