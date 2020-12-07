import React, { useState } from "react";
import { Button } from "@material-ui/core";
import {
  FenetreExterne,
  FenetreExterneUtil
} from "../../common/util/FenetreExterne";
import { FichePage } from "./FichePage";
import "./BoutonFiche.scss";

interface IDataBoutonFicheProps {
  identifiant: string;
  categorie: string;
  nom1: string;
  nom2?: string;
  annee: string;
  numero: string;
}

/** Le BoutonFiche simule une ligne du futur tableau des resultats d'une RMC */

export const BoutonFiche: React.FC<IDataBoutonFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);
  const [fenetreExterneUtil, setFenetreExterneUtil] = useState<
    FenetreExterneUtil
  >();

  const libelleBouton = `Fiche ${props.categorie.toLocaleUpperCase()} - N° ${
    props.annee
  } - ${props.numero}`;

  const onClick = () => {
    toggleFenetre();
  };

  const toggleFenetre = () => {
    setFenetreOuverteState(!fenetreOuverteState);
  };

  return (
    <div>
      <Button className={"BoutonFiche"} onClick={onClick} title={libelleBouton}>
        {libelleBouton}
      </Button>

      {fenetreOuverteState && (
        <FenetreExterne
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
