import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Collapse,
  Button,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
} from "@material-ui/core";
import {
  Person,
  SearchOutlined,
  Create,
  Phone,
  DateRange,
  AddCircle,
} from "@material-ui/icons";
import "./mespatients.css";
import { useTranslation } from "react-i18next";
import Ordonnance from "../Fichiers/Ordonnance";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   medecinAjouterPatient,
//   medecinGetPatients,
// } from "../../../actions/medecin";
import CompteRendu from "../Fichiers/CompteRendu";
// import { MEDECIN_ADD_PATIENT_RESET } from "../../../actions/professionnel.types";
// import { getCommunes, getWilaya } from "../../../actions/user.actions";
import Alert from "@material-ui/lab/Alert";
import Footer from "../../Home/Footer";
import axios from "axios";
import { connect } from "react-redux";

const MesPatients = (props) => {
  //const dispatch = useDispatch();
  const [filterName, setFilterName] = useState("");

  // const { loading, success: successGetPatients, error, patients } = useSelector(
  //   (state) => state.medecinGetPatientsReducer
  // );
  // const { success: successAddPatient } = useSelector(
  //   (state) => state.medecinAjouterPatientReducer
  // );
  // useEffect(() => {
  //   dispatch(medecinGetPatients());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (successAddPatient)
  //     setTimeout(() => {
  //       dispatch(medecinGetPatients());
  //     }, 3000);
  // }, [successAddPatient]);

  const [patients, setPatients] = useState([]);

  const getPatients = async () => {
    try {
      const { data } = await axios.get("/api/medecin/patients/get", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      setPatients(data["results"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatients();
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
  let filterResults = patients
    ? patients.filter(
        (p) =>
          p.nom.toLowerCase().includes(filterName.toLowerCase()) ||
          p.prenom.toLowerCase().includes(filterName.toLowerCase())
      )
    : patients;
  const { t } = useTranslation();
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          <Card>
            {/* {loading && <LinearProgress color="primary" />} */}
            <CardContent>
              <div>
                <Typography variant="h4" color="primary" align="center">
                  {t("mes_patients_title")}
                </Typography>
                <Container maxWidth="sm" style={{ marginTop: "30px" }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={11}>
                      <div className="patient-search">
                        <input
                          type="text"
                          placeholder="Recherchez ..."
                          value={filterName}
                          onChange={(e) => setFilterName(e.target.value)}
                        />
                        <SearchOutlined className="patient-search-icon" />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <AddPatient />
                    </Grid>
                  </Grid>
                </Container>
              </div>
            </CardContent>
          </Card>
          <Collapse
            in={
              //successGetPatients
              patients.length > 0
            }
          >
            {
              //successGetPatients
              patients.length > 0 &&
                filterResults.map((patient, index) => (
                  <Card style={{ marginTop: "20px" }} key={index}>
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
                              marginTop: "10px",
                              alignItems: "center",
                            }}
                          >
                            <Create style={{ marginRight: "10px" }} />
                            <Typography variant="body1">{index + 1}</Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              marginTop: "10px",
                              alignItems: "center",
                            }}
                          >
                            <Person style={{ marginRight: "10px" }} />
                            <Typography variant="body1">
                              {patient.nom} {patient.prenom}
                            </Typography>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              marginTop: "10px",
                              alignItems: "center",
                            }}
                          >
                            <DateRange style={{ marginRight: "10px" }} />
                            <Typography variant="body1">
                              {getAge(patient.date_de_naissance)} ans
                            </Typography>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              marginTop: "10px",
                              alignItems: "center",
                            }}
                          >
                            <Phone style={{ marginRight: "10px" }} />
                            <Typography variant="body1">
                              {patient.telephone}
                            </Typography>
                          </div>
                        </div>
                        {patient.particulier_id !== 0 && (
                          <div style={{ display: "flex" }}>
                            <div style={{ marginRight: "20px" }}>
                              <Ordonnance
                                patient={{
                                  ...patient,
                                  age: getAge(patient.date_de_naissance),
                                }}
                              />
                            </div>
                            <CompteRendu
                              patient={{
                                ...patient,
                                age: getAge(patient.date_de_naissance),
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
            }
          </Collapse>
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

export default connect(mapStateProps, mapDispatchProps)(MesPatients);

const AddPatient = connect(
  mapStateProps,
  mapDispatchProps
)((props) => {
  const { t, i18n } = useTranslation();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateDeNaissance, setDateDeNaissance] = useState("");
  const [genre, setGenre] = useState("");
  const [tel, setTel] = useState("");

  const [nomRue, setNomRue] = useState("");
  const [wilayaId, setWilayaId] = useState("");
  const [communeId, setCommuneId] = useState("");
  const [open, setOpen] = useState(false);

  // const dispatch = useDispatch();

  // const {
  //   wilayas,
  //   loading: loadingWilaya,
  //   success: successWilaya,
  // } = useSelector((state) => state.wilayasReducer);

  // const {
  //   communes,
  //   loading: loadingCommune,
  //   success: successCommune,
  // } = useSelector((state) => state.communesReducer);

  // const {
  //   loading: loadingAddPatient,
  //   success: successAddPatient,
  //   error: errorAddPatient,
  // } = useSelector((state) => state.medecinAjouterPatientReducer);

  // useEffect(() => {
  //   dispatch(getWilaya());
  //   dispatch(getCommunes(wilayaId));
  // }, [dispatch, wilayaId]);

  // useEffect(() => {
  //   if (successAddPatient) {
  //     setTimeout(() => {
  //       dispatch({ type: MEDECIN_ADD_PATIENT_RESET });
  //       setOpen(false);
  //       setNom("");
  //       setPrenom("");
  //       setDateDeNaissance("");
  //       setGenre("");
  //       setNomRue("");
  //       setTel("");
  //       setWilayaId("");
  //       setCommuneId("");
  //     }, [3000]);
  //   }
  // }, [successAddPatient]);

  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);

  const getWilayas = async () => {
    const response = await fetch("/api/wilayas", {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    const responseJson = await response.json();
    if (responseJson) {
      setWilayas(responseJson);
    }
  };

  const getCommunes = async (id) => {
    try {
      const body = { wilaya_id: parseInt(id) };
      const communes = await axios.post("/api/communes", body);
      if (communes) {
        setCommunes(communes["data"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWilayas();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    alert(props.token);
    const patient = {
      nom,
      prenom,
      date_de_naissance: dateDeNaissance,
      genre,
      nom_de_rue: nomRue,
      wilaya_id: wilayaId,
      commune_id: communeId,
      telephone: tel,
    };
    try {
      const { data } = await axios.post("/api/medecin/patients/add", patient, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      alert(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ marginLeft: "10px" }}>
      <IconButton onClick={handleClickOpen}>
        <AddCircle color="primary" style={{ fontSize: "40px" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        {/* <Collapse in={loadingAddPatient || loadingCommune || loadingWilaya}>
          <LinearProgress color="primary" />
        </Collapse> */}
        <DialogTitle id="form-dialog-title">
          <Typography variant="h4" align="center">
            {t("nouveau_patient")}{" "}
          </Typography>
        </DialogTitle>
        {/* <Collapse in={successAddPatient}>
          <Alert color="success">Ajouté avec succès</Alert>
        </Collapse> */}
        <DialogContent>
          <DialogContentText>{t("ajouter_infos_patient")} </DialogContentText>
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom={4}>
                {t("nom")}
              </Typography>
              <TextField
                id="nom"
                placeholder={t("nom")}
                variant="outlined"
                type="text"
                fullWidth
                // disabled={
                //   loadingAddPatient || successAddPatient || loadingWilaya
                // }
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom={4}>
                {t("prenom")}
              </Typography>
              <TextField
                id="prenom"
                placeholder={t("prenom")}
                variant="outlined"
                type="text"
                fullWidth
                // disabled={
                //   loadingAddPatient || successAddPatient || loadingWilaya
                // }
                value={prenom}
                onChange={(e) => {
                  setPrenom(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            <Grid item xs={4}>
              <Typography variant="body1" gutterBottom={4}>
                {t("date_n")}
              </Typography>
              <TextField
                id="date_naissance"
                variant="outlined"
                type="date"
                fullWidth
                // disabled={
                //   loadingAddPatient || successAddPatient || loadingWilaya
                // }
                value={dateDeNaissance}
                onChange={(e) => {
                  setDateDeNaissance(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" gutterBottom={4}>
                {t("genre")}
              </Typography>
              <Select
                defaultValue="H"
                variant="outlined"
                fullWidth
                // disabled={
                //   loadingAddPatient || successAddPatient || loadingWilaya
                // }
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
              >
                <MenuItem value="H">{t("homme")}</MenuItem>
                <MenuItem value="F">{t("femme")}</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" gutterBottom={4}>
                {t("phone_number")}
              </Typography>
              <TextField
                id="tel"
                placeholder={t("phone_number")}
                variant="outlined"
                type="number"
                fullWidth
                // disabled={
                //   loadingAddPatient || successAddPatient || loadingWilaya
                // }
                value={tel}
                onChange={(e) => {
                  setTel(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <div>
            <Typography variant="h6">{t("adresse")}</Typography>
            <TextField
              placeholder={t("nom_rue")}
              required
              name="nomDeRue"
              style={{ marginTop: "5px" }}
              variant="outlined"
              color="primary"
              fullWidth
              //disabled={loadingAddPatient || successAddPatient || loadingWilaya}
              value={nomRue}
              onChange={(e) => setNomRue(e.target.value)}
            />
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom={8}>
                  {t("wilaya")}
                </Typography>
                <Select
                  fullWidth
                  variant="outlined"
                  required
                  defaultValue=""
                  name="wilaya"
                  // disabled={
                  //   loadingAddPatient || successAddPatient || loadingWilaya
                  // }
                  value={wilayaId}
                  onChange={(e) => {
                    setWilayaId(e.target.value);
                    getCommunes(e.target.value);
                  }}
                >
                  {
                    //successWilaya
                    wilayas.length > 0 &&
                      wilayas.map((w) => (
                        <MenuItem value={w.id} key={w.id}>
                          {w.id}-{i18n.language == "ar" ? w.nom_ar : w.nom_fr}
                        </MenuItem>
                      ))
                  }
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" gutterBottom={8}>
                  {t("commune")}
                </Typography>
                <Select
                  defaultValue=""
                  fullWidth
                  name="commune"
                  // disabled={
                  //   loadingCommune || loadingAddPatient || successAddPatient
                  // }
                  variant="outlined"
                  required
                  value={communeId}
                  onChange={(e) => setCommuneId(e.target.value)}
                >
                  {
                    //successCommune
                    communes.length > 0 && wilayaId ? (
                      communes.map((c) => (
                        <MenuItem value={c.id} key={c.id}>
                          {c.wilaya_id}-{i18n.language ? c.nom_ar : c.nom_fr}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">{t("choisissez_wilaya")}</MenuItem>
                    )
                  }
                </Select>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>

          <Button
            color="primary"
            onClick={handleSubmit}
            //disabled={loadingAddPatient || successAddPatient || loadingWilaya}
          >
            {t("ajouter")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
