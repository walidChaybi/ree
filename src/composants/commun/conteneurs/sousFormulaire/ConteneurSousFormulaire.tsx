import React from "react";

interface IConteneurSousFormulaireProps {
  titreSousFormulaire?: string;
  champsSousFormulaire?: {
    libelle: string;
    element: JSX.Element;
    boutons?: JSX.Element;
  }[];
  className?: string;
  avecBordure?: boolean;
}

const ConteneurSousFormulaire: React.FC<React.PropsWithChildren<IConteneurSousFormulaireProps>> = ({
  titreSousFormulaire,
  champsSousFormulaire = [],
  className,
  children,
  avecBordure = false
}) => (
  <div className={`pb-2 text-start ${avecBordure ? "rounded-b-md border-2 border-solid border-bleu" : ""}`}>
    {titreSousFormulaire && <h2 className="m-0 bg-gris px-4 py-1 text-base font-bold uppercase">{titreSousFormulaire}</h2>}
    <div className={`p-8 text-start ${className ?? ""}`.trim()}>
      {Boolean(champsSousFormulaire.length) && (
        <div className="table">
          {champsSousFormulaire.map(champs => (
            <div
              key={champs.libelle}
              className="table-row gap-4"
            >
              <span className="table-cell min-w-40 px-0 py-4 text-bleu-sombre">{champs.libelle}</span>
              <div className="table-cell min-w-96">{champs.element}</div>
              {champs.boutons && <div className="affichage-cellule-tableau">{champs.boutons}</div>}
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  </div>
);

export default ConteneurSousFormulaire;
