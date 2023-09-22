import connection from "../db.js";

export const medecinAjouterAbonnement = (req, res) => {
  const dateDebut = new Date();
  const monthTimeStamp = 30 * 24 * 60 * 60 * 1000;
  const currentDate = Date.now();
  const dateFin = new Date(currentDate + monthTimeStamp);

  try {
    const abonnement = req.body;
    if (abonnement.formule1 && abonnement.formule2) {
      let query =
        "Update medecin set abonner_formule_1 = 1 ,abonner_formule_2 = 1 where id = ? ";
      connection.query(query, [req.user.id], (err, results) => {
        if (err) res.status(403).json({ err });
        else {
          query = "Insert into abonnements_1_medecin Values (DEFAULT,?,?,?)";
          connection.query(query, [req.user.id, dateDebut, dateFin]);
          query =
            "Insert into abonnements_2_medecin Values (DEFAULT,?,?,DEFAULT)";
          connection.query(query, [req.user.id, dateDebut]);
          query =
            "Select id , abonner_formule_1, abonner_formule_1 from medecin where id = ?";
          connection.query(query, [req.user.id], (err, results) => {
            if (err) res.status(403).json({ err });
            else res.status(201).json({ results });
          });
        }
      });
    } else {
      let query = "Update medecin set abonner_formule_1 = 1  where id = ? ";
      connection.query(query, [req.user.id], (err, results) => {
        if (err) res.status(403).json({ err });
        else {
          query = "Insert into abonnements_1_medecin Values (DEFAULT,?,?,?)";
          connection.query(query, [req.user.id, dateDebut, dateFin]);
          query =
            "Select id , abonner_formule_1, abonner_formule_1 from medecin where id = ?";
          connection.query(query, [req.user.id], (err, results) => {
            if (err) res.status(403).json({ err });
            else res.status(201).json({ results });
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const medecinGetAbonnement = (req, res) => {
  try {
    let query = "Select * from abonnements_1_medecin where medecin_id = ?";
    connection.query(query, [req.user.id], (err, abonnement1) => {
      if (err) res.status(403).json({ error: err.errno });
      else {
        if (abonnement1.length !== 0) {
          query = "Select * from abonnements_2_medecin where medecin_id = ?";
          connection.query(query, [req.user.id], (err, abonnement2) => {
            if (err) res.status(403).json({ error: err.errno });
            else {
              if (abonnement2.length !== 0)
                res.status(200).json({
                  abonnement1: abonnement1[0],
                  abonnement2: abonnement2[0],
                });
              else res.status(200).json({ abonnement1: abonnement1[0] });
            }
          });
        } else res.status(200).json({});
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
