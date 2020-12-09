import React, { useState } from "react";
import {
  FenetreExterne,
  FenetreExterneUtil
} from "../../common/util/FenetreExterne";
import { FichePage } from "./FichePage";
import { Link } from "@material-ui/core";

interface IDataLienFicheProps {
  identifiant: string;
  categorie: string;
  numero: string;
  title?: string;
}

/** Le BoutonFiche simule une ligne du futur tableau des resultats d'une RMC */

export const LienFiche: React.FC<IDataLienFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);
  const [fenetreExterneUtil, setFenetreExterneUtil] = useState<
    FenetreExterneUtil
  >();

  const onClick = () => {
    toggleFenetre();
  };

  const toggleFenetre = () => {
    setFenetreOuverteState(!fenetreOuverteState);
  };

  return (
    <div>
      <Link href={"#"} onClick={onClick} title={props.numero}>
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
    </div>
  );
};
