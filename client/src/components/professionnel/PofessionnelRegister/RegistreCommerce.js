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
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { signupProfessionnel } from "../../../actions/professionnel.actions";
import { PROFESSIONNEL_REGISTER_RESET } from "../../../actions/professionnel.types";
import StepsPro from "./StepsPro";

export default function RegistreCommerce(props) {
  const [file, setFile] = useState("");
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const professionnel = JSON.parse(localStorage.getItem("professionnelInfos"));
  if (!professionnel) {
    props.history.push("/register/type");
  } else {
    if (!professionnel.latitude) props.history.push("/register/position");
  }
  // const { success: successRegister, loading: loadingRegister } = useSelector(
  //   (state) => state.registerProfessionnel
  // );
  // const dispatch = useDispatch();

  const handleSubmit = async () => {
    console.log('professionnel', professionnel);
    try {
      const { data } = await axios.post("/api/medecin/register", professionnel);
      if (data["message"] === "fail") {
        alert('Medecin exist déjà');
      } else {
        if (data["message"] === "success") {
          props.history.push("/register/success/pro");
        }
      }
    } catch (error) {
      console.log(error);
    }
    // setLoading(true);
    // setError("");
    // const body = {
    //   requests: [
    //     {
    //       image: {
    //         content: base64.split(",")[1],
    //       },

    //       features: [
    //         {
    //           type: "TEXT_DETECTION",
    //         },
    //       ],
    //     },
    //   ],
    // };

    // await axios
    //   .post(
    //     "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAyd9MfKsyDjtn9mlB8aLD_FKTMILWTiWY",
    //     body
    //   )
    //   .then(({ data }) => {
    //     setLoading(false);
    //     const { nom, prenom } = professionnel;
    //     const text =
    //       data.responses[0].textAnnotations[0].description.toLowerCase();
    //     console.log('iciiii', professionnel, text);
    //     if (
    //       text.includes(nom.toLowerCase()) &&
    //       text.includes(prenom.toLowerCase())
    //     ) {
    //       //dispatch(signupProfessionnel(professionnel));
    //     } else {
    //       setError("Document d'identité non correspondant");
    //     }
    //   })
    //   .catch((error) => console.log('error', error))
  };
  // useEffect(() => {
  //   if (successRegister) {
  //     dispatch({
  //       type: PROFESSIONNEL_REGISTER_RESET,
  //     });
  //     localStorage.removeItem("professionnelInfos");
  //     props.history.push("/register/success/pro");
  //   }
  // }, [successRegister]);

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
          <StepsPro step1={true} step2={true} step3={false} />

          <Card style={{ marginTop: "50px" }}>
            <Collapse in={loading /*|| loadingRegister*/}>
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
