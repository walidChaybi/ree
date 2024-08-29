import React from "react";
import "./OngletsBouton.scss";

export interface IOngletBouton {
  cle: string;
  libelle: string;
  inactif?: boolean;
}

interface IOngletsBoutonProps {
  onglets: IOngletBouton[];
  cleOngletActif: string;
  changerOnglet: (valeur: string) => void;
  boutonAjout?: JSX.Element;
}

const OngletsBouton: React.FC<IOngletsBoutonProps> = ({
  onglets,
  cleOngletActif,
  changerOnglet,
  boutonAjout
}) => {
  return (
    <div className="conteneur-onglets-bouton">
      {onglets.map(onglet => (
        <button
          key={onglet.cle}
          className={`onglet-bouton${onglet.inactif ? " onglet-inactif" : ""}`}
          type="button"
          title={onglet.libelle}
          disabled={cleOngletActif === onglet.cle || onglet.inactif}
          onClick={() => changerOnglet(onglet.cle)}
        >
          {onglet.libelle}
        </button>
      ))}
      {boutonAjout}
    </div>
  );
};

export default OngletsBouton;
