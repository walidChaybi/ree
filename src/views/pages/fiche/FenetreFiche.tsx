import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FenetreExterne, FenetreExterneUtil } from "@util/FenetreExterne";
import React, { useState } from "react";
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
  provenanceRequete?: string;
  nbLignesTotales: number;
  nbLignesParAppel: number;
  getLignesSuivantesOuPrecedentes?: (
    ficheIdentifiant: string,
    lien: string
  ) => void;
}

export const FenetreFiche: React.FC<IFenetreFicheProps> = ({
  estConsultation,
  identifiant,
  categorie,
  onClose,
  datasFiches,
  numeroRequete,
  index,
  provenanceRequete = "",
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
            estConsultation={estConsultation}
            numeroRequete={numeroRequete}
            datasFiches={datasFiches}
            dataFicheIdentifiant={identifiant}
            fenetreExterneUtil={fenetreExterneUtil}
            index={index}
            provenanceRequete={provenanceRequete}
            nbLignesTotales={nbLignesTotales}
            nbLignesParAppel={nbLignesParAppel}
            getLignesSuivantesOuPrecedentes={getLignesSuivantesOuPrecedentes}
          />
        </FenetreExterne>
      )}
    </>
  );
};
