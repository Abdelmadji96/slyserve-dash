import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../NavBar/Navbar";
import { Grid } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

export default function HomePro(props) {
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
      {i18n.language === "ar" ? (
        <div className="banner">
          <Grid
            container
            spacing={4}
            justify="center"
            style={{ width: "100%" }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <img
                src="images/home_pro.svg"
                alt=""
                className="img-fluid home-pro"
                data-aos="fade-right"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <h1 className="font-weight-semibold title-home">
                {t("home_pro_title_1")}
              </h1>
              <h6 className="font-weight-normal text-muted pb-3 subtitle-home">
                {t("home_pro_sub_title_1")}
              </h6>
              <div className="home-features-ar">
                <div className="home-feature">
                  <p> {t("home_pro_adv_1")}</p>
                  <Check />
                </div>
                <div className="home-feature">
                  <p> {t("home_pro_adv_2")}</p>
                  <Check />
                </div>
                <div className="home-feature">
                  <p> {t("home_pro_adv_3")}</p>
                  <Check />
                </div>
                <div className="home-feature">
                  <p> {t("home_pro_adv_4")}</p>
                  <Check />
                </div>
              </div>
              <button
                className="btn btn-outline-danger btn-pro-ar"
                onClick={() => props.history.push("/register/type/pro")}
              >
                {t("home_pro_btn")}
              </button>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="banner">
          <Grid
            container
            spacing={4}
            justify="center"
            style={{ width: "100%" }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <h1 className="font-weight-semibold title-home">
                {t("home_pro_title_1")}
              </h1>
              <h6 className="font-weight-normal text-muted pb-3 subtitle-home">
                {t("home_pro_sub_title_1")}
              </h6>
              <div className="home-features">
                <div className="home-feature">
                  <Check />
                  <p> {t("home_pro_adv_1")}</p>
                </div>
                <div className="home-feature">
                  <Check />
                  <p> {t("home_pro_adv_2")}</p>
                </div>
                <div className="home-feature">
                  <Check />
                  <p> {t("home_pro_adv_3")}</p>
                </div>
                <div className="home-feature">
                  <Check />
                  <p> {t("home_pro_adv_4")}</p>
                </div>
              </div>
              <button
                className="btn btn-outline-danger btn-pro"
                onClick={() => props.history.push("/register/type/pro")}
              >
                {t("home_pro_btn")}
              </button>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <img
                src="images/home_pro.svg"
                alt=""
                className="img-fluid home-pro"
                data-aos="fade-left"
              />
            </Grid>
          </Grid>
        </div>
      )}

      <div className="content-wrapper">
        <div className="container">
          <section className="features-overview" id="features-section">
            <div className="content-header">
              <h1>{t("our_services_pro")}</h1>
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
                  {t("Service_1_title_part_1")}
                  <br />
                  {t("Service_1_title_part_2")}
                </h3>
                <div className="col-lg-7 col-xl-6 p-0">
                  <p className="py-4 m-0 text-muted">
                    {t("Service_1_text_part_1")}
                    <br />
                    {t("Service_1_text_part_2")}
                  </p>
                  <p className="font-weight-medium text-muted">
                    {t("Service_1_text_2")}
                  </p>
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.history.push("/register/type/pro")}
                >
                  {t("Services_btn")}
                </button>
              </div>
              <div
                className="col-12 col-lg-5 p-0 img-digital grid-margin grid-margin-lg-0"
                data-aos="fade-left"
              >
                <img
                  src="images/15.png"
                  alt=""
                  className="img-fluid img-home-product img-rdv"
                />
              </div>
            </div>
            <div className="row align-items-center">
              <div
                className="col-12 col-lg-7 text-center flex-item grid-margin"
                data-aos="fade-right"
              >
                <img
                  src="images/13.png"
                  alt=""
                  className="img-fluid img-home-product img-telecons"
                />
              </div>
              <div
                className="col-12 col-lg-5 flex-item grid-margin"
                data-aos="fade-left"
              >
                <h3 className="mt-5">{t("Service_2_title")}</h3>
                <div className="col-lg-9 col-xl-8 p-0">
                  <p className="py-4 m-0 text-muted">{t("Service_2_text")}</p>
                  <p className="pb-2 font-weight-medium text-muted">
                    {t("Service_1_text_2")}
                  </p>
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.history.push("/register/type/pro")}
                >
                  {t("Services_btn")}
                </button>
              </div>
            </div>
            <div className="row align-items-center">
              <div
                className="col-12 col-lg-7 grid-margin grid-margin-lg-0"
                data-aos="fade-right"
              >
                <h3 className="m-0">{t("Service_3_title")}</h3>
                <div className="col-lg-7 col-xl-6 p-0">
                  <p className="py-4 m-0 text-muted">{t("Service_3_text")}</p>
                  <p className="font-weight-medium text-muted">
                    {t("Service_3_text_2")}
                  </p>
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.history.push("/register/type/pro")}
                >
                  {t("Services_btn")}
                </button>
              </div>
              <div
                className="col-12 col-lg-5 p-0 img-digital grid-margin grid-margin-lg-0"
                data-aos="fade-left"
              >
                <img
                  src="images/online_doctor_7.svg"
                  alt=""
                  className="img-fluid img-home-product img-rdv"
                />
              </div>
            </div>
            <div className="row align-items-center">
              <div
                className="col-12 col-lg-7 text-center flex-item grid-margin"
                data-aos="fade-right"
              >
                <img
                  src="images/online_doctor_5.svg"
                  alt=""
                  className="img-fluid  img-home-product img-rdv"
                />
              </div>
              <div
                className="col-12 col-lg-5 flex-item grid-margin"
                data-aos="fade-left"
              >
                <h3 className="mt-5">
                  {t("Service_4_title_part_1")}
                  <br />
                  {t("Service_4_title_part_2")}
                </h3>
                <div className="col-lg-9 col-xl-8 p-0">
                  <p className="py-4 m-0 text-muted">
                    {t("Service_4_text_part_1")}
                    <br />

                    {t("Service_4_text_part_2")}
                  </p>
                  <p className="pb-2 font-weight-medium text-muted">
                    {t("Service_4_text_2")}
                  </p>
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.history.push("/register/type/pro")}
                >
                  {t("Services_btn")}
                </button>
              </div>
            </div>
          </section>

          <section className="contact-details" id="contact-details-section">
            <div className="row text-center text-md-left">
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
                <img
                  src="images/sly_update_1.png"
                  alt=""
                  className="pb-2"
                  height="60"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
                <h5 className="pb-2">{t("contact_us")}</h5>
                <div className="pt-2">
                  <p className="text-muted m-0">slyserve@mail.com</p>
                  <p className="text-muted m-0">0778542364</p>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
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
              <div className="col-12 col-md-6 col-lg-3 grid-margin">
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
              <Link className="px-1" to="dd">
                Sly Serve.
              </Link>
              {t("copy_right")}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
