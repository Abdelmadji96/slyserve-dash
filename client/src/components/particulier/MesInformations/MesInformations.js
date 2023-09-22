import {
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  Collapse,
  LinearProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import { useTranslation } from "react-i18next";
import {
  getCommunes,
  getWilaya,
  particulierGetProfile,
  particulierUpdateProfile,
} from "../../../actions/user.actions";
//import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
//import { PARTICULIER_UPDATE_PROFILE_RESET } from "../../../actions/user.types";
import Footer from "../../Home/Footer";
import { connect } from "react-redux";
import axios from "axios";

const MesInformations = (props) => {
  // const {
  //   particulier,
  //   loading: loadingProfile,
  //   success: successProfile,
  // } = useSelector((state) => state.particulierGetProfileReducer);

  const [nomRue, setNomRue] = useState("");
  const [wilayaId, setWilayaId] = useState(props.user.wilaya_id);
  const [communeId, setCommuneId] = useState(props.user.commune_id);
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState("");
  const nom = props.user ? props.user.nom : "";
  const prenom = props.user ? props.user.prenom : "";
  const telephone = props.user ? props.user.telephone : "";
  const date_de_naissance = props.user ? props.user.date_de_naissance : "";

  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [loadingWilayas, setLoadingWilayas] = useState(true);
  const [loadingCommune, setLoadingCommune] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState("");
  // const dispatch = useDispatch();
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

  // const { loading: loadingSearch } = useSelector(
  //   (state) => state.laboratoireSearchReducer
  // );

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
      setLoadingWilayas(false);
      setWilayas(responseJson);
    }
  };

  const getCommunes = async (id) => {
    try {
      const body = { wilaya_id: parseInt(id) };
      const communes = await axios.post("/api/communes", body);
      if (communes) {
        setLoadingCommune(false);
        setCommunes(communes["data"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      getWilayas();
      getCommunes(wilayaId)
      // dispatch(getWilaya());
      // dispatch(getCommunes(wilayaId));
    },
    [
      /*dispatch, wilayaId*/
    ]
  );

  // const dispatch = useDispatch();
  // const {
  //   loading: loadingUpdateProfile,
  //   success: successUpdateProfile,
  // } = useSelector((state) => state.particulierUpdateProfileReducer);
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
  // useEffect(() => {
  //   dispatch(getWilaya());
  //   dispatch(getCommunes(wilayaId));
  // }, [dispatch, wilayaId]);

  // useEffect(() => {
  //   dispatch(particulierGetProfile());
  //   if (successProfile) {
  //     setNomRue(particulier.nom_de_rue);
  //     setWilayaId(particulier.wilaya_id);
  //     setCommuneId(particulier.commune_id);
  //     setEmail(particulier.email);
  //   }
  //   if (successUpdateProfile) {
  //     setTimeout(() => {
  //       dispatch({ type: PARTICULIER_UPDATE_PROFILE_RESET });
  //     }, 3000);
  //   }
  // }, [successProfile, successUpdateProfile]);
  // useEffect(() => {
  //   if (successUpdateProfile) {
  //     setTimeout(() => {
  //       dispatch({ type: PARTICULIER_UPDATE_PROFILE_RESET });
  //     }, 3000);
  //   }
  // }, [successUpdateProfile]);

  const handleSubmit = () => {
    const particulier = {
      nomRue,
      wilayaId,
      communeId,
      email,
      password,
    };
    //dispatch(particulierUpdateProfile(particulier));
  };
  const { t, i18n } = useTranslation();
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          {/* <Collapse in={loadingProfile || loadingUpdateProfile}>
            <LinearProgress color="primary" />
          </Collapse> */}
          <Card style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" style={{ color: "red" }}>
              {t("my_info_title")}
            </Typography>
          </Card>
          {
            //successProfile &&
            <Card style={{ marginTop: "20px" }}>
              {/* <Collapse in={successUpdateProfile}>
                <Alert severity="success">Success Update</Alert>
              </Collapse> */}
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Typography gutterBottom={5} variant="body1">
                      {t("fname")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled
                      labe="Nom"
                      value={nom}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom={5} variant="body1">
                      {t("lname")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled
                      value={prenom}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Typography gutterBottom={5} variant="body1">
                      {t("dob")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled
                      value={moment(new Date(date_de_naissance)).format(
                        "YYYY-MM-DD"
                      )}
                      type="date"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom={5} variant="body1">
                      {t("num_tel")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled
                      value={telephone}
                    />
                  </Grid>
                </Grid>

                <div style={{ margin: "20px 0" }}>
                  <Typography variant="h6">{t("adresse")}</Typography>
                  <TextField
                    placeholder={t("nom_rue")}
                    required
                    name="nomDeRue"
                    style={{ marginTop: "5px" }}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    value={nomRue}
                    onChange={(e) => setNomRue(e.target.value)}
                    //disabled={loadingUpdateProfile || successUpdateProfile}
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
                        //disabled={loadingWilaya}
                        value={wilayaId}
                        onChange={(e) => {
                          setWilayaId(e.target.value);
                          getCommunes(e.target.value);
                        }}
                        //disabled={loadingUpdateProfile || successUpdateProfile}
                      >
                        {
                          //successWilaya
                          wilayas.length > 0 &&
                            wilayas.map((w) => (
                              <MenuItem value={w.id} key={w.id}>
                                {w.id}-
                                {i18n.language == "ar" ? w.nom_ar : w.nom_fr}
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
                        //disabled={loadingCommune}
                        variant="outlined"
                        required
                        value={communeId}
                        onChange={(e) => setCommuneId(e.target.value)}
                        //disabled={loadingUpdateProfile || successUpdateProfile}
                      >
                        {
                          //successCommune
                          communes.length > 0 && wilayaId ? (
                            communes.map((c) => (
                              <MenuItem value={c.id} key={c.id}>
                                {c.wilaya_id}-
                                {i18n.language == "ar" ? c.nom_ar : c.nom_fr}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">
                              {t("choisissez_wilaya")}
                            </MenuItem>
                          )
                        }
                      </Select>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <Typography variant="body1" gutterBottom={4}>
                    {t("email")}
                  </Typography>
                  <TextField
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    //disabled={loadingUpdateProfile || successUpdateProfile}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <Typography variant="body1" gutterBottom={4}>
                    {t("password")}
                  </Typography>
                  <TextField
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    //disabled={loadingUpdateProfile || successUpdateProfile}
                  />
                </div>
              </CardContent>
              <CardActions>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleSubmit}
                    //disabled={loadingUpdateProfile || successUpdateProfile}
                  >
                    {t("save_btn")}
                  </button>
                </div>
              </CardActions>
            </Card>
          }
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

export default connect(mapStateProps, mapDispatchProps)(MesInformations);
