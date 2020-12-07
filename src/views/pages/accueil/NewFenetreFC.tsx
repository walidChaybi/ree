import React, { useState } from "react";
import { BoutonAccueilTest } from "./BoutonAccueilTest";
import { FenetreExterne } from "../../common/util/FenetreExterne";

interface NewFenetreFCProps {}

export const NewFenetreFC: React.FC<NewFenetreFCProps> = props => {
  const [fenetreOuverteState, setFenetreOuverteState] = useState(false);

  const toggleFenetre = () => {
    setFenetreOuverteState(fenetreOuverteState ? false : true);
  };

  return (
    <>
      <h2>Ceci est un test d'ouverture de fenetre avec React Portal</h2>

      <BoutonAccueilTest
        title="Ouverture nouvelle fenêtre avec React Portal"
        onClickHandler={() => {
          toggleFenetre();
        }}
        message={"Nouvelle Fenêtre again"}
      ></BoutonAccueilTest>

      {fenetreOuverteState && (
        <FenetreExterne
          titre={"Nouvelle Fenêtre FC"}
          onCloseHandler={() => {
            toggleFenetre();
          }}
        >
          <NewFenetreFC />
        </FenetreExterne>
      )}
    </>
  );
};
