import React from "react";
import CoteDroitEnTete from "./CoteDroitEnTete";
import LogoEnTete from "./LogoEnTete";

const EnTete: React.FC = () => (
  <header className="grid h-16 grid-cols-[29%_42%_29%] bg-bleu text-white shadow-[0_0.1em_0.3em_rgba(0,0,0,0.55)]">
    <LogoEnTete />
    <h1 className="m-auto hidden md:block">{"Registre d'État Civil Électronique"}</h1>
    <CoteDroitEnTete />
  </header>
);

export default EnTete;
