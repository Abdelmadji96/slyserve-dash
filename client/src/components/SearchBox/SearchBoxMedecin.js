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
// import {
//   getSpecialites,
//   searchMedecin,
// } from "../../actions/professionnel.actions";
import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";

import { connect } from "react-redux";
import axios from "axios";
import { setDoctors } from "../../redux/actions/doctors";

const SearchBoxMedecin = ({ user, saveDoctors, setMedecins }) => {
  const [wilayaId, setWilayaId] = useState("");
  const [communeId, setCommuneId] = useState("");
  const [specialiteId, setSpecialiteId] = useState("");
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

  // const {
  //   specialites,
  //   success: successSpecialite,
  //   loading: loadingSpecialites,
  // } = useSelector((state) => state.specialitesReducer);

  // const { loading: loadingSearch } = useSelector(
  //   (state) => state.searchMedecin
  // );

  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [loadingWilayas, setLoadingWilayas] = useState(true);
  const [loadingCommune, setLoadingCommune] = useState(true);
  const [loadingSpecialites, setLoadingSpecialites] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const getWilayas = async () => {
    const response = await fetch("/api/wilayas", {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    const responseJson = await response.json();
    console.log('getWilayas', responseJson)
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
        setCommunes(communes["data"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSpecialities = async () => {
    const response = await fetch("/professionnels/specialites", {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    const responseJson = await response.json();
    if (responseJson) {
      setLoadingSpecialites(false);
      setSpecialites(responseJson);
    }
  };

  useEffect(
    () => {
      // dispatch(getWilaya());
      // dispatch(getCommunes(wilayaId));
      getWilayas();
      getSpecialities();
      //getCommunes(wilayaId);
    },
    [
      /*dispatch, wilayaId*/
    ]
  );

  // useEffect(() => {
  //   dispatch(getSpecialites());
  // }, [specialiteId]);

  useEffect(() => {
    setTimeout(() => {
      setErrorSearch("");
    }, 5000);
  }, [errorSearch]);

  const onSearchMedecin = async () => {
    //alert(wilayaId + "," + communeId + "," + specialiteId);
    try {
      // if (!wilayaId && !communeId && !specialiteId) {
      //   //setErrorSearch("Remplissez les paramètres de recherche");
      // } else {
      // const response = await fetch("/professionnels/search/medecins", {
      //   method: "POST",
      //   header: {
      //     Accept: "application/json",
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     wilaya: parseInt(wilayaId),
      //     commune: parseInt(communeId),
      //     specialite: parseInt(specialiteId),
      //   }),
      // });
      // const responseJson = await response.json();
      // alert(JSON.stringify(responseJson));
      // if (responseJson) {
      //   saveDoctors(response);
      // }
      const medecins = await axios.post("/professionnels/search/medecins", {
        wilaya: wilayaId,
        commune: communeId,
        specialite: specialiteId,
      });
      if (medecins) {
        setMedecins(medecins["data"]);
        saveDoctors(medecins["data"]);
      }
      //dispatch(searchMedecin(wilayaId, communeId, specialiteId));
      //}
    } catch (error) {
      console.log(error);
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom={4}>{t("commune")}</Typography>

            <Select
              value={communeId}
              defaultValue=""
              fullWidth
              variant="outlined"
              //disabled={wilayaId === "" || loadingCommune}
              required
              onChange={(e) => setCommuneId(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">{t("tout_commune")}</MenuItem>
              {
                //successCommune &&
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
          <Grid item xs={12} sm={4}>
            <Typography gutterBottom={4}>{t("specialite")}</Typography>
            <Select
              value={specialiteId}
              fullWidth
              defaultValue=""
              //disabled={loadingSpecialites}
              variant="outlined"
              required
              displayEmpty
              onChange={(e) => setSpecialiteId(e.target.value)}
            >
              <MenuItem value="">{t("tout_specialite")}</MenuItem>
              {
                //successSpecialite &&
                specialites.length > 0 &&
                specialites.map((s) => (
                  <MenuItem value={s.id} key={s.id}>
                    {s.id}-{i18n.language == "ar" ? s.nom_ar : s.nom_fr}
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
          disabled={
            specialites.length == 0 ||
            communes.length == 0 ||
            wilayas.length == 0 ||
            wilayaId == ""
          }
          onClick={onSearchMedecin}
          style={{ minWidth: "200px" }}
        >
          {t("rechercher")}
        </button>
      </div>
    </div>
  );
};

const mapStateProps = (store) => ({
  user: store.userState.user,
});

const mapDispatchProps = (dispatch) => ({
  saveDoctors: (doctors) => dispatch(setDoctors(doctors)),
});

export default connect(mapStateProps, mapDispatchProps)(SearchBoxMedecin);
