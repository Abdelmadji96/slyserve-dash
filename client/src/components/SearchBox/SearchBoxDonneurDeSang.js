import React, { useState, useEffect } from "react";
import {
  Collapse,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

// import { useSelector, useDispatch } from "react-redux";
// import { getCommunes, getWilaya } from "../../actions/user.actions";
import Alert from "@material-ui/lab/Alert";
//import { donneurDeSangSearch } from "../../actions/user.actions";
import { useTranslation } from "react-i18next";
import axios from "axios";

const bloodTypes = [
  {
    id: 1,
    type: "A+",
  },
  {
    id: 2,
    type: "A-",
  },
  {
    id: 3,
    type: "B+",
  },
  {
    id: 4,
    type: "B-",
  },
  {
    id: 5,
    type: "AB+",
  },
  {
    id: 6,
    type: "AB-",
  },
  {
    id: 7,
    type: "O+",
  },
  {
    id: 8,
    type: "O-",
  },
];

export default function SearchBoxDonneurDeSang({ setDonneursDeSang }) {
  const [wilayaId, setWilayaId] = useState("");
  const [communeId, setCommuneId] = useState("");
  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [loadingWilayas, setLoadingWilayas] = useState(true);
  const [loadingCommune, setLoadingCommune] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState("");
  const [bloodType, setBloodType] = useState(0);
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
  //   (state) => state.donneurSangSearchReducer
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
        `/api/donneursang/search/${
          communeId == ""
            ? bloodType == 0
              ? "wilaya"
              : "wilayatype"
            : bloodType == 0
            ? "wilayacommune"
            : "wilayacommunetype"
        }`,
        {
          wilaya_id: wilayaId,
          commune_id: communeId,
          groupe_sanguin:
            bloodType == 0
              ? bloodType
              : bloodTypes.filter((type) => type.id == bloodType).pop().type,
        }
      );

      if (data["results"]) {
        setDonneursDeSang(data["results"]);
      }
      setErrorSearch("");
      //dispatch(donneurDeSangSearch({ wilayaId, communeId }));
    }
  };
  return (
    <div>
      <Container maxWidth="md">
        <Collapse in={errorSearch !== ""}>
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
              value={wilayaId || ""}
              required
              displayEmpty
              variant="outlined"
              onChange={(e) => {
                setWilayaId(e.target.value);
                getCommunes(e.target.value);
              }}
              disabled={loadingWilayas}
            >
              <MenuItem value="">{t("tout_wilaya")}</MenuItem>
              {
                //successWilaya
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
              value={communeId || ""}
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
                      {i18n.language == "ar" ? c.nom_ar : c.nom_fr}
                    </MenuItem>
                  ))
              }
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom={4}>Groupe sanguin</Typography>

            <Select
              value={bloodType || ""}
              fullWidth
              variant="outlined"
              required
              onChange={(e) => setBloodType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Tous les groupes sanguins</MenuItem>
              {
                //successCommune
                bloodTypes.length > 0 &&
                  bloodTypes.map((bt) => (
                    <MenuItem value={bt.id} key={bt.id}>
                      {bt.type}
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
        >
          {t("rechercher")}
        </button>
      </div>
    </div>
  );
}
