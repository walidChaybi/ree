import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import {
  IRequeteCreationEtablissement,
  RequeteCreationEtablissement
} from "@model/requete/IRequeteCreationEtablissement";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Labels from "../../commun/Labels";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import "../../commun/scss/ApercuReqCreationPage.scss";
import { OngletsApercuCreationEtablissement } from "./composants/OngletsApercuCreationEtablissement";
import ResumeRequeteCreation from "./composants/ResumeRequeteCreation";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "./mappingIRequeteCreationVersResumeRequeteCreationProps";

interface ApeApercuReqCreationEtablissementPageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationEtablissementPage: React.FC<
  ApeApercuReqCreationEtablissementPageProps
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
    dataPersonnesSelectionnees,
    setDataPersonnesSelectionnees,
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

  function onRenommePieceJustificative(
    idPieceJustificative: string,
    nouveauLibelle: string,
    idDocumentPJ?: string
  ) {
    const pjARenommer = RequeteCreationEtablissement.getPieceJustificative(
      requete,
      idDocumentPJ,
      idPieceJustificative
    );
    if (pjARenommer) {
      pjARenommer.libelle = nouveauLibelle;
      setRequete({ ...requete } as IRequeteCreationEtablissement);
    }
  }

  return (
    <div className="ApercuReqCreationEtablissementPage">
      {requete ? (
        <>
          <ConteneurRetractable
            titre={Labels.resume.requete.description}
            className="ResumeRequeteCreation"
            initConteneurFerme={false}
            estADroite={false}
          >
            <ResumeRequeteCreation
              {...mappingIRequeteCreationVersResumeRequeteCreationProps(
                requete
              )}
            />
          </ConteneurRetractable>

          <OngletsApercuCreationEtablissement
            requete={requete}
            modeConsultation={props.idRequeteAAfficher !== undefined}
            onRenommePieceJustificative={onRenommePieceJustificative}
            resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
            dataPersonnesSelectionnees={dataPersonnesSelectionnees}
            setDataPersonnesSelectionnees={setDataPersonnesSelectionnees}
            dataActesInscriptionsSelectionnes={
              dataActesInscriptionsSelectionnes
            }
            setDataActesInscriptionsSelectionnes={
              setDataActesInscriptionsSelectionnes
            }
            tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
            setRmcAutoPersonneParams={setRmcAutoPersonneParams}
          />

          <ConteneurRetractable
            titre="Pièces justificatives"
            className="FocusPieceJustificative"
            estADroite={true}
          >
            <OngletPiecesJustificatives
              requete={requete}
              onRenommePieceJustificative={onRenommePieceJustificative}
            />
          </ConteneurRetractable>
        </>
      ) : (
        <OperationLocaleEnCoursSimple />
      )}
    </div>
  );
};
