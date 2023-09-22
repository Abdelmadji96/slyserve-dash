import connection from "../db.js";

export const addCompteRendu = (req, res) => {
  try {
    const compteRendu = req.body;
    const dt = new Date();
    const query = "Insert into compte_rendu VALUES (DEFAULT,?,?,?,?,?)";

    connection.query(
      query,
      [
        dt,
        compteRendu.description,
        compteRendu.medecin_id,
        compteRendu.patient_id,
        compteRendu.code_barre,
        compteRendu.fichier,
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

export const getComptesRendus = (req, res) => {
  let query =
    "Select compte_rendu.id as compte_rendu_id,code_barre,fichier,date_compte_rendu,description,medecin.nom as nom_medecin,medecin.prenom as prenom_medecin,medecin.nom_de_rue as adresse, specialite.nom_fr as specialite from compte_rendu left join medecin on medecin.id = compte_rendu.medecin_id left join specialite on specialite.id = medecin.specialite_id where compte_rendu.patient_id = ?";
  connection.query(query, [req.user.id], (err, results) => {
    if (err) res.status(403).json({ error: err });
    else res.status(201).json({ results });
  });
};
