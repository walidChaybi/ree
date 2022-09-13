import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useState } from "react";
import { OngletAction } from "./OngletAction";
import { OngletPiecesJustificatives } from "./OngletPiecesJustificatives";
import "./scss/VoletPieceJustificativesEtActions.scss";
interface VoletPieceJusticativesEtActionsProps {
  requete: IRequeteCreation;
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
      titre: "Pièces justificatives / annexes",
      component: <OngletPiecesJustificatives requete={props.requete} />,
      index: 0
    },
    {
      titre: "Actions",
      component: (
        <OngletAction
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
