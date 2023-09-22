import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import bc from "../../../images/bc.png";

// Create styles

const pdf = (
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
              style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <Text style={{ fontSize: 20, margin: 10, fontWeight: 700 }}>
                Mourad Ben Safi
              </Text>
              <Text style={{ fontSize: 10, marginLeft: 10, marginBottom: 5 }}>
                Medecin generaliste
              </Text>
              <Text style={{ fontSize: 10, marginLeft: 10, marginBottom: 5 }}>
                36 rue Larbi ben mhidi
              </Text>
              <Text style={{ fontSize: 10, marginLeft: 10, marginBottom: 5 }}>
                Alger
              </Text>
              <Text style={{ fontSize: 10, marginLeft: 10, marginBottom: 5 }}>
                0548265856 / bensafi@gmail.com
              </Text>
              <Text style={{ fontSize: 10, marginLeft: 10 }}>N d'ordre </Text>
            </View>
            <View
              style={{
                display: "flex",
                width: 150,
                height: 40,
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              <Image src={bc} />
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
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              Patient :{" "}
              <Text style={{ fontSize: 10, fontWeight: 700 }}>Omar CHERIF</Text>
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              Patient : 60ans
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>Sexe : M</Text>

            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              Tél : 06 25 98 63
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
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
            <Text style={{ fontSize: 10, flexGrow: 1 }}>
              Alger, le 23/08/2021 à 09:25
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
              marginBottom: 500,
            }}
          />
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
export default function MyDocument() {
  return (
    <>
      {pdf}
      <PDFDownloadLink document={pdf} fileName="CompteRendu.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </>
  );
}
