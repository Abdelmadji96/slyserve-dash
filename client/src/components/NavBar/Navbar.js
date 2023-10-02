// import React from "react";
// import {
//   PersonOutline,
//   PeopleOutline,
//   AssignmentOutlined,
//   MailOutlined,
//   ExitToAppOutlined,
//   EventOutlined,
//   MenuOutlined,
//   Close,
//   HomeOutlined,
//   SearchOutlined,
//   PersonAddOutlined,
//   AssignmentIndOutlined,
//   CalendarTodayOutlined,
// } from "@material-ui/icons";
// import { IconButton, Typography, Select, MenuItem } from "@material-ui/core";
// import "./navbar.css";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutMedecin } from "../../actions/professionnel.actions";
// import { logoutParticulier } from "../../actions/user.actions";
// export default function NavBarBis(props) {
//   const { t, i18n } = useTranslation();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const changeLanguage = (ln) => {
//     i18n.changeLanguage(ln);
//   };

//   const { login: loginMedecin, medecin } = useSelector(
//     (state) => state.loginMedecinReducer
//   );
//   const { login: loginParticulier, particulier } = useSelector(
//     (state) => state.loginParticulierReducer
//   );

//   const { login: loginAmbulance } = useSelector(
//     (state) => state.ambulanceLoginReducer
//   );
//   const { login: loginPharmacie } = useSelector(
//     (state) => state.pharmacieLoginReducer
//   );
//   const { login: loginParamedical } = useSelector(
//     (state) => state.loginParamedicalReducer
//   );
//   const { login: loginClinique } = useSelector(
//     (state) => state.cliniqueLoginReducer
//   );
//   const openMenu = () => {
//     document.querySelector(".menu").classList.add("menu-show");
//     document.querySelector(".body-container").classList.add("sidebar-open");
//     document.querySelector(".navbar").classList.remove("navbar-white");
//     document.querySelector(".nav-menu").classList.add("nav-menu-hide");
//   };
//   const closeMenu = () => {
//     document.querySelector(".menu").classList.remove("menu-show");
//     document.querySelector(".body-container").classList.remove("sidebar-open");
//     !props.home &&
//       document.querySelector(".navbar").classList.add("navbar-white");
//     document.querySelector(".nav-menu").classList.remove("nav-menu-hide");
//   };

//   return (
//     <header id="header-section">
//       <nav
//         className={`navbar navbar-expand-lg pl-3 pl-sm-0 ${
//           props.navbar && " navbar-white"
//         }`}
//         id="navbar"
//       >
//         <div className="top-menu">
//           <Link to="/" onClick={closeMenu}>
//             <div className="navbar-brand-wrapper">
//               <img
//                 src="/images/sly_update_1.png"
//                 alt="logo"
//                 height="60"
//                 className="logo-img"
//               />
//             </div>
//           </Link>
//           <div className="menu-login">
//             <ul className="nav-menu navbar-big">
//               <NavLink
//                 activeClassName="nav-active"
//                 to="/"
//                 exact
//                 className="nav-item"
//               >
//                 {t("home")}
//               </NavLink>

//               <NavLink
//                 activeClassName="nav-active"
//                 to="/pro"
//                 className="nav-item"
//               >
//                 {t("pro")}
//               </NavLink>
//               <NavLink
//                 activeClassName="nav-active"
//                 to="/search/type"
//                 className="nav-item"
//               >
//                 {t("search")}
//               </NavLink>
//               {!loginMedecin && !loginParticulier && !loginAmbulance && (
//                 <>
//                   <NavLink
//                     activeClassName="nav-active"
//                     to="/login/type"
//                     className="nav-item"
//                   >
//                     {t("login")}
//                   </NavLink>

//                   <Link
//                     activeClassName="nav-active"
//                     to="/register/type"
//                     className={`nav-item ${
//                       location.pathname.includes("register") && "nav-active"
//                     }`}
//                   >
//                     {t("signup")}
//                   </Link>
//                 </>
//               )}
//             </ul>
//             <div>
//               <Select
//                 onChange={(e) => changeLanguage(e.target.value)}
//                 value={i18n.language || "fr"}
//                 className="language dropdown"
//                 defaultValue="fr"
//               >
//                 <MenuItem value="ar">العربية</MenuItem>
//                 <MenuItem value="fr">Français</MenuItem>
//                 <MenuItem value="en">English</MenuItem>
//               </Select>
//             </div>

