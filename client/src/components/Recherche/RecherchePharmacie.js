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
import SearchBoxPharmacie from "../SearchBox/SearchBoxPharmacie";
import pharmacieLogo from "../../images/pharmacie.png";
import {
  EmailOutlined,
  LocationOnOutlined,
  PhoneOutlined,
} from "@material-ui/icons";
import Map from "./Map";
import Footer from "../Home/Footer";

export default function RecherchePharmacie() {
  const { t } = useTranslation();
  const [pharmacies, setPharmacies] = useState([]);
  // const { loading, success, error, pharmacies } = useSelector(
  //   (state) => state.pharmacieSearchReducer
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
                {t("search_title_donneur_pharmacie")}
              </Typography>
              <SearchBoxPharmacie setPharmacies={setPharmacies} />
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="lg">
          <Grid container spacing={4} className="grid-container">
            <Grid item xs={12} sm={6}>
              <Collapse in={
                //success
                pharmacies.length > 0
              }>
                {//pharmacies && 
                pharmacies.length > 0 ? (
                  pharmacies.map((pharmacie) => (
                    <Card style={{ margin: "10px 0" }}>
                      <CardHeader
                        title={<Typography variant="h6">Pharmacie</Typography>}
                        avatar={<Avatar src={pharmacieLogo} />}
                      />
                      <CardContent>
                        <Typography
                          variant="body1"
                          align="justify"
                          gutterBottom={4}
                        >
                          <LocationOnOutlined /> {pharmacie.nom_de_rue},{" "}
                          {pharmacie.commune}, {pharmacie.wilaya}
                        </Typography>
                        <Typography
                          variant="body1"
                          align="justify"
                          gutterBottom={4}
                        >
                          <PhoneOutlined style={{ marginRight: "5px" }} />{" "}
                          {pharmacie.telephone}
                        </Typography>
                        <Typography variant="body1" align="justify">
                          <EmailOutlined style={{ marginRight: "8px" }} />
                          {pharmacie.email}
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
                )}
              </Collapse>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card style={{ margin: "10px 0 ", height: "98%" }}>
                <CardContent style={{ height: "100%", minHeight: "50vh" }}>
                  <Map professionnel={pharmacies} logo={pharmacieLogo} />
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
