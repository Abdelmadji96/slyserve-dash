import connection from "../db.js";

export const addRecord = (req, res) => {
  try {
    const record = req.body;
    const dt = new Date();
    const query = "Insert into records VALUES (DEFAULT,?,?,?,?,?)";

    connection.query(
      query,
      [
        dt,
        record.fichier,
        record.code_barre,
        record.description,
        record.patient_id, 
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

export const getRecords = (req, res) => {
  let query =
    "Select * from records where patient_id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else res.status(201).json({ results });
  });
};
