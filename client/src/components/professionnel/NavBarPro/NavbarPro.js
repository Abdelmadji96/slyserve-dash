import React from "react";
import {
  PersonOutline,
  PeopleOutline,
  AssignmentOutlined,
  MailOutlined,
  ExitToAppOutlined,
  EventOutlined,
  MenuOutlined,
  Close,
  HomeOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import { IconButton, Typography, Select } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NavbarPro(props) {
  const { t, i18n } = useTranslation();
  const openMenu = () => {
    document.querySelector(".menu").classList.add("menu-show");
    document.querySelector(".body-container").classList.add("sidebar-open");
    document.querySelector(".nav-menu").classList.add("nav-menu-hide");
  };
  const closeMenu = () => {
    document.querySelector(".menu").classList.remove("menu-show");
    document.querySelector(".body-container").classList.remove("sidebar-open");
    document.querySelector(".nav-menu").classList.remove("nav-menu-hide");
  };
  const changeLanguage = (ln) => {
    i18n.changeLanguage(ln);
  };
  return (
    <header id="header-section">
      <nav
        className={`navbar navbar-expand-lg pl-3 pl-sm-0 ${
          props.navbar && " navbar-white"
        }`}
        id="navbar"
      >
        <div className="header-menu">
          <Link
            to="/"
            onClick={() => {
              document.querySelector(".menu").classList.remove("menu-show");
              document
                .querySelector(".body-container")
                .classList.remove("sidebar-open");
            }}
          >
            <div className="navbar-brand-wrapper">
              <img src="/images/sly_update_1.png" className="logo" alt="logo" />
            </div>
          </Link>
          <div className="menu-login">
            <ul className="nav-menu navbar-big">
              <NavLink
                activeClassName="nav-active"
                to="/"
                exact
                className="nav-item"
              >
                {t("home")}
              </NavLink>

              <NavLink
                activeClassName="nav-active"
                to="/pro"
                className="nav-item"
              >
                {t("pro")}
              </NavLink>
              <NavLink
                activeClassName="nav-active"
                to="/searchtype"
                className="nav-item"
              >
                {t("search")}
              </NavLink>
              <NavLink
                activeClassName="nav-active"
                to="/login"
                className="nav-item"
              >
                {t("login")}
              </NavLink>
            </ul>
            <div>
              <Select
                className="language"
                native
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </Select>
            </div>
            <IconButton style={{ marginLeft: "30px" }} onClick={openMenu}>
              <MenuOutlined style={{ fontSize: "40px", color: "black" }} />
            </IconButton>

            <div className="menu">
              <IconButton onClick={closeMenu}>
                <Close style={{ fontSize: "40px", color: "black" }} />
              </IconButton>
              <div
                className={
                  i18n.language === "ar" ? "menu-items-ar" : "menu-items"
                }
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src="/images/sly_update_1.png" alt="logo" height="60" />
                </div>
                <div style={{ marginTop: "15px" }}>
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom={4}
                    className="menu-item-link"
                  >
                    {t("menu_title_pro")}
                  </Typography>
                </div>
                <NavLink
                  to="/"
                  exact
                  className="menu-item navbar-small"
                  activeClassName="active-link"
                  onClick={closeMenu}
                >
                  <HomeOutlined className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_1")}
                  </Typography>
                </NavLink>
                <NavLink
                  to="/search"
                  className="menu-item navbar-small"
                  activeClassName="active-link"
                  onClick={closeMenu}
                >
                  <SearchOutlined className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_2")}
                  </Typography>
                </NavLink>
                <NavLink
                  to="/pro"
                  className="menu-item navbar-small"
                  activeClassName="active-link"
                  onClick={closeMenu}
                >
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_3")}
                  </Typography>
                  <PersonOutline className="menu-icon" />
                </NavLink>

                <NavLink
                  to="/maficheprofessionnelle"
                  className="menu-item"
                  activeClassName="active-link"
                  onClick={closeMenu}
                >
                  <PersonOutline className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_4")}
                  </Typography>
                </NavLink>
                <NavLink
                  to="/monplanning"
                  className="menu-item"
                  activeClassName="active-link"
                  onClick={closeMenu}
                >
                  <EventOutlined className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_5")}
                  </Typography>
                </NavLink>

                <NavLink
                  to="/mespatients"
                  className="menu-item"
                  activeClassName="active-link"
                  onClick={closeMenu}
                >
                  <PeopleOutline className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_6")}
                  </Typography>
                </NavLink>

                <NavLink
                  className="menu-item"
                  activeClassName="active-link"
                  onClick={closeMenu}
                  to="/monabonnement"
                >
                  <AssignmentOutlined className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_7")}
                  </Typography>
                </NavLink>
                <div className="menu-item">
                  <MailOutlined className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_8")}
                  </Typography>
                </div>
                <div className="menu-item">
                  <ExitToAppOutlined className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_9")}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
