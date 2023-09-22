import connection from "../db.js";
export const addRdv = (req, res) => {
  try {
    let rdv = req.body;
    let query = "Insert into rendez_vous values(DEFAULT,?,?,?,?,?,DEFAULT,?)";
    connection.query(
      query,
      [rdv.type, rdv.patient, rdv.medecin, rdv.date, rdv.heure, rdv.lien],
      (err, results) => {
        if (err) res.status(403).json({ error: err });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRdv = (req, res) => {
  try {
    let query = `Select rendez_vous.id,rendez_vous.date_rdv,
      rendez_vous.medecin_id,
      rendez_vous.heure_rdv,rendez_vous.type_rdv,
      rendez_vous.lien_consultation,medecin.nom,
      rendez_vous.annule,
      medecin.prenom,specialite.nom_fr,medecin.abonner_formule_1,medecin.abonner_formule_2,
      medecin.duree_seance,medecin.tarif_video,medecin.tarif_cabinet,medecin.notificationsToken
      from rendez_vous Left Join medecin
      on rendez_vous.medecin_id = medecin.id 
      Left Join specialite on medecin.specialite_id= specialite.id
      where patient_id = ? Order by rendez_vous.date_rdv`;
    connection.query(query, [req.user.id], (err, results) => {
      if (err) res.status(403).json({ err });
      else {
        const timeStampNow = Date.now() + 60 * 60 * 1000;

        const passe = results.filter((rdv) => {
          const hoursTimeStamp =
            parseInt(rdv.heure_rdv.split(":")[0]) * 60 * 60 * 1000 +
            parseInt(rdv.heure_rdv.split(":")[1]) * 60 * 1000;
          let day = new Date(rdv.date_rdv);
          let dayTimeStamp = day.getTime();

          return (
            timeStampNow >
              dayTimeStamp +
                hoursTimeStamp +
                parseInt(rdv.duree_seance) * 60 * 1000 && rdv.annule === 0
          );
        });
        const venir = results.filter((rdv) => {
          const hoursTimeStamp =
            parseInt(rdv.heure_rdv.split(":")[0]) * 60 * 60 * 1000 +
            parseInt(rdv.heure_rdv.split(":")[1]) * 60 * 1000;
          let day = new Date(rdv.date_rdv);
          let dayTimeStamp = day.getTime();

          return (
            dayTimeStamp +
              hoursTimeStamp +
              parseInt(rdv.duree_seance) * 60 * 1000 >
              timeStampNow && rdv.annule === 0
          );
        });

        const annule = results.filter((rdv) => rdv.annule === 1);
        res.status(200).json({
          passe,
          venir,
          annule,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRdvsByMedecin = (req, res) => {
  const dateTimeStamp = new Date().getTime();
  try {
    let query = `Select rendez_vous.id,
      rendez_vous.date_rdv,
      rendez_vous.heure_rdv,rendez_vous.type_rdv,
      rendez_vous.lien_consultation,
      rendez_vous.annule,
      particulier.id as particulier_id,particulier.nom,particulier.prenom,particulier.telephone
      from rendez_vous Left join particulier on rendez_vous.patient_id = particulier.id
      where medecin_id = ? order by rendez_vous.date_rdv and rendez_vous.heure_rdv`;
    connection.query(query, [req.user.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results, today: dateTimeStamp });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRdvByMedecinByID = (req, res) => {
  try {
    let query =
      "Select rendez_vous.id,rendez_vous.date_rdv,rendez_vous.heure_rdv,rendez_vous.medecin_id,rendez_vous.type_rdv,rendez_vous.lien_consultation,particulier.nom as nom_patient,particulier.prenom as prenom_patient,medecin.nom as nom_medecin,medecin.prenom as prenom_medecin from rendez_vous Left join particulier on rendez_vous.patient_id = particulier.id left join medecin on rendez_vous.medecin_id = medecin.id where rendez_vous.id = ? ";
    connection.query(query, [req.params.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const getRdvByMedecinByLink = (req, res) => {
  try {
    let query =
      "Select rendez_vous.id,rendez_vous.date_rdv,rendez_vous.heure_rdv,rendez_vous.medecin_id,rendez_vous.type_rdv,rendez_vous.lien_consultation,particulier.nom as nom_patient,particulier.prenom as prenom_patient,medecin.nom as nom_medecin,medecin.prenom as prenom_medecin from rendez_vous Left join particulier on rendez_vous.patient_id = particulier.id left join medecin on rendez_vous.medecin_id = medecin.id where rendez_vous.lien_consultation = ? ";
    connection.query(query, [req.params.id], (err, results) => {
      if (err) res.status(403).json({ error: err.errno });
      else res.status(201).json({ results });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateRDV = (req, res) => {
  try {
    let rdv = req.body;
    let query =
      "update rendez_vous set date_rdv = ? , heure_rdv = ? where id = ? ";
    connection.query(
      query,
      [rdv.date_rdv, rdv.heure_rdv, rdv.id],
      (err, results) => {
        if (err) res.status(403).json({ error: err.errno });
        else res.status(201).json({ message: "success" });
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};
