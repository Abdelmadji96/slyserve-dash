import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/particulier/Login/Login";
import Register from "./components/particulier/Register/Register";
import MesDocuments from "./components/particulier/MesDocuments/MesDocuments";
import MesProches from "./components/particulier/MesProches/MesProches";
import MesRendezVous from "./components/particulier/MesRendezVous/MesRendezVous";
import MesPatients from "./components/professionnel/MesPatients/MesPatients";
import MonPlanning from "./components/professionnel/MonPlanning/MonPlanning";
import MaFicheProfessionnel from "./components/professionnel/MaFicheProfessionnel/MaFicheProfessionnel";
import ProfessionnelLogin from "./components/professionnel/ProfessionnelLogin/ProfessionnelLogin";
import PorfessionnelRegister from "./components/professionnel/PofessionnelRegister/PorfessionnelRegister";
import RendezVous from "./components/RendezVous/RendezVous";
import HomePro from "./components/professionnel/HomePro/HomePro";
import MesInformations from "./components/particulier/MesInformations/MesInformations";
import RechercheType from "./components/RechercheType/RechercheType";
import RecherchePraticien from "./components/Recherche/RecherchePraticien";
import RechercheAmbulance from "./components/Recherche/RechercheAmbulance";
import RechercheHopital from "./components/Recherche/RechercheHopital";
import RecherchePharmacie from "./components/Recherche/RecherchePharmacie";
import RechercheDonneurDeSang from "./components/Recherche/RechercheDonneurDeSang";
import MonAbonnement from "./components/professionnel/Abonnement/MonAbonnement";
import Abonner from "./components/professionnel/Abonnement/Abonner";
import ParticulierRoute from "./Routes/ParticulierRoute";
import { useTranslation } from "react-i18next";

import RegisterSuccess from "./components/particulier/Register/RegisterSuccess";
import RegistreCommerce from "./components/professionnel/PofessionnelRegister/RegistreCommerce";
import RegisterAmbulance from "./components/professionnel/PofessionnelRegister/Ambulance/RegisterAmbulance";
import RegisterPharmacie from "./components/professionnel/PofessionnelRegister/Pharmacie/RegisterPharmacie";
import RegisterParamedical from "./components/professionnel/PofessionnelRegister/Paramedical/RegisterParamedical";
import RegisterBloodDonor from "./components/professionnel/PofessionnelRegister/Blood donor/RegisterBloodDonor";
import RegisterLaboratory from "./components/professionnel/PofessionnelRegister/Laboratory/RegisterLaboratory";
import Map from "./components/professionnel/PofessionnelRegister/Map";
import RegisterSuccessPro from "./components/professionnel/PofessionnelRegister/RegisterSuccessPro";
import InscriptionStep1 from "./components/Inscription/InscriptionStep1";
import InscriptionStep2 from "./components/Inscription/InscriptionStep2";
import VideoChat from "./components/Video/VideoChat";
import RegisterHopital from "./components/professionnel/PofessionnelRegister/Clinique/RegisterClinique";
import ConnexionStep1 from "./components/Connexion/ConnexionStep1";
import ConnexionStep2 from "./components/Connexion/ConnexionStep2";
import RegisterParticulierIdentite from "./components/particulier/Register/RegisterParticulierIdentite";
import ProfessionnelRoute from "./Routes/ProfessionnelRoute";
import RdvDetailsMedecin from "./components/professionnel/MonPlanning/RdvDetails";
import jwt from "jsonwebtoken";
// import { logoutMedecin } from "./actions/professionnel.actions";
// import { useDispatch } from "react-redux";
// import { logoutParticulier } from "./actions/user.actions";
import AbonneFormule1Route from "./Routes/AbonneFormule1Route";
import AbonneFormule2Route from "./Routes/AbonneFormule2Route";
import ConfirmPayment from "./components/Payment/ConfirmPayment";
import RegisterPayment from "./components/Payment/RegisterPayment";
import AmbulanceLogin from "./components/professionnel/ProfessionnelLogin/AmbulanceLogin";
import PharmacieLogin from "./components/professionnel/ProfessionnelLogin/PharmacieLogin";
import MapParticulier from "./components/particulier/Register/MapParticulier";
import RegisterPaymentAbonnment from "./components/Payment/Abonnement/RegisterPaymentAbonnement";
import ConfirmPaymentAbonnment from "./components/Payment/Abonnement/ConfirmPaymentAbonnement";
import BloodDonorLogin from "./components/professionnel/ProfessionnelLogin/BloodDonorLogin";
import ParamedicalLogin from "./components/professionnel/ProfessionnelLogin/ParamedicalLogin";
import LaboratoryLogin from "./components/professionnel/ProfessionnelLogin/LaboratoryLogin";
import RechercheParamedical from "./components/Recherche/RechercheParamedical";
import RechercheLaboratoire from "./components/Recherche/RechercheLaboratoire";
import CliniqueLogin from "./components/professionnel/ProfessionnelLogin/CliniqueLogin";
import { getUser, removeUser, getToken, getRole, getAppointments, getHours } from "./redux/actions/user";
import { connect } from "react-redux";
import Terms from "./components/Terms/Terms";
import Policy from "./components/Policy/Policy";
import Discover from "./components/Discover/Discover";

