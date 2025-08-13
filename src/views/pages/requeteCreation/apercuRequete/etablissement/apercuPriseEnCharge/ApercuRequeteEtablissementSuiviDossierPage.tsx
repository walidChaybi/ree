import { IDetailRequeteParams, useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { DEUX } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurPieceJustificative,
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteEtablissementUtils";
import { BoutonsApercuRequeteCreationEtablissement } from "../commun/BoutonsApercuRequeteCreationEtablissement";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";
import { SuiviDossier } from "./contenu/SuiviDossier";

interface ApercuRequeteEtablissementSuiviDossierPageProps {
  idRequeteAAfficher?: string;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const ApercuRequeteEtablissementSuiviDossierPage: React.FC<ApercuRequeteEtablissementSuiviDossierPageProps> = props => {
  // Params & History
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const location = useLocation();
  // States
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>({});

  // Hooks
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  useEffect(() => {
    rechargerRequete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idRequeteAAfficher, location.pathname, idRequeteParam]);

  function rechargerRequete() {
    setDetailRequeteParams({
      idRequete: props.idRequeteAAfficher ?? idRequeteParam,
      estConsultationHistoriqueAction: true
    });
  }

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

  function onRenommePieceJustificativeSuiviDossier(idPieceJustificative: string, nouveauLibelle: string, idDocumentPJ?: string) {
    onRenommePieceJustificativeEtablissement(requete, setRequete, idPieceJustificative, nouveauLibelle, idDocumentPJ);
  }

  const liste: ItemListe[] = [
    {
      titre: "Pièces justificatives / Annexes",
      component: (
        <OngletPiecesJustificatives
          rechargerRequete={rechargerRequete}
          requete={requete || ({} as IRequeteCreationEtablissement)}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={onRenommePieceJustificativeSuiviDossier}
        />
      ),
      index: 0
    },
    {
      titre: "RMC",
      component: (
        <OngletRMCPersonne
          resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
          sousTypeRequete={requete?.sousType}
          listeTitulaires={requete?.titulaires}
          natureActeRequete={NatureActeRequete.getEnumFor(requete?.nature ?? "")}
          tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
          tableauActesInscriptionsSelectionnesEnChargement={!dataActesInscriptionsSelectionnes}
          dataActesInscriptionsSelectionnes={dataActesInscriptionsSelectionnes || []}
          setDataActesInscriptionsSelectionnes={setDataActesInscriptionsSelectionnes}
          setRmcAutoPersonneParams={setRmcAutoPersonneParams}
        />
      ),
      index: 1
    },
    {
      titre: "Suivi dossier",
      component: (
        <SuiviDossier
          echanges={requete?.provenanceNatali?.echanges}
          requete={requete || ({} as IRequeteCreationEtablissement)}
          modeConsultation={props.idRequeteAAfficher !== undefined}
        />
      ),
      index: 2
    }
  ];

  return (
    <div className="ApercuReqCreationEtablissementSuiviDossierPage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete)}

          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet
              liste={liste}
              ongletParDefault={DEUX}
            />
            <BoutonsApercuRequeteCreationEtablissement requete={requete} />
          </div>

          {getConteneurPieceJustificative(requete, onRenommePieceJustificativeSuiviDossier, rechargerRequete)}
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
