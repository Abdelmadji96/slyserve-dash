import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Grid,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  LinearProgress,
  Collapse,
} from "@material-ui/core";
import "./recherche.css";
import Navbar from "../NavBar/Navbar";
import { useTranslation } from "react-i18next";
import SearchBoxMedecin from "../SearchBox/SearchBoxMedecin";
import Map from "./Map";
//import { useSelector } from "react-redux";
import medecinLogo from "../../images/medecin.png";
import Footer from "../Home/Footer";
import { connect } from "react-redux";

const RecherchePraticien = (props) => {
  const { t, i18n } = useTranslation();
  // const {
  //   loading: loadingSearch,
  //   medecins,
  //   success: successMedecin,
  // } = useSelector((state) => state.searchMedecin);
  // const { loading: loadingWilayas } = useSelector(
  //   (state) => state.wilayasReducer
  // );
  // const { loading: loadingCommune } = useSelector(
  //   (state) => state.communesReducer
  // );

  // const { loading: loadingSpecialites } = useSelector(
  //   (state) => state.specialitesReducer
  // );

  const [medecins, setMedecins] = useState([]);

  const onGetMedecinInfos = (id) => {
    props.history.push(`/search/type/medecin/${id}/info`, {
      from: "/search/type/medecin",
    });
  };

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg" style={{ marginBottom: "20px" }}>
          <Card>
            {/* <Collapse
              in={
                loadingSearch ||
                loadingWilayas ||
                loadingCommune ||
                loadingSpecialites
              }
            >
              <LinearProgress color="primary" />
            </Collapse> */}
            <CardContent
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                color="primary"
                className="card-title"
              >
                {t("search_title_praticien")}
              </Typography>
              <SearchBoxMedecin setMedecins={setMedecins} />
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="lg">
          <Grid container spacing={4} className="grid-container">
            <Grid item xs={12} sm={6}>
              <Collapse
                in={
                  medecins.length > 0
                  //successMedecin
                }
              >
                {
                  //successMedecin &&
                  medecins.length &&
                    //props.doctors
                    medecins.length !== 0 ? (
                    medecins
                      //props.doctors
                      .map((m) => (
                        <Card style={{ marginBottom: "20px" }}>
                          <CardHeader
                            title={`${m.nom} ${m.prenom}`}
                            avatar={<Avatar src={medecinLogo} />}
                            subheader={m.specialite}
                          />
                          <CardContent>
                            <Typography variant="body2" align="justify">
                              {m.nom_de_rue}-{m.wilaya}-{m.commune}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => onGetMedecinInfos(m.id)}
                            >
                              {t("rdv_btn")}
                            </button>
                          </CardActions>
                        </Card>
                      ))
                  ) : (
                    <Card>
                      <CardContent>
                        <Typography variant="h5">
                          {t("aucun_resultat")}
                        </Typography>
                      </CardContent>
                    </Card>
                  )
                }
              </Collapse>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                style={{
                  minHeight: "50vh",
                  height: "98%",
                  marginBottom: "",
                }}
              >
                <CardContent style={{ height: "100%", minHeight: "50vh" }}>
                  <Map
                    professionnel={medecins}
                    //{props.doctors}
                    logo={medecinLogo}
                    {...props}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

const mapStateProps = (store) => ({
  user: store.userState.user,
  doctors: store.doctorsState.doctors,
});

export default connect(mapStateProps, null)(RecherchePraticien);
