import { IRMCPersonneResultat } from "@hook/rmcAuto/IRMCPersonneResultat";
import { IRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { IDataTableauActeInscriptionSelectionne } from "@pages/requeteCreation/commun/composants/tableauActesInscriptionsSelectionnes/IDataTableauActeInscriptionSelectionne";
import { DEUX, getLibelle } from "@util/Utils";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React from "react";
import {
  OngletPiecesJustificatives,
  typeFctRenommePieceJustificative
} from "../../../../commun/composants/OngletPiecesJustificatives";
import { BoutonsApercuCreationEtablissement } from "../../commun/BoutonsApercuRequeteCreationEtablissement";
import "../../commun/scss/OngletsApercuCreationEtablissement.scss";
import { SuiviDossier } from "./SuiviDossier";

interface OngletsApercuCreationEtablissementPriseEnChargeProps {
  requete: IRequeteCreationEtablissement;
  modeConsultation?: boolean;
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
  rechargerRequete: () => void;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const OngletsApercuCreationEtablissementPriseEnCharge: React.FC<
  OngletsApercuCreationEtablissementPriseEnChargeProps
> = props => {
  const liste: ItemListe[] = [
    {
      titre: getLibelle("Pièces justificatives / Annexes"),
      component: (
        <OngletPiecesJustificatives
          rechargerRequete={props.rechargerRequete}
          requete={props.requete}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={props.onRenommePieceJustificative}
        />
      ),
      index: 0
    },
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
      index: 1
    },
    {
      titre: getLibelle("Suivi dossier"),
      component: (
        <SuiviDossier
          echanges={props.requete.provenanceNatali?.echanges}
          requete={props.requete}
          modeConsultation={props.modeConsultation}
        />
      ),
      index: 2
    },
    {
      titre: getLibelle("Echanges"),
      component: <Echanges />,
      index: 3
    }
  ];

  return (
    <div className="OngletsApercuCreationEtablissement">
      <VoletAvecOnglet liste={liste} ongletParDefault={DEUX} />
      <BoutonsApercuCreationEtablissement requete={props.requete} />
    </div>
  );
};