//             <IconButton
//               style={{ marginLeft: "30px" }}
//               onClick={openMenu}
//               className={
//                 loginMedecin || loginAmbulance || loginParticulier
//                   ? ""
//                   : "navbar-small"
//               }
//             >
//               <MenuOutlined style={{ fontSize: "40px", color: "black" }} />
//             </IconButton>

//             <div className="menu">
//               <IconButton onClick={closeMenu}>
//                 <Close style={{ fontSize: "40px", color: "black" }} />
//               </IconButton>
//               <div
//                 className={
//                   i18n.language === "ar" ? "menu-items-ar" : "menu-items"
//                 }
//               >
//                 <div style={{ display: "flex", justifyContent: "center" }}>
//                   <img src="/images/sly_update_1.png" alt="logo" height="60" />
//                 </div>
//                 <div style={{ marginTop: "15px" }}>
//                   {loginMedecin || loginAmbulance ? (
//                     <Typography
//                       variant="h6"
//                       align="center"
//                       gutterBottom={4}
//                       className="menu-item-link"
//                     >
//                       {t("menu_title_pro")}
//                     </Typography>
//                   ) : loginParticulier ? (
//                     <Typography
//                       variant="h6"
//                       align="center"
//                       gutterBottom={4}
//                       className="menu-item-link"
//                     >
//                       {t("menu_title")}
//                     </Typography>
//                   ) : (
//                     <Typography
//                       variant="h6"
//                       align="center"
//                       gutterBottom={4}
//                       className="menu-item-link"
//                     >
//                       SLY SERVE
//                     </Typography>
//                   )}
//                   {loginMedecin ? (
//                     <Typography variant="body2" align="center" gutterBottom={6}>
//                       {medecin.medecin?.nom} {medecin.medecin?.prenom}
//                     </Typography>
//                   ) : loginParticulier ? (
//                     <Typography variant="body2" align="center" gutterBottom={6}>
//                       {particulier.particulier.nom}{" "}
//                       {particulier.particulier.prenom}
//                     </Typography>
//                   ) : null}
//                 </div>
//                 <NavLink
//                   to="/"
//                   exact
//                   className="menu-item navbar-small"
//                   activeClassName="active-link"
//                   onClick={closeMenu}
//                 >
//                   <HomeOutlined className="menu-icon" />
//                   <Typography variant="body1" className="menu-item-link">
//                     {t("menu_item_pro_1")}
//                   </Typography>
//                 </NavLink>
//                 <NavLink
//                   to="/pro"
//                   className="menu-item navbar-small"
//                   activeClassName="active-link"
//                   onClick={closeMenu}
//                 >
//                   <PersonOutline className="menu-icon" />
//                   <Typography variant="body1" className="menu-item-link">
//                     {t("menu_item_pro_3")}
//                   </Typography>
//                 </NavLink>
//                 <NavLink
//                   to="/search/type"
//                   className="menu-item navbar-small"
//                   activeClassName="active-link"
//                   onClick={closeMenu}
//                 >
//                   <SearchOutlined className="menu-icon" />
//                   <Typography variant="body1" className="menu-item-link">
//                     {t("menu_item_pro_2")}
//                   </Typography>
//                 </NavLink>
//                 {!loginMedecin && !loginParticulier && !loginAmbulance && (
//                   <>
//                     <NavLink
//                       activeClassName="active-link"
//                       to="/login/type"
//                       className="menu-item navbar-small"
//                       onClick={closeMenu}
//                     >
//                       <ExitToAppOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("login")}
//                       </Typography>
//                     </NavLink>
//                     <Link
//                       to="/register/type"
//                       className={`menu-item navbar-small ${
//                         location.pathname.includes("register") && "active-link"
//                       }`}
//                       onClick={closeMenu}
//                     >
//                       <PersonAddOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("signup")}
//                       </Typography>
//                     </Link>
//                   </>
//                 )}
//                 {loginMedecin ? (
//                   <>
//                     <NavLink
//                       to="/maficheprofessionnelle"
//                       className="menu-item"
//                       activeClassName="active-link"
//                       onClick={closeMenu}
//                     >
//                       <AssignmentIndOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("menu_item_pro_4")}
//                       </Typography>
//                     </NavLink>
//                     {medecin.medecin?.abonner_formule_1 == 1 && (
//                       <>
//                         <NavLink
//                           to="/monplanning"
//                           className="menu-item"
//                           activeClassName="active-link"
//                           onClick={closeMenu}
//                         >
//                           <EventOutlined className="menu-icon" />
//                           <Typography
//                             variant="body1"
//                             className="menu-item-link"
//                           >
//                             {t("menu_item_pro_5")}
//                           </Typography>
//                         </NavLink>

