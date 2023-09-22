import React from "react";
import { Container, Grid } from "@material-ui/core";
import { SearchOutlined, LocationOnOutlined } from "@material-ui/icons";
import "./searchbox.css";
import { useTranslation } from "react-i18next";

export default function Searchbox() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" style={{ display: "flex" }}>
      <Grid container className="search-box">
        <Grid xs={6} item className="search">
          <SearchOutlined />
          <input
            type="text"
            className="search-input"
            placeholder={t("search_text_field_1")}
          />
        </Grid>
        <Grid xs={6} item className="search search-2">
          <LocationOnOutlined />
          <input
            type="text"
            className="search-input "
            placeholder={t("search_text_field_2")}
          />
        </Grid>
      </Grid>

      <div className="search-btn">{t("search_btn")}</div>
    </Container>
  );
}
