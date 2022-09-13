import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FenetreExterne, FenetreExterneUtil } from "@util/FenetreExterne";
import React, { useState } from "react";
import { FichePage, IDataFicheProps, IIndex } from "./FichePage";
import "./scss/LienFiche.scss";

interface IFenetreFicheProps {
  identifiant: string;
  categorie: TypeFiche;
  onClose: (id: string, index: number) => void;
  datasFiches: IDataFicheProps[];
  numeroRequete?: string;
  index: IIndex;
  provenanceRequete?: string;
  ajoutAlertePossible?: boolean;
  nbLignesTotales: number;
  nbLignesParAppel: number;
  getLignesSuivantesOuPrecedentes?: (
    ficheIdentifiant: string,
    lien: string
  ) => void;
}

export const FenetreFiche: React.FC<IFenetreFicheProps> = ({
  identifiant,
  categorie,
  onClose,
  datasFiches,
  numeroRequete,
  index,
  provenanceRequete = "",
  ajoutAlertePossible = false,
  nbLignesTotales,
  nbLignesParAppel,
  getLignesSuivantesOuPrecedentes
}) => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(true);
  const [fenetreExterneUtil, setFenetreExterneUtil] =
    useState<FenetreExterneUtil>();

  function closeFenetre() {
    setFenetreOuverteState(!fenetreOuverteState);
    onClose(identifiant, index.value);
  }

  return (
    <>
      {fenetreOuverteState && (
        <FenetreExterne
          onCloseHandler={closeFenetre}
          setFenetreExterneUtil={setFenetreExterneUtil}
        >
          <FichePage
            numeroRequete={numeroRequete}
            datasFiches={datasFiches}
            dataFicheIdentifiant={identifiant}
            fenetreExterneUtil={fenetreExterneUtil}
            index={index}
            provenanceRequete={provenanceRequete}
            ajoutAlertePossible={ajoutAlertePossible}
            nbLignesTotales={nbLignesTotales}
            nbLignesParAppel={nbLignesParAppel}
            getLignesSuivantesOuPrecedentes={getLignesSuivantesOuPrecedentes}
          />
        </FenetreExterne>
      )}
    </>
  );
};