//                         <NavLink
//                           to="/mespatients"
//                           className="menu-item"
//                           activeClassName="active-link"
//                           onClick={closeMenu}
//                         >
//                           <PeopleOutline className="menu-icon" />
//                           <Typography
//                             variant="body1"
//                             className="menu-item-link"
//                           >
//                             {t("menu_item_pro_6")}
//                           </Typography>
//                         </NavLink>
//                       </>
//                     )}
//                     {medecin.medecin?.abonner_formule_1 == 1 ? (
//                       <NavLink
//                         className="menu-item"
//                         activeClassName="active-link"
//                         onClick={closeMenu}
//                         to="/professionnel/monabonnement"
//                       >
//                         <AssignmentOutlined className="menu-icon" />
//                         <Typography variant="body1" className="menu-item-link">
//                           {t("menu_item_pro_7")}
//                         </Typography>
//                       </NavLink>
//                     ) : (
//                       <NavLink
//                         className="menu-item"
//                         activeClassName="active-link"
//                         onClick={closeMenu}
//                         to="/professionnel/sabonner"
//                       >
//                         <AssignmentOutlined className="menu-icon" />
//                         <Typography variant="body1" className="menu-item-link">
//                           S'abonner
//                         </Typography>
//                       </NavLink>
//                     )}

//                     <div className="menu-item">
//                       <MailOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("menu_item_pro_8")}
//                       </Typography>
//                     </div>
//                     <Link
//                       className="menu-item"
//                       onClick={() => {
//                         closeMenu();
//                         dispatch(logoutMedecin());
//                       }}
//                     >
//                       <ExitToAppOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("menu_item_pro_9")}
//                       </Typography>
//                     </Link>
//                   </>
//                 ) : loginParticulier ? (
//                   <>
//                     <NavLink
//                       className="menu-item"
//                       activeClassName="active-link"
//                       to="/mesinformations"
//                       onClick={closeMenu}
//                     >
//                       <AssignmentIndOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("menu_item_5")}
//                       </Typography>
//                     </NavLink>
//                     <NavLink
//                       className="menu-item"
//                       activeClassName="active-link"
//                       to="/particulier/mesrdv"
//                       onClick={closeMenu}
//                     >
//                       <CalendarTodayOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("menu_item_4")}
//                       </Typography>
//                     </NavLink>
//                     <NavLink
//                       className="menu-item"
//                       activeClassName="active-link"
//                       to="mesproches"
//                       onClick={closeMenu}
//                     >
//                       <PeopleOutline className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("menu_item_6")}
//                       </Typography>
//                     </NavLink>
//                     <NavLink
//                       className="menu-item"
//                       activeClassName="active-link"
//                       to="/particulier/mesdocuments"
//                       onClick={closeMenu}
//                     >
//                       <AssignmentOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("menu_item_7")}
//                       </Typography>
//                     </NavLink>

//                     <div className="menu-item">
//                       <MailOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("menu_item_8")}
//                       </Typography>
//                     </div>
//                     <Link
//                       className="menu-item"
//                       onClick={() => {
//                         dispatch(logoutParticulier());
//                         closeMenu();
//                       }}
//                     >
//                       <ExitToAppOutlined className="menu-icon" />
//                       <Typography variant="body1" className="menu-item-link">
//                         {t("menu_item_9")}
//                       </Typography>
//                     </Link>
//                   </>
//                 ) : loginAmbulance || loginPharmacie ? (
//                   <NavLink
//                     to="/ambulance/fichepro"
//                     className="menu-item"
//                     activeClassName="active-link"
//                     onClick={closeMenu}
//                   >
//                     <AssignmentIndOutlined className="menu-icon" />
//                     <Typography variant="body1" className="menu-item-link">
//                       {t("menu_item_pro_4")}
//                     </Typography>
//                   </NavLink>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

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
  PersonAddOutlined,
  AssignmentIndOutlined,
  CalendarTodayOutlined,
} from "@material-ui/icons";
import { IconButton, Typography, Select, MenuItem } from "@material-ui/core";
import "./navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { connect } from "react-redux";
import { ROLES } from "../../constants/user";
import { setUser } from "../../redux/actions/user";

