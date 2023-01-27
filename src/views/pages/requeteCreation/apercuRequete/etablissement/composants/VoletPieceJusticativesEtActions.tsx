import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useState } from "react";
import { OngletPiecesJustificatives } from "../../../commun/composants/OngletPiecesJustificatives";
import { Action } from "./action/Action";
import "./scss/VoletPieceJustificativesEtActions.scss";
interface VoletPieceJusticativesEtActionsProps {
  requete: IRequeteCreationEtablissement;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const VoletPieceJustificativesEtActions: React.FC<
  VoletPieceJusticativesEtActionsProps
> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState(0);

  const liste: ItemListe[] = [
    {
      titre: "Pièces justificatives / Annexes",
      component: (
        <OngletPiecesJustificatives
          requete={props.requete}
          autoriseOuvertureFenetreExt={true}
        />
      ),
      index: 0
    },
    {
      titre: "Actions",
      component: (
        <Action
          echanges={props.requete.provenanceNatali?.echanges}
          requete={props.requete}
        />
      ),
      index: 1
    }
  ];

  const handleChange = (e: any, newValue: string) => {
    setOngletSelectionne(parseInt(newValue));
  };

  return (
    <div className="VoletPieceJusticativesEtActions">
      <VoletAvecOnglet
        liste={liste}
        ongletSelectionne={ongletSelectionne}
        handleChange={handleChange}
      />
    </div>
  );
};
