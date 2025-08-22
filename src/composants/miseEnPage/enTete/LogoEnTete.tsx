import React from "react";
import { Link } from "react-router";
import logoReceBlanc from "../../../img/logo-rece-blanc.svg";
import { URL_ACCUEIL } from "../../../router/infoPages/InfoPagesBase";

const LogoEnTete: React.FC = () => (
  <div className="text-start leading-[4rem]">
    <Link
      className="cursor-pointer"
      to={URL_ACCUEIL}
      title="Accueil"
      aria-label="Accueil"
    >
      <img
        className="w-32 pl-2 align-middle"
        src={logoReceBlanc}
        alt="Logo RECE"
        data-testid="LogoHeader"
      />
    </Link>
  </div>
);

export default LogoEnTete;
