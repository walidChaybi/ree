import React from "react";
import "./ConteneurSousFormulaire.scss";

interface IConteneurSousFormulaireProps {
  titreSousFormulaire?: string;
  champsSousFormulaire?: {
    libelle: string;
    element: JSX.Element;
    boutons?: JSX.Element;
  }[];
  className?: string;
}

const ConteneurSousFormulaire: React.FC<
  React.PropsWithChildren<IConteneurSousFormulaireProps>
> = ({
  titreSousFormulaire,
  champsSousFormulaire = [],
  className,
  children
}) => (
  <div className="conteneur-sous-formulaire">
    {titreSousFormulaire && (
      <h2 className="titre-conteneur-sous-formulaire">{titreSousFormulaire}</h2>
    )}
    <div
      className={`contenu-conteneur-sous-formulaire ${className ?? ""}`.trim()}
    >
      {Boolean(champsSousFormulaire.length) && (
        <div className="affichage-tableau">
          {champsSousFormulaire.map(champs => (
            <div key={champs.libelle} className="affichage-ligne-tableau">
              <span className="affichage-cellule-tableau tableau-libelle">
                {champs.libelle}
              </span>
              <div className="affichage-cellule-tableau tableau-champs">
                {champs.element}
              </div>
              {champs.boutons && (
                <div className="affichage-cellule-tableau">
                  {champs.boutons}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  </div>
);

export default ConteneurSousFormulaire;
