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
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import cibLogo from "../../images/logo-square.svg";
import Navbar from "../NavBar/Navbar";

export default function RegisterPayment(props) {
  const [token, setToken] = useState("");
  const [terme, setTerme] = useState(false);
  const reCaptcha = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const rdv = JSON.parse(localStorage.getItem("rdvinfos"));
  if (!rdv) props.history.push("/");
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/payment/registerorder", {
        token,
        amount: parseFloat(rdv.tarifVideo) * 100,
        orderNumber: Math.random(120158985),
        returnUrl: "https://slyserve.com/payment/confirmorder",
      });
      alert(JSON.stringify(data));
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  //console.log(data);

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
              Payement du rendez-vous SLY SERVE
            </Typography>
          </Card>

          <Card style={{ marginTop: "20px" }}>
            <Collapse in={loading}>
              <LinearProgress color="primary" />
            </Collapse>
            <CardContent>
              <Grid container alignItems="center" direction="column">
                <div>
                  <Typography style={{ marginBottom: "30px" }} variant="h6">
                    Récapitulatif de votre rendez-vous téléconsultation
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "30px",
                    }}
                  >
                    <Typography variant="body1">Date du rendez-vous</Typography>
                    <Typography>
                      {rdv.date_rdv} à {rdv.heure_rdv}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "30px",
                    }}
                  >
                    <Typography variant="body1">Montant</Typography>
                    <Typography>{rdv.tarifVideo} DA</Typography>
                  </div>
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
                    <Typography variant="h6">{rdv.tarifVideo} DA</Typography>
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
