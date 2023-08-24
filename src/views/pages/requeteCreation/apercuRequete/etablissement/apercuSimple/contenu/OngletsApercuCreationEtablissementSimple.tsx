import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { getLibelle } from "@util/Utils";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useState } from "react";
import {
  OngletPiecesJustificatives,
  typeFctRenommePieceJustificative
} from "../../../../commun/composants/OngletPiecesJustificatives";
import { BoutonsApercuCreationEtablissement } from "../../commun/BoutonsApercuRequeteCreationEtablissement";
import "../../commun/scss/OngletsApercuCreationEtablissement.scss";

interface OngletsApercuCreationEtablissementSimpleProps {
  requete: IRequeteCreationEtablissement;
  modeConsultation?: boolean;
  onRenommePieceJustificative: typeFctRenommePieceJustificative;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const OngletsApercuCreationEtablissementSimple: React.FC<
  OngletsApercuCreationEtablissementSimpleProps
> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState(0);

  const liste: ItemListe[] = [
    {
      titre: getLibelle("Pièces justificatives / Annexes"),
      component: (
        <OngletPiecesJustificatives
          requete={props.requete}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={props.onRenommePieceJustificative}
        />
      ),
      index: 0
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
      <BoutonsApercuCreationEtablissement requete={props.requete} />
    </div>
  );
};
