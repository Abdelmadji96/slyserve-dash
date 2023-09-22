import React, { useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  LinearProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import PDFCompteRendu from "./PDFCompteRendu";
import { medecinAjouterCompteRendu } from "../../../actions/medecin";
import { MEDECIN_ADD_COMPTERENDU_RESET } from "../../../actions/professionnel.types";

export default function CompteRendu({ patient }) {
  const [compteRendu, setCompteRendu] = useState("");
  const [nom, setNom] = useState(patient ? patient.nom : "");
  const [prenom, setPrenom] = useState(patient ? patient.prenom : "");
  const [age, setAge] = useState(patient ? patient.age : "");
  const [genre, setGenre] = useState(patient ? patient.genre : "");
  const [tel, setTel] = useState(patient ? patient.telephone : "");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { medecin } = useSelector((state) => state.loginMedecinReducer);
  const { loading, success, error } = useSelector(
    (state) => state.medecinAjouterCompteRenduReducer
  );
  const handleChangeOrdonnance = () => {
    const compteRendu = {
      medecinNom: medecin.medecin.nom,
      medecinPrenom: medecin.medecin.prenom,
      specialite: medecin.medecin.specialite,
      medecinAdresse: medecin.medecin.nom_de_rue,
      medecinTelephone: medecin.medecin.telephone,
      nomPatient: nom,
      prenomPatient: prenom,
      agePatient: age,
      genrePatient: genre,
      telPatient: tel,
      description,
      codebarre: `${medecin.medecin.id} ${patient.id} ${moment(
        new Date()
      ).format("DDMMYYYY")}`,
    };
    setCompteRendu(compteRendu);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    handleChangeOrdonnance();
  }, [nom, prenom, age, genre, description]);

  const handleSubmit = () => {
    dispatch(
      medecinAjouterCompteRendu({
        medecinId: medecin.medecin.id,
        patientId: patient.id,
        description,
        codebarre: `${medecin.medecin.id} ${patient.id} ${moment(
          new Date()
        ).format("DDMMYYYY")}`,
      })
    );
  };
  const handleResetAdd = () => {
    dispatch({
      type: MEDECIN_ADD_COMPTERENDU_RESET,
    });
    setOpen(false);
    setDescription("");
  };

  return (
    <div>
      <button className="btn btn-outline-danger" onClick={handleClickOpen}>
        COMPTE-RENDU
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth
      >
        {loading && <LinearProgress color="primary" />}
        <DialogTitle id="form-dialog-title">
          <Typography variant="h4" align="center">
            Nouveau compte rendu
          </Typography>
          {success && <Alert severity="success">Ajouté</Alert>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inserez les informations suivantes pour ajouter une compte rendu
          </DialogContentText>
          <Typography variant="h6">Patient</Typography>
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="body1" gutterBottom={4}>
                Nom
              </Typography>
              <TextField
                id="nom"
                disabled={success}
                variant="outlined"
                type="text"
                fullWidth
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="body1" gutterBottom={4}>
                Prenom
              </Typography>
              <TextField
                id="prenom"
                disabled={success}
                variant="outlined"
                type="text"
                fullWidth
                value={prenom}
                onChange={(e) => {
                  setPrenom(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body1" gutterBottom={4}>
                Age
              </Typography>
              <TextField
                id="age"
                variant="outlined"
                type="number"
                fullWidth
                disabled={success}
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body1" gutterBottom={4}>
                Sexe
              </Typography>
              <Select
                defaultValue=""
                variant="outlined"
                fullWidth
                value={genre}
                disabled={success}
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
              >
                <MenuItem value="H">Homme</MenuItem>
                <MenuItem value="F">Femme</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body1" gutterBottom={4}>
                Tél
              </Typography>
              <TextField
                id="tel"
                disabled={success}
                variant="outlined"
                type="number"
                fullWidth
                value={tel}
                onChange={(e) => {
                  setTel(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom={4}>
            Déscription
          </Typography>

          <TextField
            id="desc"
            disabled={success}
            variant="outlined"
            type="text"
            multiline
            rows={6}
            fullWidth
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          {success ? (
            <Button onClick={handleResetAdd} color="primary">
              Ok
            </Button>
          ) : (
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
          )}
          {success ? (
            <PDFCompteRendu compteRendu={compteRendu} />
          ) : (
            <Button color="primary" onClick={handleSubmit} disabled={loading}>
              Ajouter
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
