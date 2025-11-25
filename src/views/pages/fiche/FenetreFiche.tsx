import React, { useState } from "react";
import FenetreExterne, { IFenetreExterneRef } from "../../../composants/commun/conteneurs/FenetreExterne";
import { FichePage, IDataFicheProps, IIndex } from "./FichePage";
import "./scss/LienFiche.scss";

interface IFenetreFicheProps {
  identifiant: string;
  onClose: (id: string, index: number) => void;
  datasFiches: IDataFicheProps[];
  numeroRequete?: string;
  index: IIndex;
  nbLignesTotales: number;
  nbLignesParAppel: number;
}

export const FenetreFiche: React.FC<IFenetreFicheProps> = ({
  identifiant,
  onClose,
  datasFiches,
  numeroRequete,
  index,
  nbLignesTotales,
  nbLignesParAppel
}) => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(true);
  const [fenetreExterneRef, setFenetreExterneRef] = useState<IFenetreExterneRef>();

  const closeFenetre = () => {
    setFenetreOuverteState(!fenetreOuverteState);
    onClose(identifiant, index.value);
  };

  return (
    <>
      {fenetreOuverteState && (
        <FenetreExterne
          apresFermeture={closeFenetre}
          setFenetreExterneRef={ref => setFenetreExterneRef(ref)}
        >
          <FichePage
            numeroRequete={numeroRequete}
            datasFiches={datasFiches}
            fenetreExterneRef={fenetreExterneRef}
            index={index}
            nbLignesTotales={nbLignesTotales}
            nbLignesParAppel={nbLignesParAppel}
          />
        </FenetreExterne>
      )}
    </>
  );
};
