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
import { connect, useDispatch } from "react-redux";
import { ROLES } from "../../../constants/user";
import { setToken, setUser } from "../../../redux/actions/user";
import axios from "axios";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { MEDECIN_LOGIN_FAIL, MEDECIN_LOGIN_SUCCESS } from "../../../actions/professionnel.types";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProfessionnelLogin = (props) => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const {
  //   loading: loadingLogin,
  //   error,
  //   login,
  //   success: successLogin,
  // } = useSelector((state) => state.loginMedecinReducer);
  // if (login) {
  //   if (successLogin) {
  //     props.history.push("/");
  //     dispatch({ type: MEDECIN_LOGIN_RESET });
  //   }
  // }
  const [phoneEmail, setphoneEmail] = useState("");
  const [mdp, setMdp] = useState("");

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // const loginHandler = async () => {
  //   setLoadingLogin(true);
  //   switch (props.role) {
  //     case ROLES.DOCTOR:
  //       try {
  //         const { data } = await axios.post(
  //           `/api/medecin/login/${
  //             phoneEmail.match(regexEmail) ? "email" : "telephone"
  //           }`,
  //           {
  //             phoneEmail,
  //             mdp,
  //           }
  //         );
  //         setLoadingLogin(false);
  //         localStorage.setItem("user", JSON.stringify(data));
  //         props.login(data["medecin"]);
  //         props.saveToken(data["token"]);
  //       } catch (error) {
  //         setLoadingLogin(false);
  //         console.log(error);
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const onSubmit = async () => {
    //loginHandler();
    if (phoneEmail !== "" && mdp !== "") {
      // if (phoneEmail.match(regexEmail)) {
      //   dispatch(loginMedecinEmail(phoneEmail, mdp));
      // } else {
      //   dispatch(loginMedecinTelephone(phoneEmail, mdp));
      // }
      try {
        const { data } = await axios.post(
          `/api/medecin/login/${phoneEmail.match(regexEmail) ? "email" : "telephone"
          }`,
          phoneEmail.match(regexEmail)
            ? {
              email: phoneEmail,
              mdp,
            }
            : {
              telephone: phoneEmail,
              mdp,
            }
        );
        if (data) {
          props.saveToken(data["token"]);
          props.login(data["medecin"]);
          props.history.push("/")
        }
        localStorage.setItem("user", JSON.stringify(data.medecin));
        dispatch({ type: MEDECIN_LOGIN_SUCCESS, payload: data.medecin });
      } catch (error) {
        console.log(error);
        dispatch({
          type: MEDECIN_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(successLogin);
  }, [successLogin]);
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
                            onClick={() => setPasswordVisible(!passwordVisible)}
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
  role: store.userState.role,
  user: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) => ({
  login: (user) => dispatch(setUser(user)),
  saveToken: (token) => dispatch(setToken(token)),
});

export default connect(mapStateProps, mapDispatchProps)(ProfessionnelLogin);
