import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-ui/core";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";

const Pdftemplate = ({ compteRendu }) => {
  console.log(compteRendu);
  const canvas = document.createElement("canvas");
  compteRendu &&
    JsBarcode(canvas, compteRendu.codebarre, {
      background: "#E8E8E8",
      fontSize: 16,
      marginTop: 10,
    });
  const barcode = canvas.toDataURL();
  return (
    <Document>
      <Page size="A4">
        <View
          style={{ display: "flex", height: "100%", flexDirection: "column" }}
        >
          <View style={{ flexGrow: 1 }}>
            <View
              style={{
                display: "flex",
                padding: 10,
                backgroundColor: "#E8E8E8",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Text style={{ fontSize: 20, margin: 10, fontWeight: 700 }}>
                  DR {compteRendu.medecinNom} {compteRendu.medecinPrenom}
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 10, marginBottom: 5 }}>
                  {compteRendu.nom_fr}
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 10, marginBottom: 5 }}>
                  {compteRendu.medecinAdresse}
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 10, marginBottom: 5 }}>
                  Alger
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 10, marginBottom: 5 }}>
                  {compteRendu.medecinTelephone}
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 10 }}>N d'ordre </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  width: 150,
                  height: 60,
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <Image src={barcode} />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  margin: 10,
                  fontWeight: 700,
                  borderBottom: "2px solid black",
                }}
              >
                COMPTE RENDU
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                Patient :{" "}
                <Text style={{ fontSize: 12, fontWeight: 700 }}>
                  {compteRendu.nomPatient}
                </Text>
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                Age : {compteRendu.agePatient}
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>Sexe : M</Text>

              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                Tél : {compteRendu.telPatient}
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                NSS : 145263987
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                marginTop: 5,
                marginRight: 15,
                alignSelf: "flex-end",
                justifySelf: "flex-end",
              }}
            >
              <Text style={{ fontSize: 12, flexGrow: 1 }}>
                {compteRendu.medecinAdresse}, le{" "}
                {moment(new Date()).format("DD/MM/YYYY")}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                marginLeft: 20,
                marginTop: 20,
                marginRight: 20,
                height: 5,
                backgroundColor: "red",
              }}
            />

            <View
              style={{
                display: "flex",
                marginBottom: 20,
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 700 }}>
                {compteRendu.description}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              display: "flex",
              height: 5,
              backgroundColor: "red",
              marginBottom: 5,
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 10, flexGrow: 1 }}>www.slyserve.com</Text>
            <Text
              style={{
                fontSize: 10,
              }}
            >
              page 1/1
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function PDFCompteRendu({ compteRendu }) {
  return (
    <Button color="primary">
      <PDFDownloadLink
        style={{ color: "red" }}
        document={<Pdftemplate compteRendu={compteRendu} />}
        fileName={`compterendu_${compteRendu.nomPatient}_${compteRendu.prenomPatient}`}
      >
        {({ blob, url, loading, error }) => "Télécharger"}
      </PDFDownloadLink>
    </Button>
  );
}
