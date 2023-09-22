import React from "react";
import { Card, CardContent, Container, Typography } from "@material-ui/core";
import Navbar from "../NavBar/Navbar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../Home/Footer";

import { connect } from "react-redux";
import { setRole } from "../../redux/actions/user";
import { ROLES } from "../../constants/user";

const ConnexionStep2 = ({ loginAs }) => {
  const { t } = useTranslation();
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          <Card style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" color="primary">
              {t("connexion_type_title")}
            </Typography>
          </Card>

          <Card className="insc-card">
            <CardContent>
              <div className="insciption">
                <Link
                  className="btn btn-outline-danger"
                  to="/login/type/pro/medecin"
                  onClick={async () => await loginAs(ROLES.DOCTOR)}
                >
                  {t("login_type_medecin")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/login/type/pro/ambulance"
                  onClick={async () => await loginAs(ROLES.AMBULANCE)}
                >
                  {t("login_type_ambulance")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/login/type/pro/pharmacie"
                  onClick={async () => await loginAs(ROLES.PHARMACY)}
                >
                  {t("login_type_pharmacie")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/login/type/pro/clinique"
                  onClick={async () => await loginAs(ROLES.CLINIC_HOSPITAL)}
                >
                  {t("login_type_hopital")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/login/type/pro/lab"
                  onClick={async () => await loginAs(ROLES.LABORATORY)}
                >
                  {t("login_type_lab")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/login/type/pro/paramedical"
                  onClick={async () => await loginAs(ROLES.PARAMEDICAL)}
                >
                  {t("login_type_paramedical")}
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/login/type/pro/blooddonor"
                  onClick={async () => await loginAs(ROLES.BLOOD_DONOR)}
                >
                  {t("login_type_blooddonor")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

const mapDispatchProps = (dispatch) => ({
  loginAs: (role) => dispatch(setRole(role)),
});

export default connect(null, mapDispatchProps)(ConnexionStep2);
