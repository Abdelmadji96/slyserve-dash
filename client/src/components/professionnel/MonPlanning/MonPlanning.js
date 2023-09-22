import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Radio,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  LinearProgress,
  Collapse,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  CalendarToday,
  Person,
  SearchOutlined,
  WatchLaterOutlined,
  VideocamOutlined,
  AddCircle,
  HomeOutlined,
} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import AvailableRDV from "../../RendezVous/AvailableRDV";
import DateFnsUtils from "@date-io/date-fns";

import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { MedecinGetRDV } from "../../../actions/professionnel.actions";
import Footer from "../../Home/Footer";
import { connect } from "react-redux";
import axios from "axios";

const MonPlanning = (props) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = React.useState("jour");
  const [filterDate, setFilterDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [filterMonth, setFilterMonth] = useState("");
  const [filterPatient, setFilterPatient] = useState("");

  // const { medecin } = useSelector((state) => state.loginMedecinReducer);
  // const dispatch = useDispatch();
  // const { loading: loadingRDV, rdvs, success: successRDV } = useSelector(
  //   (state) => state.medecinGetRDVReducer
  // );
  // useEffect(() => {
  //   dispatch(MedecinGetRDV());
  // }, [dispatch]);

  const [rdvs, setRdvs] = useState();
  const [loadingRDV, setLoadingRdv] = useState(true);

  const getRdvs = async () => {
    try {
      const { data } = await axios.get("/api/rdv/get/bymedecin", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      if (data) {
        setRdvs(data["results"]);
        setLoadingRdv(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRdvs();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setFilterMonth("");
    setFilterDate("");
  };

  console.log(filterPatient);
  const FilterRDV =
    rdvs && (filterMonth || filterDate)
      ? rdvs.filter(
          (rdv) =>
            (rdv.date_rdv.split("T")[0] === filterDate ||
              rdv.date_rdv.slice(0, 7) === filterMonth) &&
            (rdv.nom.toLowerCase().includes(filterPatient.toLowerCase()) ||
              rdv.prenom.toLowerCase().includes(filterPatient.toLowerCase()))
        )
      : rdvs && !filterMonth && !filterMonth && filterPatient
      ? rdvs.filter(
          (rdv) =>
            rdv.nom.toLowerCase().includes(filterPatient.toLowerCase()) ||
            rdv.prenom.toLowerCase().includes(filterPatient.toLowerCase())
        )
      : rdvs;

  const StampNow = new Date().getTime();
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary" align="center">
                {t("planning_title")}
              </Typography>
              <Container maxWidth="sm" style={{ marginTop: "30px" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={11}>
                    <div className="patient-search">
                      <input
                        type="text"
                        placeholder="Recherchez par patient..."
                        value={filterPatient}
                        onChange={(e) => setFilterPatient(e.target.value)}
                      />
                      <SearchOutlined className="patient-search-icon" />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <AddRDV
                      medecinId={
                        //medecin.medecin.id
                        props.user.id
                      }
                    />
                  </Grid>
                </Grid>
              </Container>
            </CardContent>
          </Card>
          <Card style={{ marginTop: "20px" }}>
            <CardContent>
              <Container maxWidth="sm">
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Radio
                      name="display"
                      value="jour"
                      id="jour"
                      color="primary"
                      checked={selectedValue === "jour"}
                      onChange={handleChange}
                    />
                    <Typography variant="body1" htmlFor="jour">
                      {t("by_day")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      variant="outlined"
                      color="primary"
                      value={filterDate}
                      type="date"
                      fullWidth
                      disabled={selectedValue === "mois"}
                      onChange={(e) => setFilterDate(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Radio
                      name="display"
                      value="mois"
                      id="mois"
                      color="primary"
                      checked={selectedValue === "mois"}
                      onChange={handleChange}
                    />
                    <Typography variant="body1" htmlFor="mois">
                      {t("by_month")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      variant="outlined"
                      color="primary"
                      type="month"
                      disabled={selectedValue === "jour"}
                      fullWidth
                      value={filterMonth}
                      defaultValue="2021-05"
                      onChange={(e) => setFilterMonth(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Container>
            </CardContent>
          </Card>
          {loadingRDV ? (
            <CircularProgress color="primary" />
          ) : //successRDV
          rdvs ? (
            FilterRDV.map((rdv, index) => {
              let date = new Date(rdv.date_rdv);
              date.setHours(0);
              date.setMinutes(0);
              const stampRDV =
                date.getTime() +
                parseInt(rdv.heure_rdv.split(":")[0]) * 3600 * 1000 +
                parseInt(rdv.heure_rdv.split(":")[1]) * 60 * 1000;
              return (
                <Card style={{ marginTop: "20px" }}>
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CalendarToday style={{ marginRight: "10px" }} />
                          <Typography variant="body1">
                            RDV {index + 1}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        >
                          <Person style={{ marginRight: "10px" }} />
                          <Typography variant="body1">
                            {rdv.nom} {rdv.prenom}
                          </Typography>
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div>
                          {rdv.type_rdv === "V" ? (
                            <VideocamOutlined
                              style={{ marginRight: "10px", display: "block" }}
                            />
                          ) : (
                            <HomeOutlined
                              style={{ marginRight: "10px", display: "block" }}
                            />
                          )}

                          <WatchLaterOutlined
                            style={{ marginRight: "10px", marginTop: "10px" }}
                          />
                        </div>
                        <div>
                          {rdv.type_rdv === "V" ? (
                            <Typography
                              variant="body1"
                              style={{ marginRight: "30px" }}
                            >
                              {t("teleconsultation")}
                            </Typography>
                          ) : (
                            <Typography variant="body1 ">
                              {t("cabinet")}
                            </Typography>
                          )}
                          <Typography
                            variant="body1"
                            style={{ marginTop: "10px" }}
                          >
                            {moment(rdv.date_rdv).format("DD/MM/YYYY")}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ marginTop: "5px" }}
                          >
                            {rdv.heure_rdv.slice(0, 5)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardActions>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      {StampNow < stampRDV && (
                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            props.history.push(
                              "/medecin/planning/rdv/info/" + rdv.id
                            )
                          }
                          style={{ width: "200px" }}
                        >
                          {t("details")}
                        </button>
                      )}
                    </div>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            "Error"
          )}
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

const mapDispatchProps = (dispatch) => ({});

export default connect(mapStateProps, mapDispatchProps)(MonPlanning);

function AddRDV({ medecinId }) {
  const { t } = useTranslation();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateRDV, handleDateChange] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [heureRDV, setHeureRDV] = useState("");
  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [open, setOpen] = useState(false);

  // const dispatch = useDispatch();

  // const { loading: loadingUpdateRDV, success: successUpdateRDV } = useSelector(
  //   (state) => state.medecinUpdateRDVReducer
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
    };
  };

  // useEffect(() => {
  //   if (successUpdateRDV) {
  //     setTimeout(() => {
  //       setOpen(false);
  //     }, 3000);
  //   }
  // }, [successUpdateRDV]);
  return (
    <div style={{ marginLeft: "10px" }}>
      <IconButton onClick={handleClickOpen}>
        <AddCircle color="primary" style={{ fontSize: "40px" }} />{" "}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        {/* <Collapse in={loadingAvailable || loadingUpdateRDV}>
          <LinearProgress color="primary" />
        </Collapse> */}
        <DialogTitle id="form-dialog-title">
          <Typography variant="h4" align="center">
            {t("ajouter_rdv_cabinet")}
          </Typography>
        </DialogTitle>
        {/* <Collapse in={successUpdateRDV}>
          <Alert color="success">Modifié avec succès</Alert>
        </Collapse> */}
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Typography>{t("nom_patient")}</Typography>
                <TextField
                  variant="outlined"
                  placeholder={t("nom_patient")}
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  color="primary"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t("prenom_patient")}</Typography>
                <TextField
                  variant="outlined"
                  placeholder={t("prenom_patient")}
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  color="primary"
                  fullWidth
                />
              </Grid>
            </Grid>
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
                  InputProps={{ readOnly: true }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <AvailableRDV
                selectedDate={dateRDV}
                medecin={medecinId}
                setHeureRDV={setHeureRDV}
                setLoadingAvailable={setLoadingAvailable}
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
            {t("ajouter")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
