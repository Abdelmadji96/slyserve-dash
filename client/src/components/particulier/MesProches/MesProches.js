import React, { useState, useEffect } from "react";
import Navbar from "../../NavBar/Navbar";
//import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  TextField,
  DialogContentText,
  DialogTitle,
  Collapse,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import {
  PersonOutline,
  CalendarToday,
  LocationOnOutlined,
  AddCircle,
} from "@material-ui/icons";

import { useTranslation } from "react-i18next";
// import {
//   getCommunes,
//   getWilaya,
//   particulierAjouterProche,
//   particulierGetProches,
// } from "../../../actions/user.actions";
// import Alert from "@material-ui/lab/Alert";
// import { PARTICULIER_ADD_PROCHE_RESET } from "../../../actions/user.types";
import Footer from "../../Home/Footer";
import { connect } from "react-redux";
import axios from "axios";

const MesProches = (props) => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  // const {
  //   loading: loadingProches,
  //   success: successProches,
  //   proches,
  // } = useSelector((state) => state.particulierGetProchesReducer);
  // const { success: successAddProche } = useSelector(
  //   (state) => state.particulierAjouterProcheReducer
  // );

  // useEffect(() => {
  //   dispatch(particulierGetProches());
  // }, [successProches, successAddProche]);

  const [proches, setProches] = useState([]);

  const getProches = async () => {
    try {
      const response = await fetch("/api/particulier/proche/get", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      });
      const data = await response.json();
      setProches(data["results"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProches();
  }, []);

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          {/* <Collapse in={loadingProches}>
            <LinearProgress color="primary" />
          </Collapse> */}

          <Card style={{ marginBottom: "30px" }}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" color="primary">
                  {t("mes_proches_title")}
                </Typography>
                <AddProche />
              </div>
            </CardContent>
          </Card>
          <Collapse
            in={
              //successProches
              proches.length > 0
            }
          >
            {
              //successProches
              proches.length > 0 &&
                proches.map((pr) => (
                  <Card style={{ marginTop: "20px" }}>
                    <CardContent>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <PersonOutline style={{ marginRight: "10px" }} />
                        <Typography variant="body1">
                          {pr.nom} {pr.prenom}{" "}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <CalendarToday style={{ marginRight: "10px" }} />
                        <Typography variant="body1">
                          {pr.date_de_naissance.split("T")[0]}
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <LocationOnOutlined style={{ marginRight: "10px" }} />
                        <Typography variant="body1">{pr.nom_de_rue}</Typography>
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

export default connect(mapStateProps, null)(MesProches);

function AddProche() {
  const { t, i18n } = useTranslation();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateDeNaissance, setDateDeNaissance] = useState("");
  const [genre, setGenre] = useState("");

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
  //   loading: loadingAddProche,
  //   success: successAddProche,
  //   error: errorAddProche,
  // } = useSelector((state) => state.particulierAjouterProcheReducer);

  // useEffect(() => {
  //   dispatch(getWilaya());
  //   dispatch(getCommunes(wilayaId));
  // }, [dispatch, wilayaId]);

  // useEffect(() => {
  //   if (successAddProche) {
  //     setTimeout(() => {
  //       dispatch({ type: PARTICULIER_ADD_PROCHE_RESET });
  //       setOpen(false);
  //       setNom("");
  //       setPrenom("");
  //       setDateDeNaissance("");
  //       setGenre("");
  //       setNomRue("");
  //     }, [3000]);
  //   }
  // }, [successAddProche]);

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
      //setLoadingWilayas(false);
      setWilayas(responseJson);
    }
  };

  const getCommunes = async (id) => {
    try {
      const body = { wilaya_id: parseInt(id) };
      const communes = await axios.post("/api/communes", body);
      if (communes) {
        //setLoadingCommune(false);
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

  const handleSubmit = () => {
    const proche = {
      nom,
      prenom,
      date_de_naissance: dateDeNaissance,
      genre,
      nom_de_rue: nomRue,
      wilaya_id: wilayaId,
      commune_id: communeId,
    };
    //dispatch(particulierAjouterProche(proche));
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
        {/* <Collapse in={loadingAddProche || loadingCommune || loadingWilaya}>
          <LinearProgress color="primary" />
        </Collapse> */}
        <DialogTitle id="form-dialog-title">
          <Typography variant="h4" align="center">
            {t("ajouter_proche")}
          </Typography>
        </DialogTitle>
        {/* <Collapse in={successAddProche}>
          <Alert color="success">{t("ajoute_success")}</Alert>
        </Collapse> */}
        <DialogContent>
          <DialogContentText>{t("inserer_infos")}</DialogContentText>
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
                //disabled={loadingAddProche || successAddProche || loadingWilaya}
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
                //disabled={loadingAddProche || successAddProche || loadingWilaya}
                value={prenom}
                onChange={(e) => {
                  setPrenom(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom={4}>
                {t("date_n")}
              </Typography>
              <TextField
                id="date_naissance"
                variant="outlined"
                type="date"
                fullWidth
                //disabled={loadingAddProche || successAddProche || loadingWilaya}
                value={dateDeNaissance}
                onChange={(e) => {
                  setDateDeNaissance(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom={4}>
                {t("genre")}
              </Typography>
              <Select
                defaultValue="H"
                variant="outlined"
                fullWidth
                //disabled={loadingAddProche || successAddProche || loadingWilaya}
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
              >
                <MenuItem value="H">{t("homme")}</MenuItem>
                <MenuItem value="F">{t("femme")}</MenuItem>
              </Select>
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
              //disabled={loadingAddProche || successAddProche || loadingWilaya}
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
                  //   loadingAddProche || successAddProche || loadingWilaya
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
                  //   loadingCommune || loadingAddProche || successAddProche
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
                          {c.wilaya_id}-
                          {(i18n.language = "ar" ? c.nom_ar : c.nom_fr)}
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
            //disabled={loadingAddProche || successAddProche || loadingWilaya}
          >
            {t("ajouter")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
