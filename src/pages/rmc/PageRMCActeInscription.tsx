import { useRMCInscriptionApiHook } from "@hook/rmcActeInscription/RMCInscriptionApiHook";
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

import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { ICriteresRechercheActeInscription, mappingCriteres, rmcActeAutorisee } from "@hook/rmcActeInscription/RMCActeInscriptionUtils";
import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { RMCActeInscriptionResultats } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCActeInscriptionResultats";
import { goToLinkRMC } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauCommun";
import { getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur } from "@pages/rechercheMultiCriteres/acteInscription/validation/VerificationRestrictionRmcActeInscription";
import { IParamsTableau, PARAMS_TABLEAU_VIDE, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { RMCActeInscription } from "../../composants/pages/rmc/formulaire/RMCActeInscription";
import useFetchApi from "../../hooks/api/FetchApiHook";

interface PageRMCActeInscriptionProps {
  dansFenetreExterne: boolean;
}

const TOASTCONTAINER_EXTERNE = "toastContainer-externe";

export const PageRMCActeInscription: React.FC<PageRMCActeInscriptionProps> = ({ dansFenetreExterne }) => {
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [valuesRMCActeInscription, setValuesRMCActeInscription] = useState<IRMCActeInscription>({});
  const [nouvelleRMCActeInscription, setNouvelleRMCActeInscription] = useState<boolean>(false);
  const [criteresRechercheInscription, setCriteresRechercheInscription] = useState<ICriteresRechercheActeInscription>();
  const [dataRMCActe, setDataRMCActe] = useState<ResultatRMCActe[] | null>(null);
  const [dataTableauRMCActe, setDataTableauRMCActe] = useState<IParamsTableau | null>(null);
  const [idFicheActe, setIdFicheActe] = useState<string>();

  // Critères de recherche pour alimenter les données des fiches Inscription en effet leur pagination/navigation est indépendante du tableau de résultats
  const [criteresRechercheFicheInscription, setCriteresRechercheFicheInscription] = useState<ICriteresRechercheActeInscription>();

  const tableauResultatRef = useRef<HTMLDivElement | null>(null);

  const { dataRMCInscription, dataTableauRMCInscription } = useRMCInscriptionApiHook(criteresRechercheInscription);

  const { appelApi: getRMCActe, enAttenteDeReponseApi: enAttenteRMCActe } = useFetchApi(CONFIG_POST_RMC_ACTE);

  const resultatRMCFicheInscription = useRMCInscriptionApiHook(criteresRechercheFicheInscription);

  //  Obligatoire pour les styles qui sont chargés dynamiquement lorsque le select est dans une fenetre externe
  useEffect(() => {
    const event = new CustomEvent("refreshStyles");
    if (window.top) {
      window.top.dispatchEvent(event);
    }
  }, []);

  const appelApiRMCActe = (valeursRMCActeInscription: IRMCActeInscription, range: string, ficheIdentifiant?: string) => {
    const criteres = mappingCriteres(valeursRMCActeInscription);

    if (!rmcActeAutorisee(criteres)) {
      setDataRMCActe([]);
      setDataTableauRMCActe(PARAMS_TABLEAU_VIDE);
      return;
    }

    getRMCActe({
      parametres: {
        body: criteres,
        query: {
          range
        }
      },
      apresSucces: (actes, headers) => {
        setDataRMCActe(actes.map(ResultatRMCActe.depuisDto).filter((acte): acte is ResultatRMCActe => acte !== null));
        setDataTableauRMCActe(getParamsTableauDepuisHeaders(headers));
        setIdFicheActe(ficheIdentifiant);
      },
      apresErreur: () => {
        messageManager.showErrorAndClose("Impossible de récupérer les actes de la recherche multi-critères");
      }
    });
  };

  const setRangeActe = useCallback(
    (range: string) => {
      if (valuesRMCActeInscription && range !== "") {
        appelApiRMCActe(valuesRMCActeInscription, range);
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
        appelApiRMCActe(valuesRMCActeInscription, range, ficheIdentifiant);
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
    (valeurs: IRMCActeInscriptionForm) => {
      //** Le refacto s'arrête ici pour l'instant, pour retirer le as il faut attendre la tâche de refacto technique de la soumission du formulaire RMC*/
      const values = valeurs as unknown as IRMCActeInscription;
      const messageErreur = getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(values);
      if (messageErreur) {
        messageManager.showErrorAndClose(messageErreur, dansFenetreExterne ? TOASTCONTAINER_EXTERNE : TOASTCONTAINER_PRINCIPAL);
      } else {
        setOpEnCours(true);
        setNouvelleRMCActeInscription(true);
        setValuesRMCActeInscription(values);
        appelApiRMCActe(values, `0-${NB_LIGNES_PAR_APPEL_ACTE}`);
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
    if (dataRMCActe && dataTableauRMCActe && dataRMCInscription && dataTableauRMCInscription)
      tableauResultatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [dataRMCActe, dataTableauRMCActe, dataRMCInscription, dataTableauRMCInscription]);

  return (
    <>
      <OperationEnCours
        visible={opEnCours || enAttenteRMCActe}
        onTimeoutEnd={() => setOpEnCours(false)}
      ></OperationEnCours>

      <RMCActeInscription onSubmit={onSubmitRMCActeInscription} />

      {dataRMCActe && dataTableauRMCActe && dataRMCInscription && dataTableauRMCInscription && (
        <RMCActeInscriptionResultats
          ref={tableauResultatRef}
          typeRMC="Classique"
          dataRMCActe={dataRMCActe}
          dataTableauRMCActe={dataTableauRMCActe}
          dataRMCInscription={dataRMCInscription}
          dataTableauRMCInscription={dataTableauRMCInscription}
          setRangeInscription={setRangeInscription}
          setRangeActe={setRangeActe}
          resetRMC={nouvelleRMCActeInscription}
          nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
          nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
          nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
          nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
          getLignesSuivantesOuPrecedentesActe={getLignesSuivantesOuPrecedentesActe}
          idFicheActe={idFicheActe}
          dataRMCFicheActe={dataRMCActe}
          dataTableauRMCFicheActe={dataTableauRMCActe}
          getLignesSuivantesOuPrecedentesInscription={getLignesSuivantesOuPrecedentesInscription}
          idFicheInscription={resultatRMCFicheInscription?.ficheIdentifiant}
          dataRMCFicheInscription={resultatRMCFicheInscription?.dataRMCInscription}
          dataTableauRMCFicheInscription={resultatRMCFicheInscription?.dataTableauRMCInscription}
        />
      )}
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
