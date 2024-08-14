import { RECEContext } from "@core/contexts/RECEContext";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IDetailRequeteParams,
  useAvecRejeuDetailRequeteApiHook
} from "@hook/requete/DetailRequeteHook";
import { mAppartient } from "@model/agent/IOfficier";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import Labels from "@pages/requeteCreation/commun/Labels";
import { AnalyseDuDossier } from "@pages/requeteCreation/commun/composants/AnalyseDuDossier";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { OngletProps } from "@pages/requeteCreation/commun/requeteCreationUtils";
import {
  URL_MES_REQUETES_CREATION_MODIFIER_RCTC_ID,
  URL_RECHERCHE_REQUETE
} from "@router/ReceUrls";
import { UN, getLibelle } from "@util/Utils";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OngletPiecesJustificatives } from "../../commun/composants/OngletPiecesJustificatives";
import "../../commun/scss/ApercuReqCreationPage.scss";
import {
  getComposantResumeRequeteEnFonctionNatureActe,
  onRenommePieceJustificative
} from "./ApercuReqCreationTranscriptionUtils";

interface ApercuReqCreationTranscriptionPriseEnChargePageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationTranscriptionPriseEnChargePage: React.FC<
  ApercuReqCreationTranscriptionPriseEnChargePageProps
> = props => {
  // Params & history
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [requete, setRequete] = useState<IRequeteCreation>();
  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();
  const { setIsDirty } = useContext(RECEContext);

  // Hooks
  const { detailRequeteState } =
    useAvecRejeuDetailRequeteApiHook(detailRequeteParams);

  useEffect(() => {
    rechargerLaRequete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function onRenommePieceJustificativeApercuPriseEnCharge(
    idPieceJustificative: string,
    nouveauLibelle: string
  ) {
    onRenommePieceJustificative(
      idPieceJustificative,
      nouveauLibelle,
      requete,
      setRequete
    );
  }

  function getListeOnglets(): OngletProps[] {
    return requete
      ? [
          {
            titre: "Pièces justificatives / Annexes",
            component: (
              <OngletPiecesJustificatives
                requete={requete}
                onRenommePieceJustificative={
                  onRenommePieceJustificativeApercuPriseEnCharge
                }
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
                natureActeRequete={NatureActeRequete.getEnumFor(
                  requete.nature ?? ""
                )}
                dataPersonnesSelectionnees={dataPersonnesSelectionnees}
                setDataPersonnesSelectionnees={setDataPersonnesSelectionnees}
                tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
                tableauPersonnesSelectionneesEnChargement={
                  !dataPersonnesSelectionnees
                }
                tableauActesInscriptionsSelectionnesEnChargement={
                  !dataActesInscriptionsSelectionnes
                }
                dataActesInscriptionsSelectionnes={
                  dataActesInscriptionsSelectionnes
                }
                setDataActesInscriptionsSelectionnes={
                  setDataActesInscriptionsSelectionnes
                }
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
    SousTypeCreation.estRCTC(requete?.sousType) &&
    mAppartient(requete?.idUtilisateur);

  function onModificationRequete() {
    if (requete) {
      navigate(
        getUrlWithParam(URL_MES_REQUETES_CREATION_MODIFIER_RCTC_ID, requete.id)
      );
    }
  }

  return (
    <div className="ApercuReqCreationTranscriptionPriseEnChargePage">
      <>
        <ConteneurRetractable
          titre={`${Labels.resume.requeteTranscription.description} ${
            requete?.numeroDossierMetier || ""
          }`}
          className="ResumeRequeteCreation"
          initConteneurFerme={false}
          estADroite={false}
        >
          {getComposantResumeRequeteEnFonctionNatureActe(requete)}

          {afficherBoutonModifierRequete && (
            <Bouton
              type="button"
              onClick={onModificationRequete}
              aria-label="Modifier"
            >
              <FontAwesomeIcon icon={faEdit} className="iconModifierRequete" />
              {getLibelle("Modifier la requête")}
            </Bouton>
          )}

          {!estModeConsultation && (
            <RMCRequetesAssocieesResultats requete={requete as IRequete} />
          )}
        </ConteneurRetractable>

        {requete && (
          <>
            <VoletAvecOnglet liste={getListeOnglets()} ongletParDefault={UN} />

            <ConteneurRetractable
              titre="Pièces justificatives"
              className="FocusPieceJustificative"
              estADroite={true}
            >
              <OngletPiecesJustificatives
                requete={requete}
                onRenommePieceJustificative={
                  onRenommePieceJustificativeApercuPriseEnCharge
                }
              />
            </ConteneurRetractable>
          </>
        )}
      </>
    </div>
  );
};
