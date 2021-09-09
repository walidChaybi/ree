import React, { useState } from "react";
import { TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import {
  FenetreExterne,
  FenetreExterneUtil
} from "../../common/util/FenetreExterne";
import { FichePage, IDataFicheProps } from "./FichePage";
import "./scss/LienFiche.scss";

interface IFenetreFicheProps {
  identifiant: string;
  categorie: TypeFiche;
  onClose: (id: string, index: number) => void;
  datasFiches: IDataFicheProps[];
  index: number;
  provenanceRequete?: string;
  ajoutAlertePossible?: boolean;
}

export const FenetreFiche: React.FC<IFenetreFicheProps> = ({
  identifiant,
  categorie,
  onClose,
  datasFiches,
  index,
  provenanceRequete = "",
  ajoutAlertePossible = false
}) => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(true);
  const [
    fenetreExterneUtil,
    setFenetreExterneUtil
  ] = useState<FenetreExterneUtil>();

  const closeFenetre = (id: string, idx: number) => {
    setFenetreOuverteState(!fenetreOuverteState);
    onClose(id, idx);
  };

  return (
    <>
      {fenetreOuverteState && (
        <FenetreExterne
          onCloseHandler={() => {
            closeFenetre(identifiant, index);
          }}
          setFenetreExterneUtil={setFenetreExterneUtil}
        >
          <FichePage
            datasFiches={datasFiches}
            dataFicheIdentifiant={identifiant}
            dataFicheCategorie={categorie}
            fenetreExterneUtil={fenetreExterneUtil}
            index={index}
            provenanceRequete={provenanceRequete}
            ajoutAlertePossible={ajoutAlertePossible}
          />
        </FenetreExterne>
      )}
    </>
  );
};
