import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { IRMCAutoPersonneResultat } from "@model/rmc/personne/IRMCAutoPersonneResultat";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/OngletRMCPersonne";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useState } from "react";
import {
  OngletPiecesJustificatives,
  typeFctRenommePieceJustificative
} from "../../../commun/composants/OngletPiecesJustificatives";
import { Action } from "./action/Action";
import "./scss/OngletsApercuCreationEtablissement.scss";
interface OngletsApercuCreationEtablissementProps {
  requete: IRequeteCreationEtablissement;
  onRenommePieceJustificative: typeFctRenommePieceJustificative;
  resultatRMCAutoPersonne: IRMCAutoPersonneResultat[];
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const OngletsApercuCreationEtablissement: React.FC<
  OngletsApercuCreationEtablissementProps
> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState(0);

  const liste: ItemListe[] = [
    {
      titre: "Pièces justificatives / Annexes",
      component: (
        <OngletPiecesJustificatives
          requete={props.requete}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={props.onRenommePieceJustificative}
        />
      ),
      index: 0
    },
    {
      titre: "Actions",
      component: (
        <Action
          echanges={props.requete?.provenanceNatali?.echanges}
          requete={props.requete}
        />
      ),
      index: 1
    },
    {
      titre: "RMC",
      component: (
        <OngletRMCPersonne
          rmcAutoPersonneResultat={props.resultatRMCAutoPersonne}
          sousTypeRequete={props.requete.sousType}
          listeTitulaires={props.requete.titulaires}
        />
      ),
      index: 1
    }
  ];

  const handleChange = (e: any, newValue: string) => {
    setOngletSelectionne(parseInt(newValue));
  };

  return (
    <div className="OngletsApercuCreationEtablissement">
      <VoletAvecOnglet
        liste={liste}
        ongletSelectionne={ongletSelectionne}
        handleChange={handleChange}
      />
    </div>
  );
};
