import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { FenetreExterne } from "../../common/util/FenetreExterne";
import { FichePage } from "./FichePage";

interface IDataBoutonFicheProps {
  identifiant: string;
  categorie: string;
  nom: string;
  annee: string;
  numero: string;
}

/** Le BoutonFiche simule une ligne du futur tableau des resultats d'une RMC */

export const BoutonFiche: React.FC<IDataBoutonFicheProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);

  const titre = `${props.categorie.toLocaleUpperCase()} - ${props.nom} - N° ${
    props.annee
  } - ${props.numero}`;

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
      <Button onClick={onClick} title={libelleBouton}>
        {libelleBouton}
      </Button>

      {fenetreOuverteState && (
        <FenetreExterne
          titre={titre}
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
