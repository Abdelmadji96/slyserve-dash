import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { getCommunes, getWilaya } from "../../../../actions/user.actions";

import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  Grid,
  LinearProgress,
  Collapse,
} from "@material-ui/core";
import Navbar from "../../../NavBar/Navbar";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { laboratoireCheckExist } from "../../../../actions/laboratoire";
import { LABORATOIRE_CHECK_EXIST_RESET } from "../../../../actions/laboratoire.types";
import { SAVE_PROFESSIONNEL } from "../../../../actions/professionnel.types";
import { useTranslation } from "react-i18next";
import Footer from "../../../Home/Footer";

const phoneRegExp =
  /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
const validationSchema = yup.object({
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

export default function RegisterLaboratory(props) {
  const { i18n, t } = useTranslation();

  const formik = useFormik({
    initialValues: {
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
      dispatch(laboratoireCheckExist(values.numeroTelephone, values.email));
    },
  });

  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const {
    wilayas,
    loading,
    success: successWilaya,
  } = useSelector((state) => state.wilayasReducer);
  const {
    communes,
    loading: loadingCommune,
    success: successCommune,
  } = useSelector((state) => state.communesReducer);

  const {
    loading: loadingExistLaboratoire,
    message: messageLaboratoireExist,
    error: errorExistLaboratoire,
  } = useSelector((state) => state.laboratoireCheckExistReducer);

  useEffect(() => {
    dispatch(getWilaya());
    dispatch(getCommunes(formik.values.wilaya));
  }, [dispatch, formik.values.wilaya]);

  useEffect(() => {
    if (messageLaboratoireExist === "success") {
      props.history.push("/register/position");
      dispatch({ type: LABORATOIRE_CHECK_EXIST_RESET });
      dispatch({
        type: SAVE_PROFESSIONNEL,
        payload: { professionnel: { ...formik.values, table: "laboratoire" } },
      });
      localStorage.setItem(
        "professionnelInfos",
        JSON.stringify({ ...formik.values, table: "laboratoire" })
      );
    } else {
      setError("Utilisateur existe déja");
      setTimeout(() => {
        dispatch({ type: LABORATOIRE_CHECK_EXIST_RESET });
      }, 5000);
    }
  }, [messageLaboratoireExist]);
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          <Card>
            <Collapse in={loadingExistLaboratoire}>
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

                <Collapse in={messageLaboratoireExist === "fail"}>
                  <Alert severity="error">{error}</Alert>
                </Collapse>
                <div className="register">
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
                  <Typography variant="h6">Adresse</Typography>
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
                </div>
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  disabled={loadingExistLaboratoire || !formik.isValid}
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
