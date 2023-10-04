import {
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Create } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { setUser } from "../../../redux/actions/user";
import DateFnsUtils from "@date-io/date-fns";

const HorairesTravail = ({
  horaires,
  dureeSeance,
  userState,
  saveAppointments,
  token,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [ErreurHoraire, setErreurHoraire] = useState([]);
  const [duree, setDuree] = useState(dureeSeance);
  //const dispatch = useDispatch();
  const getDayWeek = (dayNumber) => {
    const FrNames = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    return FrNames[dayNumber];
  };
  const setHoraires = () => {
    let horairesBis = [];
    let ht = {};
    let i = 0;
    let j = 0;
    while (j < 7) {
      if (horaires[i] && horaires[i].jour === j) {
        ht = {
          jour: { id: j, nom: getDayWeek(j) },
          ouverture: new Date(`2020-01-01 ${horaires[i].ouverture}`),
          fermeture: new Date(`2020-01-01 ${horaires[i].fermeture}`),
          ferme: false,
        };
        j = j + 1;
        i = i + 1;
      } else {
        ht = {
          jour: { id: j, nom: getDayWeek(j) },
          ouverture: new Date(`2020-01-01 08:00`),
          fermeture: new Date(`2020-01-01 16:00`),
          ferme: true,
        };
        j = j + 1;
      }
      horairesBis.push(ht);
    }
    return horairesBis;
  };
  const [heuresDeTravail, setHeureDeTravail] = useState([]);

  useEffect(() => {
    horaires && setHeureDeTravail(setHoraires());
  }, [horaires]);

  // const {
  //   loading: loadingUpdate,
  //   success: successUpdate,
  //   error: errorUpdate,
  // } = useSelector((state) => state.medecinUpdateProfileReducer);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleErrors = () => {
    const errors = heuresDeTravail.filter(
      (ht) => new Date(ht.ouverture) > new Date(ht.fermeture)
    );
    setErreurHoraire(errors);
  };

  const handleSubmit = () => {
    const heuresTravail = heuresDeTravail.filter((ht) => !ht.ferme);

    const heureTravail1 = heuresTravail.map((ht) => {
      let ht1 = { ...ht };
      ht1.ouverture = ht.ouverture.toLocaleTimeString();
      ht1.fermeture = ht.fermeture.toLocaleTimeString();
      return ht1;
    });

    if (dureeSeance == 0) {
      //dispatch(medecinUpdateHoraires(heureTravail1, duree));
      handleUpdateHoraires(heureTravail1, duree);
    } else {
      //dispatch(medecinUpdateHoraires(heureTravail1));
      handleUpdateHoraires(heureTravail1);
    }
  };

  const handleUpdateHoraires = async (horaires, dureeSeance) => {
    try {
      if (dureeSeance) {
        const { data } = await axios.post(
          "/api/medecin/update/horaires",
          { horaires, dureeSeance },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //dispatch({ type: MEDECIN_UPDATE_PROFILE_SUCCESS, payload: data });
        saveAppointments({ ...userState, appointments: data });
      } else {
        const { data } = await axios.post(
          "/api/medecin/update/horaires",
          { horaires },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //dispatch({ type: MEDECIN_UPDATE_PROFILE_SUCCESS, payload: data });
        saveAppointments({ ...userState, appointments: data });
      }
    } catch (error) {
      //dispatch({ type: MEDECIN_UPDATE_PROFILE_FAIL, payload: error });
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (successUpdate)
  //     setTimeout(() => {
  //       dispatch({ type: MEDECIN_UPDATE_PROFILE_RESET });
  //       setOpen(false);
  //     }, 3000);
  // }, [successUpdate]);
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Create style={{ color: "black" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
      >
        {/* <Collapse in={loadingUpdate}>
            <LinearProgress color="primary" />
          </Collapse> */}
        <DialogTitle id="form-dialog-title">{t("horaires")}</DialogTitle>
        <Collapse in={ErreurHoraire.length !== 0}>
          <Alert severity="error">
            Heure d'ouverture superieure à heure de fermeture{" "}
          </Alert>
        </Collapse>

        {/* <Collapse in={successUpdate}>
            <Alert severity="success">Modifié avec succès</Alert>
          </Collapse> */}

        <DialogContent>
          <Grid
            container
            spacing={4}
            alignItems="center"
            style={{ marginBottom: "30px" }}
          >
            <Grid item xs={6}>
              <Typography>{t("duree_consultation")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Select
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                fullWidth
                //disabled={dureeSeance !== 0}
                variant="outlined"
              >
                <MenuItem value={10}>10 {t("minutes")}</MenuItem>
                <MenuItem value={15}>15 {t("minutes")}</MenuItem>
                <MenuItem value={20}>20 {t("minutes")}</MenuItem>
                <MenuItem value={30}>30 {t("minutes")}</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>{t("jour")}</TableCell>
                  <TableCell>{t("ouvert")}</TableCell>
                  <TableCell>{t("fermeture")}</TableCell>
                  <TableCell>{t("fermeture")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {heuresDeTravail.map((ht, index) => (
                  <TableRow key={index}>
                    <TableCell>{ht.jour.nom}</TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          ampm={false}
                          name="fermeture"
                          value={ht.ouverture}
                          onChange={(newValue) => {
                            const htTable = [...heuresDeTravail];
                            htTable[index].ouverture = newValue;

                            setHeureDeTravail(htTable);
                            handleErrors();
                          }}
                          disabled={ht.ferme}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          ampm={false}
                          name="fermeture"
                          value={ht.fermeture}
                          onChange={(newValue) => {
                            const htTable = [...heuresDeTravail];
                            htTable[index].fermeture = newValue;

                            setHeureDeTravail(htTable);
                            handleErrors();
                          }}
                          disabled={ht.ferme}
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        color="primary"
                        checked={ht.ferme}
                        onChange={(e) => {
                          const htTable = [...heuresDeTravail];
                          htTable[index].ferme = e.target.checked;
                          setHeureDeTravail(htTable);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button
            //disabled={ErreurHoraire.length !== 0 || loadingUpdate}
            onClick={handleSubmit}
            color="primary"
          >
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateProps = (store) => ({
  appointments: store.userState.appointments,
  userState: store.userState,
  token: store.userState.token,
});

const mapDispatchProps = (dispatch) => ({
  saveAppointments: (user) => dispatch(setUser(user)),
});

export default connect(mapStateProps, mapDispatchProps)(HorairesTravail);
