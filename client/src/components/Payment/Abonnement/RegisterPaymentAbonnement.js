import {
  Card,
  CardContent,
  Checkbox,
  Collapse,
  Container,
  FormControlLabel,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import cibLogo from "../../../images/logo-square.svg";
import Navbar from "../../NavBar/Navbar";

export default function RegisterPaymentAbonnment(props) {
  const [token, setToken] = useState("");
  const [terme, setTerme] = useState(false);
  const reCaptcha = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const abonnement = JSON.parse(localStorage.getItem("abonnerinfos"));
  if (!abonnement) props.history.push("/");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/payment/registerorder", {
        token,
        amount: parseFloat(abonnement.total) * 100,
        orderNumber: Math.random(120158985),
        returnUrl:
          "https://slyserve.com/professionnel/sabonner/payment/confirm",
      });
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data.formUrl) {
      window.location.href = data.formUrl;
    }
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [data, error]);
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          <Card style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" style={{ color: "red" }}>
              Payement abonnement SLY SERVE
            </Typography>
          </Card>

          <Card style={{ marginTop: "20px" }}>
            <Collapse in={loading}>
              <LinearProgress color="primary" />
            </Collapse>
            <CardContent>
              <Grid container alignItems="center" direction="column">
                <div>
                  <Typography style={{ marginBottom: "30px" }} variant="h5">
                    Récapitulatif de votre abonnement
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",

                      marginBottom: "30px",
                    }}
                  >
                    <div>
                      {abonnement.formule1 && (
                        <Typography variant="h6" gutterBottom={4}>
                          <ArrowRight />
                          Formule 1 : Gestion planning et patients
                        </Typography>
                      )}
                      {abonnement.formule2 && (
                        <Typography variant="h6">
                          <ArrowRight />
                          Formule 2 : Consultation vidéo
                        </Typography>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "30px",
                    }}
                  >
                    <Typography variant="body1">
                      {" "}
                      <ArrowRight />
                      Date début
                    </Typography>
                    <Typography>{abonnement.dateDebut}</Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "30px",
                    }}
                  >
                    <Typography>
                      {" "}
                      <ArrowRight />
                      Date fin
                    </Typography>
                    <Typography> {abonnement.dateFin}</Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "30px",
                    }}
                  >
                    <Typography>
                      {" "}
                      <ArrowRight />
                      Gestion planning et patients
                    </Typography>
                    <Typography>2000 DA</Typography>
                  </div>
                  {abonnement.formule2 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "30px",
                      }}
                    >
                      <Typography>
                        {" "}
                        <ArrowRight />
                        Consultation vidéo
                      </Typography>
                      <Typography>1000 DA</Typography>
                    </div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "black",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "30px",
                      marginTop: "10px",
                    }}
                  >
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">{abonnement.total} DA</Typography>
                  </div>
                </div>

                <ReCAPTCHA
                  ref={reCaptcha}
                  onExpired={() => setToken("")}
                  sitekey="6LdYMtocAAAAABPN0buRQecYK81OhBlQEiSSLgsu"
                  onChange={(token) => setToken(token)}
                />

                <FormControlLabel
                  style={{
                    marginTop: "30px",
                  }}
                  label={
                    <Typography>
                      J'accepte{" "}
                      <a href="#" style={{ color: "red" }}>
                        {" "}
                        les termes d'utilisation
                      </a>
                    </Typography>
                  }
                  control={
                    <Checkbox
                      color="primary"
                      checked={terme}
                      onChange={(e) => setTerme(e.target.checked)}
                    />
                  }
                />
                <Collapse in={error}>
                  <Alert severity="error">{error}</Alert>
                </Collapse>
                <button
                  className="btn btn-outline-danger"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px 30px",
                    width: "300px",
                    marginTop: "30px",
                  }}
                  disabled={!terme || loading}
                  onClick={handleSubmit}
                >
                  <img src={cibLogo} style={{ height: "60px" }} />
                  <p
                    style={{
                      marginLeft: "10px",
                      fontSize: "30px",
                      marginTop: "5px",
                    }}
                  >
                    Valider
                  </p>
                </button>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}
