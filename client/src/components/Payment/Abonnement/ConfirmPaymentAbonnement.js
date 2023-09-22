import {
  Collapse,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  Typography,
  Card,
  CardContent,
  Container,
  LinearProgress,
  CircularProgress,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Navbar from "../../NavBar/Navbar";

import satim from "../../../images/satim.png";
import { useDispatch, useSelector } from "react-redux";
import { medecinAbonner } from "../../../actions/medecin";
import { MEDECIN_ABONNER_RESET } from "../../../actions/professionnel.types";
import FacturePDF from "../../professionnel/Abonnement/Documents/FacturePDF";
import moment from "moment";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmPaymentAbonnment(props) {
  const [successPayment, setSuccessPayment] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const { orderId } = queryString.parse(props.location.search);
  const dispatch = useDispatch();
  const { medecin } = useSelector((state) => state.loginMedecinReducer);
  const abonnement = JSON.parse(localStorage.getItem("abonnerinfos"));
  console.log(abonnement);
  const { loading: loadingAbonner, success: successAbonner } = useSelector(
    (state) => state.medecinAbonnerReducer
  );

  const confirmOrder = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/payment/confirmrorder", {
        orderId,
      });
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);

      setLoading(false);
    }
  };
  useEffect(() => {
    if (orderId) {
      confirmOrder();
    }
  }, [orderId]);

  let facture = {
    date: moment(new Date()).format("DD/MM/YYYY"),
    professionnel: `${medecin.medecin.nom} ${medecin.medecin.prenom}`,
    adresse: medecin.nom_de_rue,
    email: medecin.email,
    telephone: medecin.telephone,
    formule1: abonnement.formule1,
    formule2: abonnement.formule2,
    total: abonnement.total,
  };
  useEffect(() => {
    if (data.ErrorCode) {
      const { ErrorCode } = data;
      if (ErrorCode == 0) {
        setSuccessPayment(true);
        if (abonnement) dispatch(medecinAbonner(abonnement));
      } else {
        setSuccessPayment(false);
      }
    }
  }, [data.ErrorCode]);

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    dispatch({ type: MEDECIN_ABONNER_RESET });
  };

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
          <Dialog
            open={open && successAbonner}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Abonnement ajouté</DialogTitle>
            <DialogContent>
              Votre abonnnement a été ajouté avec succès
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Card style={{ marginTop: "20px" }}>
            <Collapse in={loading}>
              <LinearProgress color="primary" />
            </Collapse>
            <CardContent>
              {loading || loadingAbonner ? (
                <CircularProgress color="primary" />
              ) : successPayment ? (
                <div>
                  <Typography gutterBottom={4} variant="h6" align="center">
                    {data.params.respCode_desc}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid black",
                      marginBottom: "15px",
                      paddingBottom: "5px",
                    }}
                  >
                    <Typography gutterBottom={4} variant="h6">
                      Identifiant de la transaction :
                    </Typography>
                    <Typography variant="h6"> {orderId}</Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid black",

                      marginBottom: "15px",
                      paddingBottom: "5px",
                    }}
                  >
                    <Typography gutterBottom={4} variant="h6">
                      Numéro de commande :
                    </Typography>
                    <Typography variant="h6">{data.OrderNumber}</Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid black",

                      marginBottom: "15px",
                      paddingBottom: "5px",
                    }}
                  >
                    <Typography gutterBottom={4} variant="h6">
                      Numéro d'autorisation :
                    </Typography>
                    <Typography variant="h6">{data.approvalCode}</Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid black",
                      marginBottom: "15px",
                      paddingBottom: "5px",
                    }}
                  >
                    <Typography gutterBottom={4} variant="h6">
                      Date :
                    </Typography>
                    <Typography variant="h6">
                      {new Date().toLocaleDateString()}{" "}
                      {new Date().toLocaleTimeString().slice(0, 5)}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid black",
                      marginBottom: "15px",
                      paddingBottom: "5px",
                    }}
                  >
                    <Typography gutterBottom={4} variant="h6">
                      Montant :
                    </Typography>
                    <Typography variant="h6">
                      {" "}
                      {parseFloat(data.Amount) / 100} DA
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid black",
                      marginBottom: "10px",
                      paddingBottom: "5px",
                    }}
                  >
                    <Typography gutterBottom={4} variant="h6">
                      Mode de paiement :
                    </Typography>
                    <Typography variant="h6">carte CIB</Typography>{" "}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={satim}
                      style={{ height: "80px", width: "80px" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginTop: "30px",
                    }}
                  >
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => props.history.push("/particulier/mesrdv")}
                    >
                      Suivant
                    </button>
                    <FacturePDF facture={facture} />
                  </div>
                </div>
              ) : (
                <Container maxWidth="sm">
                  <Typography variant="h6" gutterBottom={4} align="center">
                    Votre transaction à été rejectée
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <img
                      src={satim}
                      style={{ height: "60px", width: "60px" }}
                    />
                  </div>
                </Container>
              )}
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}
