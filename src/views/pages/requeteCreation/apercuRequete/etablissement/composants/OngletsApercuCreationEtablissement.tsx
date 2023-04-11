import { IRMCPersonneResultat } from "@hook/rmcAuto/IRMCPersonneResultat";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { useDataTableauPersonneSauvegardeeHook } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/IDataTableauPersonneSauvegardee";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
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
  modeConsultation?: boolean;
  onRenommePieceJustificative: typeFctRenommePieceJustificative;
  resultatRMCPersonne: IRMCPersonneResultat[];
  handleClickSelectionTitulaireRmcPersonne: (idTitulaire: string) => void;
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
  const {
    dataPersonnesSauvegardees: dataPersonnesSelectionnees,
    setDataPersonnesSauvegardees: setDataPersonnesSelectionnees
  } = useDataTableauPersonneSauvegardeeHook(
    props.requete.personnesSauvegardees
  );

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
          modeConsultation={props.modeConsultation}
        />
      ),
      index: 1
    },
    {
      titre: "RMC",
      component: (
        <OngletRMCPersonne
          resultatRMCPersonne={props.resultatRMCPersonne}
          sousTypeRequete={props.requete.sousType}
          listeTitulaires={props.requete.titulaires}
          handleClickMenuItem={props.handleClickSelectionTitulaireRmcPersonne}
          natureActeRequete={NatureActeRequete.getEnumFor(
            props.requete.nature ?? ""
          )}
          dataPersonnesSelectionnees={dataPersonnesSelectionnees}
          setDataPersonnesSelectionnees={setDataPersonnesSelectionnees}
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
