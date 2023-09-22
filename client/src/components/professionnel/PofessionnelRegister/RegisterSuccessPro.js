import React from "react";

import { Container, Card, CardContent, Typography } from "@material-ui/core";
import Navbar from "../../NavBar/Navbar";
import StepsPro from "./StepsPro";
export default function RegisterSuccessPro(props) {
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container">
        <Container>
          <StepsPro step1={true} step2={true} step3={true} />
          <Card style={{ marginTop: "50px" }}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom={10}>
                Votre compte a été crée avec succès
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.history.push("/login/type")}
                >
                  Se connecter
                </button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}
