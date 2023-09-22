import { Collapse, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { medecinGetHoraires } from "../../actions/professionnel.actions";

const AvailableRDV = ({
  selectedDate,
  medecin,
  setHeureRDV,
  setLoadingAvailable,
  user,
  token,
}) => {
  const { t } = useTranslation();
  //const dispatch = useDispatch();
  const [availableRDVs, setAvailableRDVs] = useState([]);
  // const {
  //   loading: loadingGetHoraires,
  //   success: successGetHoraires,
  //   horaires,
  //   rdvs: rdvsMedecin,
  //   dureeSeance,
  // } = useSelector((state) => state.medecinGetHorairesReducer);

  const [rdvsMedecin, setRdvsMedecin] = useState([]);
  const [horaires, setHoraires] = useState([]);
  const [loadingGetHoraires, setoadingGetHoraires] = useState([]);

  const getRdvs = async () => {
    try {
      const response = await fetch("/api/rdv/get", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data["results"]) {
        setRdvsMedecin(data["results"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHoraires = async () => {
    try {
      const { data } = await axios.post("/api/medecin/horaires", {
        medecin: user.id,
        day: selectedDate,
      });
      if (data["horaires"]) {
        setHoraires(data["horaires"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const availableRDV = () => {
    // let ouverture = horaires ? parseInt(horaires.ouverture.split(":")[0]) : 0;
    // let fermeture = horaires ? parseInt(horaires.fermeture.split(":")[0]) : 0;
    // let minute = 0;
    // const timeStampNow = Date.now();
    // let selectedDateStamp = new Date(selectedDate);
    // selectedDateStamp.setHours(0);
    // selectedDateStamp.setMinutes(0);
    // selectedDateStamp = selectedDateStamp.getTime();
    // let rdvs = [];
    // while (ouverture < fermeture) {
    //   minute = 0;
    //   while (minute < 60) {
    //     let rdv = {
    //       heure: "",
    //       available: true,
    //     };
    //     rdv.heure = `${ouverture}:${minute}`;
    //     if (minute === 0) {
    //       rdv.heure = `${ouverture}:00`;
    //     }

    //     if (
    //       timeStampNow >
    //       selectedDateStamp + ouverture * 60 * 60 * 1000 + minute * 60 * 1000
    //     ) {
    //       rdv.available = false;
    //     }

    //     rdvsMedecin &&
    //       rdvsMedecin.map((r) => {
    //         const h = parseInt(r.heure_rdv.split(":")[0]);
    //         const m = parseInt(r.heure_rdv.split(":")[1]);
    //         if (h === ouverture && minute === m) rdv.available = false;
    //       });

    //     rdvs.push(rdv);

    //     minute = minute + parseInt(user.duree_seance); //(dureeSeance.duree_seance);
    //   }
    //   ouverture = ouverture + 1;
    // }

    // setAvailableRDVs(rdvs);
    let rdvs = [];
    horaires.map((horaire) => {
      let ouverture = horaire ? parseInt(horaire.ouverture.split(":")[0]) : 0;
      let fermeture = horaire ? parseInt(horaire.fermeture.split(":")[0]) : 0;
      let minute = 0;
      const timeStampNow = Date.now();
      let selectedDateStamp = new Date(selectedDate);
      selectedDateStamp.setHours(0);
      selectedDateStamp.setMinutes(0);
      selectedDateStamp = selectedDateStamp.getTime();
      while (ouverture < fermeture) {
        minute = 0;
        while (minute < 60) {
          let rdv = {
            heure: "",
            available: true,
          };
          rdv.heure = `${ouverture}:${minute}`;
          if (minute === 0) {
            rdv.heure = `${ouverture}:00`;
          }
          if (
            timeStampNow >
            selectedDateStamp + ouverture * 60 * 60 * 1000 + minute * 60 * 1000
          ) {
            rdv.available = false;
          }
          //rdvsMedecin &&
          rdvsMedecin.map((r) => {
            const h = parseInt(r.heure_rdv.split(":")[0]);
            const m = parseInt(r.heure_rdv.split(":")[1]);
            if (h === ouverture && minute === m) {
              rdv.available = false;
            }
          });
          alert(JSON.stringify(rdv));
          rdvs.push(rdv);
          minute = minute + parseInt(user.duree_seance);
        }
        ouverture = ouverture + 1;
      }
    });
    alert(JSON.stringify(rdvs));
    setAvailableRDVs(rdvs);
  };

  useEffect(() => {
    getRdvs();
    getHoraires();
    availableRDV();
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     medecinGetHoraires(medecin, moment(selectedDate).format("YYYY-MM-DD"))
  //   );
  // }, [dispatch, medecin, selectedDate]);

  // useEffect(() => {
  //   availableRDV();
  //   setLoadingAvailable(loadingGetHoraires);
  // }, [successGetHoraires]);
  return (
    <div className="rdv-available">
      <Collapse
        in={
          //successGetHoraires
          true
        }
      >
        {
          //successGetHoraires && (
          <Grid container spacing={2}>
            {availableRDVs.length !== 0 ? (
              availableRDVs.map((r, index) => (
                <Grid item xs={3} key={index}>
                  <input
                    id={r.heure}
                    type="radio"
                    value={r.heure}
                    name="rdv"
                    className="hidden"
                    disabled={!r.available}
                    onChange={() => setHeureRDV(r.heure)}
                  />
                  <label
                    htmlFor={r.heure}
                    className={r.available ? "btn-label" : "disable"}
                  >
                    {r.heure}
                  </label>
                </Grid>
              ))
            ) : (
              <div style={{ width: "100%" }}>
                <Alert severity="error">{t("aucun_rdv_dispo")}</Alert>
              </div>
            )}
          </Grid>
          //)
        }
      </Collapse>
    </div>
  );
};

const mapStateProps = (store) => ({
  user: store.userState.currentUser,
  token: store.userState.token,
});

export default connect(mapStateProps, null)(AvailableRDV);
