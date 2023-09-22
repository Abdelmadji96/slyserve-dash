import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Box,
  LinearProgress,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Alert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import {
  CalendarToday,
  HomeOutlined,
  VideoCallOutlined,
  WatchLaterOutlined,
} from "@material-ui/icons";

import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   particulierAnnulerRDV,
//   particulierGetRDV,
//   particulierUpdateRDV,
// } from "../../../actions/user.actions";
import moment from "moment";
// import AvailableRDV from "../../RendezVous/AvailableRDV";
// import {
//   PARTICULIER_ANNULER_RDV_RESET,
//   PARTICULIER_UPDATE_RDV_RESET,
// } from "../../../actions/user.types";
import Footer from "../../Home/Footer";
import { connect } from "react-redux";
import AvailableRDV from "../../RendezVous/AvailableRDV";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const MesRendezVous = (props) => {
  const [value, setValue] = React.useState(0);
  const { t, i18n } = useTranslation();
  //const dispatch = useDispatch();
  const [video, setvideo] = useState(false);
  const [cabinet, setcabinet] = useState(false);
  const [rdvs, setRdvs] = useState();
  // const { loading: loadingRDV, rdvs, success: successRDV } = useSelector(
  //   (state) => state.particulierGetRDVReducer
  // );
  // const { success: successUpdateRDV } = useSelector(
  //   (state) => state.particulierUpdateRDVReducer
  // );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const { success: successAnnulerRDV } = useSelector(
  //   (state) => state.particulierAnnulerRDVReducer
  // );
  // useEffect(() => {
  //   dispatch(particulierGetRDV());
  // }, [dispatch, successUpdateRDV, successAnnulerRDV]);

  const getRdvs = async () => {
    try {
      const response = await fetch("/api/rdv/get", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      });
      const data = await response.json();
      // const { data } = await axios.get("/api/rdv/get", {
      //   headers: {
      //     Authorization: `Bearer ${props.token}`,
      //   },
      // });
      setRdvs(data)
    } catch (error) {
      console.log(error);
      //   dispatch({
      //     type: PARTICULIER_GET_RDV_FAIL,
      //     payload:
      //       error.response && error.response.data.message
      //         ? error.response.data.message
      //         : error.message,
      //   });
    }
  };

  useEffect(() => {
    getRdvs();
  }, []);

  const canChangeRDV = (date_rdv) => {
    const dateRDVStamp = new Date(date_rdv).getTime();
    return dateRDVStamp > Date.now() + 24 * 3600 * 1000;
  };

  const Stamp5Minutes = 5 * 60 * 1000;
  const StampNow = new Date().getTime();

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          <AppBar position="static" color="#fff">
            {/* <Collapse in={loadingRDV}>
              <LinearProgress color="primary" />
            </Collapse> */}
            <Typography
              variant="h4"
              color="primary"
              align="center"
              style={{ paddingTop: "10px" }}
            >
              {t("rdv_title")}
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label={t("coming_rdv")} {...a11yProps(0)} />
              <Tab label={t("past_rdv")} {...a11yProps(1)} />
              <Tab label={t("annuler")} {...a11yProps(2)} />
            </Tabs>
          </AppBar>
        </Container>
        <Container maxWidth="lg">
          <TabPanel value={value} index={0}>
            <Collapse
              in={
                //successRDV
                rdvs
              }
              timeout={2000}
            >
              {
                //successRDV
                rdvs &&
                  rdvs.venir.map((r) => {
                    let date = new Date(r.date_rdv);
                    date.setHours(0);
                    date.setMinutes(0);
                    const stampRDV =
                      date.getTime() +
                      parseInt(r.heure_rdv.split(":")[0]) * 3600 * 1000 +
                      parseInt(r.heure_rdv.split(":")[1]) * 60 * 1000;

                    return (
                      <Card key={r.id} style={{ marginTop: "15px" }}>
                        <CardContent>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
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
                                {moment(r.date_rdv).format("DD/MM/YYYY")}
                              </Typography>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <WatchLaterOutlined
                                style={{ marginRight: "5px" }}
                              />
                              <Typography variant="body1">
                                {r.heure_rdv.slice(0, 5)}
                              </Typography>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginTop: "10px",
                              }}
                            >
                              <img
                                src="/images/stethoscope.png"
                                alt="stethoscope"
                                style={{ height: "30px", marginRight: "5px" }}
                              />
                              <div>
                                <Typography variant="body1">
                                  Dr {r.nom} {r.prenom}
                                </Typography>
                                <Typography variant="body2">
                                  {r.nom_fr}
                                </Typography>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "10px",
                              }}
                            >
                              {r.type_rdv === "V" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <VideoCallOutlined
                                    style={{ marginRight: "5px" }}
                                  />
                                  <Typography variant="body1">
                                    {t("teleconsultation")}
                                  </Typography>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <HomeOutlined
                                    style={{ marginRight: "5px" }}
                                  />
                                  <Typography variant="body1">
                                    {t("cabinet")}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                        <CardActions>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {r.type_rdv === "V" ? (
                              <>
                                {stampRDV - StampNow < Stamp5Minutes && (
                                  <button
                                    className="btn btn-outline-danger"
                                    style={{ width: "150px" }}
                                    onClick={() =>
                                      props.history.push(
                                        "/video/" + r.lien_consultation
                                      )
                                    }
                                  >
                                    {t("teleconsultation")}
                                  </button>
                                )}

                                {canChangeRDV(r.date_rdv) && (
                                  <UpdateRDV rdv={r} />
                                )}
                                {canChangeRDV(r.date_rdv) && (
                                  <AnnulerRDV rdvId={r.id} />
                                )}
                              </>
                            ) : (
                              <>
                                {canChangeRDV(r.date_rdv) && (
                                  <UpdateRDV rdv={r} />
                                )}
                                {canChangeRDV(r.date_rdv) && (
                                  <AnnulerRDV rdvId={r.id} />
                                )}
                              </>
                            )}
                          </div>
                        </CardActions>
                      </Card>
                    );
                  })
              }
            </Collapse>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                style={!video && !cabinet ? style : { borderRadius: "20px" }}
                className="btn btn-outline-danger"
                onClick={() => {
                  setvideo(false);
                  setcabinet(false);
                }}
              >
                Tous
              </button>
              <button
                style={video ? style : { borderRadius: "20px" }}
                className="btn btn-outline-danger"
                onClick={() => {
                  setvideo(true);
                  setcabinet(false);
                }}
              >
                Vidéo
              </button>
              <button
                style={cabinet ? style : { borderRadius: "20px" }}
                className="btn btn-outline-danger"
                onClick={() => {
                  setvideo(false);
                  setcabinet(true);
                }}
              >
                Cabinet
              </button>
            </div> */}

            <Collapse
              in={
                //successRDV
                rdvs
              }
              timeout={2000}
            >
              {
                //successRDV
                rdvs &&
                  rdvs.passe.map((r) => (
                    <Card key={r.id} style={{ marginTop: "15px" }}>
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
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
                              {moment(r.date_rdv).format("DD/MM/YYYY")}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <WatchLaterOutlined
                              style={{ marginRight: "5px" }}
                            />
                            <Typography variant="body1">
                              {r.heure_rdv.slice(0, 5)}
                            </Typography>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginTop: "10px",
                            }}
                          >
                            <img
                              src="/images/stethoscope.png"
                              alt="stethoscope"
                              style={{ height: "30px", marginRight: "5px" }}
                            />
                            <div>
                              <Typography variant="body1">
                                Dr {r.nom} {r.prenom}
                              </Typography>
                              <Typography variant="body2">
                                {r.nom_fr}
                              </Typography>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            {r.type_rdv === "V" ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <VideoCallOutlined
                                  style={{ marginRight: "5px" }}
                                />
                                <Typography variant="body1">
                                  {t("teleconsultation")}
                                </Typography>
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <HomeOutlined style={{ marginRight: "5px" }} />
                                <Typography variant="body1">
                                  {t("cabinet")}
                                </Typography>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              }
            </Collapse>
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                style={!video && !cabinet ? style : { borderRadius: "20px" }}
                className="btn btn-outline-danger"
                onClick={() => {
                  setvideo(false);
                  setcabinet(false);
                }}
              >
                Tous
              </button>
              <button
                style={video ? style : { borderRadius: "20px" }}
                className="btn btn-outline-danger"
                onClick={() => {
                  setvideo(true);
                  setcabinet(false);
                }}
              >
                Vidéo
              </button>
              <button
                style={cabinet ? style : { borderRadius: "20px" }}
                className="btn btn-outline-danger"
                onClick={() => {
                  setvideo(false);
                  setcabinet(true);
                }}
              >
                Cabinet
              </button>
            </div> */}

            <Collapse
              in={
                //successRDV
                rdvs
              }
              timeout={2000}
            >
              {
                //successRDV
                rdvs &&
                  rdvs.annule.map((r) => (
                    <Card key={r.id} style={{ marginTop: "15px" }}>
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
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
                              {moment(r.date_rdv).format("DD/MM/YYYY")}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <WatchLaterOutlined
                              style={{ marginRight: "5px" }}
                            />
                            <Typography variant="body1">
                              {r.heure_rdv.slice(0, 5)}
                            </Typography>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginTop: "10px",
                            }}
                          >
                            <img
                              src="/images/stethoscope.png"
                              alt="stethoscope"
                              style={{ height: "30px", marginRight: "5px" }}
                            />
                            <div>
                              <Typography variant="body1">
                                Dr {r.nom} {r.prenom}
                              </Typography>
                              <Typography variant="body2">
                                {r.nom_fr}
                              </Typography>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            {r.type_rdv === "V" ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <VideoCallOutlined
                                  style={{ marginRight: "5px" }}
                                />
                                <Typography variant="body1">
                                  {t("teleconsultation")}
                                </Typography>
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <HomeOutlined style={{ marginRight: "5px" }} />
                                <Typography variant="body1">
                                  {t("cabinet")}
                                </Typography>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              }
            </Collapse>
          </TabPanel>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

const mapStateProps = (store) => ({
  user: store.userState.currentUser,
  role: store.userState.role,
  token: store.userState.token,
});

export default connect(mapStateProps, null)(MesRendezVous);

function UpdateRDV({ rdv }) {
  const { t } = useTranslation();

  const [dateRDV, handleDateChange] = useState(rdv.date_rdv);
  const [heureRDV, setHeureRDV] = useState("");
  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [open, setOpen] = useState(false);

  // const dispatch = useDispatch();

  // const { loading: loadingUpdateRDV, success: successUpdateRDV } = useSelector(
  //   (state) => state.particulierUpdateRDVReducer
  // );

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
    //dispatch(particulierUpdateRDV(rdvUpdate));
  };

  // useEffect(() => {
  //   if (successUpdateRDV) {
  //     setTimeout(() => {
  //       dispatch({ type: PARTICULIER_UPDATE_RDV_RESET });
  //       setOpen(false);
  //     }, 3000);
  //   }
  // }, [successUpdateRDV]);
  return (
    <div style={{ marginLeft: "10px" }}>
      <button className="btn btn-outline-danger" onClick={handleClickOpen}>
        Modifier
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
      >
        {/* <Collapse in={loadingAvailable || loadingUpdateRDV}>
          <LinearProgress color="primary" />
        </Collapse> */}
        <DialogTitle id="form-dialog-title">
          <Typography variant="h4" align="center">
            {t("modifier_rdv")}
          </Typography>
        </DialogTitle>
        {/* <Collapse in={successUpdateRDV}>
          <Alert color="success">Modifié avec succès</Alert>
        </Collapse> */}
        <DialogContent>
          <DialogContentText>
            <div style={{ margin: "10px 0" }}>
              <Typography variant="body1">{t("date_rdv")}</Typography>
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
                  maxDate={moment(
                    new Date(Date.now() + 6 * 24 * 3600 * 1000)
                  ).format("YYYY/MM/DD")}
                  InputProps={{ readOnly: true }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <AvailableRDV
                selectedDate={dateRDV}
                medecin={rdv.medecin_id}
                setHeureRDV={setHeureRDV}
                //setLoadingAvailable={setLoadingAvailable}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t("annuler")}
          </Button>
          <Button
            autoFocus
            color="primary"
            //disabled={loadingAvailable || loadingUpdateRDV || successUpdateRDV}
            onClick={handleSubmit}
          >
            {t("modifier_rdv")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function AnnulerRDV({ rdvId }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  //const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const { loading: loadingAnnulerRDV, success: successAnnulerRDV } =
  //   useSelector((state) => state.particulierAnnulerRDVReducer);

  const handleSubmit = () => {
    //dispatch(particulierAnnulerRDV(rdvId));
  };
  // useEffect(() => {
  //   if (successAnnulerRDV) {
  //     setTimeout(() => {
  //       dispatch({ type: PARTICULIER_ANNULER_RDV_RESET });
  //       setOpen(false);
  //     }, 3000);
  //   }
  // });

  return (
    <div>
      <button
        className="btn btn-outline-danger"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        {t("annuler_rdv")}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        {/* <Collapse in={loadingAnnulerRDV}>
          <LinearProgress color="primary" />
        </Collapse> */}
        <DialogTitle id="alert-dialog-title"> Annuler rendez-vous </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("confirmer_annuler")}
          </DialogContentText>
          {/* <Collapse in={successAnnulerRDV}>
            <Alert severity="success">Annulé avec succès </Alert>
          </Collapse> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("non")}
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            {"oui"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
