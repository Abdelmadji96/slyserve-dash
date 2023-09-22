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
} from "@material-ui/core";

import Pagination from "@mui/material/Pagination";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminGetParticuliers } from "../../actions/Admin/admin.actions";
import { getCommunes, getWilaya } from "../../actions/user.actions";
import NavbarAdmin from "./AdminNavbar";
export default function Particulier() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const comptesPerPage = 4;
  const lastCompte = currentPage * comptesPerPage;
  const indexFirstCompte = lastCompte - comptesPerPage;
  const [filterParticulier, setFilterParticulier] = useState([]);

  const { loading, success, particuliers } = useSelector(
    (state) => state.adminGetParticuliersReducer
  );
  useEffect(() => {
    dispatch(adminGetParticuliers());
  }, [dispatch]);
  useEffect(() => {
    if (success) setFilterParticulier(particuliers);
  }, [success]);

  let currentComptes = [];
  if (success && particuliers)
    currentComptes = filterParticulier.slice(indexFirstCompte, lastCompte);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const onFilter = (wilaya, commune) => {
    setCurrentPage(1);
    let filter = [];
    if (commune)
      filter = particuliers.filter(
        (c) => c.wilaya_id == wilaya && c.commune_id == commune
      );
    else if (wilaya) filter = particuliers.filter((c) => c.wilaya_id == wilaya);
    else filter = particuliers;
    setFilterParticulier(filter);
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
            <FilterParticulier filter={onFilter} loading={loading} />
          </CardContent>
        </Card>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {filterParticulier.length !== 0 && (
            <Pagination
              size="large"
              count={
                filterParticulier.length !== 0
                  ? Math.ceil(filterParticulier.length / comptesPerPage)
                  : 0
              }
              page={currentPage}
              onChange={(e, value) => paginate(value)}
              color="primary"
            />
          )}
        </div>
        <Collapse in={success}>
          {currentComptes.map((c, index) => (
            <Card style={{ marginTop: "10px" }} key={index}>
              <CardContent>
                <Typography gutterBottom={4}>
                  <strong> Nom </strong> : {c.nom}
                </Typography>
                <Typography gutterBottom={4}>
                  <strong> Prénom </strong>: {c.prenom}
                </Typography>
                <Typography gutterBottom={4}>
                  <strong>Wilaya</strong> :{c.wilaya}
                </Typography>
                <Typography gutterBottom={4}>
                  <strong> Commune </strong> :{c.commune}
                </Typography>
                <Typography gutterBottom={4}>
                  <strong>Téléphone</strong> : {c.telephone}
                </Typography>
                <Typography gutterBottom={4}>
                  <strong>Email</strong> : {c.email}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Collapse>

        <table id="table-to-xls" style={{ display: "none" }}>
          <tr>
            <th>Index</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Wilaya</th>
            <th>Commune</th>
          </tr>
          {filterParticulier.map((c, index) => (
            <tr key={index}>
              <td> {index + 1}</td>
              <td> {c.nom}</td>
              <td>{c.prenom}</td>
              <td> {c.telephone}</td>
              <td> {c.email}</td>
              <td> {c.wilaya}</td>
              <td> {c.commune}</td>
            </tr>
          ))}
        </table>
        {filterParticulier.length !== 0 && (
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

function FilterParticulier({ filter, loading }) {
  const [wilayaId, setWilayaId] = useState("");
  const [communeId, setCommuneId] = useState("");
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getWilaya());
    dispatch(getCommunes(wilayaId));
  }, [dispatch, wilayaId]);

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h4" color="primary" align="center">
          Gestion comptes particuliers
        </Typography>
        <Grid container spacing={2} style={{ marginTop: "50px" }}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom={4}>Wilaya</Typography>
            <Select
              fullWidth
              value={wilayaId}
              required
              displayEmpty
              defaultValue=""
              variant="outlined"
              onChange={(e) => {
                setWilayaId(e.target.value);
                setCommuneId("");
              }}
              disabled={loadingWilayas}
            >
              <MenuItem value="">Toutes les wilayas</MenuItem>
              {successWilaya &&
                wilayas.map((w) => (
                  <MenuItem value={w.id} key={w.id}>
                    {w.id}-{w.nom_fr}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom={4}>Commune</Typography>

            <Select
              value={communeId}
              defaultValue=""
              fullWidth
              variant="outlined"
              disabled={wilayaId === "" || loadingCommune}
              required
              onChange={(e) => setCommuneId(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Toutes les communes</MenuItem>
              {successCommune &&
                communes.map((c) => (
                  <MenuItem value={c.id} key={c.id}>
                    {c.wilaya_id}-{c.nom_fr}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
        </Grid>
      </Container>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <button
          className="btn btn-outline-danger"
          disabled={loadingCommune || loadingWilayas || loading}
          style={{ width: "200px", fontSize: "20px" }}
          onClick={() => filter(wilayaId, communeId)}
        >
          Rechercher
        </button>
      </div>
    </div>
  );
}
