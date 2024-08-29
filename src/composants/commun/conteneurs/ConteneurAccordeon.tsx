import { ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import "./ConteneurAccordeon.scss";

interface IConteneurAccordeonProps {
  titre: string | React.ReactNode;
  ouvertParDefaut?: boolean;
  nonControllable?: boolean;
}

const ConteneurAccordeon: React.FC<
  React.PropsWithChildren<IConteneurAccordeonProps>
> = ({ children, titre, ouvertParDefaut = false, nonControllable = false }) => {
  const [estOuvert, setEstOuvert] = useState<boolean>(
    ouvertParDefaut || nonControllable
  );

  return (
    <div className="conteneur-accordeon">
      {nonControllable ? (
        <div className="titre-conteneur-accordeon">{titre}</div>
      ) : (
        <button
          className="titre-conteneur-accordeon"
          type="button"
          onClick={() => setEstOuvert(!estOuvert)}
        >
          {titre}
          <ExpandMore
            className={`icon-accordeon${estOuvert ? " accordeon-ouvert" : ""}`}
          />
        </button>
      )}

      <div
        className={`contenu-conteneur-accordeon${
          estOuvert ? " accordeon-ouvert" : ""
        }`}
      >
        <div className="wrapper-contenu-accordeon">{children}</div>
      </div>
    </div>
  );
};

export default ConteneurAccordeon;
