import { ICriteresRechercheActeInscription } from "@hook/rmcActeInscription/RMCActeInscriptionUtils";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { stockageDonnees } from "@util/stockageDonnees";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import DefilementAutomatique from "../../../../composants/commun/defilementAutomatique/DefilementAutomatique";
import { useRMCActeApiHook } from "../../../../hooks/rmc/RMCActeApiHook";
import { useRMCInscriptionApiHook } from "../../../../hooks/rmc/RMCInscriptionApiHook";
import AfficherMessage, { TOASTCONTAINER_PRINCIPAL } from "../../../../utils/AfficherMessage";
import { RMCActeInscription } from "./RMCActeInscription";
import { RMCActeInscriptionResultats } from "./resultats/RMCActeInscriptionResultats";
import "./scss/RMCActeInscriptionPage.scss";
import { getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur } from "./validation/VerificationRestrictionRmcActeInscription";

interface RMCActeInscriptionPageProps {
  noAutoScroll: boolean;
  dansFenetreExterne: boolean;
}

const TOASTCONTAINER_EXTERNE = "toastContainer-externe";

export const RMCActeInscriptionPage: React.FC<RMCActeInscriptionPageProps> = ({ noAutoScroll, dansFenetreExterne }) => {
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [nouvelleRMCActeInscription, setNouvelleRMCActeInscription] = useState<boolean>(false);
  const [criteresRechercheActe, setCriteresRechercheActe] = useState<ICriteresRechercheActeInscription>();
  const [criteresRechercheInscription, setCriteresRechercheInscription] = useState<ICriteresRechercheActeInscription>();

  const resultatRMCActe = useRMCActeApiHook(criteresRechercheActe);
  const resultatRMCInscription = useRMCInscriptionApiHook(criteresRechercheInscription);

  //  Obligatoire pour les styles qui sont chargés dynamiquement lorsque le select est dans une fenetre externe
  useEffect(() => {
    const event = new CustomEvent("refreshStyles");
    if (window.top) {
      window.top.dispatchEvent(event);
    }
  }, []);

  const onSubmitRMCActeInscription = useCallback(
    (values: IRMCActeInscription) => {
      const messageErreur = getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(values);
      if (messageErreur) {
        AfficherMessage.erreur(messageErreur, {
          idConteneur: dansFenetreExterne ? TOASTCONTAINER_EXTERNE : TOASTCONTAINER_PRINCIPAL,
          fermetureAuto: true
        });
      } else {
        setOpEnCours(true);
        setNouvelleRMCActeInscription(true);
        setCriteresRechercheActe({
          valeurs: values,
          range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`,
          onErreur: () => setOpEnCours(false),
          onFinTraitement: () => setOpEnCours(false)
        });
        setCriteresRechercheInscription({
          valeurs: values,
          range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}`,
          onErreur: () => setOpEnCours(false),
          onFinTraitement: () => setOpEnCours(false)
        });
        stockageDonnees.stockerCriteresRMCActeInspt(values);
        setNouvelleRMCActeInscription(false);
      }
    },
    [dansFenetreExterne]
  );

  return (
    <>
      <OperationEnCours
        visible={opEnCours}
        onTimeoutEnd={() => setOpEnCours(false)}
      ></OperationEnCours>
      <RMCActeInscription onSubmit={onSubmitRMCActeInscription} />
      <DefilementAutomatique faireDefiler={Boolean(resultatRMCActe && resultatRMCInscription)} />
      {resultatRMCActe.resultat?.dataRMCActe &&
        resultatRMCActe.resultat?.dataTableauRMCActe &&
        resultatRMCInscription.resultat?.dataRMCInscription &&
        resultatRMCInscription.resultat.dataTableauRMCInscription &&
        (opEnCours ? (
          <PageChargeur />
        ) : (
          <RMCActeInscriptionResultats
            typeRMC="Classique"
            dataRMCActe={resultatRMCActe.resultat.dataRMCActe}
            dataTableauRMCActe={resultatRMCActe.resultat.dataTableauRMCActe}
            dataRMCInscription={resultatRMCInscription.resultat.dataRMCInscription}
            dataTableauRMCInscription={resultatRMCInscription.resultat.dataTableauRMCInscription}
            resetRMC={nouvelleRMCActeInscription}
            nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
            nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
            nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
            nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
            rmcActeEnCours={resultatRMCActe.rmcActeEnCours}
            rmcInscriptionEnCours={resultatRMCInscription.rmcInscriptionEnCours}
          />
        ))}
      {dansFenetreExterne && (
        <ToastContainer
          containerId={TOASTCONTAINER_EXTERNE}
          className={"toast-container"}
          position="top-center"
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          draggable={true}
          pauseOnHover={true}
        />
      )}
    </>
  );
};
