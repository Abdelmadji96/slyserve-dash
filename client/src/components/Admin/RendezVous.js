import {
  CardContent,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  Card,
  Collapse,
  LinearProgress,
  TextField,
} from "@material-ui/core";

import Pagination from "@mui/material/Pagination";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminGetRDVs } from "../../actions/Admin/admin.actions";
import NavbarAdmin from "./AdminNavbar";
import moment from "moment";

export default function RendezVous() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const comptesPerPage = 4;
  const lastCompte = currentPage * comptesPerPage;
  const indexFirstCompte = lastCompte - comptesPerPage;
  const [filterRDVs, setFilterRDVs] = useState([]);

  const { loading, success, rdvs } = useSelector(
    (state) => state.adminGetRdvsReducer
  );
  useEffect(() => {
    dispatch(adminGetRDVs());
  }, [dispatch]);

  useEffect(() => {
    if (success) setFilterRDVs(rdvs);
  }, [success]);

  let currentComptes = [];
  if (success && rdvs)
    currentComptes = filterRDVs.slice(indexFirstCompte, lastCompte);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onFilter = (date, annule, type) => {
    setCurrentPage(1);
    let filter = [];
    if (date && annule && type)
      filter = rdvs.filter(
        (r) =>
          moment(new Date(r.date_rdv)).format("YYYY-MM-DD") == date &&
          r.annule == annule &&
          r.type_rdv == type
      );

    if (date && type && !annule)
      filter = rdvs.filter(
        (r) =>
          moment(new Date(r.date_rdv)).format("YYYY-MM-DD") == date &&
          r.type_rdv == type
      );
    if (date && annule && !type)
      filter = rdvs.filter(
        (r) =>
          moment(new Date(r.date_rdv)).format("YYYY-MM-DD") == date &&
          r.annule == annule
      );
    if (date && !type && !annule)
      filter = rdvs.filter(
        (r) => moment(new Date(r.date_rdv)).format("YYYY-MM-DD") == date
      );
    if (date && type && !annule) {
      filter = rdvs.filter(
        (r) =>
          moment(new Date(r.date_rdv)).format("YYYY-MM-DD") == date &&
          r.type_rdv == type
      );
    }

    setFilterRDVs(filter);
  };
  return (
    <div className="content-container">
      <NavbarAdmin />
      <Container maxWidth="lg">
        <Collapse in={loading}>
          <LinearProgress color="primary" />
        </Collapse>

        <Card style={{ marginBottom: "30px", marginTop: "50px" }}>
          <CardContent>
            <FilterParticulier filter={onFilter} />
          </CardContent>
        </Card>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {filterRDVs.length !== 0 && (
            <Pagination
              size="large"
              count={
                filterRDVs.length !== 0
                  ? Math.ceil(filterRDVs.length / comptesPerPage)
                  : 0
              }
              page={currentPage}
              onChange={(e, value) => paginate(value)}
              color="primary"
            />
          )}
        </div>
        <Collapse in={success}>
          {currentComptes.length !== 0 ? (
            currentComptes.map((r, index) => (
              <Card style={{ marginTop: "10px" }} key={index}>
                <CardContent>
                  <Typography gutterBottom={4}>
                    <strong> RDV </strong> : {index + 1}
                  </Typography>
                  <Typography gutterBottom={4}>
                    <strong> Type </strong> :{" "}
                    {r.type_rdv === "V" ? "Téléconsultation" : "Cabinet"}
                  </Typography>
                  <Typography gutterBottom={4}>
                    <strong> Date </strong>:{" "}
                    {moment(new Date(r.date_rdv)).format("DD/MM/YYYY")}
                  </Typography>
                  <Typography gutterBottom={4}>
                    <strong>Heure </strong> : {r.heure_rdv.slice(0, 5)}
                  </Typography>
                  <Typography gutterBottom={4}>
                    <strong> Medecin </strong> : DR {r.nom_medecin}{" "}
                    {r.prenom_medecin} / {r.telephone_medecin}
                  </Typography>
                  <Typography gutterBottom={4}>
                    <strong> Patient </strong> : {r.nom_patient}{" "}
                    {r.prenom_patient} / {r.telephone_patient}
                  </Typography>
                  <Typography gutterBottom={4}>
                    <strong>Annulé</strong> : {r.annule == 0 ? "Non" : "Oui"}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent>
                <Typography>Aucun rendez-vous disponible </Typography>
              </CardContent>
            </Card>
          )}
        </Collapse>

        <table id="table-to-xls" style={{ display: "none" }}>
          <tr>
            <th>RDV</th>
            <th>type RDV</th>
            <th>Date RDV</th>
            <th>Heure RDV</th>
            <th>Medecin</th>
            <th>Téléphone medecin</th>
            <th>Patient</th>
            <th>Téléphone patient</th>
            <th>Annule</th>
          </tr>
          {filterRDVs.map((r, index) => (
            <tr key={index}>
              <td> {index + 1}</td>
              <td> {r.type_rdv == "V" ? "Téléconsultation" : "Cabinet"}</td>
              <td> {moment(new Date(r.date_rdv)).format("DD/MM/YYYY")}</td>
              <td>{r.heure_rdv}</td>
              <td>
                {" "}
                {r.nom_medecin} {r.prenom_medecin}
              </td>
              <td> {r.telephone_medecin}</td>
              <td>
                {" "}
                {r.nom_patient} {r.prenom_patient}
              </td>
              <td> {r.telephone_patient}</td>
              <td> {r.annule == 0 ? "Nom" : "Oui"}</td>
            </tr>
          ))}
        </table>
        {filterRDVs.length !== 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="btn btn-outline-danger"
              table="table-to-xls"
              filename="tableau_particulier"
              sheet="Tableau particulier "
              buttonText="Télécharger en EXCEL"
            />
          </div>
        )}
      </Container>
    </div>
  );
}

function FilterParticulier({ filter }) {
  const [date, setDate] = useState("");
  const [annule, setAnnule] = useState("");
  const [type, setType] = useState("");

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h4" color="primary" align="center">
          Gestion des rendez-vous
        </Typography>
        <Grid container spacing={2} style={{ marginTop: "50px" }}>
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom={4}>Date du rendez-vous</Typography>
            <TextField
              value={date}
              fullWidth
              variant="outlined"
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom={4}>Type du rendez-vous</Typography>

            <Select
              value={type}
              defaultValue=""
              fullWidth
              variant="outlined"
              required
              onChange={(e) => setType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="C">Cabinet</MenuItem>
              <MenuItem value="V">Téléconsultation</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom={4}>Etat du rendez-vous</Typography>

            <Select
              value={annule}
              defaultValue=""
              fullWidth
              variant="outlined"
              required
              onChange={(e) => setAnnule(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="0">Non annulé</MenuItem>
              <MenuItem value="1">Annulé</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Container>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <button
          className="btn btn-outline-danger"
          style={{ width: "200px", fontSize: "20px" }}
          onClick={() => filter(date, annule, type)}
        >
          Rechercher
        </button>
      </div>
    </div>
  );
}
