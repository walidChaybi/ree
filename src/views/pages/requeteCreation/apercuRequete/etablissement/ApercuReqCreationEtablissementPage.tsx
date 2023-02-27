import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import {
  IRMCAutoPersonneParams,
  useRMCAutoPersonneApiAvecCacheHook
} from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import {
  IRequeteCreationEtablissement,
  RequeteCreationEtablissement
} from "@model/requete/IRequeteCreationEtablissement";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { OperationLocaleEnCoursSimple } from "@widget/attente/OperationLocaleEnCoursSimple";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import Labels from "../../commun/Labels";
import "../../commun/scss/ApercuReqCreationPage.scss";
import { OngletsApercuCreationEtablissement } from "./composants/OngletsApercuCreationEtablissement";
import ResumeRequeteCreation from "./composants/ResumeRequeteCreation";
import mappingIRequeteCreationVersResumeRequeteCreationProps from "./mappingIRequeteCreationVersResumeRequeteCreationProps";

export const ApercuReqCreationEtablissementPage: React.FC = () => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [requete, setRequete] = useState<IRequeteCreationEtablissement>();
  const [rmcAutoPersonneParams, setRmcAutoPersonneParams] =
    useState<IRMCAutoPersonneParams>();
  const history = useHistory();
  const resultatRMCAutoPersonne = useRMCAutoPersonneApiAvecCacheHook(
    rmcAutoPersonneParams
  );
  const { detailRequeteState } = useDetailRequeteApiHook(
    idRequeteParam,
    history.location.pathname.includes(URL_RECHERCHE_REQUETE)
  );

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationEtablissement);
    }
  }, [detailRequeteState]);

  useEffect(() => {
    if (requete) {
      const titulaire =
        getPostulantNationaliteOuTitulaireActeTranscritDresse(requete);
      if (titulaire) {
        setRmcAutoPersonneParams(
          mapTitulaireVersRMCAutoPersonneParams(titulaire)
        );
      }
    }
  }, [requete]);

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

  function handleClickSelectionTitulaireRmcPersonne(idTitulaire: string) {
    const titulaire = requete?.titulaires
      ?.filter(titulaireCourant => titulaireCourant.id === idTitulaire)
      .pop();
    if (titulaire) {
      setRmcAutoPersonneParams(
        mapTitulaireVersRMCAutoPersonneParams(titulaire)
      );
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
            onRenommePieceJustificative={onRenommePieceJustificative}
            resultatRMCAutoPersonne={resultatRMCAutoPersonne ?? []}
            handleClickSelectionTitulaireRmcPersonne={
              handleClickSelectionTitulaireRmcPersonne
            }
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
