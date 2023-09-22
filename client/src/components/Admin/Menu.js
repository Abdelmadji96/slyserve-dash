import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Container, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../actions/Admin/admin.actions";

export default function MenuAdmin() {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(adminLogout());
  };
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <div className="content-container">
        <Container maxWidth="lg">
          <Card style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" color="primary">
              Menu Admin
            </Typography>
          </Card>
          <Card style={{ marginTop: "50px" }}>
            <CardContent>
              <div className="insciption">
                <Link
                  className="btn btn-outline-danger"
                  to="/admin/comptes/particuliers"
                >
                  Gestion comptes particuliers
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/admin/comptes/medecins"
                >
                  Gestion comptes medecins
                </Link>
                <Link
                  className="btn btn-outline-danger"
                  to="/admin/compte/ambulances"
                >
                  Gestion comptes ambulances
                </Link>
                <Link className="btn btn-outline-danger" to="/admin/rendezvous">
                  Gestion des rendez-vous
                </Link>
                <Link className="btn btn-outline-danger" to="/admin/abonnement">
                  Gestion des abonnements
                </Link>
                <button
                  style={{ fontSize: "20px", marginTop: "15px" }}
                  className="btn btn-outline-danger"
                  onClick={handleSubmit}
                >
                  Deconnecter
                </button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}
