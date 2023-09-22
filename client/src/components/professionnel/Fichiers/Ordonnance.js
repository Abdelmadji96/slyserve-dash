import React, { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
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
  Tooltip,
  LinearProgress,
  Collapse,
} from "@material-ui/core";
import { AddCircle, Cancel } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import PDFOrdonnance from "./PDF";
import { medecinAjouterOrdonnance } from "../../../actions/medecin";
import { MEDECIN_ADD_ORDONNANCE_RESET } from "../../../actions/professionnel.types";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";

export default function Ordonnance({ patient }) {
  const [ordonnance, setOrdonnance] = useState("");
  const [nom, setNom] = useState(patient ? patient.nom : "");
  const [prenom, setPrenom] = useState(patient ? patient.prenom : "");
  const [age, setAge] = useState(patient ? patient.age : "");
  const [genre, setGenre] = useState(patient ? patient.genre : "");
  const [tel, setTel] = useState(patient ? patient.telephone : "");
  const dispatch = useDispatch();
  const { medecin } = useSelector((state) => state.loginMedecinReducer);
  const { loading, success, error } = useSelector(
    (state) => state.medecinAjouterOrdonnanceReducer
  );
  const [open, setOpen] = useState(false);

  const [medicaments, setMedicaments] = useState([
    {
      nom: "",
      description: "",
    },
  ]);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let med = [...medicaments];
    med[index][name] = value;
    setMedicaments(med);
  };

  const handleChangeOrdonnance = () => {
    const ordonnance = {
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
      medicaments,
      codebarre: `${medecin.medecin.id} ${patient.id} ${moment(
        new Date()
      ).format("DDMMYYYY")}`,
    };
    setOrdonnance(ordonnance);
  };
  const addMedicament = () => {
    setMedicaments([
      ...medicaments,
      {
        nom: "",
        description: "",
      },
    ]);
  };
  const removeMedicament = (id) => {
    const list = [...medicaments];
    list.splice(id, 1);
    setMedicaments(list);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    handleChangeOrdonnance();
  }, [nom, prenom, age, genre, medicaments]);

  const handleSubmit = () => {
    dispatch(
      medecinAjouterOrdonnance({
        medecinId: medecin.medecin.id,
        patientId: patient.id,
        codebarre: `${medecin.medecin.id} ${patient.id} ${moment(
          new Date()
        ).format("DDMMYYYY")}`,
        medicaments,
      })
    );
  };

  const handleResetAdd = () => {
    dispatch({
      type: MEDECIN_ADD_ORDONNANCE_RESET,
    });
    setOpen(false);
    setMedicaments([
      {
        nom: "",
        description: "",
      },
    ]);
  };

  return (
    <div>
      <button className="btn btn-outline-danger" onClick={handleClickOpen}>
        ORDONNANCE
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
            Nouvelle ordonnance
          </Typography>
          <Collapse in={success}>
            <Alert severity="success">Ajouté</Alert>
          </Collapse>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inserez les informations suivantes pour ajouter une ordonnance
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
            Medicaments
          </Typography>

          <Medicament
            medicaments={medicaments}
            addMedicament={addMedicament}
            removeMedicament={removeMedicament}
            handleChange={handleChange}
            success={success}
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
            <PDFOrdonnance ordonnance={ordonnance} />
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

const Medicament = ({
  medicaments,
  handleChange,
  addMedicament,
  removeMedicament,
  success,
}) => {
  return medicaments.map((med, index) => (
    <Grid
      container
      spacing={2}
      style={{ marginBottom: "10px" }}
      alignItems="flex-end"
    >
      <Grid item xs={12} sm={5}>
        <Typography variant="body2" gutterBottom={4}>
          Nom médicament
        </Typography>
        <TextField
          type="text"
          fullWidth
          name="nom"
          disabled={success}
          variant="outlined"
          value={med.nom}
          onChange={(e) => {
            handleChange(e, index);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Typography variant="body2" gutterBottom={4}>
          Déscription
        </Typography>
        <TextField
          type="text"
          fullWidth
          name="description"
          disabled={success}
          variant="outlined"
          value={med.description}
          onChange={(e) => {
            handleChange(e, index);
          }}
        />
      </Grid>
      <Grid item item xs={1}>
        {index + 1 === medicaments.length && (
          <Tooltip title="Ajouter un médicament">
            <IconButton
              onClick={addMedicament}
              disabled={success || !med.description || !med.nom}
            >
              <AddCircle color="primary" style={{ fontSize: "35px" }} />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
      <Grid item xs={1}>
        {medicaments.length !== 1 && (
          <Tooltip title="Supprimer le médicament">
            <IconButton
              onClick={() => removeMedicament(index)}
              disabled={success}
            >
              <Cancel color="primary" style={{ fontSize: "35px" }} />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  ));
};
