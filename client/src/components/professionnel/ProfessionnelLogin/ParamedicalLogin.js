import React from "react";
import Navbar from "../../NavBar/Navbar";
import Footer from "../../Home/Footer";
// import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";
// import { PARAMEDICAL_LOGIN_RESET } from "../../../actions/professionnel.types";
// import {
//   loginParamedicalEmail,
//   loginParamedicalTelephone,
// } from "../../../actions/professionnel.actions";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { connect } from "react-redux";
import { setToken, setUser } from "../../../redux/actions/user";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function ParamedicalLogin(props) {
  // const dispatch = useDispatch();
  const { t } = useTranslation();
  // const {
  //   loading: loadingLogin,
  //   error,
  //   login,
  //   success: successLogin,
  // } = useSelector((state) => state.loginParamedicalReducer);
  // if (login) {
  //   if (successLogin) {
  //     props.history.push("/");
  //     dispatch({ type: PARAMEDICAL_LOGIN_RESET });
  //   }
  // }
  const [phoneEmail, setphoneEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const onSubmit = async () => {
    if (phoneEmail !== "" && mdp !== "") {
      try {
        const { data } = await axios.post(
          `/api/paramedical/login/${
            phoneEmail.match(regexEmail) ? "email" : "telephone"
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
        if (data["paramedical"]) {
          props.saveToken(data["token"]);
          props.login(data["paramedical"]);
          props.history.push("/");
        }
        // localStorage.setItem("paramedical", JSON.stringify(data));
        // dispatch({ type: PARAMEDICAL_LOGIN_SUCCESS, payload: data });
      } catch (error) {
        console.log(error);
        // dispatch({
        //   type: PARAMEDICAL_LOGIN_FAIL,
        //   payload:
        //     error.response && error.response.data.message
        //       ? error.response.data.message
        //       : error.message,
        // });
      }
      // if (phoneEmail.match(regexEmail)) {
      //   dispatch(loginParamedicalEmail(phoneEmail, mdp));
      // } else {
      //   dispatch(loginParamedicalTelephone(phoneEmail, mdp));
      // }
    }
  };
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   setOpen(successLogin);
  // }, [successLogin]);
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
            {/* {loadingLogin && <LinearProgress color="primary" />} */}
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
                //disabled={loadingLogin}
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
}

const mapDispatchProps = (dispatch) => ({
  saveToken: (token) => dispatch(setToken(token)),
  login: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchProps)(ParamedicalLogin);
