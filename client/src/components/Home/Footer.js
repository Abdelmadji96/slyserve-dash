import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import { useTranslation } from "react-i18next";
import { Container } from "@material-ui/core";

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <div style={{ marginTop: "100px", backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <section className="contact-details" id="contact-details-section">
          <div className="row text-center text-md-left">
            <div className="col-12 col-md-6 col-lg-3 grid-margin mt-3">
              <img
                src="/images/sly_update_1.png"
                alt=""
                className="pb-2"
                height="60"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 grid-margin mt-3">
              <h5 className="pb-2">{t("contact_us")}</h5>
              <div className="pt-2">
                <p className="text-muted m-0">slyserve@mail.com</p>
                <p className="text-muted m-0">0778542364</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 grid-margin mt-3">
              <h5 className="pb-2">{t("our_guide")}</h5>
              <Link>
                <p className="m-0 pb-2">Termes</p>
              </Link>
              <Link>
                <p className="m-0 pt-1 pb-2">Politique de confidentialité</p>
              </Link>
              <Link>
                <p className="m-0 pt-1">Decouvrir</p>
              </Link>
            </div>
            <div className="col-12 col-md-6 col-lg-3 grid-margin mt-3">
              <h5 className="pb-2">{t("adress")}</h5>
              <p className="text-muted">
                Alger
                <br />
                Algérie
              </p>
              <div className="d-flex justify-content-center justify-content-md-start">
                <Link>
                  <span className="mdi mdi-facebook"></span>
                </Link>
                <Link>
                  <span className="mdi mdi-twitter"></span>
                </Link>
                <Link>
                  <span className="mdi mdi-instagram"></span>
                </Link>
                <Link>
                  <span className="mdi mdi-linkedin"></span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <footer className="border-top">
          <p className="text-center text-muted pt-4">
            Copyright © 2021
            <Link className="px-1" to="">
              Sly Serve.
            </Link>
            {i18n.language === "ar" ? (
              <span>
                {t("copy_right")}
                <ExternalLink href="https://sadeeminfo.com/">
                  <span> SADEEM INFORMATIQUE</span>
                </ExternalLink>
                {t("site_dev")}
              </span>
            ) : (
              <span>
                {t("copy_right")} | {t("site_dev")}
                <ExternalLink href="https://sadeeminfo.com/">
                  <span> SADEEM INFORMATIQUE</span>
                </ExternalLink>
              </span>
            )}
          </p>
        </footer>
      </Container>
    </div>
  );
}
