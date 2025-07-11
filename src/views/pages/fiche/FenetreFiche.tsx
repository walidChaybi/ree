import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import React, { useState } from "react";
import FenetreExterne, { IFenetreExterneRef } from "../../../composants/commun/conteneurs/FenetreExterne";
import { FichePage, IDataFicheProps, IIndex } from "./FichePage";
import "./scss/LienFiche.scss";

interface IFenetreFicheProps {
  estConsultation?: boolean;
  identifiant: string;
  categorie: TypeFiche;
  onClose: (id: string, index: number) => void;
  datasFiches: IDataFicheProps[];
  numeroRequete?: string;
  index: IIndex;
  nbLignesTotales: number;
  nbLignesParAppel: number;
  getLignesSuivantesOuPrecedentes?: (ficheIdentifiant: string, lien: string) => void;
}

export const FenetreFiche: React.FC<IFenetreFicheProps> = ({
  estConsultation,
  identifiant,
  categorie,
  onClose,
  datasFiches,
  numeroRequete,
  index,
  nbLignesTotales,
  nbLignesParAppel,
  getLignesSuivantesOuPrecedentes
}) => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(true);
  const [fenetreExterneRef, setFenetreExterneRef] = useState<IFenetreExterneRef>();

  function closeFenetre() {
    setFenetreOuverteState(!fenetreOuverteState);
    onClose(identifiant, index.value);
  }

  return (
    <>
      {fenetreOuverteState && (
        <FenetreExterne
          apresfermeture={closeFenetre}
          setFenetreExterneRef={ref => setFenetreExterneRef(ref)}
        >
          <FichePage
            estConsultation={estConsultation}
            numeroRequete={numeroRequete}
            datasFiches={datasFiches}
            dataFicheIdentifiant={identifiant}
            fenetreExterneRef={fenetreExterneRef}
            index={index}
            nbLignesTotales={nbLignesTotales}
            nbLignesParAppel={nbLignesParAppel}
            getLignesSuivantesOuPrecedentes={getLignesSuivantesOuPrecedentes}
          />
        </FenetreExterne>
      )}
    </>
  );
};
