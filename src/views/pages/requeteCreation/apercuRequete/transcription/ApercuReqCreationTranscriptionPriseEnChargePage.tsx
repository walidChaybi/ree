import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { mAppartient } from "@model/agent/IOfficier";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
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
import { getLibelle } from "@util/Utils";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import ConteneurRetractable from "@widget/conteneurRetractable/ConteneurRetractable";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
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
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const history = useHistory();

  // States
  const [requete, setRequete] = useState<IRequeteCreation>();
  const [ongletSelectionne, setOngletSelectionne] = useState(1);

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

  const handleChange = (e: any, newValue: string) => {
    setOngletSelectionne(parseInt(newValue));
  };

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
                dataPersonnesSelectionnees={dataPersonnesSelectionnees || []}
                setDataPersonnesSelectionnees={setDataPersonnesSelectionnees}
                tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
                tableauPersonnesSelectionneesEnChargement={
                  !dataPersonnesSelectionnees
                }
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
      history.push(
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
            <VoletAvecOnglet
              liste={getListeOnglets()}
              ongletSelectionne={ongletSelectionne}
              handleChange={handleChange}
            />

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
