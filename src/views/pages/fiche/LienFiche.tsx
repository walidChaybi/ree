import React, { useState } from "react";
import {
  FenetreExterne,
  FenetreExterneUtil
} from "../../common/util/FenetreExterne";
import { FichePage } from "./FichePage";
import { Link } from "@material-ui/core";
import "./sass/LienFiche.scss";
import { TypeFiche } from "../../../model/etatcivil/TypeFiche";

interface IDataLienFicheProps {
  identifiant: string;
  categorie: TypeFiche;
  numero: string;
  title?: string;
}

/** Le BoutonFiche simule une ligne du futur tableau des resultats d'une RMC */

export const LienFiche: React.FC<IDataLienFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);
  const [
    fenetreExterneUtil,
    setFenetreExterneUtil
  ] = useState<FenetreExterneUtil>();

  const onClick = () => {
    toggleFenetre();
  };

  const toggleFenetre = () => {
    setFenetreOuverteState(!fenetreOuverteState);
  };

  return (
    <>
      <Link
        className={"lienFiche"}
        href={"#"}
        onClick={onClick}
        title={props.numero}
      >
        {`${props.numero}`}
      </Link>

      {fenetreOuverteState && (
        <FenetreExterne
          titre={props.title}
          onCloseHandler={() => {
            toggleFenetre();
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
