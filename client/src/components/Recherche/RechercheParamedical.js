import React, { useState, useEffect } from "react";
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
import Map from "./Map";
import { useSelector } from "react-redux";
import medecinLogo from "../../images/medecin.png";
import Footer from "../Home/Footer";
import SearchBoxParamedical from "../SearchBox/SearchBoxParamedical";
//import { connect } from "react-redux";

const RechercheParamedical = (props) => {
  const { t, i18n } = useTranslation();
  // const {
  //   loading: loadingSearch,
  //   paramedicals,
  //   success: successParamedical,
  // } = useSelector((state) => state.searchParamedical);
  // const { loading: loadingWilayas } = useSelector(
  //   (state) => state.wilayasReducer
  // );
  // const { loading: loadingCommune } = useSelector(
  //   (state) => state.communesReducer
  // );

  // const { loading: loadingSpecialites } = useSelector(
  //   (state) => state.specialitesReducer
  // );

  const [paramedicals, setParamedicals] = useState([]);

  const onGetParamedicalInfos = (id) => {
    props.history.push(`/search/type/paramedical/${id}/info`, {
      from: "/search/type/paramedical",
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
                {t("search_title_paramedical")}
              </Typography>
              <SearchBoxParamedical setParamedicals={setParamedicals} />
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="lg">
          <Grid container spacing={4} className="grid-container">
            <Grid item xs={12} sm={6}>
              <Collapse
                in={
                  // props.user
                  //successParamedical
                  paramedicals.length > 0
                }
              >
                {
                  //successParamedical
                  paramedicals.length > 0 &&
                  //props.user
                  paramedicals.length !== 0 ? (
                    paramedicals.map((m) => (
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
                            onClick={() => onGetParamedicalInfos(m.id)}
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
                          {t("aucun_resultat")}{" "}
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
                    professionnel={paramedicals}
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

// const mapStateProps = (store) => ({
// user: store.userState.user,
// });

export default //connect(mapStateProps, null)(
RechercheParamedical;
// )
