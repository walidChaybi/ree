import React from "react";
import "./ConteneurFormulaire.scss";

interface IConteneurFormulaireProps {
  titreEnTete: string;
}

const ConteneurFormulaire: React.FC<
  React.PropsWithChildren<IConteneurFormulaireProps>
> = ({ children, titreEnTete }) => (
  <div className="conteneur-formulaire">
    <h1 className="titre-conteneur-formulaire">{titreEnTete}</h1>
    <div className="contenu-conteneur-formulaire">{children}</div>
  </div>
);

export default ConteneurFormulaire;