//import LoginProfessionnel from "../src/components/professionnel/ProfessionnelLogin/Login";

function App(props) {
  // const dispatch = useDispatch();
  // const tokenMedecin = localStorage.getItem("medecin")
  //   ? JSON.parse(localStorage.getItem("medecin")).token
  //   : null;

  // const tokenParticulier = localStorage.getItem("particulier")
  //   ? JSON.parse(localStorage.getItem("particulier")).token
  //   : null;

  // if (tokenMedecin) {
  //   if (jwt.decode(tokenMedecin).exp < Date.now() / 1000) {
  //     dispatch(logoutMedecin());
  //   }
  // }

  // if (tokenParticulier) {
  //   if (jwt.decode(tokenParticulier).exp < Date.now() / 1000) {
  //     dispatch(logoutParticulier());
  //   }
  // }

  const { i18n } = useTranslation();
  const defineFont = () => {
    if (i18n.language === "ar") {
      let elements = document.getElementsByTagName("*");
      for (let index = 0; index < elements.length; index++) {
        elements[index].classList.add("font-ar");
        elements[index].classList.remove("font-en");
      }
    } else {
      let elements = document.getElementsByTagName("*");
      for (let index = 0; index < elements.length; index++) {
        elements[index].classList.remove("font-ar");
        elements[index].classList.add("font-en");
      }
    }
  };

  // useEffect(() => {
  //   props.loadUser();
  // }, []);

  useEffect(() => {
    defineFont();
  }, [i18n.language]);

  // useEffect(() => {
  //   if (props.token) {
  //     if (jwt.decode(props.token).exp < Date.now() / 1000) {
  //       props.logout()
  //     }
  //   }
  // }, [props.token]);

  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login/type/particulier" exact component={Login} />
        <Route path="/register/particulier" exact component={Register} />
        <Route
          path="/register/particulier/position"
          exact
          component={MapParticulier}
        />
        <Route
          path="/register/particulier/identite"
          exact
          component={RegisterParticulierIdentite}
        />
        <Route
          path="/register/particulier/success"
          exact
          component={RegisterSuccess}
        />
        <ParticulierRoute
          path="/particulier/mesdocuments"
          exact
          component={MesDocuments}
        />
        <ParticulierRoute
          path="/particulier/mesproches"
          exact
          component={MesProches}
        />
        <ParticulierRoute
          path="/particulier/mesrdv"
          exact
          component={MesRendezVous}
        />

        <AbonneFormule1Route
          path="/mespatients"
          exact
          component={MesPatients}
        />
        <AbonneFormule1Route
          path="/monplanning"
          exact
          component={MonPlanning}
        />
        <ProfessionnelRoute
          path="/maficheprofessionnelle"
          exact
          component={MaFicheProfessionnel}
        />
        <AbonneFormule1Route
          exact
          path="/medecin/planning/rdv/info/:id"
          component={RdvDetailsMedecin}
        />
        <Route
          path="/register/pro/medecin"
          exact
          component={PorfessionnelRegister}
        />
        <Route path="/register/position" exact component={Map} />
        <Route path="/register/identity" exact component={RegistreCommerce} />
        <Route
          path="/register/success/pro"
          exact
          component={RegisterSuccessPro}
        />
        <Route
          path="/register/pro/ambulance"
          exact
          component={RegisterAmbulance}
        />
        <Route
          path="/register/pro/pharmacie"
          exact
          component={RegisterPharmacie}
        />
        <Route
          path="/register/pro/clinique"
          exact
          component={RegisterHopital}
        />
        <Route path="/register/pro/lab" exact component={RegisterLaboratory} />
        <Route
          path="/register/pro/paramedical"
          exact
          component={RegisterParamedical}
        />
        <Route
          path="/register/pro/blooddonor"
          exact
          component={RegisterBloodDonor}
        />

        <Route
          path="/search/type/medecin"
          exact
          component={RecherchePraticien}
        />
        <Route
          path="/search/type/ambulance"
          exact
          component={RechercheAmbulance}
        />
        <Route path="/search/type/hopital" exact component={RechercheHopital} />
        <Route
          path="/search/type/pharmacie"
          exact
          component={RecherchePharmacie}
        />
        <Route
          path="/search/type/donneurdesang"
          exact
          component={RechercheDonneurDeSang}
        />
        <Route
          path="/search/type/medecin/:id/info"
          exact
          component={RendezVous}
        />
        <Route
          path="/search/type/paramedical"
          exact
          component={RechercheParamedical}
        />
        <Route
          path="/search/type/laboratory"
          exact
          component={RechercheLaboratoire}
        />
        <Route path="/pro" exact component={HomePro} />
        <ParticulierRoute
          path="/mesinformations"
          exact
          component={MesInformations}
        />
        <Route path="/register/type" exact component={InscriptionStep1} />
        <Route path="/register/type/pro" exact component={InscriptionStep2} />
        <Route path="/login/type" exact component={ConnexionStep1} />
        <Route path="/login/type/pro" exact component={ConnexionStep2} />
        {/*<Route path="/login/type/pro" exact component={ConnexionStep2} />*/}
        <Route
          path="/login/type/pro/medecin"
          exact
          component={ProfessionnelLogin}
        />
        <Route
          path="/login/type/pro/ambulance"
          exact
          component={AmbulanceLogin}
        />
        <Route
          path="/login/type/pro/pharmacie"
          exact
          component={PharmacieLogin}
        />
        <Route
          path="/login/type/pro/clinique"
          exact
          component={CliniqueLogin}
        />
        <Route
          path="/login/type/pro/paramedical"
          exact
          component={ParamedicalLogin}
        />
        <Route
          path="/login/type/pro/blooddonor"
          exact
          component={BloodDonorLogin}
        />
        <Route path="/login/type/pro/lab" exact component={LaboratoryLogin} />
        <Route path="/search/type" exact component={RechercheType} />

        <AbonneFormule1Route
          path="/professionnel/monabonnement"
          exact
          component={MonAbonnement}
        />
        <ProfessionnelRoute
          path="/professionnel/sabonner"
          exact
          component={Abonner}
        />
        <AbonneFormule2Route path="/video/:id" exact component={VideoChat} />
        <Route path="/payment/confirm" exact component={ConfirmPayment} />
        <Route path="/payment/register" exact component={RegisterPayment} />
        <ProfessionnelRoute
          path="/professionnel/sabonner/payment/register"
          exact
          component={RegisterPaymentAbonnment}
        />
        <ProfessionnelRoute
          path="/professionnel/sabonner/payment/confirm"
          exact
          component={ConfirmPaymentAbonnment}
        />
        <Route path="/terms" exact component={Terms} />
        <Route path="/policy" exact component={Policy} />
        <Route path="/discover" exact component={Discover} />
      </Switch>
    </>
  );
}

const mapStateProps = (store) => ({
  user: store.userState.currentUser,
  token: store.userState.token,
});

const mapdispatchProps = (dispatch) => ({
  loadUser: () => {
    dispatch(getUser());
    dispatch(getToken());
    dispatch(getRole());
    dispatch(getAppointments());
    dispatch(getHours());
  },
  logout: () => {
    dispatch(removeUser());
  },
});

export default connect(mapStateProps, mapdispatchProps)(App);
