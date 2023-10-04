import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  LinearProgress,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  Collapse,
  Fade,
  Zoom,
} from "@material-ui/core";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Create } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { getMedecinInfos } from "../../../actions/professionnel.actions";
// import { getCommunes, getWilaya } from "../../../actions/user.actions";
import moment from "moment";
import {
  medecinUpdateAdresse,
  medecinUpdateFormations,
  medecinUpdateHoraires,
  medecinUpdateLangues,
  medecinUpdatePresentation,
  medecinUpdateTarifs,
} from "../../../actions/medecin";
// import { MEDECIN_UPDATE_PROFILE_RESET } from "../../../actions/professionnel.types";
import Footer from "../../Home/Footer";
import { connect } from "react-redux";
import HorairesTravail from "./HorairesTravail";
import axios from "axios";

const MaFicheProfessionnel = (props) => {
  const { t } = useTranslation();
  const [horaires, setHoraires] = useState();
  const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  console.log('useruser', user);
  // const dispatch = useDispatch();
  // const { medecin } = useSelector((state) => state.loginMedecinReducer);
  // const { success: successUpdate } = useSelector(
  //   (state) => state.medecinUpdateProfileReducer
  // );
  // const {
  //   medecin: medecinInfos,
  //   loading: loadingMedecinInfo,
  //   success: successLoadingInfo,
  // } = useSelector((state) => state.getMedecinInfos);

  // useEffect(() => {
  //   dispatch(getMedecinInfos(medecin.medecin.id));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (successUpdate)
  //     setTimeout(() => {
  //       dispatch(getMedecinInfos(medecin.medecin.id));
  //     }, 3000);
  // }, [successUpdate]);

  const fetchHoraires = async (medecin, day) => {
    console.log("fetchHoraires", medecin, day);
    try {
      const { data } = await axios.post("/api/medecin/horaires", {
        medecin,
        day,
      });
      console.log('datadata', data);
      setHoraires(data);
      //dispatch({ type: MEDECIN_GET_HORAIRES_SUCCESS, payload: data });
    } catch (error) {
      // dispatch({
      //   type: MEDECIN_GET_HORAIRES_FAIL,
      //   payload:
      //     error.response && error.response.data.message
      //       ? error.response.data.message
      //       : error.message,
      // });
      console.log('fetchHoraires', { ...error });
    }
  };

  useEffect(() => {
    if (user) {
      fetchHoraires(user.id, moment(new Date()).format('yyyy-MM-d'));
    }
  }, []);

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          {/* {loadingMedecinInfo ? (
            <>
              <LinearProgress color="primary" />
              <Card style={{ padding: "20px 0px" }}>
                <Typography variant="h4" align="center" color="primary">
                  {t("fiche_pro_title")}
                </Typography>
              </Card>
            </>
          ) : successLoadingInfo ? ( */}
          <>
            <Card style={{ padding: "20px 0px" }}>
              <Typography variant="h4" align="center" color="primary">
                {t("fiche_pro_title")}
              </Typography>
            </Card>{" "}
            <Card style={{ marginTop: "20px" }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography gutterBottom={5} variant="body1">
                      {t("fiche_pro_fname")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled
                      labe="Nom"
                      value={user.nom} //{medecinInfos.infos.nom}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography gutterBottom={5} variant="body1">
                      {t("fiche_pro_lname")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled
                      value={user.prenom} //{medecinInfos.infos.prenom}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography gutterBottom={5} variant="body1">
                      {t("fiche_pro_birth")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled
                      type="date"
                      value={moment(
                        //medecinInfos.infos.date_naissance
                        user.dateN
                      ).format("YYYY-MM-DD")}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "10px" }}>
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom={5} variant="body1">
                      {t("fiche_pro_spec")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled
                      value={user.specialite} //{medecinInfos.infos.specialite}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography gutterBottom={5} variant="body1">
                      {t("fiche_pro_phone")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled
                      value={user.numeroTelephone} //{medecinInfos.infos.telephone}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{
                    margin: "20px 0",
                  }}
                >
                  <Grid item sm={1}>
                    <Typography variant="body1" gutterBottom={4}>
                      {t("fiche_pro_adress")}
                    </Typography>
                  </Grid>

                  <Grid item sm={10}>
                    <div className="dot"></div>
                  </Grid>

                  <Grid item sm={1}>
                    {/* {loadingMedecinInfo ? (
                      <CircularProgress
                        color="primary"
                        style={{
                          height: "20px",
                          width: "20px",
                          marginLeft: "5px",
                        }}
                      />
                    ) : ( */}
                    <Adresse
                      medecin={
                        user
                        //medecinInfos.infos
                      }
                    />
                    {/* //)} */}
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={1}
                  style={{
                    marginBottom: "20px",
                  }}
                  alignItems="center"
                >
                  <Grid item sm={1}>
                    <Typography variant="body1" gutterBottom={4}>
                      {t("fiche_pro_email")}
                    </Typography>
                  </Grid>
                  <Grid item sm={10}>
                    <div className="dot"></div>
                  </Grid>
                  <Grid item sm={1}>
                    {
                      //!loadingMedecinInfo && (
                      <Email
                        medecin={
                          //medecinInfos.infos
                          user
                        }
                      />
                      //)
                    }
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={1}
                  style={{
                    marginBottom: "20px",
                  }}
                  alignItems="center"
                >
                  <Grid item sm={2}>
                    <Typography variant="body1" gutterBottom={4}>
                      {t("fiche_pro_pass")}
                    </Typography>
                  </Grid>
                  <Grid item sm={9}>
                    <div className="dot"></div>
                  </Grid>
                  <Grid item sm={1}>
                    <MotDePasse />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Grid item sm={3}>
                    <Typography variant="body1" gutterBottom={4}>
                      {t("fiche_pro_horaire")}
                    </Typography>
                  </Grid>
                  <Grid item sm={8}>
                    <div className="dot"></div>
                  </Grid>
                  <Grid item sm={1}>
                    <HorairesTravail
                      horaires={horaires} //{user.horaires} //{medecinInfos.horaires}
                      dureeSeance={user.duree_seance} //{medecinInfos.infos.duree_seance}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Grid item sm={1}>
                    <Typography variant="body1" gutterBottom={4}>
                      {t("tarifs")}
                    </Typography>
                  </Grid>
                  <Grid item sm={10}>
                    <div className="dot"></div>
                  </Grid>

                  <Grid item sm={1}>
                    <Tarifs
                      tarifVideo={user.tarif_video} //{medecinInfos.infos.tarif_video}
                      tarifCabinet={user.tarif_cabinet} //{medecinInfos.infos.tarif_cabinet}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Grid item sm={2}>
                    <Typography variant="body1" gutterBottom={4}>
                      {t("presentation")}
                    </Typography>
                  </Grid>
                  <Grid item sm={9}>
                    <div className="dot"></div>
                  </Grid>
                  <Grid item sm={1}>
                    <Presentation
                      medecin={user} //{medecinInfos.infos}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Grid item sm={2}>
                    <Typography variant="body1" gutterBottom={4}>
                      {t("fiche_pro_langue")}
                    </Typography>
                  </Grid>
                  <Grid item sm={9}>
                    <div className="dot"></div>
                  </Grid>
                  <Grid item sm={1}>
                    <Langues
                      medecin={user} //{medecinInfos.infos}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Grid item sm={2}>
                    <Typography variant="body1" gutterBottom={4}>
                      {t("fiche_pro_formations")}
                    </Typography>
                  </Grid>
                  <Grid item sm={9}>
                    <div className="dot"></div>
                  </Grid>
                  <Grid item sm={1}>
                    <Formations
                      medecin={user} //{medecinInfos.infos}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
          {/* // ) : (
          //   <Card>
          //     <CardContent>Error loading</CardContent>
          //   </Card>
          // )} */}
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

export default connect(mapStateProps, null)(MaFicheProfessionnel);

function Adresse({ medecin }) {
  console.log('medecinmedecin', medecin);
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [wilayaId, setWilayaId] = useState(medecin ? medecin.wilaya : "");
  const [communeId, setCommuneId] = useState(medecin ? medecin.commune : "");
  const [nom_de_rue, setAdresse] = useState(medecin ? medecin.nomRue : "");
  // const {
  //   loading: loadingUpdate,
  //   success: successUpdate,
  //   error,
  // } = useSelector((state) => state.medecinUpdateProfileReducer);
  // const {
  //   wilayas,
  //   loading: loadingWilayas,
  //   success: successWilaya,
  // } = useSelector((state) => state.wilayasReducer);
  // const {
  //   communes,
  //   loading: loadingCommune,
  //   success: successCommune,
  // } = useSelector((state) => state.communesReducer);
  // const dispatch = useDispatch();

  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getWilayas = async () => {
    try {
      const response = await axios.get("/api/wilayas");
      setWilayas(response.data);
    } catch (error) {
      console.log(error);
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
    getCommunes(wilayaId);
  }, [wilayaId]);

  // useEffect(() => {
  //   if (successUpdate) {
  //     setTimeout(() => {
  //       dispatch({ type: MEDECIN_UPDATE_PROFILE_RESET });
  //       setOpen(false);
  //     }, 3000);
  //   }
  // }, [successUpdate]);
  const handleSubmit = () => {
    //dispatch(medecinUpdateAdresse({ wilayaId, communeId, nom_de_rue }));
  };
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
        {/* <Fade in={loadingWilayas || loadingUpdate || loadingCommune}>
          <LinearProgress color="primary" />
        </Fade> */}
        <DialogTitle id="form-dialog-title">{t("adresse")}</DialogTitle>
        {/* <Collapse in={successUpdate}>
          <Alert severity="success">Success</Alert>
        </Collapse> */}
        <DialogContent>
          <TextField
            variant="outlined"
            color="primary"
            fullWidth
            value={nom_de_rue}
            label={t("adresse")}
            required
            onChange={(e) => setAdresse(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                value={wilayaId}
                required
                variant="outlined"
                onChange={(e) => setWilayaId(e.target.value)}
              //disabled={loadingWilayas}
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
            <Grid item xs={12} sm={6}>
              <Select
                value={communeId}
                fullWidth
                variant="outlined"
                //disabled={wilayaId === "" || loadingCommune}
                required
                onChange={(e) => setCommuneId(e.target.value)}
              >
                {
                  //successCommune
                  communes.length > 0 &&
                  communes.map((c) => (
                    <MenuItem value={c.id} key={c.id}>
                      {c.wilaya_id}-
                      {i18n.language == "ar" ? c.nom_ar : c.nom_fr}
                    </MenuItem>
                  ))
                }
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Email({ medecin }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(medecin ? medecin.email : "");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Create style={{ color: "black" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{t("email")}</DialogTitle>
        <DialogContent>
          <TextField
            color="primary"
            fullWidth
            required
            label={t("email")}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button onClick={handleClose} color="primary">
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function MotDePasse() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [motDepasse, setMotDePasse] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Create style={{ color: "black" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{t("password")}</DialogTitle>
        <DialogContent>
          <TextField
            color="primary"
            fullWidth
            required
            label="Nouveau mot de passe"
            variant="outlined"
            value={motDepasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button onClick={handleClose} color="primary">
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Formations({ medecin }) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  //const dispatch = useDispatch();
  const [formations, setFormations] = useState(
    medecin ? medecin.formations : ""
  );
  // const {
  //   loading: loadingUpdate,
  //   success: successUpdate,
  //   error,
  // } = useSelector((state) => state.medecinUpdateProfileReducer);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    //dispatch(medecinUpdateFormations(formations));
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
        <DialogTitle id="form-dialog-title">{t("formation")}</DialogTitle>
        {/* <Collapse in={successUpdate}>
          <Alert severity="success">Modifié avec succès</Alert>
        </Collapse> */}
        <DialogContent>
          <TextField
            color="primary"
            fullWidth
            required
            label={t("formation")}
            rows={5}
            multiline
            variant="outlined"
            value={formations}
            onChange={(e) => setFormations(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
          //disabled={loadingUpdate}
          >
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Presentation({ medecin }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  //const dispatch = useDispatch();
  const [presentation, setPresentation] = useState(
    medecin ? medecin.presentation : ""
  );
  // const {
  //   loading: loadingUpdate,
  //   success: successUpdate,
  //   error,
  // } = useSelector((state) => state.medecinUpdateProfileReducer);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    //dispatch(medecinUpdatePresentation(presentation));
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
        <DialogTitle id="form-dialog-title">{t("presentation")}</DialogTitle>
        {/* <Collapse in={successUpdate}>
          <Alert severity="success">Modifié avec succès</Alert>
        </Collapse> */}
        <DialogContent>
          <TextField
            color="primary"
            fullWidth
            required
            label={t("presentation")}
            rows={5}
            multiline
            variant="outlined"
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
          //disabled={loadingUpdate}
          >
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Tarifs({
  tarifVideo: tarifVideoMedecin,
  tarifCabinet: tarifCabinetMedecin,
}) {
  const [open, setOpen] = React.useState(false);
  const [tarifVideo, setTarifVideo] = useState(tarifVideoMedecin);
  const [tarifCabinet, setTarifCabinet] = useState(tarifCabinetMedecin);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };
  // const {
  //   loading: loadingUpdate,
  //   success: successUpdate,
  //   error,
  // } = useSelector((state) => state.medecinUpdateProfileReducer);
  const handleSubmit = () => {
    dispatch(medecinUpdateTarifs({ tarifCabinet, tarifVideo }));
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
        <DialogTitle id="form-dialog-title">{t("tarifs")}</DialogTitle>
        {/* <Collapse in={successUpdate}>
          <Alert severity="success">Modifié avec succès</Alert>
        </Collapse> */}
        <DialogContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="body1"> {t("teleconsultation")}</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="number"
                onChange={(e) => setTarifVideo(e.target.value)}
                value={tarifVideo}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="body1">{t("cabinet")}</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="number"
                onChange={(e) => setTarifCabinet(e.target.value)}
                value={tarifCabinet}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Langues({ medecin }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [langues, setLangues] = useState(
    medecin ? medecin.langues_parlees : ""
  );
  // const {
  //   loading: loadingUpdate,
  //   success: successUpdate,
  //   error,
  // } = useSelector((state) => state.medecinUpdateProfileReducer);
  // const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    //dispatch(medecinUpdateLangues(langues));
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
        {/* {loadingUpdate && <LinearProgress color="primary" />} */}
        <DialogTitle id="form-dialog-title">{t("langue_parle")}</DialogTitle>
        <DialogContent>
          {/* <Collapse in={successUpdate} style={{ marginBottom: "10px" }}>
            <Alert severity="success">Modifié avec succès</Alert>
          </Collapse> */}
          <TextField
            color="primary"
            fullWidth
            required
            label={t("langue_parle")}
            rows={3}
            multiline
            variant="outlined"
            value={langues}
            onChange={(e) => setLangues(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
          //disabled={loadingUpdate}
          >
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/*
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  LinearProgress,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  Collapse,
  Fade,
  Zoom,
} from "@material-ui/core";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Create } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getMedecinInfos,
  getParamedicalInfos,
} from "../../../actions/professionnel.actions";
import { getCommunes, getWilaya } from "../../../actions/user.actions";
import moment from "moment";
import {
  medecinUpdateAdresse,
  medecinUpdateFormations,
  medecinUpdateHoraires,
  medecinUpdateLangues,
  medecinUpdatePresentation,
  medecinUpdateTarifs,
} from "../../../actions/medecin";
import {
  paramedicalUpdateAdresse,
  paramedicalUpdateFormations,
  paramedicalUpdateHoraires,
  paramedicalUpdateLangues,
  paramedicalUpdatePresentation,
  paramedicalUpdateTarifs,
} from "../../../actions/paramedical";
import {
  MEDECIN_UPDATE_PROFILE_RESET,
  PARAMEDICAL_UPDATE_PROFILE_RESET,
} from "../../../actions/professionnel.types";
import Footer from "../../Home/Footer";
export default function MaFicheProfessionnel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { medecin } = useSelector((state) => state.loginMedecinReducer);
  const { paramedical } = useSelector((state) => state.loginParamedicalReducer);
  // const { success: successUpdate } = useSelector(
  //   (state) => state.medecinUpdateProfileReducer
  // );
  const { success: successUpdate } = useSelector((state) =>
    medecin
      ? state.medecinUpdateProfileReducer
      : paramedical
      ? state.parmedicalUpdateProfileReducer
      : null
  );
  const {
    medecin: medecinInfos,
    loading: loadingMedecinInfo,
    success: successLoadingInfo,
  } = useSelector((state) => state.getMedecinInfos);

  const {
    paramedical: paramedicalInfos,
    loadingParamedical: loadingParamedicalInfo,
  } = useSelector((state) => state.getParamedicalInfos);

  useEffect(() => {
    dispatch(getMedecinInfos(medecin.medecin.id));
    dispatch(getParamedicalInfos(paramedical.paramedical.id));
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate)
      setTimeout(() => {
        dispatch(getMedecinInfos(medecin.medecin.id));
      }, 3000);
  }, [successUpdate]);
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          {loadingMedecinInfo ? (
            <>
              <LinearProgress color="primary" />
              <Card style={{ padding: "20px 0px" }}>
                <Typography variant="h4" align="center" color="primary">
                  {t("fiche_pro_title")}
                </Typography>
              </Card>
            </>
          ) : successLoadingInfo ? (
            <>
              <Card style={{ padding: "20px 0px" }}>
                <Typography variant="h4" align="center" color="primary">
                  {t("fiche_pro_title")}
                </Typography>
              </Card>{" "}
              <Card style={{ marginTop: "20px" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_fname")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        labe="Nom"
                        value={medecinInfos.infos.nom}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_lname")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        value={medecinInfos.infos.prenom}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_birth")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        type="date"
                        value={moment(medecinInfos.infos.date_naissance).format(
                          "YYYY-MM-DD"
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: "10px" }}>
                    <Grid item xs={12} sm={6}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_spec")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        value={medecinInfos.infos.specialite}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_phone")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        value={medecinInfos.infos.telephone}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      margin: "20px 0",
                    }}
                  >
                    <Grid item sm={1}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_adress")}
                      </Typography>
                    </Grid>

                    <Grid item sm={10}>
                      <div className="dot"></div>
                    </Grid>

                    <Grid item sm={1}>
                      {loadingMedecinInfo ? (
                        <CircularProgress
                          color="primary"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginLeft: "5px",
                          }}
                        />
                      ) : (
                        <Adresse medecin={medecinInfos.infos} />
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    style={{
                      marginBottom: "20px",
                    }}
                    alignItems="center"
                  >
                    <Grid item sm={1}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_email")}
                      </Typography>
                    </Grid>
                    <Grid item sm={10}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      {!loadingMedecinInfo && (
                        <Email medecin={medecinInfos.infos} />
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    style={{
                      marginBottom: "20px",
                    }}
                    alignItems="center"
                  >
                    <Grid item sm={2}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_pass")}
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <MotDePasse />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={3}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_horaire")}
                      </Typography>
                    </Grid>
                    <Grid item sm={8}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <HorairesTravail
                        horaires={medecinInfos.horaires}
                        dureeSeance={medecinInfos.infos.duree_seance}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={1}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("tarifs")}
                      </Typography>
                    </Grid>
                    <Grid item sm={10}>
                      <div className="dot"></div>
                    </Grid>

                    <Grid item sm={1}>
                      <Tarifs
                        tarifVideo={medecinInfos.infos.tarif_video}
                        tarifCabinet={medecinInfos.infos.tarif_cabinet}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={2}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("presentation")}
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <Presentation medecin={medecinInfos.infos} />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={2}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_langue")}
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <Langues medecin={medecinInfos.infos} />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={2}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_formations")}
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <Formations medecin={medecinInfos.infos} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent>Error loading</CardContent>
            </Card>
          )}
          ////////////////////////
          {loadingParamedicalInfo ? (
            <>
              <LinearProgress color="primary" />
              <Card style={{ padding: "20px 0px" }}>
                <Typography variant="h4" align="center" color="primary">
                  {t("fiche_pro_title")}
                </Typography>
              </Card>
            </>
          ) : successLoadingInfo ? (
            <>
              <Card style={{ padding: "20px 0px" }}>
                <Typography variant="h4" align="center" color="primary">
                  {t("fiche_pro_title")}
                </Typography>
              </Card>{" "}
              <Card style={{ marginTop: "20px" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_fname")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        labe="Nom"
                        value={paramedicalInfos?.infos.nom}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_lname")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        value={paramedicalInfos?.infos.prenom}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_birth")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        type="date"
                        value={moment(
                          paramedicalInfos?.infos.date_naissance
                        ).format("YYYY-MM-DD")}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: "10px" }}>
                    <Grid item xs={12} sm={6}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_spec")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        value={paramedicalInfos?.infos.specialite}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography gutterBottom={5} variant="body1">
                        {t("fiche_pro_phone")}
                      </Typography>
                      <TextField
                        variant="outlined"
                        color="primary"
                        fullWidth
                        disabled
                        value={paramedicalInfos?.infos.telephone}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      margin: "20px 0",
                    }}
                  >
                    <Grid item sm={1}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_adress")}
                      </Typography>
                    </Grid>

                    <Grid item sm={10}>
                      <div className="dot"></div>
                    </Grid>

                    <Grid item sm={1}>
                      {loadingParamedicalInfo ? (
                        <CircularProgress
                          color="primary"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginLeft: "5px",
                          }}
                        />
                      ) : (
                        <Adresse paramedical={paramedicalInfos?.infos} />
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    style={{
                      marginBottom: "20px",
                    }}
                    alignItems="center"
                  >
                    <Grid item sm={1}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_email")}
                      </Typography>
                    </Grid>
                    <Grid item sm={10}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      {!loadingParamedicalInfo && (
                        <Email paramedical={paramedicalInfos?.infos} />
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={1}
                    style={{
                      marginBottom: "20px",
                    }}
                    alignItems="center"
                  >
                    <Grid item sm={2}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_pass")}
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <MotDePasse />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={3}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_horaire")}
                      </Typography>
                    </Grid>
                    <Grid item sm={8}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <HorairesTravail
                        horaires={paramedicalInfos?.horaires}
                        dureeSeance={paramedicalInfos?.infos.duree_seance}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={1}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("tarifs")}
                      </Typography>
                    </Grid>
                    <Grid item sm={10}>
                      <div className="dot"></div>
                    </Grid>

                    <Grid item sm={1}>
                      <Tarifs
                        tarifVideo={paramedicalInfos?.infos.tarif_video}
                        tarifCabinet={paramedicalInfos?.infos.tarif_cabinet}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={2}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("presentation")}
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <Presentation paramedical={paramedicalInfos?.infos} />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={2}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_langue")}
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <Langues paramedical={paramedicalInfos?.infos} />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <Grid item sm={2}>
                      <Typography variant="body1" gutterBottom={4}>
                        {t("fiche_pro_formations")}
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <div className="dot"></div>
                    </Grid>
                    <Grid item sm={1}>
                      <Formations paramedical={paramedicalInfos?.infos} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent>Error loading</CardContent>
            </Card>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

function Adresse({ medecin, paramedical }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [wilayaId, setWilayaId] = useState(
    medecin ? medecin.wilaya_id : paramedical ? paramedical.eilaya_id : ""
  );
  const [communeId, setCommuneId] = useState(
    medecin ? medecin.commune_id : paramedical ? paramedical.commune_id : ""
  );
  const [nom_de_rue, setAdresse] = useState(
    medecin ? medecin.nom_de_rue : paramedical ? paramedical.nom_de_rue : ""
  );
  // const {
  //   loading: loadingUpdate,
  //   success: successUpdate,
  //   error,
  // } = useSelector((state) => state.medecinUpdateProfileReducer);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error,
  } = useSelector((state) =>
    medecin
      ? state.medecinUpdateProfileReducer
      : paramedical
      ? state.paramedicalUpdateProfileReducer
      : null
  );
  const {
    wilayas,
    loading: loadingWilayas,
    success: successWilaya,
  } = useSelector((state) => state.wilayasReducer);
  const {
    communes,
    loading: loadingCommune,
    success: successCommune,
  } = useSelector((state) => state.communesReducer);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getWilaya());
    dispatch(getCommunes(wilayaId));
  }, [dispatch, wilayaId]);

  useEffect(() => {
    if (successUpdate) {
      setTimeout(() => {
        // dispatch({ type: MEDECIN_UPDATE_PROFILE_RESET });
        if (medecin) {
          dispatch({ type: MEDECIN_UPDATE_PROFILE_RESET });
        } else {
          if (paramedical) {
            dispatch({ type: PARAMEDICAL_UPDATE_PROFILE_RESET });
          }
        }
        setOpen(false);
      }, 3000);
    }
  }, [successUpdate]);
  const handleSubmit = () => {
    // dispatch(medecinUpdateAdresse({ wilayaId, communeId, nom_de_rue }));
    if (medecin) {
      dispatch(medecinUpdateAdresse({ wilayaId, communeId, nom_de_rue }));
    } else {
      if (paramedical) {
        dispatch(paramedicalUpdateAdresse({ wilayaId, communeId, nom_de_rue }));
      }
    }
  };
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
        <Fade in={loadingWilayas || loadingUpdate || loadingCommune}>
          <LinearProgress color="primary" />
        </Fade>
        <DialogTitle id="form-dialog-title">{t("adresse")}</DialogTitle>
        <Collapse in={successUpdate}>
          <Alert severity="success">Success</Alert>
        </Collapse>
        <DialogContent>
          <TextField
            variant="outlined"
            color="primary"
            fullWidth
            value={nom_de_rue}
            label={t("adresse")}
            required
            onChange={(e) => setAdresse(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                value={wilayaId}
                required
                variant="outlined"
                onChange={(e) => setWilayaId(e.target.value)}
                disabled={loadingWilayas}
              >
                {successWilaya &&
                  wilayas.map((w) => (
                    <MenuItem value={w.id} key={w.id}>
                      {w.id}-{i18n.language == "ar" ? w.nom_ar : w.nom_fr}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                value={communeId}
                fullWidth
                variant="outlined"
                disabled={wilayaId === "" || loadingCommune}
                required
                onChange={(e) => setCommuneId(e.target.value)}
              >
                {successCommune &&
                  communes.map((c) => (
                    <MenuItem value={c.id} key={c.id}>
                      {c.wilaya_id}-
                      {i18n.language == "ar" ? c.nom_ar : c.nom_fr}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function HorairesTravail({ horaires, dureeSeance }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [ErreurHoraire, setErreurHoraire] = useState([]);
  const [duree, setDuree] = useState(dureeSeance);
  const dispatch = useDispatch();
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

  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.medecinUpdateProfileReducer);

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
      dispatch(medecinUpdateHoraires(heureTravail1, duree));
    } else {
      dispatch(medecinUpdateHoraires(heureTravail1));
    }
  };

  useEffect(() => {
    if (successUpdate)
      setTimeout(() => {
        dispatch({ type: MEDECIN_UPDATE_PROFILE_RESET });
        setOpen(false);
      }, 3000);
  }, [successUpdate]);
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
        <Collapse in={loadingUpdate}>
          <LinearProgress color="primary" />
        </Collapse>
        <DialogTitle id="form-dialog-title">{t("horaires")}</DialogTitle>
        <Collapse in={ErreurHoraire.length !== 0}>
          <Alert severity="error">
            Heure d'ouverture superieure à heure de fermeture{" "}
          </Alert>
        </Collapse>

        <Collapse in={successUpdate}>
          <Alert severity="success">Modifié avec succès</Alert>
        </Collapse>

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
                disabled={dureeSeance !== 0}
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
            disabled={ErreurHoraire.length !== 0 || loadingUpdate}
            onClick={handleSubmit}
            color="primary"
          >
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Email({ medecin }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(medecin ? medecin.email : "");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Create style={{ color: "black" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{t("email")}</DialogTitle>
        <DialogContent>
          <TextField
            color="primary"
            fullWidth
            required
            label={t("email")}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button onClick={handleClose} color="primary">
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function MotDePasse() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [motDepasse, setMotDePasse] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Create style={{ color: "black" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{t("password")}</DialogTitle>
        <DialogContent>
          <TextField
            color="primary"
            fullWidth
            required
            label="Nouveau mot de passe"
            variant="outlined"
            value={motDepasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button onClick={handleClose} color="primary">
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Formations({ medecin }) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [formations, setFormations] = useState(
    medecin ? medecin.formations : ""
  );
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error,
  } = useSelector((state) => state.medecinUpdateProfileReducer);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    dispatch(medecinUpdateFormations(formations));
  };
  useEffect(() => {
    if (successUpdate)
      setTimeout(() => {
        dispatch({ type: MEDECIN_UPDATE_PROFILE_RESET });
        setOpen(false);
      }, 3000);
  }, [successUpdate]);
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
        <Collapse in={loadingUpdate}>
          <LinearProgress color="primary" />
        </Collapse>
        <DialogTitle id="form-dialog-title">{t("formation")}</DialogTitle>
        <Collapse in={successUpdate}>
          <Alert severity="success">Modifié avec succès</Alert>
        </Collapse>{" "}
        <DialogContent>
          <TextField
            color="primary"
            fullWidth
            required
            label={t("formation")}
            rows={5}
            multiline
            variant="outlined"
            value={formations}
            onChange={(e) => setFormations(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={loadingUpdate}
          >
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Presentation({ medecin }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [presentation, setPresentation] = useState(
    medecin ? medecin.presentation : ""
  );
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error,
  } = useSelector((state) => state.medecinUpdateProfileReducer);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    dispatch(medecinUpdatePresentation(presentation));
  };
  useEffect(() => {
    if (successUpdate)
      setTimeout(() => {
        dispatch({ type: MEDECIN_UPDATE_PROFILE_RESET });
        setOpen(false);
      }, 3000);
  }, [successUpdate]);
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
        <Collapse in={loadingUpdate}>
          <LinearProgress color="primary" />
        </Collapse>
        <DialogTitle id="form-dialog-title">{t("presentation")}</DialogTitle>
        <Collapse in={successUpdate}>
          <Alert severity="success">Modifié avec succès</Alert>
        </Collapse>{" "}
        <DialogContent>
          <TextField
            color="primary"
            fullWidth
            required
            label={t("presentation")}
            rows={5}
            multiline
            variant="outlined"
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={loadingUpdate}
          >
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Tarifs({
  tarifVideo: tarifVideoMedecin,
  tarifCabinet: tarifCabinetMedecin,
}) {
  const [open, setOpen] = React.useState(false);
  const [tarifVideo, setTarifVideo] = useState(tarifVideoMedecin);
  const [tarifCabinet, setTarifCabinet] = useState(tarifCabinetMedecin);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error,
  } = useSelector((state) => state.medecinUpdateProfileReducer);
  const handleSubmit = () => {
    dispatch(medecinUpdateTarifs({ tarifCabinet, tarifVideo }));
  };
  useEffect(() => {
    if (successUpdate)
      setTimeout(() => {
        dispatch({ type: MEDECIN_UPDATE_PROFILE_RESET });
        setOpen(false);
      }, 3000);
  }, [successUpdate]);
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
        <Collapse in={loadingUpdate}>
          <LinearProgress color="primary" />
        </Collapse>
        <DialogTitle id="form-dialog-title">{t("tarifs")}</DialogTitle>
        <Collapse in={successUpdate}>
          <Alert severity="success">Modifié avec succès</Alert>
        </Collapse>{" "}
        <DialogContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="body1"> {t("teleconsultation")}</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="number"
                onChange={(e) => setTarifVideo(e.target.value)}
                value={tarifVideo}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="body1">{t("cabinet")}</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="number"
                onChange={(e) => setTarifCabinet(e.target.value)}
                value={tarifCabinet}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Langues({ medecin }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [langues, setLangues] = useState(
    medecin ? medecin.langues_parlees : ""
  );
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error,
  } = useSelector((state) => state.medecinUpdateProfileReducer);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    dispatch(medecinUpdateLangues(langues));
  };
  useEffect(() => {
    if (successUpdate)
      setTimeout(() => {
        dispatch({ type: MEDECIN_UPDATE_PROFILE_RESET });
        setOpen(false);
      }, 3000);
  }, [successUpdate]);
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
        {loadingUpdate && <LinearProgress color="primary" />}
        <DialogTitle id="form-dialog-title">{t("langue_parle")}</DialogTitle>
        <DialogContent>
          <Collapse in={successUpdate} style={{ marginBottom: "10px" }}>
            <Alert severity="success">Modifié avec succès</Alert>
          </Collapse>{" "}
          <TextField
            color="primary"
            fullWidth
            required
            label={t("langue_parle")}
            rows={3}
            multiline
            variant="outlined"
            value={langues}
            onChange={(e) => setLangues(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button onClick={handleClose} color="primary">
            {t("annuler")}
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={loadingUpdate}
          >
            {t("modifier")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

*/
