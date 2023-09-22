import React, { useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Collapse,
  LinearProgress,
} from "@material-ui/core";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarToday,
  Check,
  Create,
  HourglassEmptyOutlined,
} from "@material-ui/icons";

import { useTranslation } from "react-i18next";
import Navbar from "../../NavBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { medecinGetAbonnement } from "../../../actions/medecin";
import moment from "moment";
import { date } from "yup/lib/locale";

export default function MonAbonnement(props) {
  const dispatch = useDispatch();
  const {
    loading: loadingAbonnement,
    success: successAbonenment,
    error: errorAbonnement,
    abonnement,
  } = useSelector((state) => state.medecinGetAbonnementReducer);

  useEffect(() => {
    dispatch(medecinGetAbonnement());
  }, []);
  const { t, i18n } = useTranslation();
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        {i18n.language === "ar" ? (
          <Container maxWidth="lg" style={{ direction: "rtl" }}>
            <Card style={{ padding: "20px 0px" }}>
              <Typography variant="h4" align="center" color="primary">
                {t("abonner_title")}
              </Typography>
            </Card>
            <Card style={{ marginTop: "20px" }}>
              <CardContent style={{ padding: "20px" }}>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowLeftOutlined style={{ marginLeft: "10px" }} />
                    <Typography variant="h6">{t("info_abonn")}</Typography>
                  </div>
                  <div style={{ marginRight: "30px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Check style={{ marginLeft: "10px" }} />
                      <Typography variant="body1">
                        {t("abonner_option_1")}
                      </Typography>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Check style={{ marginLeft: "10px" }} />
                      <Typography variant="body1">
                        {t("abonner_option_2")}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowLeftOutlined style={{ marginLeft: "10px" }} />

                    <Typography variant="h6">{t("abonn_valid")}</Typography>
                  </div>
                  <div style={{ marginRight: "30px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <CalendarToday style={{ marginLeft: "10px" }} />
                      <Typography variant="body1">
                        {t("abonn_start")}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <CalendarToday style={{ marginLeft: "10px" }} />
                      <Typography variant="body1"> {t("abonn_end")}</Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <HourglassEmptyOutlined style={{ marginLeft: "10px" }} />
                      <Typography variant="body1">
                        {t("abonn_duration")}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowLeftOutlined style={{ marginLeft: "10px" }} />

                    <Typography variant="h6">
                      {" "}
                      {t("coordonn_bacaire")}
                    </Typography>
                  </div>
                  <div
                    style={{
                      marginRight: "30px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" style={{ marginLeft: "10px" }}>
                      {t("payem")}
                    </Typography>
                    <FormDialog />
                  </div>
                </div>
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowLeftOutlined style={{ marginLeft: "10px" }} />

                  <Typography variant="h6">{t("reabonn")}</Typography>
                  <Checkbox color="primary" />
                </div>
              </CardContent>
              <CardActions>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    paddingBottom: "20px",
                  }}
                >
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => props.history.push("/sabonner")}
                  >
                    {t("change_abonn_btn")}
                  </button>
                  <button className="btn btn-outline-danger">
                    {t("telecharger_contrat")}
                  </button>
                </div>
              </CardActions>
            </Card>
          </Container>
        ) : (
          <Container maxWidth="lg">
            <Collapse in={loadingAbonnement}>
              <LinearProgress color="primary" />
            </Collapse>
            <Card style={{ padding: "20px 0px" }}>
              <Typography variant="h4" align="center" color="primary">
                {t("abonner_title")}
              </Typography>
            </Card>
            <Card style={{ marginTop: "20px" }}>
              <CardContent style={{ padding: "20px" }}>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowRightOutlined style={{ marginRight: "10px" }} />
                    <Typography variant="h6">{t("info_abonn")}</Typography>
                  </div>
                  <div style={{ marginLeft: "30px" }}>
                    {abonnement && abonnement.abonnement1 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <Check style={{ marginRight: "10px" }} />

                        <Typography variant="body1">
                          {t("abonner_option_1")}
                        </Typography>
                      </div>
                    )}

                    {abonnement && abonnement.abonnement2 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <Check style={{ marginRight: "10px" }} />
                        <Typography variant="body1">
                          {t("abonner_option_2")}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowRightOutlined style={{ marginRight: "10px" }} />

                    <Typography variant="h6">{t("abonn_valid")}</Typography>
                  </div>
                  <Collapse in={successAbonenment}>
                    {successAbonenment && abonnement.abonnement1 && (
                      <div style={{ marginLeft: "10px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        >
                          <ArrowRightOutlined style={{ marginRight: "10px" }} />
                          <Typography variant="body1">
                            Gestion planning et patients
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          <CalendarToday style={{ marginRight: "10px" }} />
                          <Typography variant="body1">
                            Début :{" "}
                            {moment(
                              new Date(abonnement.abonnement1.date_debut)
                            ).format("DD/MM/YYYY")}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          <CalendarToday style={{ marginRight: "10px" }} />
                          <Typography variant="body1">
                            Fin :{" "}
                            {moment(
                              new Date(abonnement.abonnement1.date_fin)
                            ).format("DD/MM/YYYY")}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          <HourglassEmptyOutlined
                            style={{ marginRight: "10px" }}
                          />
                          <Typography variant="body1">
                            Durée restante :{" "}
                            {(new Date(
                              abonnement.abonnement1.date_fin
                            ).getTime() -
                              new Date(
                                abonnement.abonnement1.date_debut
                              ).getTime()) /
                              1000 /
                              3600 /
                              24}{" "}
                            jours
                          </Typography>
                        </div>
                      </div>
                    )}
                  </Collapse>
                  <Collapse in={successAbonenment}>
                    {successAbonenment && abonnement.abonnement2 && (
                      <div style={{ marginLeft: "10px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        >
                          <ArrowRightOutlined style={{ marginRight: "10px" }} />
                          <Typography variant="body1">
                            Consultation vidéo{" "}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          <CalendarToday style={{ marginRight: "10px" }} />
                          <Typography variant="body1">
                            Début :{" "}
                            {moment(
                              new Date(abonnement.abonnement1.date_debut)
                            ).format("DD/MM/YYYY")}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          <HourglassEmptyOutlined
                            style={{ marginRight: "10px" }}
                          />
                          <Typography variant="body1">
                            Durée restante :{" "}
                            {abonnement.abonnement2.restant + " "}
                            minutes
                          </Typography>
                        </div>
                      </div>
                    )}
                  </Collapse>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowRightOutlined style={{ marginRight: "10px" }} />

                    <Typography variant="h6">
                      {" "}
                      {t("coordonn_bacaire")}
                    </Typography>
                  </div>
                  <div
                    style={{
                      marginLeft: "30px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" style={{ marginRight: "10px" }}>
                      {t("payem")}
                    </Typography>
                    <FormDialog />
                  </div>
                </div>
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowRightOutlined style={{ marginRight: "10px" }} />

                  <Typography variant="h6">{t("reabonn")}</Typography>
                  <Checkbox color="primary" />
                </div>
              </CardContent>
              <CardActions>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    paddingBottom: "20px",
                  }}
                >
                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      props.history.push("/professionnel/sabonner")
                    }
                  >
                    {t("change_abonn_btn")}
                  </button>
                  <button className="btn btn-outline-danger">
                    {t("telecharger_contrat")}
                  </button>
                </div>
              </CardActions>
            </Card>
          </Container>
        )}
      </div>
    </div>
  );
}

function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Create style={{ color: "black" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Coordonnées bancaires</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
