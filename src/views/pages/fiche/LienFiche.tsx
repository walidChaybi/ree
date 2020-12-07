import React, { useState } from "react";
import { FenetreExterne } from "../../common/util/FenetreExterne";
import { FichePage } from "./FichePage";
import { Link } from "@material-ui/core";

interface IDataLienFicheProps {
  identifiant: string;
  categorie: string;
  numero: string;
}

/** Le BoutonFiche simule une ligne du futur tableau des resultats d'une RMC */

export const LienFiche: React.FC<IDataLienFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);

  const onClick = () => {
    toggleFenetre();
  };

  const toggleFenetre = () => {
    setFenetreOuverteState(!fenetreOuverteState);
  };

  return (
    <div>
      <Link href={"#"} onClick={onClick} title={props.numero}>
        {props.numero}
      </Link>

      {fenetreOuverteState && (
        <FenetreExterne
          titre={"test"}
          onCloseHandler={() => {
            toggleFenetre();
          }}
        >
          <FichePage
            dataFiche={{
              identifiant: props.identifiant,
              categorie: props.categorie
            }}
          />
        </FenetreExterne>
      )}
    </div>
  );
};
