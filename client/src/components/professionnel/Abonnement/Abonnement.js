import React from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormControlLabel,
} from "@material-ui/core";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  Create,
} from "@material-ui/icons";
import Navbar from "../../NavBar/Navbar";
import { useTranslation } from "react-i18next";
export default function Abonnement() {
  const { t, i18n } = useTranslation();
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        {i18n.language === "ar" ? (
          <Container maxWidth="lg" style={{ direction: "rtl" }}>
            <Card style={{ padding: "20px 0px" }}>
              <Typography
                variant="h4"
                align="center"
                color="primary"
              ></Typography>
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

                    <Typography variant="h6">{t("choisir_formule")}</Typography>
                  </div>
                  <div style={{ marginRight: "30px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Checkbox
                        color="primary"
                        style={{ marginLeft: "10px" }}
                      />
                      <Typography variant="body1">
                        {t("abonner_option_2")}{" "}
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
                    <div>
                      <Grid container alignItems="center">
                        <Grid item xs={12} sm={1}>
                          <Typography variant="body1" align="right">
                            {t("start")}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField color="primary" type="date" fullWidth />
                        </Grid>
                      </Grid>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <Grid container alignItems="center">
                        <Grid item xs={12} sm={1}>
                          <Typography variant="body1" align="right">
                            {t("end")}
                          </Typography>
                        </Grid>
                        <Grid xs={12} sm={4}>
                          <TextField color="primary" type="date" fullWidth />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowLeftOutlined style={{ marginLeft: "10px" }} />

                    <Typography variant="h6"> {t("reabonn")}</Typography>

                    <Checkbox color="primary" />
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
                    <Typography variant="body1" align="right">
                      {t("payem")}
                    </Typography>
                    <FormDialog />
                  </div>
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
                  <button className="btn btn-outline-danger">
                    Signer l'autorisation prélèvement
                  </button>
                  <button className="btn btn-outline-danger">
                    Valider mon abonnement
                  </button>
                </div>
              </CardActions>
            </Card>
          </Container>
        ) : (
          <Container maxWidth="lg">
            <Card style={{ padding: "20px 0px" }}>
              <Typography variant="h4" align="center" color="primary">
                {t("sabonner_title")}
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

                    <Typography variant="h6">{t("choisir_formule")}</Typography>
                  </div>
                  <div style={{ marginLeft: "30px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Checkbox
                        color="primary"
                        style={{ marginRight: "10px" }}
                      />
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
                      <Checkbox
                        color="primary"
                        style={{ marginRight: "10px" }}
                      />
                      <Typography variant="body1">
                        {t("abonner_option_2")}{" "}
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
                    <ArrowRightOutlined style={{ marginRight: "10px" }} />

                    <Typography variant="h6">{t("abonn_valid")}</Typography>
                  </div>
                  <div style={{ marginLeft: "30px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="body1"
                            style={{ marginRight: "20px" }}
                          >
                            {t("start")}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField color="primary" type="date" fullWidth />
                        </Grid>
                      </Grid>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "30px",
                      }}
                    >
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="body1"
                            style={{ marginRight: "40px" }}
                          >
                            {t("end")}
                          </Typography>
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField color="primary" type="date" fullWidth />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowRightOutlined style={{ marginRight: "10px" }} />

                    <Typography variant="h6"> {t("reabonn")}</Typography>

                    <Checkbox color="primary" />
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

                    <Typography variant="h6">
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
                    <Typography variant="body1">{t("payem")} </Typography>
                    <FormDialog />
                  </div>
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
                  <button className="btn btn-outline-danger">
                    Signer l'autorisation prélèvement
                  </button>
                  <button className="btn btn-outline-danger">
                    Valider mon abonnement
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
