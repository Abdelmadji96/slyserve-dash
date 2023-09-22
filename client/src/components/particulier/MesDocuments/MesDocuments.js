import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import {
  Tab,
  Box,
  Typography,
  AppBar,
  Tabs,
  Container,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Collapse,
  LinearProgress,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { useTranslation } from "react-i18next";
import {
  ArrowRightAltOutlined,
  CalendarTodayOutlined,
} from "@material-ui/icons";
//import { useDispatch, useSelector } from "react-redux";
// import {
//   particulierDeleteOrdonnance,
//   particulierGetComptesRendus,
//   particulierGetOrdonnances,
// } from "../../../actions/user.actions";
import PDFOrdonnance from "../../professionnel/Fichiers/PDF";
import PDFCompteRendu from "../../professionnel/Fichiers/PDFCompteRendu";
//import { PARTICULIER_DELETE_ORDONNANCE_RESET } from "../../../actions/user.types";
import Footer from "../../Home/Footer";
import { connect } from "react-redux";
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

const MesDocuments = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const dispatch = useDispatch();
  // const { particulier } = useSelector((state) => state.loginParticulierReducer);
  // const {
  //   loading: loadingOrdonnance,
  //   success: successOrdonnance,
  //   error: errorOrdonnance,
  //   ordonnances,
  // } = useSelector((state) => state.particulierGetOrdonnancesReducer);

  // const {
  //   loading: loadingComptesRendus,
  //   success: successComptesRendus,
  //   comptesRendus,
  // } = useSelector((state) => state.particulierGetComptesRendusReducer);
  // const { success: successDeleteOrdonnance } = useSelector(
  //   (state) => state.particulierDeleteOrdonnanceReducer
  // );
  // useEffect(() => {
  //   dispatch(particulierGetOrdonnances());
  //   dispatch(particulierGetComptesRendus());
  // }, [dispatch, successDeleteOrdonnance]);
  const [ordonnances, setOrdonnances] = useState([]);
  const [comptesRendus, setComptesRendus] = useState([]);

  const getOrdonnances = async () => {
    try {
      const { data } = await axios.get("/api/ordonnance/get/particulier", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setOrdonnances(data["results"]);
    } catch (error) {
      console.log(error);
    }
  };

  const getComptesRendus = async () => {
    try {
      const { data } = await axios.get("/api/compterendu/get", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setComptesRendus(data["results"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrdonnances();
    getComptesRendus();
  }, []);

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          {/* <Collapse in={loadingOrdonnance || loadingComptesRendus}>
            <LinearProgress color="primary" />
          </Collapse> */}
          <AppBar position="static" color="#fff">
            <Typography
              variant="h4"
              color="primary"
              align="center"
              style={{ paddingTop: "10px" }}
            >
              {t("my_documents_title")}
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label={t("my_doc_title_1")} {...a11yProps(0)} />
              <Tab label={t("my_doc_title_6")} {...a11yProps(1)} />
              <Tab label={t("my_doc_title_3")} {...a11yProps(2)} />
              <Tab label={t("my_doc_title_4")} {...a11yProps(3)} />
              <Tab label={t("my_doc_title_5")} {...a11yProps(4)} />
              <Tab label={t("my_doc_title_2")} {...a11yProps(5)} />
              <Tab label={t("my_doc_title_7")} {...a11yProps(6)} />
              <Tab label={t("my_doc_title_8")} {...a11yProps(6)} />
            </Tabs>
          </AppBar>
        </Container>
        <Container maxWidth="lg">
          <TabPanel value={value} index={0}>
            <Collapse
              in={
                ordonnances.length !== 0
                //successOrdonnance
              }
            >
              {
                //successOrdonnance &&
                ordonnances.length !== 0 ? (
                  ordonnances.map((or, index) => {
                    const ordonnance = {
                      medecinNom: or.infos.nom_medecin,
                      medecinPrenom: or.infos.prenom_medecin,
                      nom_fr: or.infos.specialite,
                      medecinAdresse: or.infos.adresse,
                      nomPatient: props.user.nom, //particulier.particulier.nom,
                      prenomPatient: props.user.prenom, //particulier.particulier.prenom,
                      telPatient: props.user.telephone, //particulier.particulier.telephone,
                      agePatient: getAge(
                        props.user.date_de_naissance
                        //particulier.particulier.date_de_naissance
                      ),
                      medicaments: or.medicaments,
                      codebarre: or.infos.code_barre,
                    };
                    return (
                      <Card style={{ marginBottom: "20px" }} key={index}>
                        <CardContent>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <CalendarTodayOutlined
                                  style={{ marginRight: "10px" }}
                                />
                                <Typography variant="body1">
                                  {or.infos.date_ordonnance.split("T")[0]}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: "20px",
                                }}
                              >
                                <Typography variant="body1">
                                  <img
                                    src="/images/stethoscope.png"
                                    alt="stethoscope"
                                    style={{
                                      height: "30px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  DR {or.infos.nom_medecin}{" "}
                                  {or.infos.prenom_medecin}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  style={{ marginLeft: "5px" }}
                                >
                                  {or.infos.specialite}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  marginLeft: "15px",
                                  marginTop: "10px",
                                }}
                              >
                                {or.medicaments.map((med, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <ArrowRightAltOutlined />
                                    <Typography
                                      variant="body2"
                                      style={{ marginRight: "10px" }}
                                    >
                                      {med.nom}
                                    </Typography>

                                    <Typography variant="body2">
                                      {med.description}
                                    </Typography>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div style={{ display: "flex" }}>
                              <DeleteOrdonnance
                                ordonnanceId={or.infos.ordonnance_id}
                              />
                              <PDFOrdonnance ordonnance={ordonnance} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <Card>
                    <CardContent>Vous n'avez aucune ordonnance</CardContent>
                  </Card>
                )
              }
            </Collapse>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Collapse
              in={
                comptesRendus.length > 0
                //successComptesRendus
              }
            >
              {
                //successComptesRendus
                comptesRendus.length > 0 &&
                  comptesRendus.map((cr, index) => {
                    const compteRendu = {
                      medecinNom: cr.nom_medecin,
                      medecinPrenom: cr.prenom_medecin,
                      nom_fr: cr.specialite,
                      medecinAdresse: cr.adresse,
                      nomPatient: props.user.nom, //particulier.particulier.nom,
                      prenomPatient: props.user.prenom, //particulier.particulier.prenom,
                      telPatient: props.user.telephone, //particulier.particulier.telephone,
                      agePatient: getAge(
                        props.user.date_de_naissance //particulier.particulier.date_de_naissance
                      ),
                      description: cr.description,
                      codebarre: cr.code_barre,
                    };
                    return (
                      <Card style={{ marginBottom: "20px" }} key={index}>
                        <CardContent>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <CalendarTodayOutlined
                                  style={{ marginRight: "10px" }}
                                />
                                <Typography variant="body1">
                                  {cr.date_compte_rendu.split("T")[0]}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: "20px",
                                }}
                              >
                                <Typography variant="body1">
                                  <img
                                    src="/images/stethoscope.png"
                                    alt="stethoscope"
                                    style={{
                                      height: "30px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  DR {cr.nom_medecin} {cr.prenom_medecin}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  style={{ marginLeft: "5px" }}
                                >
                                  {cr.specialite}
                                </Typography>
                              </div>
                              <div
                                style={{
                                  marginLeft: "15px",
                                  marginTop: "10px",
                                  display: "flex",
                                }}
                              >
                                <ArrowRightAltOutlined />
                                <Typography
                                  variant="body2"
                                  style={{ marginRight: "10px" }}
                                >
                                  {cr.description}
                                </Typography>
                              </div>
                            </div>
                            <div>
                              <Button color="primary">Supprimer</Button>
                              <PDFCompteRendu compteRendu={compteRendu} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
              }
            </Collapse>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Card style={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                <div>ra</div>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Card style={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                <button className="btn btn-outline-danger">
                  {t("my_documents_btn")}
                </button>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Card style={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                <button className="btn btn-outline-danger">
                  {t("my_documents_btn")}
                </button>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Card style={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                <button className="btn btn-outline-danger">
                  {t("my_documents_btn")}
                </button>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Card style={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                <button className="btn btn-outline-danger">
                  {t("my_documents_btn")}
                </button>
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={value} index={7}>
            <Card style={{ display: "flex", justifyContent: "center" }}>
              <CardContent>
                <button className="btn btn-outline-danger">
                  {t("my_documents_btn")}
                </button>
              </CardContent>
            </Card>
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

export default connect(mapStateProps, null)(MesDocuments);

function DeleteOrdonnance({ ordonnanceId }) {
  const [open, setOpen] = useState(false);
  //const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const {
  //   loading: loadingDeleteOrdonnance,
  //   success: successDeleteOrdonnance,
  // } = useSelector((state) => state.particulierDeleteOrdonnanceReducer);

  // useEffect(() => {
  //   if (successDeleteOrdonnance) {
  //     setTimeout(() => {
  //       dispatch({ type: PARTICULIER_DELETE_ORDONNANCE_RESET });
  //       setOpen(false);
  //     }, 3000);
  //   }
  // }, [successDeleteOrdonnance]);
  const handleSubmit = () => {
    //dispatch(particulierDeleteOrdonnance(ordonnanceId));
  };
  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Supprimer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        {/* <Collapse in={loadingDeleteOrdonnance}>
          <LinearProgress color="primary" />
        </Collapse> */}
        <DialogTitle id="alert-dialog-title">
          Supprimer une ordonnance
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous êtes sûr de vouloir supprimer cette ordonnance ?
          </DialogContentText>
          {/* <Collapse in={successDeleteOrdonnance}>
            <Alert severity="success">Supprimé avec succès </Alert>
          </Collapse> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
