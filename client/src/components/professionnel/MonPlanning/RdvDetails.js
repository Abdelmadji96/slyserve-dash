import {
  Card,
  CardContent,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  LinearProgress,
  Collapse,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  CalendarToday,
  WatchLaterOutlined,
  PersonOutlined,
} from "@material-ui/icons";

import Alert from "@material-ui/lab/Alert";
import AvailableRDV from "../../RendezVous/AvailableRDV";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../NavBar/Navbar";
import {
  MedecinGetRDVByID,
  medecinUpdateRDV,
} from "../../../actions/professionnel.actions";
import moment from "moment";
import { MEDECIN_UPDATE_RDV_RESET } from "../../../actions/professionnel.types";

export default function RdvDetailsMedecin(props) {
  const rdvID = props.match.params.id;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { medecin } = useSelector((state) => state.loginMedecinReducer);
  const { rdv, loading: loadingRDV, success: successRDV } = useSelector(
    (state) => state.medecinGetRDVByIDReducer
  );
  const { success: successUpdate } = useSelector(
    (state) => state.medecinUpdateRDVReducer
  );
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  useEffect(() => {
    dispatch(MedecinGetRDVByID(rdvID));
  }, [dispatch, rdvID]);

  useEffect(() => {
    if (successUpdate)
      setTimeout(() => {
        dispatch(MedecinGetRDVByID(rdvID));
      }, 3000);
  }, [dispatch, successUpdate]);
  const Stamp5Minutes = 5 * 60 * 1000;
  const StampNow = new Date().getTime();
  let date = 0;
  let stampRDV = 0;
  if (successRDV && rdv[0]) {
    date = new Date(rdv[0].date_rdv);
  }

  if (successRDV && rdv[0])
    stampRDV =
      date.getTime() +
      parseInt(rdv[0].heure_rdv.split(":")[0]) * 3600 * 1000 +
      parseInt(rdv[0].heure_rdv.split(":")[1]) * 60 * 1000;
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          <Card>
            {loadingRDV && <LinearProgress color="primary" />}
            <CardContent>
              <Typography variant="h4" color="primary" align="center">
                Détails Rendez-vous
              </Typography>
            </CardContent>
          </Card>
          <Collapse in={successRDV}>
            {successRDV && rdv[0] && (
              <Card style={{ marginTop: "50px" }}>
                <CardContent>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CalendarToday style={{ marginRight: "12px" }} />
                      <Typography variant="body1">
                        {moment(rdv[0].date_rdv).format("DD/MM/YYYY")}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <WatchLaterOutlined style={{ marginRight: "5px" }} />
                      <Typography variant="body1">
                        {rdv[0].heure_rdv.slice(0, 5)}
                      </Typography>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <PersonOutlined style={{ marginRight: "10px" }} />
                      <Typography variant="body1">
                        {rdv[0].nom_patient} {rdv[0].prenom_patient}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "30px 0",
                  }}
                >
                  {rdv[0].type_rdv === "V" &&
                    medecin.medecin.abonner_formule_2 === 1 &&
                    stampRDV - StampNow < Stamp5Minutes && (
                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          props.history.push(
                            `/video/${rdv[0].lien_consultation}`
                          )
                        }
                        style={{ width: "200px" }}
                      >
                        Téléconsultation
                      </button>
                    )}

                  <UpdateRDV rdv={rdv[0]} />

                  <button
                    className="btn btn-outline-danger"
                    style={{ width: "200px" }}
                  >
                    Annuler
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => props.history.push("/monplanning")}
                    style={{ width: "200px" }}
                  >
                    Retour
                  </button>
                </div>
              </Card>
            )}
          </Collapse>
        </Container>
      </div>
    </div>
  );
}

function UpdateRDV({ rdv }) {
  const [dateRDV, handleDateChange] = useState(rdv.date_rdv);
  const [heureRDV, setHeureRDV] = useState("");
  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { loading: loadingUpdateRDV, success: successUpdateRDV } = useSelector(
    (state) => state.medecinUpdateRDVReducer
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const rdvUpdate = {
      heure_rdv: `${heureRDV}:00`,
      date_rdv: moment(new Date(dateRDV)).format("YYYY-MM-DD"),
      id: rdv.id,
    };
    dispatch(medecinUpdateRDV(rdvUpdate));
  };

  useEffect(() => {
    if (successUpdateRDV) {
      setTimeout(() => {
        dispatch({ type: MEDECIN_UPDATE_RDV_RESET });
        setOpen(false);
      }, 3000);
    }
  }, [successUpdateRDV]);
  return (
    <div style={{ marginLeft: "10px" }}>
      <button
        className="btn btn-outline-danger"
        onClick={handleClickOpen}
        style={{ width: "200px" }}
      >
        Modifier
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <Collapse in={loadingAvailable || loadingUpdateRDV}>
          <LinearProgress color="primary" />
        </Collapse>
        <DialogTitle id="form-dialog-title">
          <Typography variant="h4" align="center">
            Modifier le rendez-vous
          </Typography>
        </DialogTitle>
        <Collapse in={successUpdateRDV}>
          <Alert color="success">Modifié avec succès</Alert>
        </Collapse>
        <DialogContent>
          <DialogContentText>
            <div style={{ margin: "10px 0" }}>
              <Typography variant="body1">Date du rendez-vous</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  helperText={false}
                  variant="inline"
                  inputVariant="outlined"
                  fullWidth
                  format="dd/MM/yyyy"
                  defaultValue=""
                  value={dateRDV}
                  onChange={(date) => {
                    handleDateChange(date);
                  }}
                  minDate={moment(new Date()).format("YYYY/MM/DD")}
                  InputProps={{ readOnly: true }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <AvailableRDV
                selectedDate={dateRDV}
                medecin={rdv.medecin_id}
                setHeureRDV={setHeureRDV}
                setLoadingAvailable={setLoadingAvailable}
                dureeSeance={10}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Annuler
          </Button>
          <Button
            autoFocus
            color="primary"
            disabled={loadingAvailable || loadingUpdateRDV || successUpdateRDV}
            onClick={handleSubmit}
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
