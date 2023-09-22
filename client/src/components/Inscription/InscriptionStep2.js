import React from "react";
import { Card, CardContent, Container, Typography } from "@material-ui/core";
import Navbar from "../NavBar/Navbar";
import "./inscription.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../Home/Footer";

export default function InscriptionStep2() {
  const { t } = useTranslation();
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          <Card style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" color="primary">
              {t("inscriptio_type_title")}
            </Typography>
          </Card>

          <Card className="insc-card">
            <CardContent>
              <div className="insciption">
                <Link
                  className="btn btn-outline-danger"
                  to="/register/pro/medecin"
                >
                  {t("inscriptio_type_medecin")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/register/pro/ambulance"
                >
                  {t("inscriptio_type_ambulance")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/register/pro/pharmacie"
                >
                  {t("inscriptio_type_pharmacie")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/register/pro/clinique"
                >
                  {t("inscriptio_type_hopital")}
                </Link>
                <Link className="btn btn-outline-danger" to="/register/pro/lab">
                  {t("inscriptio_type_lab")}
                </Link>
                <Link className="btn btn-outline-danger" to="/register/pro/paramedical">
                  {t("inscriptio_type_paramedical")}
                </Link>
                <Link className="btn btn-outline-danger" to="/register/pro/blooddonor">
                  {t("inscriptio_type_blooddonor")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
