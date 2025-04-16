import React from "react";
import Bouton from "../bouton/Bouton";

export interface IOngletBouton<T extends string = string> {
  cle: T;
  libelle: string;
  inactif?: boolean;
}

interface IOngletsBoutonProps<T extends string = string> {
  onglets: IOngletBouton<T>[];
  cleOngletActif: T;
  changerOnglet: (valeur: T) => void;
  renderBoutonAjout?: (style: string) => JSX.Element;
}

const OngletsBouton: <T extends string = string>(props: IOngletsBoutonProps<T>) => React.ReactElement = ({
  onglets,
  cleOngletActif,
  changerOnglet,
  renderBoutonAjout
}) => {
  return (
    <div className="flex items-end border-0 border-b border-solid border-gris">
      {onglets.map(onglet => (
        <Bouton
          key={onglet.cle}
          styleBouton={cleOngletActif === onglet.cle ? "principal" : "secondaire"}
          garderStyleSiDisabled={cleOngletActif === onglet.cle}
          className={`m-0 ${cleOngletActif === onglet.cle ? "h-11" : "h-10"} rounded-b-none rounded-t-lg border-b-0 px-4 py-1.5 transition duration-200 ease-in-out [&:not(:first-child)]:border-l-0`}
          type="button"
          title={onglet.libelle}
          disabled={cleOngletActif === onglet.cle || onglet.inactif}
          onClick={() => changerOnglet(onglet.cle)}
        >
          {onglet.libelle}
        </Bouton>
      ))}
      {renderBoutonAjout?.("m-0 h-11 rounded-b-none rounded-t-lg border-b-0 border-l-0.5 px-4 py-1.5 transition duration-200 ease-in-out")}
    </div>
  );
};

export default OngletsBouton;
