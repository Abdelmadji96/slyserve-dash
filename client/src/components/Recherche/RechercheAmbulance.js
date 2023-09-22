import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Grid,
  Avatar,
  CardContent,
  Typography,
  Collapse,
  LinearProgress,
} from "@material-ui/core";
import "./recherche.css";
import Navbar from "../../components/NavBar/Navbar";
import { useTranslation } from "react-i18next";

import "./recherche.css";
import SearchBoxAmbulance from "../SearchBox/SearchBoxAmbulance";
// import { useSelector } from "react-redux";
import ambulanceLogo from "../../images/ambulance.png";
import {
  EmailOutlined,
  LocationOnOutlined,
  PhoneOutlined,
} from "@material-ui/icons";
import Map from "./Map";
import Footer from "../Home/Footer";

export default function RechercheAmbulance() {
  const { t } = useTranslation();
  // const [loading,setLoading]=useState(true)
  // const [success,setSuccess]=useState(false)
  const [ambulances, setAmbulances] = useState([]);
  // const { loading, success, error, ambulances } = useSelector(
  //   (state) => state.ambulanceSearchReducer
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
            <CardContent className="card-content">
              <Typography
                variant="h4"
                align="center"
                color="primary"
                className="card-title"
              >
                {t("search_title_ambulance")}
              </Typography>
              <SearchBoxAmbulance setAmbulances={setAmbulances} />
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="lg">
          <Grid container spacing={4} className="grid-container">
            <Grid item xs={12} sm={6}>
              <Collapse
                in={
                  ambulances.length > 0
                  //success
                }
              >
                {
                  //ambulances &&
                  ambulances.length > 0 ? (
                    ambulances.map((ambulance) => (
                      <Card style={{ margin: "10px 0" }}>
                        <CardHeader
                          title={
                            <Typography variant="h6">Ambulance</Typography>
                          }
                          avatar={<Avatar src={ambulanceLogo} />}
                        />
                        <CardContent>
                          <Typography
                            variant="body1"
                            align="justify"
                            gutterBottom={4}
                          >
                            <LocationOnOutlined /> {ambulance.nom_de_rue},{" "}
                            {ambulance.commune}, {ambulance.wilaya}
                          </Typography>
                          <Typography
                            variant="body1"
                            align="justify"
                            gutterBottom={4}
                          >
                            <PhoneOutlined style={{ marginRight: "5px" }} />{" "}
                            {ambulance.telephone}
                          </Typography>
                          <Typography variant="body1" align="justify">
                            <EmailOutlined style={{ marginRight: "8px" }} />
                            {ambulance.email}
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
              <Card
                style={{
                  minHeight: "50vh",
                  height: "98%",
                  marginBottom: "",
                }}
              >
                <CardContent style={{ height: "100%", minHeight: "50vh" }}>
                  <Map professionnel={ambulances} logo={ambulanceLogo} />
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
