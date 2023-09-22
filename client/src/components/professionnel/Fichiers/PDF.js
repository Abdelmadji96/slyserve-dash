import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@material-ui/core";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import moment from "moment";
import JsBarcode from "jsbarcode";

const Pdftemplate = ({ ordonnance }) => {
  const canvas = document.createElement("canvas");
  ordonnance &&
    JsBarcode(canvas, ordonnance.codebarre, {
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
                  DR {ordonnance.medecinNom} {ordonnance.medecinPrenom}
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 10, marginBottom: 5 }}>
                  {ordonnance.nom_fr}
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 10, marginBottom: 5 }}>
                  {ordonnance.medecinAdresse}
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 10, marginBottom: 5 }}>
                  Alger
                </Text>
                <Text style={{ fontSize: 12, marginLeft: 10, marginBottom: 5 }}>
                  {ordonnance.medecinTelephone}
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
                ORDONNANCE
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                Patient :{" "}
                <Text style={{ fontSize: 12, fontWeight: 700 }}>
                  {ordonnance.nomPatient}
                </Text>
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                Age : {ordonnance.agePatient}
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>Sexe : M</Text>

              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                Tél : {ordonnance.telPatient}
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
                {ordonnance.medecinAdresse}, le{" "}
                {moment(new Date()).format("DD/MM/YYYY")}
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                height: 10,
                marginTop: 10,
                height: 30,
                backgroundColor: "#E8E8E8",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  marginLeft: 60,
                  fontWeight: 500,
                  marginTop: 8,
                }}
              >
                Prescription en rapport avec une affection de longue durée
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 100,
                marginTop: 50,
              }}
            >
              {ordonnance.medicaments &&
                ordonnance.medicaments.map((m) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {m.nom}
                    </Text>
                    <Text style={{ fontSize: 10, fontWeight: 400 }}>
                      {m.description}
                    </Text>
                  </View>
                ))}
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

export default function PDFOrdonnance({ ordonnance }) {
  return (
    <Button color="primary">
      <PDFDownloadLink
        style={{ color: "red" }}
        document={<Pdftemplate ordonnance={ordonnance} />}
        fileName="ordonnace.pdf"
      >
        {({ blob, url, loading, error }) => "Télécharger"}
      </PDFDownloadLink>
    </Button>
  );
}
