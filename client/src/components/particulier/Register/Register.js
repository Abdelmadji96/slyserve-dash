import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../NavBar/Navbar";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import * as yup from "yup";
import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   checkParticulierExist,
//   getCommunes,
//   getWilaya,
// } from "../../../actions/user.actions";
//import { RESET_USER_CHECK } from "../../../actions/professionnel.types";
import { useTranslation } from "react-i18next";
import Footer from "../../Home/Footer";
import axios from "axios";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const phoneRegExp =
  /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

const validationSchema = yup.object({
  nom: yup
    .string()
    .min(3, "Le nom doit avoir minoimun 3 caractères")
    .required("Nom requis"),
  prenom: yup
    .string()
    .min(3, "Le prenom doit avoir minoimun 3 caractères")
    .required("Prenom requis"),
  dateN: yup.date().required("date de naissance requis"),
  numeroTelephone: yup
    .string("Entrez votre numéro de téléphone")
    .matches(phoneRegExp, "Nuémro de telephone non valide")
    .required("Numéro de téléphone requis"),
  confirmationNumeroTelephone: yup
    .string()
    .oneOf([yup.ref("numeroTelephone"), null], "Téléphone pas correct"),
  email: yup
    .string("Entrez votre email")
    .email("Numéro email n'est pas valide")
    .required("Email requis"),
  confirmationEmail: yup
    .string()
    .oneOf([yup.ref("email"), null], "Email pas correct"),
  mdp: yup
    .string("Entrez votre mot de passe")
    .matches(passwdReg, "Mot de passe not correct")
    .required("Mot de passe requis"),
  confirmationmdp: yup
    .string()
    .oneOf([yup.ref("mdp"), null], "Mot de passe pas correct"),
  nomRue: yup
    .string()
    .min(10, "Adresse doit avoir minimun 10 caractères")
    .required("Adresse requise"),
  wilaya: yup.string().required("Wilaya requise"),
  commune: yup.string().required("Commune requise"),
});