const NavBarBis = (props) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const changeLanguage = (ln) => {
    i18n.changeLanguage(ln);
  };

  const openMenu = () => {
    document.querySelector(".menu").classList.add("menu-show");
    document.querySelector(".body-container").classList.add("sidebar-open");
    document.querySelector(".navbar").classList.remove("navbar-white");
    document.querySelector(".nav-menu").classList.add("nav-menu-hide");
  };
  const closeMenu = () => {
    document.querySelector(".menu").classList.remove("menu-show");
    document.querySelector(".body-container").classList.remove("sidebar-open");
    !props.home &&
      document.querySelector(".navbar").classList.add("navbar-white");
    document.querySelector(".nav-menu").classList.remove("nav-menu-hide");
  };

  return (
    <header id="header-section">
      <nav
        className={`navbar navbar-expand-lg pl-3 pl-sm-0 ${
          props.navbar && " navbar-white"
        }`}
        id="navbar"
      >
        <div className="top-menu">
          <Link to="/" onClick={closeMenu}>
            <div className="navbar-brand-wrapper">
              <img
                src="/images/sly_update_1.png"
                alt="logo"
                height="60"
                className="logo-img"
              />
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
                to="/search/type"
                className="nav-item"
              >
                {t("search")}
              </NavLink>
              {!props.user && (
                <>
                  <NavLink
                    activeClassName="nav-active"
                    to="/login/type"
                    className="nav-item"
                  >
                    {t("login")}
                  </NavLink>

                  <Link
                    activeClassName="nav-active"
                    to="/register/type"
                    className={`nav-item ${
                      location.pathname.includes("register") && "nav-active"
                    }`}
                  >
                    {t("signup")}
                  </Link>
                </>
              )}
            </ul>
            <div>
              <Select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language || "fr"}
                className="language dropdown"
                defaultValue="fr"
              >
                <MenuItem value="ar">العربية</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </div>

            <IconButton
              style={{ marginLeft: "30px" }}
              onClick={openMenu}
              className={props.user ? "" : "navbar-small"}
            >
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
                  {props.user && props.role !== ROLES.PATIENT ? (
                    <Typography
                      variant="h6"
                      align="center"
                      gutterBottom={4}
                      className="menu-item-link"
                    >
                      {t("menu_title_pro")}
                    </Typography>
                  ) : props.role == ROLES.PATIENT ? (
                    <Typography
                      variant="h6"
                      align="center"
                      gutterBottom={4}
                      className="menu-item-link"
                    >
                      {t("menu_title")}
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      align="center"
                      gutterBottom={4}
                      className="menu-item-link"
                    >
                      SLY SERVE
                    </Typography>
                  )}
                  {(() => {
                    switch (props.role) {
                      case ROLES.PATIENT || ROLES.DOCTOR || ROLES.PARAMEDICAL:
                        return (
                          <Typography
                            variant="body2"
                            align="center"
                            gutterBottom={6}
                          >
                            {props.user?.nom} {props.user?.prenom}
                          </Typography>
                        );
                      default:
                        break;
                    }
                  })()}
                </div>
                <NavLink
                  to="/"
                  exact
                  className="menu-item"
                  activeClassName="active-link"
                  onClick={closeMenu}
                >
                  <HomeOutlined className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_1")}
                  </Typography>
                </NavLink>
                <NavLink
                  to="/pro"
                  className="menu-item"
                  activeClassName="active-link"
                  onClick={closeMenu}
                >
                  <PersonOutline className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_3")}
                  </Typography>
                </NavLink>
                <NavLink
                  to="/search/type"
                  className="menu-item"
                  activeClassName="active-link"
                  onClick={closeMenu}
                >
                  <SearchOutlined className="menu-icon" />
                  <Typography variant="body1" className="menu-item-link">
                    {t("menu_item_pro_2")}
                  </Typography>
                </NavLink>
                {!props.user && (
                  <>
                    <NavLink
                      activeClassName="active-link"
                      to="/login/type"
                      className="menu-item navbar-small"
                      onClick={closeMenu}
                    >
                      <ExitToAppOutlined className="menu-icon" />
                      <Typography variant="body1" className="menu-item-link">
                        {t("login")}
                      </Typography>
                    </NavLink>
                    <Link
                      to="/register/type"
                      className={`menu-item navbar-small ${
                        location.pathname.includes("register") && "active-link"
                      }`}
                      onClick={closeMenu}
                    >
                      <PersonAddOutlined className="menu-icon" />
                      <Typography variant="body1" className="menu-item-link">
                        {t("signup")}
                      </Typography>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const mapStateProps = (store) => ({
  user: store.userState.currentUser,
  role: store.userState.role,
});

const mapDispatchProps = (dispatch) => ({
  logOut: () => dispatch(setUser(null)),
});

export default connect(mapStateProps, mapDispatchProps)(NavBarBis);
