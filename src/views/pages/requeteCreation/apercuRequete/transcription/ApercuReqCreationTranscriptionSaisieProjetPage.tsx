import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { mAppartient } from "@model/agent/IOfficier";
import { IUuidRequeteParams } from "@model/params/IUuidRequeteParams";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { GestionMentions } from "@pages/requeteCreation/commun/composants/GestionMentions";

import { PiecesAnnexes } from "@pages/requeteCreation/commun/composants/PiecesAnnexes";
import { SaisieProjet } from "@pages/requeteCreation/commun/composants/SaisieProjet";
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
import { VoletAvecOnglet } from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../../commun/scss/ApercuReqCreationPage.scss";
import { getComposantResumeRequeteEnFonctionNatureActe } from "./ApercuReqCreationTranscriptionUtils";

interface ApercuReqCreationTranscriptionSaisieProjetPageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqCreationTranscriptionSaisieProjetPage: React.FC<
  ApercuReqCreationTranscriptionSaisieProjetPageProps
> = props => {
  // Params & history
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const history = useHistory();

  // States
  const [requete, setRequete] = useState<IRequeteCreationTranscription>();
  const [ongletSelectionnePartieGauche, setOngletSelectionnePartieGauche] =
    useState(0);
  const [ongletSelectionnePartieDroite, setOngletSelectionnePartieDroite] =
    useState(0);

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

  const afficherBoutonModifierRequete =
    SousTypeCreation.estRCTC(requete?.sousType) &&
    mAppartient(requete?.idUtilisateur);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteCreationTranscription);
    }
  }, [detailRequeteState]);
  
  const handleChangeOngletPartieGauche = (e: any, newValue: string) => {
    /* istanbul ignore next */
    setOngletSelectionnePartieGauche(parseInt(newValue));
  };

  const handleChangeOngletPartieDroite = (e: any, newValue: string) => {
    setOngletSelectionnePartieDroite(parseInt(newValue));
  };
  
  const getComposantsPartieGauche = () => {
    return (
      <>
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

  function getListeOngletsPartieDroite(): OngletProps[] {
    return requete
      ? [
          {
            titre: "Saisir le projet",
            component: <SaisieProjet />,
            index: 0
          },
          {
            titre: "Gérer les mentions",
            component: <GestionMentions />,
            index: 1
          },
          {
            titre: "Echanges",
            component: <Echanges />,
            index: 2
          }
        ]
      : [];
  }

  function onModificationRequete() {
    if (requete) {
      history.push(
        getUrlWithParam(URL_MES_REQUETES_CREATION_MODIFIER_RCTC_ID, requete.id)
      );
    }
  }

  return (
    <div className="ApercuReqCreationTranscriptionSaisieProjetPage">
      {requete && (
        <>
          <VoletAvecOnglet
            liste={getListeOngletsPartieGauche()}
            ongletSelectionne={ongletSelectionnePartieGauche}
            handleChange={handleChangeOngletPartieGauche}
          />

          <VoletAvecOnglet
            liste={getListeOngletsPartieDroite()}
            ongletSelectionne={ongletSelectionnePartieDroite}
            handleChange={handleChangeOngletPartieDroite}
          />
        </>
      )}
    </div>
  );
};