export default function Register(props) {
  //const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // const { wilayas, loadingWilaya, success: successWilaya } = useSelector(
  //   (state) => state.wilayasReducer
  // );
  // const {
  //   communes,
  //   loading: loadingCommune,
  //   success: successCommune,
  // } = useSelector((state) => state.communesReducer);

  // const { loading: loadingCheck, success: successCheck } = useSelector(
  //   (state) => state.checkParticulierExistReducer
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

  const formik = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      dateN: "",
      genre: "",
      numeroTelephone: "",
      confirmationNumeroTelephone: "",
      email: "",
      confirmationEmail: "",
      mdp: "",
      confirmationmdp: "",
      nomRue: "",
      wilaya: "",
      commune: "",
      donneur_sang: false,
      groupe_sanguin: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // dispatch(checkParticulierExist(values.numeroTelephone, values.email));
      console.log('valuesvalues', values);
      try {
        const { data } = await axios.post("/api/particulier/check", {
          telephone: values.numeroTelephone,
          email: values.email,
        });
        console.log('datadata', data);
        if (data?.message === 'success') {
          axios.post("/api/particulier/register", values)
            .then(result => (alert('Particulier ajouter avec succès')))
            .catch(error => console.log('errr', error));
        } else {
          alert(JSON.stringify(data?.message));
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    getWilayas();
    getCommunes(formik.values.wilaya);
  }, [formik.values.wilaya]);

  // useEffect(() => {
  //   dispatch(getWilaya());
  //   dispatch(getCommunes(formik.values.wilaya));
  // }, [dispatch, formik.values.wilaya]);

  // useEffect(() => {
  //   if (successCheck === "success") {
  //     dispatch({ type: RESET_USER_CHECK });
  //     localStorage.setItem("particulierInfos", JSON.stringify(formik.values));
  //     if (formik.values.donneur_sang)
  //       props.history.push("/register/particulier/position");
  //     else props.history.push("/register/particulier/identite");
  //   }
  //   if (successCheck === "fail") {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //     setError("Compte existe déja");
  //   }
  // }, [successCheck]);

  const groupeSanguins = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          <Card>
            {/* {(loadingCommune || loadingWilaya || loadingCheck) && (
              <LinearProgress color="primary" />
            )} */}
            <form onSubmit={formik.handleSubmit}>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom={10}>
                  {t("sub_sly_par")}
                </Typography>

                <Typography variant="body2" align="center" gutterBottom={10}>
                  {t("saisir_infos")}
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <div className="register">
                  <div style={{ margin: "20px 0px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label={t("nom")}
                          required
                          fullWidth
                          type="text"
                          name="nom"
                          onBlur={formik.handleBlur}
                          value={formik.values.nom}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.nom && Boolean(formik.errors.nom)
                          }
                          helperText={formik.touched.nom && formik.errors.nom}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label={t("prenom")}
                          required
                          fullWidth
                          type="text"
                          name="prenom"
                          onBlur={formik.handleBlur}
                          value={formik.values.prenom}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.prenom &&
                            Boolean(formik.errors.prenom)
                          }
                          helperText={
                            formik.touched.prenom && formik.errors.prenom
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div>
                        <TextField
                          variant="outlined"
                          label={t("date_n")}
                          required
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type="date"
                          name="dateN"
                          onBlur={formik.handleBlur}
                          value={formik.values.dateN}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.dateN &&
                            Boolean(formik.errors.dateN)
                          }
                          helperText={
                            formik.touched.dateN &&
                            formik.errors.dateN
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <FormControl variant="outlined" fullWidth required>
                          <InputLabel>{t("genre")}</InputLabel>
                          <Select
                            required
                            variant="outlined"
                            name="genre"
                            value={formik.values.genre}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.genre &&
                              Boolean(formik.errors.genre)
                            }
                            helperText={
                              formik.touched.genre && formik.errors.genre
                            }
                          >
                            <MenuItem value="H">{t("homme")}</MenuItem>
                            <MenuItem value="F">{t("femme")}</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ margin: "20px 0px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label={t("num_tel")}
                          name="numeroTelephone"
                          id="numeroTelephone"
                          required
                          fullWidth
                          type="text"
                          onBlur={formik.handleBlur}
                          value={formik.values.numeroTelephone}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.numeroTelephone &&
                            Boolean(formik.errors.numeroTelephone)
                          }
                          helperText={
                            formik.touched.numeroTelephone &&
                            formik.errors.numeroTelephone
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label={t("num_tem_confirm")}
                          name="confirmationNumeroTelephone"
                          id="confirmationNumeroTelephone"
                          required
                          fullWidth
                          onBlur={formik.handleBlur}
                          type="text"
                          value={formik.values.confirmationNumeroTelephone}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.confirmationNumeroTelephone &&
                            Boolean(formik.errors.confirmationNumeroTelephone)
                          }
                          helperText={
                            formik.touched.confirmationNumeroTelephone &&
                            formik.errors.confirmationNumeroTelephone
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div style={{ margin: "20px 0px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label={t("email")}
                          required
                          fullWidth
                          name="email"
                          id="email"
                          onBlur={formik.handleBlur}
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label={t("confirm_email")}
                          required
                          name="confirmationEmail"
                          id="confirmationEmail"
                          fullWidth
                          onBlur={formik.handleBlur}
                          type="email"
                          value={formik.values.confirmationEmail}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.confirmationEmail &&
                            Boolean(formik.errors.confirmationEmail)
                          }
                          helperText={
                            formik.touched.confirmationEmail &&
                            formik.errors.confirmationEmail
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div style={{ margin: "20px 0px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label={t("mdp")}
                          required
                          fullWidth
                          name="mdp"
                          id="mdp"
                          type="text"
                          onBlur={formik.handleBlur}
                          value={formik.values.mdp}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.mdp &&
                            Boolean(formik.errors.mdp)
                          }
                          helperText={
                            formik.touched.mdp &&
                            formik.errors.mdp
                          }
                        />
                        {/* <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">
                            {t("mdp")}
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={passwordVisible ? "text" : "password"}
                            name="mdp"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mdp}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                  }
                                  //onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {passwordVisible ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label={t("mdp")}
                          />
                        </FormControl> */}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label={t("confirmMdp")}
                          name="confirmationmdp"
                          id="confirmationmdp"
                          required
                          fullWidth
                          type="text"
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmationmdp}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.confirmationmdp &&
                            Boolean(formik.errors.confirmationmdp)
                          }
                          helperText={
                            formik.touched.confirmationmdp &&
                            formik.errors.confirmationmdp
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div style={{ margin: "20px 0px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          label={t("donneur_sang")}
                          labelPlacement="end"
                          name="donneur_sang"
                          checked={formik.values.donneur_sang}
                          onChange={formik.handleChange}
                          control={<Checkbox color="primary" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Select
                          fullWidth
                          variant="outlined"
                          required
                          defaultValue=""
                          name="groupe_sanguin"
                          disabled={
                            /*loadingWilaya ||*/ !formik.values.donneur_sang
                          }
                          value={formik.values.groupe_sanguin}
                          onChange={formik.handleChange}
                          error={formik.touched.groupe_sanguin && Boolean(formik.errors.groupe_sanguin)}
                          helperText={formik.touched.groupe_sanguin && formik.errors.groupe_sanguin}
                        >
                          {groupeSanguins.map((groupe_sanguin) => (
                            <MenuItem key={groupe_sanguin} value={groupe_sanguin}>
                              {groupe_sanguin}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </div>
                  <Typography variant="h6">{t("adrese")}</Typography>
                  <TextField
                    label={t("nom_rue")}
                    required
                    style={{ marginTop: "10px" }}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onBlur={formik.handleBlur}
                    value={formik.values.nomRue}
                    onChange={formik.handleChange}
                    name="nomRue"
                    error={
                      formik.touched.nomRue && Boolean(formik.errors.nomRue)
                    }
                    helperText={
                      formik.touched.nomRue && formik.errors.nomRue
                    }
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
                        value={formik.values.wilaya}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.wilaya && Boolean(formik.errors.wilaya)
                        }
                        helperText={
                          formik.touched.wilaya && formik.errors.wilaya
                        }
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
                        value={formik.values.commune}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.commune &&
                          Boolean(formik.errors.commune)
                        }
                        helperText={
                          formik.touched.commune && formik.errors.commune
                        }
                      >
                        {
                          //successCommune
                          communes.length > 0 && formik.values.wilaya ? (
                            communes.map((c) => (
                              <MenuItem value={c.id} key={c.id}>
                                {c.id}-
                                {i18n.language == "ar" ? c.nom_ar : c.nom_fr}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">Choisissez une wilaya</MenuItem>
                          )
                        }
                      </Select>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  //disabled={/*loadingCheck ||*/ !formik.isValid}
                  style={{ minWidth: "120px" }}
                >
                  {t("suivant")}
                </button>
              </CardActions>
            </form>
            {i18n.language == "ar" ? (
              <Typography variant="body1" style={{ padding: "20px" }}>
                <Link to="/login/type" style={{ color: "red" }}>
                  {t("seconnecter")}{" "}
                </Link>
                {t("avez_vous_compte")}
              </Typography>
            ) : (
              <Typography variant="body1" style={{ padding: "20px" }}>
                {t("avez_vous_compte")}
                <Link to="/login/type" style={{ color: "red" }}>
                  {" "}
                  {t("seconnecter")}
                </Link>
              </Typography>
            )}
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
