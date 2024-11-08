import React from "react";
import Bouton from "../bouton/Bouton";

export interface IOngletBouton {
  cle: string;
  libelle: string;
  inactif?: boolean;
}

interface IOngletsBoutonProps {
  onglets: IOngletBouton[];
  cleOngletActif: string;
  changerOnglet: (valeur: string) => void;
  renderBoutonAjout?: (style: string) => JSX.Element;
}

const OngletsBouton: React.FC<IOngletsBoutonProps> = ({
  onglets,
  cleOngletActif,
  changerOnglet,
  renderBoutonAjout,
}) => {
  return (
    <div className="flex border-b border-gris">
      {onglets.map((onglet: IOngletBouton) => (
        <Bouton
          key={onglet.cle}
          styleBouton={
            cleOngletActif === onglet.cle ? "principal" : "secondaire"
          }
          className={`${cleOngletActif === onglet.cle ? "disabled:bg-bleu-sombre" : "disabled:border-gris disabled:bg-gris"} m-0 h-14 max-w-60 rounded-b-none rounded-t-lg border border-b-0 border-l-0 border-solid px-4 py-1.5 transition duration-200 ease-in-out first:border-l`}
          type="button"
          title={onglet.libelle}
          disabled={cleOngletActif === onglet.cle || onglet.inactif}
          onClick={() => changerOnglet(onglet.cle)}
        >
          {onglet.libelle}
        </Bouton>
      ))}
      {renderBoutonAjout?.(
        "m-0 h-14 max-w-60 rounded-b-none rounded-t-lg border-b-0 border-l-0.5 px-4 py-1.5 transition duration-200 ease-in-out",
      )}
    </div>
  );
};

export default OngletsBouton;
