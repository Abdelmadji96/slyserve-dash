import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Container, Typography } from "@material-ui/core";
import Navbar from "../NavBar/Navbar";
import { useTranslation } from "react-i18next";
import Footer from "../Home/Footer";

export default function RechercheType(props) {
  const { t } = useTranslation();

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          <Card style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" color="primary">
              {t("search_page_title")}
            </Typography>
          </Card>
          <Card style={{ marginTop: "50px" }}>
            <CardContent>
              <div className="insciption">
                <Link
                  className="btn btn-outline-danger"
                  to="/search/type/medecin"
                >
                  {t("search_practician")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/search/type/hopital"
                >
                  {t("search_hospital")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/search/type/ambulance"
                >
                  {t("search_ambulance")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/search/type/pharmacie"
                >
                  {t("search_pharmacy")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/search/type/donneurdesang"
                >
                  {t("search_blood_donor")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/search/type/paramedical"
                >
                  {t("search_paramedical")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/search/type/laboratory"
                >
                  {t("search_laboratory")}
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
