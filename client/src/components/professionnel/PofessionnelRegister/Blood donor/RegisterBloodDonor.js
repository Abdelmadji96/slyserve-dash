import React from "react";
import Navbar from "../../../NavBar/Navbar";
import Footer from "../../../Home/Footer";

function RegisterBloodDonor() {
  return (
    <div id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
      <Navbar navbar={true} />
      <div className="content-container"> rbd</div>
      <Footer />
    </div>
  );
}

export default RegisterBloodDonor;
