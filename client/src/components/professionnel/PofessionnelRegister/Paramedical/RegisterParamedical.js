import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { getCommunes, getWilaya } from "../../../../actions/user.actions";
import { useTranslation } from "react-i18next";
import { RESET_USER_CHECK } from "../../../../actions/professionnel.types";

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
  Collapse,
} from "@material-ui/core";
import Navbar from "../../../NavBar/Navbar";
import Alert from "@material-ui/lab/Alert";
import {
  checkParamedicalExist,
  getSpecialites,
} from "../../../../actions/professionnel.actions";
import { Link } from "react-router-dom";
import Footer from "../../../Home/Footer";

const phoneRegExp = /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

const validationSchema = yup.object({
  nom: yup
    .string()
    .min(3, "Nom doit avoir au moins 3 caractères")
    .required("Nom obligatoire"),
  prenom: yup
    .string()
    .min(3, "Prenom doit avoir au moins 3 caractères")
    .required("Prenom obligatoire"),
  dateDeNaissance: yup.date().required("Date de naissance obligatoire"),
  genre: yup.string().required("Genre obligatoire"),
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
  motDePasse: yup
    .string("Entrez votre mot de passe")
    .matches(passwdReg, "Mot de passe not correct")
    .required("Mot de passe requis"),
  confirmationMotDePasse: yup
    .string()
    .oneOf([yup.ref("motDePasse"), null], "Mot de passe pas correct"),
  nomDeRue: yup
    .string()
    .min(10, "Adresse doit avoir minimun 10 caractères")
    .required("Adresse requise"),
  wilaya: yup.string().required("Wilaya requise"),
  commune: yup.string().required("Commune requise"),
});

export default function PorfessionnelRegister(props) {
  const [error, setError] = useState("");

  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      dateDeNaissance: "",
      genre: "",
      specialite: "",
      numeroTelephone: "",
      confirmationNumeroTelephone: "",
      email: "",
      confirmationEmail: "",
      motDePasse: "",
      confirmationMotDePasse: "",
      nomDeRue: "",
      wilaya: "",
      commune: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(checkParamedicalExist(values.numeroTelephone, values.email));
    },
  });
  const { wilayas, loading, success: successWilaya } = useSelector(
    (state) => state.wilayasReducer
  );
  const { specialites, success: successSpecialite } = useSelector(
    (state) => state.specialitesReducer
  );

  const { loading: loadingCheckPro, success: successCheck } = useSelector(
    (state) => state.checkProfessionnelExist
  );
  const {
    communes,
    loading: loadingCommune,
    success: successCommune,
  } = useSelector((state) => state.communesReducer);

  useEffect(() => {
    dispatch(getWilaya());
    dispatch(getSpecialites());
    dispatch(getCommunes(formik.values.wilaya));
  }, [dispatch, formik.values.wilaya]);

  useEffect(() => {
    if (successCheck === "success") {
      localStorage.setItem(
        "professionnelInfos",
        JSON.stringify({ ...formik.values, table: "paramedical" })
      );
      dispatch({ type: RESET_USER_CHECK });
      props.history.push("/register/position");
    }
    if (successCheck === "fail") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setError("Utlisateur existe déja");
    }
  }, [successCheck, props, formik.values, dispatch]);

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          <Card style={{ marginTop: "50px" }}>
            <Collapse in={loadingCheckPro}>
              <LinearProgress color="primary" />
            </Collapse>

            <form onSubmit={formik.handleSubmit}>
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom={10}>
                  {t("sub_sly_pro")}
                </Typography>

                <Typography variant="body2" align="center" gutterBottom={10}>
                  {t("saisir_infos")}
                </Typography>
                <Collapse in={error !== ""}>
                  <Alert severity="error">{error}</Alert>
                </Collapse>

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
                          name="dateDeNaissance"
                          onBlur={formik.handleBlur}
                          value={formik.values.dateDeNaissance}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.dateDeNaissance &&
                            Boolean(formik.errors.dateDeNaissance)
                          }
                          helperText={
                            formik.touched.dateDeNaissance &&
                            formik.errors.dateDeNaissance
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <FormControl variant="outlined" fullWidth required>
                          <InputLabel>Genre</InputLabel>
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
                          name="confirmationNumeroTelephone"
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
                          name="confirmationNumeroTelephone"
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
                          name="confirmationNumeroTelephone"
                          required
                          fullWidth
                          name="motDePasse"
                          id="motDePasse"
                          type="text"
                          onBlur={formik.handleBlur}
                          value={formik.values.motDePasse}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.motDePasse &&
                            Boolean(formik.errors.motDePasse)
                          }
                          helperText={
                            formik.touched.motDePasse &&
                            formik.errors.motDePasse
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="outlined"
                          label={t("confirmMdp")}
                          name="confirmationNumeroTelephone"
                          name="confirmationMotDePasse"
                          id="confirmationMotDePasse"
                          required
                          fullWidth
                          type="text"
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmationMotDePasse}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.confirmationMotDePasse &&
                            Boolean(formik.errors.confirmationMotDePasse)
                          }
                          helperText={
                            formik.touched.confirmationMotDePasse &&
                            formik.errors.confirmationMotDePasse
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <Typography variant="h6">{t("adrese")}</Typography>
                  <TextField
                    label={t("nom_rue")}
                    required
                    name="nomDeRue"
                    style={{ marginTop: "10px" }}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onBlur={formik.handleBlur}
                    value={formik.values.nomDeRue}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.nomDeRue && Boolean(formik.errors.nomDeRue)
                    }
                    helperText={
                      formik.touched.nomDeRue && formik.errors.nomDeRue
                    }
                  />{" "}
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
                        disabled={loading}
                        value={formik.values.wilaya}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.wilaya && Boolean(formik.errors.wilaya)
                        }
                        helperText={
                          formik.touched.wilaya && formik.errors.wilaya
                        }
                      >
                        {successWilaya &&
                          wilayas.map((w) => (
                            <MenuItem value={w.id} key={w.id}>
                              {w.id}-
                              {i18n.language == "ar" ? w.nom_ar : w.nom_fr}
                            </MenuItem>
                          ))}
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
                        disabled={formik.values.wilaya === "" || loadingCommune}
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
                  <div style={{ margin: "20px 0" }}>
                    <Typography variant="body1" gutterBottom={8}>
                      {t("specialite")}
                    </Typography>
                    <Select
                      value={formik.values.specialite}
                      defaultValue=""
                      fullWidth
                      name="specialite"
                      variant="outlined"
                      required
                      onChange={formik.handleChange}
                      error={
                        formik.touched.specialite &&
                        Boolean(formik.errors.specialite)
                      }
                      helperText={
                        formik.touched.specialite && formik.errors.specialite
                      }
                    >
                      {successSpecialite &&
                        specialites.map((s) => (
                          <MenuItem value={s.id} key={s.id}>
                            {s.id}-
                            {i18n.language === "ar" ? s.nom_ar : s.nom_fr}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  disabled={loadingCheckPro || !formik.isValid}
                  style={{ minWidth: "120px" }}
                >
                  {t("suivant")}
                </button>
              </CardActions>
            </form>

            {i18n.language == "ar" ? (
              <Typography variant="body1" style={{ padding: "20px" }}>
                <Link to="/login/type" style={{ color: "red" }}>
                  {t("seconnecter")}
                </Link>
                {t("avez_vous_compte")}
              </Typography>
            ) : (
              <Typography variant="body1" style={{ padding: "20px" }}>
                {t("avez_vous_compte")}
                <Link to="/login/type" style={{ color: "red" }}>
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
