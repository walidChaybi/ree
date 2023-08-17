import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { ZERO, getLibelle } from "@util/Utils";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useState } from "react";
import { Postulant } from "./postulant/Postulant";
import "./scss/OngletsApercuCreationEtablissement.scss";

interface OngletsEtablissementSaisieProjetNaissancePostulantProps {
  titulaire: ITitulaireRequeteCreation;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const OngletsEtablissementSaisieProjetNaissancePostulant: React.FC<
  OngletsEtablissementSaisieProjetNaissancePostulantProps
> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState(ZERO);

  const liste: ItemListe[] = [
    {
      titre: getLibelle("Postulant"),
      component: <Postulant titulaire={props.titulaire} />,
      index: 0
    },
    {
      titre: getLibelle("Echanges"),
      component: <Echanges />,
      index: 1
    }
  ];

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
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
