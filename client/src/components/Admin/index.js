import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch, connect } from "react-redux";
import Navbar from "../NavBar/Navbar";
import { setToken, setUser } from "../../redux/actions/user";
import Footer from "../Home/Footer";
import axios from "axios";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_SUCCESS } from "../../actions/Admin/admin.types";

const AdminLogin = (props) => {
  const { t } = useTranslation();
  const [phoneEmail, setphoneEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const onSubmit = async () => {
    console.log('ggggg');
    try {
      const { data } = await axios.post(
        `/api/admin/login`,
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
      console.log('first', data);
      await props.saveToken(data["token"]);
      await props.login(data["admin"]);
      // props.history.push("/menu");
      window.location.replace('/admin/menu');
      localStorage.setItem("user", JSON.stringify(data.admin));
      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data.admin });
    } catch (error) {
      dispatch({
        type: ADMIN_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      console.log('error', error);
    }
  };
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="md">
          <Card>

            <CardContent>
              <Typography variant="h6" align="center" gutterBottom={10}>
                {t("conx_sly_admin")}
              </Typography>
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
                //disabled={loadingLogin}
                onClick={() => onSubmit()}
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

export default connect(null, mapDispatchProps)(AdminLogin);
