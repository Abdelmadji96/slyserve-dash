import React from "react";
import { Link } from "react-router-dom";
import {
  EventAvailableOutlined,
  SearchOutlined,
  VideocamOutlined,
} from "@material-ui/icons";
import "./home.css";
import { ExternalLink } from "react-external-link";
import i18next from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import languageDetector from "i18next-browser-languagedetector";
import Navbar from "../NavBar/Navbar";
import { Grid } from "@material-ui/core";
import SelectBox from "./SelectBox";
i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(languageDetector)
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

export default function Home(props) {
  const { t, i18n } = useTranslation();

  return (
    <div
      id="body"
      data-spy="scroll"
      data-target=".navbar"
      data-offset="100"
      className="body-container"
    >
      <Navbar home />

      <div className="banner" style={{ paddingTop: "50px" }}>
        <Grid container>
          <Grid item xs={12} md={6} style={{ marginTop: "50px" }}>
            <h1 className="font-weight-semibold">
              {t("title_home_part_1")}
              <br />
              {t("title_home_part_2")}
            </h1>
            <h6 className="font-weight-normal text-muted pb-3">
              {t("sub_title_home_part12")}
              <br />
              {t("sub_title_home_part22")}.
            </h6>
            <div>
              <SelectBox />

              {/* <button
                className="btn btn-outline-danger mr-1 w-200 btn-search"
                onClick={() => props.history.push("/search/type")}
              >
                {t("search")}
              </button> */}
            </div>
          </Grid>
          <Grid xs={12} md={6}>
            <img src="/images/pc_doctor.svg" alt="home" className="img-home" />
          </Grid>
        </Grid>
      </div>
      <div className="content-wrapper">
        <div className="container">
          <section className="features-overview" id="features-section">
            <div className="content-header">
              <h2> {t("title_home3")}</h2>
            </div>
            <div className="d-md-flex justify-content-between">
              <div className="grid-margin d-flex justify-content-start">
                <div className="features-width">
                  <SearchOutlined className="img-icons" />
                  <h5 className="py-3">{t("step_1_title_part_1")}</h5>

                  <h5 className="mt-3">{t("step_1_title_part_2")}</h5>
                  <p className="text-muted">{t("step_1_text")}</p>
                  <Link>
                    <p className="readmore-link"> {t("search")}</p>
                  </Link>
                </div>
              </div>
              <div className="grid-margin d-flex justify-content-center">
                <div className="features-width">
                  <EventAvailableOutlined className="img-icons" />
                  <h5 className="py-3">
                    {t("step_2_title_part_1")}
                    <br />
                    {t("step_2_title_part_2")}
                  </h5>
                  <p className="text-muted">{t("step_2_text")}</p>
                  <Link>
                    <p className="readmore-link"> {t("search")}</p>
                  </Link>
                </div>
              </div>
              <div className="grid-margin d-flex justify-content-end">
                <div className="features-width">
                  <VideocamOutlined alt="" className="img-icons" />
                  <h5 className="py-3">
                    {t("step_3_title_part_1")}
                    <br />
                    {t("step_3_title_part_2")}
                  </h5>
                  <p className="text-muted">{t("step_3_text")}</p>
                  <Link>
                    <p className="readmore-link"> {t("search")}</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section
            className="digital-marketing-service"
            id="digital-marketing-section"
          >
            <div className="row align-items-center">
              <div
                className="col-12 col-lg-7 grid-margin grid-margin-lg-0"
                data-aos="fade-right"
              >
                <h3 className="m-0">
                  {t("product_1_title_part_1")}
                  <br />
                  {t("product_1_title_part_2")}
                </h3>
                <div className="col-lg-7 col-xl-6 p-0">
                  <p className="py-4 m-0 text-muted">
                    {t("product_1_sub_title_1")}
                    <br />
                    {t("product_1_text")}
                  </p>
                  <p className="font-weight-medium text-muted">
                    {t("product_1_sub_title_2")}
                  </p>
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.history.push("/search/type/medecin")}
                >
                  {t("product_1_btn")}
                </button>
              </div>
              <div
                className="col-12 col-lg-5 p-0 img-digital grid-margin grid-margin-lg-0"
                data-aos="fade-left"
              >
                <img src="/images/3.png" alt="" className="img-product-1" />
              </div>
            </div>
            <div className="row align-items-center">
              <div
                className="col-12 col-lg-7 text-center flex-item grid-margin"
                data-aos="fade-right"
              >
                <img src="/images/14.png" alt="" className="img-product-2" />
              </div>
              <div
                className="col-12 col-lg-5 flex-item grid-margin"
                data-aos="fade-left"
              >
                <h3 className="mt-5">
                  {t("product_2_title_part_1")}
                  <br />
                  {t("product_2_title_part_2")}
                </h3>
                <div className="col-lg-9 col-xl-8 p-0">
                  <p className="py-4 m-0 text-muted">
                    {t("product_2_text_1")}

                    <br />
                    {t("product_2_text_2")}
                  </p>
                  <p className="pb-2 font-weight-medium text-muted">
                    {t("product_2_sub_title_1")}
                  </p>
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.history.push("/register/type")}
                >
                  {t("product_2_btn")}
                </button>
              </div>
            </div>
          </section>
          <section className="case-studies" id="case-studies-section">
            <div className="row grid-margin">
              <div className="col-12 text-center pb-5">
                <h2> {t("other_services")}</h2>
                <h6 className="section-subtitle text-muted">
                  {t("other_services_sub")}
                </h6>
              </div>
              <div
                className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                data-aos="zoom-in"
              >
                <div className="card color-cards">
                  <div className="card-body p-0">
                    <div className="bg-primary text-center card-contents">
                      <div className="card-image">
                        <img
                          src="/images/ambulance.png"
                          className="case-studies-card-img"
                          alt=""
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                      <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                          <h6 className="text-white pb-2 px-3">
                            {t("service_1_title")}
                          </h6>
                          <button
                            className="btn btn-white"
                            onClick={() =>
                              props.history.push("/search/type/ambulance")
                            }
                          >
                            {t("service_1_btn")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-details text-center pt-4">
                      <h6 className="m-0 pb-1">{t("service_1_title_2")}</h6>
                      <p> {t("service_1_sub_title")}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="card color-cards">
                  <div className="card-body p-0">
                    <div className="bg-warning text-center card-contents">
                      <div className="card-image">
                        <img
                          src="/images/pharmacie.png"
                          className="case-studies-card-img"
                          alt=""
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                      <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                          <h6 className="text-white pb-2 px-3">
                            {t("service_2_title")}
                          </h6>
                          <button
                            className="btn btn-white"
                            onClick={() =>
                              props.history.push("/search/type/pharmacie")
                            }
                          >
                            {t("service_2_btn")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-details text-center pt-4">
                      <h6 className="m-0 pb-1">{t("service_2_title_2")}</h6>
                      <p> {t("service_2_sub_title")}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="card color-cards">
                  <div className="card-body p-0">
                    <div className="bg-violet text-center card-contents">
                      <div className="card-image">
                        <img
                          src="/images/clinique.png"
                          className="case-studies-card-img"
                          alt=""
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                      <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                          <h6 className="text-white pb-2 px-3">
                            {t("service_3_title")}
                          </h6>
                          <button
                            className="btn btn-white"
                            onClick={() =>
                              props.history.push("/search/type/hopital")
                            }
                          >
                            {t("service_3_btn")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-details text-center pt-4">
                      <h6 className="m-0 pb-1">{t("service_3_title_2")}</h6>
                      <p>{t("service_3_sub_title")}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-6 col-lg-3 stretch-card"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="card color-cards">
                  <div className="card-body p-0">
                    <div className="bg-success text-center card-contents">
                      <div className="card-image">
                        <img
                          src="/images/donneur.png"
                          className="case-studies-card-img"
                          alt=""
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                      <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                          <h6 className="text-white pb-2 px-3">
                            {t("service_4_title")}
                          </h6>
                          <button
                            className="btn btn-white"
                            onClick={() =>
                              props.history.push("/search/type/donneurdesang")
                            }
                          >
                            {t("service_4_btn")}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-details text-center pt-4">
                      <h6 className="m-0 pb-1">{t("service_4_title_2")}</h6>
                      <p>{t("service_4_sub_title")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="customer-feedback" id="feedback-section">
            <div className="row">
              <div className="col-12 text-center pb-5">
                <h2>{t("health_pro_title_1")}</h2>
                <h6 className="section-subtitle text-muted m-0">
                  {t("health_pro_sub_title")}
                </h6>
              </div>
            </div>
          </section>
          <section className="contact-us" id="contact-section">
            <div className="contact-us-bgimage grid-margin">
              <div className="pb-4">
                <h4 className="px-3 px-md-0 m-0" data-aos="fade-down">
                  {t("health_pro_sub_title_2")}
                </h4>
              </div>
              <div data-aos="fade-up">
                <Link className="btn  btn-outline-danger" to="/discover">
                  {t("health_pro_btn")}
                </Link>
              </div>
            </div>
          </section>
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
      </div>
    </div>
  );
}
