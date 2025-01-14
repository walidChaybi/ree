import { CONFIG_POST_MAJ_STATUT_ET_ACTION } from "@api/configurations/requete/actions/PostMajStatutEtActionConfigApi";
import { RECEContextActions, RECEContextData } from "@core/contexts/RECEContext";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IDetailRequeteParams, useAvecRejeuDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { appartientAUtilisateurConnecte } from "@model/agent/IOfficier";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import Labels from "@pages/requeteCreation/commun/Labels";
import { AnalyseDuDossier } from "@pages/requeteCreation/commun/composants/AnalyseDuDossier";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { OngletProps } from "@pages/requeteCreation/commun/requeteCreationUtils";
import {
  PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE,
  PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION_MODIFIER_RCTC_ID,
  URL_RECHERCHE_REQUETE
} from "@router/ReceUrls";
import { logError } from "@util/LogManager";
import { UN } from "@util/Utils";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageChargeur from "../../../../../composants/commun/chargeurs/PageChargeur";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import "../../commun/scss/ApercuReqCreationPage.scss";
import { getComposantResumeRequeteEnFonctionNatureActe, onRenommePieceJustificative } from "./ApercuReqCreationTranscriptionUtils";

interface ApercuReqCreationTranscriptionPriseEnChargePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationTranscriptionPriseEnChargePage: React.FC<ApercuReqCreationTranscriptionPriseEnChargePageProps> = props => {
  // Params & history
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [requete, setRequete] = useState<IRequeteCreation>();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);
  // Hooks
  const { detailRequeteState } = useAvecRejeuDetailRequeteApiHook(detailRequeteParams);
  const { appelApi: appelApiMajStatutEtAction, enAttenteDeReponseApi: enAttenteMajStatutEtAction } =
    useFetchApi(CONFIG_POST_MAJ_STATUT_ET_ACTION);

  useEffect(() => {
    rechargerLaRequete();
  }, []);

  function rechargerLaRequete() {
    setDetailRequeteParams({
      idRequete: props.idRequeteAAfficher ?? idRequeteParam,
      estConsultation: location.pathname.includes(URL_RECHERCHE_REQUETE)
    });
    setIsDirty(false);
  }

  const {
    dataPersonnesSelectionnees,
    setDataPersonnesSelectionnees,
    dataActesInscriptionsSelectionnes,
    setDataActesInscriptionsSelectionnes,
    setRmcAutoPersonneParams,
    resultatRMCAutoPersonne,
    rmcAutoPersonneEnChargement
  } = useDataTableauxOngletRMCPersonne(requete);

  const estModeConsultation = props.idRequeteAAfficher !== undefined;

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);

  const onRenommePieceJustificativeApercuPriseEnCharge = (idPieceJustificative: string, nouveauLibelle: string) => {
    onRenommePieceJustificative(idPieceJustificative, nouveauLibelle, requete, setRequete);
  };

  const onClickOnCreerProjetActe = useCallback(() => {
    const idRequete = requete?.id;
    if (!idRequete) {
      return;
    }

    appelApiMajStatutEtAction({
      parametres: {
        query: {
          idRequete: idRequete,
          libelleAction: "Saisie du projet",
          statutRequete: StatutRequete.getKey(StatutRequete.EN_TRAITEMENT)
        }
      },
      apresSucces: () =>
        navigate(
          `${location.pathname.split(PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE)[0]}${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/${idRequete}`
        ),
      apresErreur: erreurs =>
        logError({
          error: erreurs[0],
          messageUtilisateur: "Impossible de démarrer le traitement du projet d'acte."
        })
    });
  }, [requete]);

  function getListeOnglets(): OngletProps[] {
    return requete
      ? [
          {
            titre: "Pièces justificatives / Annexes",
            component: (
              <OngletPiecesJustificatives
                requete={requete}
                onRenommePieceJustificative={onRenommePieceJustificativeApercuPriseEnCharge}
                autoriseOuvertureFenetreExt={true}
              />
            ),
            index: 0
          },
          {
            titre: "RMC",
            component: (
              <OngletRMCPersonne
                sousTypeRequete={requete.sousType}
                listeTitulaires={requete.titulaires}
                resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
                natureActeRequete={NatureActeRequete.getEnumFor(requete.nature ?? "")}
                dataPersonnesSelectionnees={dataPersonnesSelectionnees}
                setDataPersonnesSelectionnees={setDataPersonnesSelectionnees}
                tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
                tableauPersonnesSelectionneesEnChargement={!dataPersonnesSelectionnees}
                tableauActesInscriptionsSelectionnesEnChargement={!dataActesInscriptionsSelectionnes}
                dataActesInscriptionsSelectionnes={dataActesInscriptionsSelectionnes}
                setDataActesInscriptionsSelectionnes={setDataActesInscriptionsSelectionnes}
                setRmcAutoPersonneParams={setRmcAutoPersonneParams}
                onSavePersonneEtActeInscription={rechargerLaRequete}
                idRequeteParam={idRequeteParam}
              />
            ),
            index: 1
          },
          {
            titre: "Analyse du dossier",
            component: <AnalyseDuDossier />,
            index: 2
          }
        ]
      : [];
  }

  const afficherBoutonModifierRequete =
    SousTypeCreation.estRCTC(requete?.sousType) && appartientAUtilisateurConnecte(utilisateurConnecte, requete?.idUtilisateur);

  function onModificationRequete() {
    if (requete) {
      navigate(getUrlWithParam(URL_MES_REQUETES_CREATION_MODIFIER_RCTC_ID, requete.id));
    }
  }

  return (
    <div className="ApercuReqCreationTranscriptionPriseEnChargePage">
      {enAttenteMajStatutEtAction && <PageChargeur />}
      <ConteneurRetractable
        titre={`${Labels.resume.requeteTranscription.description} ${requete?.numeroDossierMetier ?? ""}`}
        className="ResumeRequeteCreation"
        initConteneurFerme={false}
        estADroite={false}
      >
        {getComposantResumeRequeteEnFonctionNatureActe(requete)}

        {afficherBoutonModifierRequete && (
          <BoutonDoubleSubmit
            type="button"
            onClick={onModificationRequete}
            aria-label="Modifier"
          >
            <FontAwesomeIcon
              icon={faEdit}
              className="iconModifierRequete"
            />
            {"Modifier la requête"}
          </BoutonDoubleSubmit>
        )}

        {!estModeConsultation && <RMCRequetesAssocieesResultats requete={requete as IRequete} />}
      </ConteneurRetractable>

      {requete && (
        <>
          <VoletAvecOnglet
            liste={getListeOnglets()}
            ongletParDefault={UN}
          >
            <BoutonDoubleSubmit
              className="shrink-0 self-end"
              title="Créer le projet d'acte"
              onClick={onClickOnCreerProjetActe}
              disabled={enAttenteMajStatutEtAction}
            >
              Créer le projet d'acte
            </BoutonDoubleSubmit>
          </VoletAvecOnglet>

          <ConteneurRetractable
            titre="Pièces justificatives"
            className="FocusPieceJustificative"
            estADroite={true}
          >
            <OngletPiecesJustificatives
              requete={requete}
              onRenommePieceJustificative={onRenommePieceJustificativeApercuPriseEnCharge}
            />
          </ConteneurRetractable>
        </>
      )}
    </div>
  );
};
