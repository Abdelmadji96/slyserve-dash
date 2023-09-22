import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  LinearProgress,
  Snackbar,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Navbar from "../../NavBar/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   loginMedecinEmail,
//   loginMedecinTelephone,
// } from "../../../actions/professionnel.actions";
import MuiAlert from "@material-ui/lab/Alert";
//import { MEDECIN_LOGIN_RESET } from "../../../actions/professionnel.types";
import { useTranslation } from "react-i18next";
import Footer from "../../Home/Footer";

import { connect } from "react-redux";
import { setToken, setUser } from "../../../redux/actions/user";
import { ROLES } from "../../../constants/user";
import axios from "axios";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {
  //const dispatch = useDispatch();
  const { t } = useTranslation();
  //   const {
  //     loading: loadingLogin,
  //     error,
  //     login,
  //     success: successLogin,
  //   } = useSelector((state) => state.loginMedecinReducer);
  //   if (login) {
  //     if (successLogin) {
  //       props.history.push("/");
  //       dispatch({ type: MEDECIN_LOGIN_RESET });
  //     }
  //   }
  const [phoneEmail, setphoneEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const onSubmit = async () => {
    if (phoneEmail !== "" && mdp !== "") {
      //   if (phoneEmail.match(regexEmail)) {
      //     dispatch(loginMedecinEmail(phoneEmail, mdp));
      //   } else {
      //     dispatch(loginMedecinTelephone(phoneEmail, mdp));
      //   }
      //dispatch({ type: MEDECIN_LOGIN_REQUEST });
      try {
        setLoadingLogin(true);
        const response = await fetch(
          `/api/${(() => {
            switch (props.role) {
              case ROLES.DOCTOR:
                return "medecin";
              case ROLES.PARAMEDICAL:
                return "paramedical";
                break;
              case ROLES.CLINIC_HOSPITAL:
                return "clinique";
                break;
              case ROLES.PHARMACY:
                return "pharmacie";
                break;
              case ROLES.LABORATORY:
                return "labo";
                break;
              case ROLES.AMBULANCE:
                return "ambulance";
                break;

              default:
                break;
            }
          })()}/login/${phoneEmail.match(regexEmail) ? "email" : "telephone"}`,
          {
            method: "POST",
            header: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: phoneEmail.match(regexEmail)
              ? JSON.stringify({
                  email: phoneEmail,
                  mdp,
                })
              : JSON.stringify({
                  telephone: phoneEmail,
                  mdp,
                }),
          }
        );
        const data = await response.json();
        // const { data } = await axios.post(
        //   `/api/${(() => {
        //     switch (props.role) {
        //       case ROLES.DOCTOR:
        //         return "medecin";
        //         break;
        //       case ROLES.PARAMEDICAL:
        //         return "paramedical";
        //         break;
        //       case ROLES.CLINIC_HOSPITAL:
        //         return "clinique";
        //         break;
        //       case ROLES.PHARMACY:
        //         return "pharmacie";
        //         break;
        //       case ROLES.LABORATORY:
        //         return "labo";
        //         break;
        //       case ROLES.AMBULANCE:
        //         return "ambulance";
        //         break;

        //       default:
        //         break;
        //     }
        //   })()}/login/${phoneEmail.match(regexEmail) ? "email" : "telephone"}`,
        //   {
        //     phoneEmail,
        //     mdp,
        //   }
        // );
        switch (props.role) {
          case ROLES.DOCTOR:
            if (data["medecin"]) {
              setLoadingLogin(false);
              alert(JSON.stringify(data));
              localStorage.setItem(
                "user",
                JSON.stringify({
                  user: data["medecin"],
                  role: props.role,
                  token: data["token"],
                })
              );
              //dispatch({ type: MEDECIN_LOGIN_SUCCESS, payload: data });
              await props.login(data["medecin"]);
              await props.saveToken(data["token"]);
            }
          case ROLES.PARAMEDICAL:
            return "paramedical";
            break;
          case ROLES.CLINIC_HOSPITAL:
            return "clinique";
            break;
          case ROLES.PHARMACY:
            return "pharmacie";
            break;
          case ROLES.LABORATORY:
            return "labo";
            break;
          case ROLES.AMBULANCE:
            return "ambulance";
            break;

          default:
            break;
        }
      } catch (error) {
        setLoadingLogin(false);
        console.log(error);
        // dispatch({
        //   type: MEDECIN_LOGIN_FAIL,
        //   payload:
        //     error.response && error.response.data.message
        //       ? error.response.data.message
        //       : error.message,
        // });
      }
    }
  };
  const [open, setOpen] = useState(false);
  //   useEffect(() => {
  //     setOpen(successLogin);
  //   }, [successLogin]);

  useEffect(() => {
    setOpen(props.user !== null);
  }, [props.user]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          <Card>
            {loadingLogin && <LinearProgress color="primary" />}
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom={10}>
                {t("conx_sly_pro")}
              </Typography>
              {/* {error && <Alert severity="error">{error}</Alert>} */}

              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  severity="success"
                  onClose={handleClose}
                  variant="filled"
                >
                  Connexion reussie
                </Alert>
              </Snackbar>
              <div className="register">
                <div style={{ margin: "20px 0px" }}>
                  <TextField
                    variant="outlined"
                    label={t("email_mobile")}
                    required
                    fullWidth
                    type="text"
                    value={phoneEmail}
                    onChange={(e) => setphoneEmail(e.target.value)}
                  />
                </div>
                <div style={{ margin: "20px 0px" }}>
                  {/* <TextField
                    variant="outlined"
                    label={t("mdp")}
                    required
                    fullWidth
                    type="password"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                  /> */}
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                    {t("mdp")}
                    </InputLabel>
                    <OutlinedInput
                    
                      id="outlined-adornment-password"
                      type={passwordVisible ? "text" : "password"}
                      value={mdp}
                      onChange={(e) => setMdp(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setPasswordVisible(!passwordVisible)}
                            //onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {passwordVisible ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label={t("mdp")}
                    />
                  </FormControl>
                </div>
              </div>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="btn btn-outline-danger"
                disabled={loadingLogin}
                onClick={onSubmit}
              >
                {t("seconnecter")}{" "}
              </button>
            </CardActions>
          </Card>

          <Card style={{ marginTop: "50px" }}>
            <CardContent>
              <Typography variant="h6" align="center">
                {t("nouv_sly")}
              </Typography>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="btn btn-outline-danger"
                onClick={() => props.history.push("/register/type")}
              >
                {t("inscrire")}
              </button>
            </CardActions>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

const mapStateProps = (store) => ({
  user: store.userState.user,
  role: store.userState.role,
});

const mapDispatchProps = (dispatch) => ({
  login: (user) => dispatch(setUser(user)),
  saveToken: (token) => dispatch(setToken(token)),
});

export default connect(mapStateProps, mapDispatchProps)(Login);
