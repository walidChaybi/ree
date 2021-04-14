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
}

export const FenetreFiche: React.FC<IFenetreFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(true);
  const [
    fenetreExterneUtil,
    setFenetreExterneUtil
  ] = useState<FenetreExterneUtil>();

  const closeFenetre = (id: string, index: number) => {
    setFenetreOuverteState(!fenetreOuverteState);
    props.onClose(id, index);
  };

  return (
    <>
      {fenetreOuverteState && (
        <FenetreExterne
          onCloseHandler={() => {
            closeFenetre(props.identifiant, props.index);
          }}
          setFenetreExterneUtil={setFenetreExterneUtil}
        >
          <FichePage
            datasFiches={props.datasFiches}
            dataFicheIdentifiant={props.identifiant}
            dataFicheCategorie={props.categorie}
            fenetreExterneUtil={fenetreExterneUtil}
            index={props.index}
          />
        </FenetreExterne>
      )}
    </>
  );
};
