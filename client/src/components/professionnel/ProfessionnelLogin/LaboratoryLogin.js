import React, { useState } from "react";

import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  LinearProgress,
  Collapse,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Navbar from "../../NavBar/Navbar";
import { useDispatch, useSelector } from "react-redux";

import Alert from "@material-ui/lab/Alert";
import { useTranslation } from "react-i18next";
import Footer from "../../Home/Footer";
import { connect } from "react-redux";
import { setToken, setUser } from "../../../redux/actions/user";
import axios from "axios";
import { Visibility, VisibilityOff } from "@material-ui/icons";
const LaboratoryLogin = (props) => {
  const { t } = useTranslation();
  const [phoneEmail, setphoneEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const onSubmit = async () => {
    if (phoneEmail !== "" && mdp !== "") {
      try {
        const { data } = await axios.post(
          `/api/labo/login/${
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
        if (data["labo"]) {
          props.saveToken(data["token"]);
          props.login(data["labo"]);
          props.history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
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
                {t("conx_sly_pro")}
              </Typography>
              {/* <Collapse in={error !== ""}>
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

const mapDispatchProps = (dispatch) => ({
  saveToken: (token) => dispatch(setToken(token)),
  login: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchProps)(LaboratoryLogin);
