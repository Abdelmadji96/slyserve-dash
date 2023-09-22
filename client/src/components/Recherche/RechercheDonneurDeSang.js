import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Grid,
  Avatar,
  CardContent,
  Typography,
  LinearProgress,
  Collapse,
} from "@material-ui/core";
import "./recherche.css";
import Navbar from "../../components/NavBar/Navbar";
import { useTranslation } from "react-i18next";
//import { useSelector } from "react-redux";
import donneurSangLogo from "../../images/donneur.png";
import {
  EmailOutlined,
  LocationOnOutlined,
  PersonOutlined,
  PhoneOutlined,
} from "@material-ui/icons";
import Map from "./Map";
import SearchBoxDonneurDeSang from "../SearchBox/SearchBoxDonneurDeSang";
import Footer from "../Home/Footer";

export default function RechercheDonneurDeSang() {
  const { t } = useTranslation();
  const [donneursDeSang, setDonneursDeSang] = useState([]);
  // const { loading, success, error, donneursSang } = useSelector(
  //   (state) => state.donneurSangSearchReducer
  // );

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg" style={{ marginBottom: "20px" }}>
          {/* <Collapse in={loading}>
            <LinearProgress color="primary" />
          </Collapse> */}
          <Card>
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
                {t("search_title_donneur_sang")}
              </Typography>
              <SearchBoxDonneurDeSang setDonneursDeSang={setDonneursDeSang} />
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="lg">
          <Grid container spacing={4} className="grid-container">
            <Grid item xs={12} sm={6}>
              <Collapse
                in={
                  //success
                  donneursDeSang.length > 0
                }
              >
                {
                  //donneursDeSang &&
                  donneursDeSang.length > 0 ? (
                    donneursDeSang.map((donneurSang) => (
                      <Card style={{ margin: "10px 0" }}>
                        <CardHeader
                          title={
                            <Typography variant="h6">
                              Donneur de sang ({donneurSang.groupe_sanguin})
                            </Typography>
                          }
                          avatar={<Avatar src={donneurSangLogo} />}
                        />
                        <CardContent>
                          <Typography
                            variant="body1"
                            align="justify"
                            gutterBottom={4}
                          >
                            <PersonOutlined /> {donneurSang.nom}{" "}
                            {donneurSang.prenom}
                          </Typography>

                          <Typography
                            variant="body1"
                            align="justify"
                            gutterBottom={4}
                          >
                            <LocationOnOutlined /> {donneurSang.nom_de_rue},{" "}
                            {donneurSang.commune}, {donneurSang.wilaya}
                          </Typography>
                          <Typography
                            variant="body1"
                            align="justify"
                            gutterBottom={4}
                          >
                            <PhoneOutlined style={{ marginRight: "5px" }} />
                            {donneurSang.telephone}
                          </Typography>
                          <Typography variant="body1" align="justify">
                            <EmailOutlined style={{ marginRight: "8px" }} />
                            {donneurSang.email}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card style={{ margin: "10px 0" }}>
                      <CardContent>
                        <Typography>{t("aucun_resultat")}</Typography>
                      </CardContent>
                    </Card>
                  )
                }
              </Collapse>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ margin: "10px 0 ", height: "98%" }}>
                <CardContent style={{ height: "100%", minHeight: "50vh" }}>
                  <Map professionnel={donneursDeSang} logo={donneurSangLogo} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
