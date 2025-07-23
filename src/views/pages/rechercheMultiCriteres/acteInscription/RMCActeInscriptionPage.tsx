import { ICriteresRechercheActeInscription } from "@hook/rmcActeInscription/RMCActeInscriptionUtils";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import messageManager, { TOASTCONTAINER_PRINCIPAL } from "@util/messageManager";
import { stockageDonnees } from "@util/stockageDonnees";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import { useRMCActeApiHook } from "../../../../hooks/rmc/RMCActeApiHook";
import { useRMCInscriptionApiHook } from "../../../../hooks/rmc/RMCInscriptionApiHook";
import { RMCActeInscription } from "./RMCActeInscription";
import { RMCActeInscriptionResultats } from "./resultats/RMCActeInscriptionResultats";
import { goToLinkRMC } from "./resultats/RMCTableauCommun";
import "./scss/RMCActeInscriptionPage.scss";
import { getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur } from "./validation/VerificationRestrictionRmcActeInscription";

interface RMCActeInscriptionPageProps {
  noAutoScroll: boolean;
  dansFenetreExterne: boolean;
}

const TOASTCONTAINER_EXTERNE = "toastContainer-externe";

export const RMCActeInscriptionPage: React.FC<RMCActeInscriptionPageProps> = ({ noAutoScroll, dansFenetreExterne }) => {
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [valuesRMCActeInscription, setValuesRMCActeInscription] = useState<IRMCActeInscription>({});
  const [nouvelleRMCActeInscription, setNouvelleRMCActeInscription] = useState<boolean>(false);
  const [criteresRechercheActe, setCriteresRechercheActe] = useState<ICriteresRechercheActeInscription>();
  const [criteresRechercheInscription, setCriteresRechercheInscription] = useState<ICriteresRechercheActeInscription>();

  // Critères de recherche pour alimenter les données des fiches Acte en effet leur pagination/navigation est indépendante du tableau de résultats
  const [criteresRechercheFicheActe, setCriteresRechercheFicheActe] = useState<ICriteresRechercheActeInscription>();
  // Critères de recherche pour alimenter les données des fiches Inscription en effet leur pagination/navigation est indépendante du tableau de résultats
  const [criteresRechercheFicheInscription, setCriteresRechercheFicheInscription] = useState<ICriteresRechercheActeInscription>();

  const tableauResultatRef = useRef<HTMLDivElement | null>(null);

  const resultatRMCActe = useRMCActeApiHook(criteresRechercheActe);
  const resultatRMCInscription = useRMCInscriptionApiHook(criteresRechercheInscription);
  /** Récupération des résultats rmc pour une fiche Acte lors d'une navigation */
  const resultatRMCFicheActe = useRMCActeApiHook(criteresRechercheFicheActe);
  /** Récupération des résultats rmc pour une fiche Inscription lors d'une navigation */
  const resultatRMCFicheInscription = useRMCInscriptionApiHook(criteresRechercheFicheInscription);

  //  Obligatoire pour les styles qui sont chargés dynamiquement lorsque le select est dans une fenetre externe
  useEffect(() => {
    const event = new CustomEvent("refreshStyles");
    if (window.top) {
      window.top.dispatchEvent(event);
    }
  }, []);

  const setRangeActe = useCallback(
    (range: string) => {
      if (valuesRMCActeInscription && range !== "") {
        setCriteresRechercheActe({
          valeurs: valuesRMCActeInscription,
          range,
          onErreur: () => setOpEnCours(false),
          onFinTraitement: () => setOpEnCours(false)
        });
      }
    },
    [valuesRMCActeInscription]
  );

  const setRangeInscription = (range: string) => {
    if (valuesRMCActeInscription && range !== "") {
      setCriteresRechercheInscription({
        valeurs: valuesRMCActeInscription,
        range,
        onErreur: () => setOpEnCours(false),
        onFinTraitement: () => setOpEnCours(false)
      });
    }
  };

  const getLignesSuivantesOuPrecedentesActe = useCallback(
    (ficheIdentifiant: string, lien: string) => {
      const range = goToLinkRMC(lien);
      if (valuesRMCActeInscription && range) {
        setCriteresRechercheFicheActe({
          valeurs: valuesRMCActeInscription,
          range,
          ficheIdentifiant,
          onErreur: () => setOpEnCours(false),
          onFinTraitement: () => setOpEnCours(false)
        });
      }
    },
    [valuesRMCActeInscription]
  );

  const getLignesSuivantesOuPrecedentesInscription = useCallback(
    (ficheIdentifiant: string, lien: string) => {
      const range = goToLinkRMC(lien);
      if (valuesRMCActeInscription && range) {
        setCriteresRechercheFicheInscription({
          valeurs: valuesRMCActeInscription,
          range,
          ficheIdentifiant
        });
      }
    },
    [valuesRMCActeInscription]
  );

  const onSubmitRMCActeInscription = useCallback(
    (values: IRMCActeInscription) => {
      const messageErreur = getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(values);
      if (messageErreur) {
        messageManager.showErrorAndClose(messageErreur, dansFenetreExterne ? TOASTCONTAINER_EXTERNE : TOASTCONTAINER_PRINCIPAL);
      } else {
        setOpEnCours(true);
        setNouvelleRMCActeInscription(true);
        setValuesRMCActeInscription(values);
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
  useEffect(() => {
    if (
      resultatRMCActe.resultat?.dataRMCActe &&
      resultatRMCActe.resultat.dataTableauRMCActe &&
      resultatRMCInscription.resultat?.dataRMCInscription &&
      resultatRMCInscription.resultat.dataTableauRMCInscription
    )
      tableauResultatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [resultatRMCActe, resultatRMCInscription]);
  return (
    <>
      <OperationEnCours
        visible={opEnCours}
        onTimeoutEnd={() => setOpEnCours(false)}
      ></OperationEnCours>
      <RMCActeInscription onSubmit={onSubmitRMCActeInscription} />

      {resultatRMCActe.resultat?.dataRMCActe &&
        resultatRMCActe.resultat?.dataTableauRMCActe &&
        resultatRMCInscription.resultat?.dataRMCInscription &&
        resultatRMCInscription.resultat.dataTableauRMCInscription &&
        (opEnCours ? (
          <PageChargeur />
        ) : (
          <RMCActeInscriptionResultats
            ref={tableauResultatRef}
            typeRMC="Classique"
            dataRMCActe={resultatRMCActe.resultat.dataRMCActe}
            dataTableauRMCActe={resultatRMCActe.resultat.dataTableauRMCActe}
            dataRMCInscription={resultatRMCInscription.resultat.dataRMCInscription}
            dataTableauRMCInscription={resultatRMCInscription.resultat.dataTableauRMCInscription}
            setRangeInscription={setRangeInscription}
            setRangeActe={setRangeActe}
            resetRMC={nouvelleRMCActeInscription}
            nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
            nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
            nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
            nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
            getLignesSuivantesOuPrecedentesActe={getLignesSuivantesOuPrecedentesActe}
            idFicheActe={resultatRMCFicheActe.resultat?.ficheIdentifiant}
            dataRMCFicheActe={resultatRMCFicheActe.resultat?.dataRMCActe}
            dataTableauRMCFicheActe={resultatRMCFicheActe.resultat?.dataTableauRMCActe}
            getLignesSuivantesOuPrecedentesInscription={getLignesSuivantesOuPrecedentesInscription}
            idFicheInscription={resultatRMCFicheInscription.resultat?.ficheIdentifiant}
            dataRMCFicheInscription={resultatRMCFicheInscription.resultat?.dataRMCInscription}
            dataTableauRMCFicheInscription={resultatRMCFicheInscription.resultat?.dataTableauRMCInscription}
            rmcActeEnCours={resultatRMCActe.rmcActeEnCours || resultatRMCFicheActe.rmcActeEnCours}
            rmcInscriptionEnCours={resultatRMCInscription.rmcInscriptionEnCours || resultatRMCFicheInscription.rmcInscriptionEnCours}
          />
        ))}
      {dansFenetreExterne && (
        <ToastContainer
          containerId={TOASTCONTAINER_EXTERNE}
          className={"toast-container"}
          position="top-center"
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          draggable={true}
          pauseOnHover={true}
          enableMultiContainer={true}
        />
      )}
    </>
  );
};
