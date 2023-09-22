import React, { useEffect, useState } from "react";

import {
  Select,
  MenuItem,
  Container,
  Grid,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardActions,
  CircularProgress,
  LinearProgress,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Collapse,
  DialogTitle,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { fr, arDZ, enGB, el } from "date-fns/locale";
import Navbar from "../NavBar/Navbar";
import Map from "./Map";
import "./rendezvous.css";
import { getMedecinInfos } from "../../actions/professionnel.actions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";
import { ajouterRdv } from "../../actions/user.actions";
import AvailableRDV from "./AvailableRDV";
import moment from "moment";
import { ADD_RDV_RESET } from "../../actions/user.types";
import { GET_MEDECIN_INFO_RESET } from "../../actions/professionnel.types";
import Footer from "../Home/Footer";

export default function RendezVous(props) {
  const [dateRDV, handleDateChange] = useState(new Date());
  const [typeRdv, setTypeRdv] = useState("C");
  const [heureRDV, setHeureRDV] = useState("");
  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [doctorInfos, setDoctorInfos] = useState(null);

  const dispatch = useDispatch();
  const { id } = props.match.params;
  const { i18n, t } = useTranslation();
  const {
    loading: loadingMedecin,
    success: successMedecin,
    medecin,
    error,
  } = useSelector((state) => state.getMedecinInfos);
  useEffect(() => {
    dispatch(getMedecinInfos(id));
  }, [dispatch, id]);

  // const getDoctorInfos = () => {
  //   const response = await fetch(
  //     API_URL + "/professionnels/medecin/info/" + id,
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-type": "application/json",
  //       },
  //     }
  //   );
  //   const responseJson = await response.json();

  // };

  // useEffect(() => {
  //   getDoctorInfos();
  // }, []);

  let rdv = {};
  if (medecin.infos)
    rdv = {
      typeRdv,
      lien: `${id}${typeRdv}${dateRDV}${heureRDV}`,
      date_rdv: moment(new Date(dateRDV)).format("YYYY-MM-DD"),
      heure_rdv: heureRDV,
      medecin: parseInt(id),
      medecinNom: medecin.infos.nom,
      medecinPrenom: medecin.infos.prenom,
      adresse: `${medecin.infos.nom_de_rue}, ${medecin.infos.commune}, ${medecin.infos.wilaya}`,
      tarifVideo: medecin.infos.tarif_video,
      tarifCabinet: medecin.infos.tarif_cabinet,
    };

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        {/* {loadingMedecin && (
          <Container maxWidth="lg">
            <Card>
              <CardContent>
                <CircularProgress color="primary" />
              </CardContent>
            </Card>
          </Container>
        )} */}
        <Collapse in={successMedecin}>
          {
            //successMedecin && (
            <div>
              <Container maxWidth="lg" style={{ marginBottom: "20px" }}>
                <Card>
                  <CardContent>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Avatar style={{ marginRight: "20px" }} />
                        <div>
                          <Typography variant="h6">
                            {medecin.infos.nom} {medecin.infos.prenom}
                          </Typography>
                          <Typography variant="body2">
                            {medecin.infos.specialite}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Container>
              <div>
                <Container>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Card style={{ margin: "5px 0" }}>
                        <CardHeader title={t("presentation")} />
                        <CardContent>
                          <Typography variant="body2">
                            {medecin.infos.presentation
                              ? medecin.infos.presentation
                              : "/"}
                          </Typography>
                        </CardContent>
                      </Card>

                      <Card style={{ margin: "5px 0px" }}>
                        <CardHeader title={t("tarifs")} />
                        <CardContent>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "5px",
                              borderBottom: "1px solid black",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography variant="body1">
                              {t("teleconsultation")}
                            </Typography>
                            <Typography variant="body1">
                              {medecin.infos.tarif_video
                                ? medecin.infos.tarif_video
                                : "/"}{" "}
                              {t("da")}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingBottom: "5px",
                              borderBottom: "1px solid black",
                              marginBottom: "10px",
                            }}
                          >
                            <Typography variant="body1">
                              {t("cabinet")}
                            </Typography>
                            <Typography variant="body1">
                              {medecin.infos.tarif_cabinet
                                ? medecin.infos.tarif_cabinet
                                : "/"}{" "}
                              {t("da")}
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>

                      <Card style={{ margin: "5px 0px" }}>
                        <CardHeader title={t("carteinfos")} />
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body2" gutterBottom={8}>
                                <strong>{t("adresse")}</strong> :{" "}
                                {medecin.infos.nom_de_rue}
                              </Typography>
                              <Typography variant="body2" gutterBottom={8}>
                                <strong> {t("wilaya")} </strong> :{" "}
                                {medecin.infos.wilaya}
                              </Typography>
                              <Typography variant="body2">
                                <strong>{t("commune")}</strong> :{" "}
                                {medecin.infos.commune}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Map
                                latitude={medecin.infos.latitude}
                                longitude={medecin.infos.longitude}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>

                      <Card style={{ margin: "5px 0px" }}>
                        <CardHeader title={t("horaires")} />
                        <CardContent>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>{t("jour")}</TableCell>
                                <TableCell>{t("ouvert")}</TableCell>
                                <TableCell>{t("fermeture")}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {medecin.horaires.map((ht, index) => {
                                const getDayName = (dayNumber) => {
                                  const daysFR = [
                                    "Dimanche",
                                    "Lundi",
                                    "Mardi",
                                    "Mercredi",
                                    "Jeudi",
                                    "Vendredi",
                                    "Samedi",
                                  ];
                                  const daysAR = [
                                    "الأحد",
                                    "الاثنين",
                                    "الثلاثاء",
                                    "الأربعاء",
                                    "الخميس",
                                    "الجمعة",
                                    "السبت",
                                  ];

                                  return i18n.language === "fr"
                                    ? daysFR[dayNumber]
                                    : daysAR[dayNumber];
                                };

                                return (
                                  <TableRow key={index}>
                                    <TableCell>{getDayName(ht.jour)}</TableCell>
                                    <TableCell>
                                      {ht.ouverture.slice(0, 5)}
                                    </TableCell>
                                    <TableCell>
                                      {ht.fermeture.slice(0, 5)}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                      {medecin.infos.telephone && (
                        <Card style={{ margin: "5px 0px" }}>
                          <CardHeader title={t("contact")} />
                          <CardContent>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                paddingBottom: "5px",
                                borderBottom: "1px solid black",
                                marginBottom: "10px",
                              }}
                            >
                              <Typography variant="body1">
                                {t("num_tel")}{" "}
                              </Typography>
                              <Typography variant="body1">
                                {" "}
                                {medecin.infos.telephone}
                              </Typography>
                            </div>
                            {medecin.infos.email && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  paddingBottom: "5px",
                                  borderBottom: "1px solid black",
                                  marginBottom: "10px",
                                }}
                              >
                                <Typography variant="body1">
                                  {t("email")}{" "}
                                </Typography>
                                <Typography variant="body1">
                                  {" "}
                                  {medecin.infos.email}
                                </Typography>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                      {medecin.infos.langues_parlees && (
                        <Card style={{ margin: "5px 0px" }}>
                          <CardHeader title={t("langue_parle")} />
                          <CardContent>
                            <Typography variant="body1">
                              {medecin.infos.langues_parlees}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}
                      {medecin.infos.formations && (
                        <Card style={{ margin: "5px 0px" }}>
                          <CardHeader title={t("formation")} />
                          <CardContent>
                            <Typography variant="body1">
                              {medecin.infos.formations}
                            </Typography>
                          </CardContent>
                        </Card>
                      )}
                    </Grid>
                    {medecin.infos.abonner_formule_1 === 1 ? (
                      <Grid item xs={12} sm={6}>
                        <Card style={{ marginTop: "5px" }}>
                          <CardContent>
                            <div
                              style={{
                                marginBottom: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <Typography variant="h6">
                                {t("rendezvous")}
                              </Typography>
                              <Typography variant="body2">
                                {t("renseignezinfos")}
                              </Typography>
                            </div>
                            <div
                              style={{
                                marginBottom: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <Typography variant="h6">
                                {t("deja_consulte")}
                              </Typography>

                              <RadioGroup
                                row
                                aria-label="position"
                                name="position"
                                defaultValue="top"
                              >
                                <FormControlLabel
                                  value="oui"
                                  control={<Radio color="primary" />}
                                  label={t("oui")}
                                  labelPlacement="end"
                                />
                                <FormControlLabel
                                  value="non"
                                  control={<Radio color="primary" />}
                                  label={t("non")}
                                  labelPlacement="end"
                                />
                              </RadioGroup>
                            </div>
                            <div
                              style={{
                                marginBottom: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <Typography variant="h6">
                                {t("type_rdv")}
                              </Typography>
                              <div>
                                <Select
                                  fullWidth
                                  required
                                  variant="outlined"
                                  displayEmpty
                                  value={typeRdv}
                                  onChange={(e) => setTypeRdv(e.target.value)}
                                >
                                  <MenuItem value="C">{t("cabinet")}</MenuItem>
                                  {medecin.infos.abonner_formule_2 === 1 && (
                                    <MenuItem value="V">
                                      {t("teleconsultation")}
                                    </MenuItem>
                                  )}
                                </Select>
                              </div>
                            </div>

                            <div
                              style={{
                                marginBottom: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <Typography variant="h6" gutterBottom={8}>
                                {t("date_rdv")}
                              </Typography>
                              <div style={{ margin: "10px 0" }}>
                                <Typography variant="body1">
                                  {t("dat_rdv")}
                                </Typography>
                                <MuiPickersUtilsProvider
                                  utils={DateFnsUtils}
                                  locale={
                                    i18n.language === "en"
                                      ? enGB
                                      : i18n.language === "ar"
                                      ? arDZ
                                      : fr
                                  }
                                >
                                  <KeyboardDatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    fullWidth
                                    format="dd/MM/yyyy"
                                    defaultValue=""
                                    value={dateRDV}
                                    onChange={(date) => {
                                      handleDateChange(date);
                                    }}
                                    minDate={moment(new Date()).format(
                                      "YYYY/MM/DD"
                                    )}
                                    InputProps={{ readOnly: true }}
                                  />
                                </MuiPickersUtilsProvider>
                                <Typography
                                  variant="body1"
                                  style={{ marginTop: "20px" }}
                                >
                                  {t("heure_rdv")} :
                                </Typography>
                                {loadingAvailable && (
                                  <CircularProgress color="primary" />
                                )}
                                <AvailableRDV
                                  selectedDate={dateRDV}
                                  medecin={id}
                                  dureeSeance={medecin.infos.duree_seance}
                                  setHeureRDV={setHeureRDV}
                                  setLoadingAvailable={setLoadingAvailable}
                                />
                              </div>
                            </div>
                          </CardContent>
                          <CardActions
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <RDVConfirm rdv={rdv} {...props} />
                          </CardActions>
                        </Card>
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={6}>
                        <Card
                          style={{ margin: "5px 0", paddingBottom: "100px" }}
                        >
                          <CardContent>
                            <div>
                              <Typography variant="h6">
                                {t("aucun_rdv")}{" "}
                              </Typography>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                </Container>
              </div>
            </div>
          }
        </Collapse>
      </div>
      <Footer />
    </div>
  );
}

function RDVConfirm(props) {
  const { t } = useTranslation();
  const { rdv } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { particulier, login } = useSelector(
    (state) => state.loginParticulierReducer
  );
  const { loading: loadingAddRdv, success: successAddRdv } = useSelector(
    (state) => state.addRDVReducer
  );
  const onSubmit = () => {
    if (login) {
      if (rdv.typeRdv === "V") {
        localStorage.setItem(
          "rdvinfos",
          JSON.stringify({ ...rdv, patient: particulier.particulier.id })
        );
        props.history.push("/payment/register");
      } else
        dispatch(ajouterRdv({ ...rdv, patient: particulier.particulier.id }));
    } else {
      props.history.push("/login/type/particulier");
    }
  };

  useEffect(() => {
    if (successAddRdv)
      setTimeout(() => {
        dispatch({ type: ADD_RDV_RESET });
        props.history.push("/particulier/mesrdv");
      }, 3000);
  }, [successAddRdv]);

  return (
    <div>
      <button
        className="btn btn-outline-danger"
        onClick={handleClickOpen}
        disabled={rdv.heure_rdv == ""}
      >
        {t("prendre_rdv")}{" "}
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <Collapse in={loadingAddRdv}>
          <LinearProgress color="primary" />
        </Collapse>
        <DialogTitle onClose={handleClose}>{t("confirm_rdv")}</DialogTitle>
        <Collapse in={successAddRdv}>
          <Alert severity="success">Rendez-vous ajouté avec succès</Alert>
        </Collapse>
        <DialogContent>
          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
              paddingBottom: "5px",
            }}
          >
            <Typography>{t("type_rdv")} :</Typography>
            <Typography>
              {rdv.typeRdv === "V" ? t("teleconsultation") : t("cabinet")}
            </Typography>
          </div>
          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
              paddingBottom: "5px",
            }}
          >
            <Typography>{t("dat_rdv")} :</Typography>
            <Typography>
              {rdv.date_rdv} / {rdv.heure_rdv}
            </Typography>
          </div>
          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
              paddingBottom: "5px",
            }}
          >
            <Typography>{t("medecin")} :</Typography>
            <Typography>
              DR {rdv.medecinNom} {rdv.medecinPrenom}{" "}
            </Typography>
          </div>
          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
              paddingBottom: "5px",
            }}
          >
            {rdv.typeRdv === "V" ? (
              <>
                <Typography>{t("tarifs")}</Typography>
                <Typography>{rdv.tarifVideo} DA</Typography>
              </>
            ) : (
              <>
                <Typography>{t("adresse")}</Typography>
                <Typography>{rdv.adresse} </Typography>
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button autoFocus onClick={onSubmit} color="primary">
            {t("confirmer")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
