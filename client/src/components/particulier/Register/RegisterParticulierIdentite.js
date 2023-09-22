import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CardContent,
  Card,
  LinearProgress,
  Collapse,
} from "@material-ui/core";
import Navbar from "../../NavBar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { signupParticulier } from "../../../actions/user.actions";
import { USER_SIGNUP_RESET } from "../../../actions/user.types";
import axios from "axios";

export default function RegisterParticulierIdentite(props) {
  const [file, setFile] = useState("");
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const particulier = JSON.parse(localStorage.getItem("particulierInfos"));
  if (!particulier) props.history.push("/register/type");
  else {
    if (!particulier.latitude)
      props.history.push("/register/particulier/position");
  }
  const { loading: loadingRegister, success: successRegister } = useSelector(
    (state) => state.registerUser
  );

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const body = {
      requests: [
        {
          image: {
            content: base64.split(",")[1],
          },

          features: [
            {
              type: "TEXT_DETECTION",
            },
          ],
        },
      ],
    };

    await axios
      .post(
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAyd9MfKsyDjtn9mlB8aLD_FKTMILWTiWY",
        body
      )
      .then(({ data }) => {
        setLoading(false);
        const { nom, prenom } = particulier;
        const text = data.responses[0].textAnnotations[0].description.toLowerCase();
        if (
          text.includes(nom.toLowerCase()) &&
          text.includes(prenom.toLowerCase())
        ) {
          dispatch(signupParticulier(particulier));
        } else {
          window.scrollTo(0, 0);
          setError("Document d'identité non correspondant");
        }
      });
  };
  useEffect(() => {
    if (successRegister) {
      dispatch({ type: USER_SIGNUP_RESET });
      props.history.push("/register/particulier/success");
      localStorage.removeItem("particulierInfos");
    }
  }, [successRegister]);

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container maxWidth="lg">
          <Card style={{ marginTop: "50px" }}>
            <Collapse in={loading || loadingRegister}>
              <LinearProgress color="primary" />
            </Collapse>
            <Collapse in={error !== ""}>
              <Alert severity="error">{error}</Alert>
            </Collapse>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom={10}>
                Votre document d'identité
              </Typography>
              <Typography variant="body1" gutterBottom={8} align="center">
                Veuillez séléctioner votre document
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <input
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  onChange={(e) => {
                    getBase64(e.target.files[0]);
                    if (e.target.files[0])
                      setFile(URL.createObjectURL(e.target.files[0]));
                  }}
                  style={{
                    border: "1px solid #ccc",
                    display: "inline-block",
                    padding: "6px 12px",
                  }}
                />
              </div>
              {file !== "" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <img
                    src={file}
                    style={{
                      height: "500px",
                      width: "500px",
                      border: "1px solid black",
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                <button
                  style={{ width: "150px" }}
                  className="btn btn-outline-danger"
                  onClick={handleSubmit}
                >
                  Suivant
                </button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}
