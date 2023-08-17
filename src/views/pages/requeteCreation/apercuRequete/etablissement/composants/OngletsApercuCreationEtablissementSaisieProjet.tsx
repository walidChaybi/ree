import { IRMCPersonneResultat } from "@hook/rmcAuto/IRMCPersonneResultat";
import { IRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { IDataTableauActeInscriptionSelectionne } from "@pages/requeteCreation/commun/composants/tableauActesInscriptionsSelectionnes/IDataTableauActeInscriptionSelectionne";
import { UN, getLibelle } from "@util/Utils";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useState } from "react";
import {
  OngletPiecesJustificatives,
  typeFctRenommePieceJustificative
} from "../../../commun/composants/OngletPiecesJustificatives";
import { BoutonsApercuCreationEtablissement } from "./BoutonsApercuCreationEtablissement";
import "./scss/OngletsApercuCreationEtablissement.scss";

interface OngletsApercuCreationEtablissementSaisieProjetProps {
  requete: IRequeteCreationEtablissement;
  onRenommePieceJustificative: typeFctRenommePieceJustificative;
  resultatRMCPersonne: IRMCPersonneResultat[];
  tableauRMCPersonneEnChargement: boolean;
  dataActesInscriptionsSelectionnes?: IDataTableauActeInscriptionSelectionne[];
  setDataActesInscriptionsSelectionnes: React.Dispatch<
    React.SetStateAction<IDataTableauActeInscriptionSelectionne[] | undefined>
  >;
  setRmcAutoPersonneParams: React.Dispatch<
    React.SetStateAction<IRMCAutoPersonneParams | undefined>
  >;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const OngletsApercuCreationEtablissementSaisieProjet: React.FC<
  OngletsApercuCreationEtablissementSaisieProjetProps
> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState(UN);

  const liste: ItemListe[] = [
    {
      titre: getLibelle("RMC"),
      component: (
        <OngletRMCPersonne
          resultatRMCPersonne={props.resultatRMCPersonne}
          sousTypeRequete={props.requete.sousType}
          listeTitulaires={props.requete.titulaires}
          natureActeRequete={NatureActeRequete.getEnumFor(
            props.requete.nature ?? ""
          )}
          tableauRMCPersonneEnChargement={props.tableauRMCPersonneEnChargement}
          tableauActesInscriptionsSelectionnesEnChargement={
            !props.dataActesInscriptionsSelectionnes
          }
          dataActesInscriptionsSelectionnes={
            props.dataActesInscriptionsSelectionnes || []
          }
          setDataActesInscriptionsSelectionnes={
            props.setDataActesInscriptionsSelectionnes
          }
          setRmcAutoPersonneParams={props.setRmcAutoPersonneParams}
        />
      ),
      index: 0
    },
    {
      titre: getLibelle("Pièces justificatives / Annexes"),
      component: (
        <OngletPiecesJustificatives
          requete={props.requete}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={props.onRenommePieceJustificative}
        />
      ),
      index: 1
    },
    {
      titre: getLibelle("Apercu du projet"),
      component: <ApercuProjet />,
      index: 2
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
      <BoutonsApercuCreationEtablissement requete={props.requete} />
    </div>
  );
};
