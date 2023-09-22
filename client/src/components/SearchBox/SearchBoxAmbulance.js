import React, { useState, useEffect } from "react";
import {
  Collapse,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

//import { useSelector, useDispatch } from "react-redux";
import { getCommunes, getWilaya } from "../../actions/user.actions";
import Alert from "@material-ui/lab/Alert";
import { ambulanceSearch } from "../../actions/ambulance";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function SearchBoxAmbulance({ setAmbulances }) {
  const [wilayaId, setWilayaId] = useState("");
  const [communeId, setCommuneId] = useState("");
  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [loadingWilayas, setLoadingWilayas] = useState(true);
  const [loadingCommune, setLoadingCommune] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState("");
  //const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
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
  //   (state) => state.ambulanceSearchReducer
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
      // dispatch(getWilaya());
      // dispatch(getCommunes(wilayaId));
    },
    [
      /*dispatch, wilayaId*/
    ]
  );

  const handleSubmit = async () => {
    if (!wilayaId && !communeId) {
      setErrorSearch("Remplissez les paramètres de recherche");
    } else {
      const { data } = await axios.post(
        `/api/ambulance/search/${communeId == "" ? "wilaya" : "wilayacommune"}`,
        {
          wilaya_id: wilayaId,
          commune_id: communeId,
        }
      );

      if (data["results"]) {
        setAmbulances(data["results"]);
      }
      setErrorSearch("");

      //dispatch(ambulanceSearch({ wilayaId, communeId }));
    }
  };
  return (
    <div>
      <Container maxWidth="md">
        <Collapse in={errorSearch}>
          <Alert
            onTimeUpdate={1000}
            severity="error"
            style={{ marginBottom: "10px" }}
          >
            {errorSearch}
          </Alert>
        </Collapse>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom={4}>{t("wilaya")}</Typography>
            <Select
              fullWidth
              value={wilayaId}
              required
              displayEmpty
              defaultValue=""
              variant="outlined"
              onChange={(e) => {
                setWilayaId(e.target.value);
                getCommunes(e.target.value);
              }}
              disabled={loadingWilayas}
            >
              <MenuItem value="">{t("tout_wilaya")}</MenuItem>
              {
                //successWilaya &&
                wilayas.length > 0 &&
                  wilayas.map((w) => (
                    <MenuItem value={w.id} key={w.id}>
                      {w.id}-{i18n.language === "ar" ? w.nom_ar : w.nom_fr}
                    </MenuItem>
                  ))
              }
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom={4}>{t("commune")}</Typography>

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
              <MenuItem value="">{t("tout_commune")}</MenuItem>
              {
                //successCommune
                communes.length > 0 &&
                  communes.map((c) => (
                    <MenuItem value={c.id} key={c.id}>
                      {c.wilaya_id}-
                      {i18n.language === "ar" ? c.nom_ar : c.nom_fr}
                    </MenuItem>
                  ))
              }
            </Select>
          </Grid>
        </Grid>
      </Container>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <button
          className="btn btn-outline-danger"
          disabled={loadingCommune || loadingWilayas || loadingSearch}
          onClick={handleSubmit}
          style={{ minWidth: "200px" }}
        >
          {t("rechercher")}
        </button>
      </div>
    </div>
  );
}
