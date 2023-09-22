import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import { ExternalLink } from "react-external-link";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import HtmlPolicy from "../Policy/HtmlPolicy.js";

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(I18nextBrowserLanguageDetector)
  .init({
    supportedLngs: ["en", "fr", "ar"],
    fallbackLng: "fr",
    detection: {
      order: [
        "cookie",
        "localStorage",
        "sessionStorage",
        "htmlTag",
        "navigator",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    fallbackNS: "fr",
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

//   const policy = require('../../assets/html/policy.html')

function Terms() {
  const { t, i18n } = useTranslation();

  return (
    <div style={{ height: "100%" }}>
      <Navbar home />
      {/* <div dangerouslySetInnerHTML={{__html: policy}}/> */}
      <HtmlPolicy />
      <section className="contact-details" id="contact-details-section">
        <div className="row text-center text-md-left">
          <div className="col-12 col-md-6 col-lg-3 grid-margin">
            <img
              src="/images/sly_update_1.png"
              alt=""
              className="pb-2"
              height="60"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3 grid-margin">
            <h5 className="pb-2">{t("contact_us")}</h5>
            <div className="pt-2">
              <p className="text-muted m-0">slyserve@mail.com</p>
              <p className="text-muted m-0">+213 672 54 57 73</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 grid-margin">
            <h5 className="pb-2">{t("our_guide")}</h5>
            <Link to="/terms">
              <p className="m-0 pb-2">Termes</p>
            </Link>
            <Link to="/policy">
              <p className="m-0 pt-1 pb-2">Politique de confidentialité</p>
            </Link>
            <Link to="/discover">
              <p className="m-0 pt-1">Decouvrir</p>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-3 grid-margin">
            <h5 className="pb-2">{t("adress")}</h5>
            <p className="text-muted">
              Boumerdès
              <br />
              ALGERIE
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
    </div>
  );
}

export default Terms;
