import { RECEContextData } from "@core/contexts/RECEContext";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IDetailRequeteParams, useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { appartientAUtilisateurConnecte } from "@model/agent/IOfficier";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { PiecesAnnexes } from "@pages/requeteCreation/commun/composants/PiecesAnnexes";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { OngletProps } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID, URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PartieDroiteSaisirRequete from "../../../../../composants/pages/requetesConsulaire/saisieProjet/PartieDroiteSaisieProjet";
import "../../commun/scss/ApercuReqCreationPage.scss";
import { getComposantResumeRequeteEnFonctionNatureActe } from "./ApercuReqCreationTranscriptionUtils";

interface ApercuReqCreationTranscriptionSaisieProjetPageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationTranscriptionSaisieProjetPage: React.FC<ApercuReqCreationTranscriptionSaisieProjetPageProps> = props => {
  // Params & history
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const navigate = useNavigate();
  const location = useLocation();
  const { utilisateurConnecte } = useContext(RECEContextData);
  // States
  const [requete, setRequete] = useState<IRequeteCreationTranscription>();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>();

  // Hooks
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  useEffect(() => {
    setDetailRequeteParams({
      idRequete: props.idRequeteAAfficher ?? idRequeteParam,
      estConsultation: location.pathname.includes(URL_RECHERCHE_REQUETE)
    });
  }, [props.idRequeteAAfficher, location.pathname, idRequeteParam]);

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

  const afficherBoutonModifierRequete =
    SousTypeCreation.estRCTC(requete?.sousType) && appartientAUtilisateurConnecte(utilisateurConnecte, requete?.idUtilisateur);
  SousTypeCreation.estRCTC(requete?.sousType) && appartientAUtilisateurConnecte(utilisateurConnecte, requete?.idUtilisateur);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);

  const getComposantsPartieGauche = () => {
    return (
      <>
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
            {getLibelle("Modifier la requête")}
          </BoutonDoubleSubmit>
        )}

        {!estModeConsultation && <RMCRequetesAssocieesResultats requete={requete as IRequete} />}
      </>
    );
  };

  function getListeOngletsPartieGauche(): OngletProps[] {
    return requete
      ? [
          {
            titre: "Description de la requête",
            component: getComposantsPartieGauche(),
            index: 0
          },
          {
            titre: "RMC",
            component: (
              <OngletRMCPersonne
                resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
                sousTypeRequete={requete.sousType}
                listeTitulaires={requete.titulaires}
                natureActeRequete={NatureActeRequete.getEnumFor(requete.nature ?? "")}
                dataPersonnesSelectionnees={dataPersonnesSelectionnees || []}
                setDataPersonnesSelectionnees={setDataPersonnesSelectionnees}
                tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
                tableauPersonnesSelectionneesEnChargement={!dataPersonnesSelectionnees}
                tableauActesInscriptionsSelectionnesEnChargement={!dataActesInscriptionsSelectionnes}
                dataActesInscriptionsSelectionnes={dataActesInscriptionsSelectionnes || []}
                setDataActesInscriptionsSelectionnes={setDataActesInscriptionsSelectionnes}
                setRmcAutoPersonneParams={setRmcAutoPersonneParams}
              />
            ),
            index: 1
          },
          {
            titre: "Pièces Annexes",
            component: <PiecesAnnexes />,
            index: 2
          },
          {
            titre: "Aperçu du projet",
            component: <ApercuProjet />,
            index: 3
          }
        ]
      : [];
  }

  function onModificationRequete() {
    if (requete) {
      navigate(getUrlWithParam(URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID, requete.id));
    }
  }

  return (
    <div className="ApercuReqCreationTranscriptionSaisieProjetPage">
      {requete && (
        <>
          <VoletAvecOnglet liste={getListeOngletsPartieGauche()} />

          <PartieDroiteSaisirRequete requete={requete} />
        </>
      )}
    </div>
  );
};
