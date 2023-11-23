import {
  IDetailRequeteParams,
  useDetailRequeteApiHook
} from "@hook/requete/DetailRequeteHook";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { OngletPiecesJustificatives } from "@pages/requeteCreation/commun/composants/OngletPiecesJustificatives";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { DEUX, getLibelle } from "@util/Utils";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../../commun/scss/ApercuReqCreationPage.scss";
import {
  getConteneurPieceJustificative,
  getConteneurResumeRequete,
  onRenommePieceJustificativeEtablissement
} from "../commun/ApercuRequeteCreationEtablissementUtils";
import { BoutonsApercuCreationEtablissement } from "../commun/BoutonsApercuRequeteCreationEtablissement";
import "../commun/scss/OngletsApercuCreationEtablissement.scss";
import { SuiviDossier } from "./contenu/SuiviDossier";

interface ApercuRequeteCreationEtablissementPriseEnChargePageProps {
  idRequeteAAfficher?: string;
}

interface ItemListe {
  titre: string;
  index: number;
  component: JSX.Element;
}

export const ApercuRequeteCreationEtablissementPriseEnChargePage: React.FC<
  ApercuRequeteCreationEtablissementPriseEnChargePageProps
> = props => {
  // Params & History
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const history = useHistory();
  // States
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();

  // Hooks
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  useEffect(() => {
    rechargerRequete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.idRequeteAAfficher, history.location.pathname, idRequeteParam]);

  function rechargerRequete() {
    setDetailRequeteParams({
      idRequete: props.idRequeteAAfficher ?? idRequeteParam,
      estConsultation: history.location.pathname.includes(URL_RECHERCHE_REQUETE)
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

  const liste: ItemListe[] = [
    {
      titre: getLibelle("Pièces justificatives / Annexes"),
      component: (
        <OngletPiecesJustificatives
          rechargerRequete={rechargerRequete}
          requete={requete || ({} as IRequeteCreationEtablissement)}
          autoriseOuvertureFenetreExt={true}
          onRenommePieceJustificative={onRenommePieceJustificativePriseEnCharge}
        />
      ),
      index: 0
    },
    {
      titre: getLibelle("RMC"),
      component: (
        <OngletRMCPersonne
          resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
          sousTypeRequete={requete?.sousType}
          listeTitulaires={requete?.titulaires}
          natureActeRequete={NatureActeRequete.getEnumFor(
            requete?.nature ?? ""
          )}
          tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
          tableauActesInscriptionsSelectionnesEnChargement={
            !dataActesInscriptionsSelectionnes
          }
          dataActesInscriptionsSelectionnes={
            dataActesInscriptionsSelectionnes || []
          }
          setDataActesInscriptionsSelectionnes={
            setDataActesInscriptionsSelectionnes
          }
          setRmcAutoPersonneParams={setRmcAutoPersonneParams}
        />
      ),
      index: 1
    },
    {
      titre: getLibelle("Suivi dossier"),
      component: (
        <SuiviDossier
          echanges={requete?.provenanceNatali?.echanges}
          requete={requete || ({} as IRequeteCreationEtablissement)}
          modeConsultation={props.idRequeteAAfficher !== undefined}
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
    <div className="ApercuReqCreationEtablissementPriseEnChargePage">
      {requete ? (
        <>
          {getConteneurResumeRequete(requete)}

          <div className="OngletsApercuCreationEtablissement">
            <VoletAvecOnglet liste={liste} ongletParDefault={DEUX} />
            <BoutonsApercuCreationEtablissement requete={requete} />
          </div>

          {getConteneurPieceJustificative(
            requete,
            onRenommePieceJustificativePriseEnCharge,
            rechargerRequete
          )}
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
