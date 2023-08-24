import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurPieceJustificative,
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteCreationEtablissementUtils";
import { OngletsApercuCreationEtablissementPriseEnCharge } from "./contenu/OngletsApercuCreationEtablissementPriseEnCharge";

interface ApercuRequeteCreationEtablissementPriseEnChargePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuRequeteCreationEtablissementPriseEnChargePage: React.FC<
  ApercuRequeteCreationEtablissementPriseEnChargePageProps
> = props => {
  // Params & History
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const history = useHistory();

  // States
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();

  // Hooks
  const { detailRequeteState } = useDetailRequeteApiHook(
    props.idRequeteAAfficher ?? idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  const {
    dataActesInscriptionsSelectionnes,
    setDataActesInscriptionsSelectionnes,
    setRmcAutoPersonneParams,
    resultatRMCAutoPersonne,
    rmcAutoPersonneEnChargement
  } = useDataTableauxOngletRMCPersonne(requete);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationEtablissement);
    }
  }, [detailRequeteState]);

  function onRenommePieceJustificativePriseEnCharge(
    idPieceJustificative: string,
    nouveauLibelle: string,
    idDocumentPJ?: string
  ) {
    onRenommePieceJustificativeEtablissement(
      requete,
      setRequete,
      idPieceJustificative,
      nouveauLibelle,
      idDocumentPJ
    );
  }

  return (
    <div className="ApercuReqCreationEtablissementPriseEnChargePage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete)}

          <OngletsApercuCreationEtablissementPriseEnCharge
            requete={requete}
            modeConsultation={props.idRequeteAAfficher !== undefined}
            onRenommePieceJustificative={
              onRenommePieceJustificativePriseEnCharge
            }
            resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
            dataActesInscriptionsSelectionnes={
              dataActesInscriptionsSelectionnes
            }
            setDataActesInscriptionsSelectionnes={
              setDataActesInscriptionsSelectionnes
            }
            tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
            setRmcAutoPersonneParams={setRmcAutoPersonneParams}
          />

          {getConteneurPieceJustificative(
            requete,
            onRenommePieceJustificativePriseEnCharge
          )}
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
