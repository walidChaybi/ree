import React, { useState } from "react";
import { TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import {
  FenetreExterne,
  FenetreExterneUtil
} from "../../common/util/FenetreExterne";
import { FichePage } from "./FichePage";
import "./sass/LienFiche.scss";

interface IFenetreFicheProps {
  identifiant: string;
  categorie: TypeFiche;
  onClose: (id: string) => void;
}

export const FenetreFiche: React.FC<IFenetreFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(true);
  const [fenetreExterneUtil, setFenetreExterneUtil] = useState<
    FenetreExterneUtil
  >();

  const closeFenetre = (id: string) => {
    setFenetreOuverteState(!fenetreOuverteState);
    props.onClose(id);
  };

  return (
    <>
      {fenetreOuverteState && (
        <FenetreExterne
          onCloseHandler={() => {
            closeFenetre(props.identifiant);
          }}
          setFenetreExterneUtil={setFenetreExterneUtil}
        >
          <FichePage
            dataFiche={{
              identifiant: props.identifiant,
              categorie: props.categorie
            }}
            fenetreExterneUtil={fenetreExterneUtil}
          />
        </FenetreExterne>
      )}
    </>
  );
};
