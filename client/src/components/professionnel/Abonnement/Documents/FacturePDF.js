import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import slyLogo from "../../../../images/sly_update_1.png";

const Pdftemplate = ({ facture }) => {
  console.log(facture);
  return (
    <Document>
      <Page size="A4">
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "35%",
              backgroundColor: "#E6E6E6",
              height: "100vh",
            }}
          >
            <View
              style={{
                display: "flex",
                flexGrow: 1,
                marginLeft: 50,
                marginTop: 30,
              }}
            >
              <Image
                src={slyLogo}
                style={{
                  height: 70,
                  width: 70,
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                height: 250,
                backgroundColor: "red",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 50,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <Text style={{ fontSize: 15, marginBottom: 20, color: "#fff" }}>
                  157 Cité Ben Haroun Section 4, Larbatache Boumerdès
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 10, color: "#fff" }}>
                  +213 672 54 57 73
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 10, color: "#fff" }}>
                  contact@slyserve.com
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 10, color: "#fff" }}>
                  www.slyserve.com
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "65%",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 30,
                marginLeft: "50%",
              }}
            >
              <Text style={{ fontSize: 50, color: "#101b4b" }}>Facture</Text>
              {/* <Text style={{ fontSize: 15, color: "#101b4b" }}>N 455</Text> */}
              <Text style={{ fontSize: 15, color: "#101b4b" }}>
                Date : {facture ? facture.date : ""}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                height: 3,
                backgroundColor: "#101b4b",
                marginTop: 20,
                marginBottom: 50,
              }}
            />
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontSize: 15, color: "#101b4b", marginTop: 4 }}>
                Facturé à
              </Text>
              <View
                style={{
                  marginLeft: 30,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{ fontSize: 20, marginBottom: 5, color: "#101b4b" }}
                >
                  {facture ? facture.professionnel : ""}
                </Text>
                <Text
                  style={{ fontSize: 10, marginBottom: 5, color: "#101b4b" }}
                >
                  {facture ? facture.adresse : ""}
                </Text>
                <Text
                  style={{ fontSize: 10, marginBottom: 5, color: "#101b4b" }}
                >
                  {facture ? facture.telephone : ""}
                  {facture ? facture.email : ""}
                </Text>
              </View>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 50 }}
            >
              <Text style={{ fontSize: 15, color: "#101b4b", flexGrow: 1 }}>
                DESCRIPTION
              </Text>
              <Text style={{ fontSize: 15, color: "#101b4b" }}>PRIX HT</Text>
            </View>
            <View
              style={{ display: "flex", marginTop: 20, flexDirection: "row" }}
            >
              <Text style={{ fontSize: 10, color: "#101b4b", flexGrow: 1 }}>
                {facture
                  ? facture.formule1
                    ? "Gestion planning et patients"
                    : ""
                  : ""}
              </Text>
              <Text style={{ fontSize: 10, color: "#101b4b" }}>2000 DA</Text>
            </View>
            {facture && (
              <View
                style={{ display: "flex", marginTop: 20, flexDirection: "row" }}
              >
                {facture.formule2 && (
                  <Text style={{ fontSize: 10, color: "#101b4b", flexGrow: 1 }}>
                    Consultation vidéo
                  </Text>
                )}
                {facture.formule2 && (
                  <Text style={{ fontSize: 10, color: "#101b4b" }}>
                    1000 DA
                  </Text>
                )}
              </View>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 60,
                marginRight: 10,
                marginLeft: 200,
              }}
            >
              <View
                style={{ display: "flex", marginTop: 20, flexDirection: "row" }}
              >
                <Text style={{ fontSize: 10, color: "#101b4b", flexGrow: 1 }}>
                  SOUS-TOTAL
                </Text>
                <Text style={{ fontSize: 10, color: "#101b4b" }}>3000 DA</Text>
              </View>
              <View
                style={{ display: "flex", marginTop: 20, flexDirection: "row" }}
              >
                <Text style={{ fontSize: 10, color: "#101b4b", flexGrow: 1 }}>
                  TVA 19%
                </Text>
                <Text style={{ fontSize: 10, color: "#101b4b" }}>
                  319,33 DA
                </Text>
              </View>
              <View
                style={{ display: "flex", marginTop: 20, flexDirection: "row" }}
              >
                <Text style={{ fontSize: 10, color: "#101b4b", flexGrow: 1 }}>
                  MONTANT DÛ
                </Text>
                <Text style={{ fontSize: 10, color: "#101b4b" }}>
                  {facture ? facture.total : 0} DA TTC
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  display: "flex",
                  height: 3,
                  backgroundColor: "#101b4b",
                  marginTop: 60,
                }}
              />

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 30,
                  marginTop: 100,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <Text
                    style={{ fontSize: 12, color: "#101b4b", marginBottom: 5 }}
                  >
                    LE MONTANT
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#101b4b", marginBottom: 5 }}
                  >
                    CORRESPONDANT À CETTE
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#101b4b", marginBottom: 5 }}
                  >
                    FACTURE SERA DÉBITÉ
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#101b4b", marginBottom: 5 }}
                  >
                    AUTOMATIQUEMENT.
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: "#101b4b", marginTop: 10 }}>
                  Merci !
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function FacturePDF({ facture }) {
  return (
    <>
      <PDFDownloadLink
        style={{
          color: "red",
          border: "2px solid red",
          textAlign: "center",
          padding: "10px",
        }}
        document={<Pdftemplate facture={facture} />}
        fileName="facture"
      >
        {({ blob, url, loading, error }) => "Télécharger"}
      </PDFDownloadLink>
    </>
  );
}
