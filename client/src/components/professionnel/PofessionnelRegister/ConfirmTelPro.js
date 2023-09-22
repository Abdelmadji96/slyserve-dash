import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  LinearProgress,
} from "@material-ui/core";
import Navbar from "../../NavBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { sendCode, verifyCode } from "../../../actions/user.actions";
import { signupProfessionnel } from "../../../actions/professionnel.actions";
import StepsPro from "./StepsPro";

export default function ConfirmTelPro(props) {
  const { professionnel } = useSelector((state) => state.saveProfessionnel);
  const {
    success: successVerifyCode,
    loading: loadingVerifyCode,
  } = useSelector((state) => state.verifyCodeUser);

  const { success: successRegister } = useSelector(
    (state) => state.registerUser
  );

  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  const onVerifyCode = () => {
    if (code.length === 6) {
      dispatch(verifyCode(professionnel.numeroTelephone, code));
    }
  };
  useEffect(() => {
    if (successVerifyCode) {
      if (!successRegister) {
        dispatch(signupProfessionnel(professionnel));
      }
      props.history.push("/register/success");
    } else {
    }
  }, [
    successRegister,
    successVerifyCode,
    dispatch,
    props.history,
    professionnel,
  ]);

  const resendCode = () => {
    dispatch(sendCode(professionnel.numeroTelephone));
  };

  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container>
          <Card>
            {loadingVerifyCode && <LinearProgress color="primary" />}
            <CardContent>
              <StepsPro step1={true} step2={true} step3={false} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom={8}>
                Vérifiez qu'il s'agit bien de vous
              </Typography>
              <Typography variant="body1" align="center">
                Nous avons envoyé un code d'activation de 6 chiffres à votre
                numéro de téléphone portable
              </Typography>
              <Typography variant="body1" align="center">
                Veuillez entrer le code ci-dessus
              </Typography>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "20px auto",
                }}
              >
                <TextField
                  label="Code"
                  fullWidth
                  variant="outlined"
                  type="number"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  style={{ width: "100px", marginTop: "20px" }}
                  className="btn btn-outline-danger"
                  onClick={onVerifyCode}
                  disabled={loadingVerifyCode}
                >
                  Envoi
                </button>
              </div>
              <Typography variant="body2" color="primary">
                Vous n'avez pas reçu de code ?{" "}
                <button
                  className="btn"
                  style={{ color: "red", fontWeight: "bold", paddingLeft: "0" }}
                  onClick={resendCode}
                >
                  Renvoyer
                </button>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}
