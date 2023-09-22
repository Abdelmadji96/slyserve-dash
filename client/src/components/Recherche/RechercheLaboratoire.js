import React, { useEffect, useState } from "react";
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
import laboratoireLogo from "../../images/clinique.png";
import {
  EmailOutlined,
  LocationOnOutlined,
  PhoneOutlined,
} from "@material-ui/icons";
import Map from "./Map";
import SearchBoxLaboratoire from "../SearchBox/SearchBoxLaboratoire";
import Footer from "../Home/Footer";

export default function RecherchePharmacie() {
  const { t } = useTranslation();
  const [laboratoires, setLaboratoires] = useState([]);
  // const { loading, success, error, laboratoires } = useSelector(
  //   (state) => state.laboratoiresearchReducer
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
                {t("search_title_laboratory")}
              </Typography>
              <SearchBoxLaboratoire setLaboratoires={setLaboratoires} />
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="lg">
          <Grid container spacing={4} className="grid-container">
            <Grid item xs={12} sm={6}>
              <Collapse
                in={
                  laboratoires.length > 0
                  //success
                }
              >
                {
                  //laboratoires &&
                  laboratoires.length > 0 ? (
                    laboratoires.map((laboratoire) => (
                      <Card style={{ margin: "10px 0" }}>
                        <CardHeader
                          title={
                            <Typography variant="h6">Laboratoire</Typography>
                          }
                          avatar={<Avatar src={laboratoireLogo} />}
                        />
                        <CardContent>
                          <Typography
                            variant="body1"
                            align="justify"
                            gutterBottom={4}
                          >
                            <LocationOnOutlined /> {laboratoire.nom_de_rue},
                            {laboratoire.commune}, {laboratoire.wilaya}
                          </Typography>
                          <Typography
                            variant="body1"
                            align="justify"
                            gutterBottom={4}
                          >
                            <PhoneOutlined style={{ marginRight: "5px" }} />
                            {laboratoire.telephone}
                          </Typography>
                          <Typography variant="body1" align="justify">
                            <EmailOutlined style={{ marginRight: "8px" }} />
                            {laboratoire.email}
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
                  <Map professionnel={laboratoires} logo={laboratoireLogo} />
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
