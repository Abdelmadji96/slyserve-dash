import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  LinearProgress,
  Fade,
  Collapse,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  FilledInput,
  OutlinedInput,
} from "@material-ui/core";
import Navbar from "../../NavBar/Navbar";
//import { useDispatch, useSelector } from "react-redux";
// import {
//   loginParticulierTelephone,
//   loginParticulierEmail,
// } from "../../../actions/user.actions";
import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";
import Footer from "../../Home/Footer";
import { connect } from "react-redux";
import { setToken, setUser } from "../../../redux/actions/user";
import axios from "axios";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Login = (props) => {
  const { t } = useTranslation();
  const [phoneEmail, setphoneEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // const dispatch = useDispatch();

  // const { loading: loadingLogin, error, login: loginparticulier } = useSelector(
  //   (state) => state.loginParticulierReducer
  // );
  // const { login: loginMedecin } = useSelector(
  //   (state) => state.loginMedecinReducer
  // );

  // if (props.user /*loginparticulier || loginMedecin*/) {
  //   props.history.push("/");
  // }

  const onSubmit = async () => {
    // if (phoneEmail !== "" && mdp !== "") {
    //   if (phoneEmail.match(regexEmail)) {
    //     //dispatch(loginParticulierEmail(phoneEmail, mdp));
    //   } else {
    //     //dispatch(loginParticulierTelephone(phoneEmail, mdp));
    //   }
    // }
    try {
      const { data } = await axios.post(
        `/api/particulier/login/${
          phoneEmail.match(regexEmail) ? "email" : "telephone"
        }`,
        phoneEmail.match(regexEmail)
          ? {
              email: phoneEmail,
              mdp,
            }
          : {
              phone: phoneEmail,
              mdp,
            }
      );
      await props.saveToken(data["token"]);
      await props.login(data["particulier"]);
      props.history.push("/");
      //localStorage.setItem("user", JSON.stringify(data));
      //dispatch({ type: PARTICULIER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      // dispatch({
      //   type: PARTICULIER_LOGIN_FAIL,
      //   payload:
      //     error.response && error.response.data.message
      //       ? error.response.data.message
      //       : error.message,
      // });
      console.log(error);
    }
  };
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          <Card>
            {/* <Collapse in={loadingLogin}>
              <LinearProgress color="primary" />
            </Collapse> */}
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom={10}>
                {t("conx_sly_par")}
              </Typography>
              {/* <Collapse in={error}>
                <Alert severity="error">{error}</Alert>
              </Collapse> */}

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
                //disabled={loadingLogin}
                onClick={onSubmit}
              >
                {t("seconnecter")}
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
              <button className="btn btn-outline-danger">
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

const mapDispatchProps = (dispatch) => ({
  login: (user) => dispatch(setUser(user)),
  saveToken: (token) => dispatch(setToken(token)),
});

export default connect(null, mapDispatchProps)(Login);

/*
import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  LinearProgress,
  Fade,
  Collapse,
} from "@material-ui/core";
import Navbar from "../../NavBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  loginParticulierTelephone,
  loginParticulierEmail,
} from "../../../actions/user.actions";
import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";
import Footer from "../../Home/Footer";

// import { connect } from "react-redux";
// import { setUser } from "../../../redux/actions/user";
import axios from "axios";
import { PARTICULIER_LOGIN_FAIL, PARTICULIER_LOGIN_SUCCESS } from "../../../actions/user.types";

const Login = (props) => {
  const { t } = useTranslation();
  const [phoneEmail, setphoneEmail] = useState("");
  const [mdp, setMdp] = useState("");
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //const [loadingLogin, setLoadingLogin] = useState(false);

  const dispatch = useDispatch();

  const {
    loading: loadingLogin,
    error,
    login: loginparticulier,
  } = useSelector((state) => state.loginParticulierReducer);
  const { login: loginMedecin } = useSelector(
    (state) => state.loginMedecinReducer
  );

  if (
    loginparticulier ||
    loginMedecin
    //props.user
  ) {
    props.history.push("/");
  }

  const onSubmit = async () => {
    if (phoneEmail !== "" && mdp !== "") {
      if (phoneEmail.match(regexEmail)) {
        dispatch(loginParticulierEmail(phoneEmail, mdp));
      } else {
        dispatch(loginParticulierTelephone(phoneEmail, mdp));
      }
      //setLoadingLogin(true);
      try {
        const { data } = await axios.post(
          `/api/particulier/login/${
            phoneEmail.match(regexEmail) ? "email" : "telephone"
          }`,
          {
            phoneEmail,
            mdp,
          }
        );

        if (data) {
          //setLoadingLogin(false);
          alert(JSON.stringify(data));
          localStorage.setItem("particulier", JSON.stringify(data));
          await props.login(data);
        }
        dispatch({ type: PARTICULIER_LOGIN_SUCCESS, payload: data });
      } catch (error) {
        //setLoadingLogin(false);
        console.log(error);
        dispatch({
          type: PARTICULIER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          <Card>
            <Collapse in={loadingLogin}>
              <LinearProgress color="primary" />
            </Collapse>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom={10}>
                {t("conx_sly_par")}
              </Typography>
              <Collapse in={error}>
                <Alert severity="error">{error}</Alert>
              </Collapse>

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
                  <TextField
                    variant="outlined"
                    label={t("mdp")}
                    required
                    fullWidth
                    type="password"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                  />
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
              <button className="btn btn-outline-danger">
                {" "}
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

// const mapStateProps = (store) => ({
//   user: store.userState.user,
//   role: store.userState.role,
// });

// const mapDispatchProps = (dispatch) => ({
//   login: (user) => dispatch(setUser(user)),
// });

export default //connect(mapStateProps, mapDispatchProps)(
Login;
//)

*/
