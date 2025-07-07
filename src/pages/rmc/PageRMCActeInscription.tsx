import { useRMCInscriptionApiHook } from "@hook/rmcActeInscription/RMCInscriptionApiHook";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import messageManager from "@util/messageManager";
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
import { IParamsTableau, PARAMS_TABLEAU_VIDE, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { RMCActeInscription } from "../../composants/pages/rmc/formulaire/RMCActeInscription";
import useFetchApi from "../../hooks/api/FetchApiHook";
import { StockageLocal } from "../../utils/StockageLocal";

interface PageRMCActeInscriptionProps {
  dansFenetreExterne: boolean;
}

const TOASTCONTAINER_EXTERNE = "toastContainer-externe";

export const PageRMCActeInscription: React.FC<PageRMCActeInscriptionProps> = ({ dansFenetreExterne }) => {
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [valuesRMCActeInscription, setValuesRMCActeInscription] = useState<IRMCActeInscriptionForm | null>(null);
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

  const appelApiRMCActe = useCallback((valeursformulaire: IRMCActeInscriptionForm, range: string, ficheIdentifiant?: string) => {
    const criteres = mappingCriteres(valeursformulaire as unknown as IRMCActeInscription);

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
  }, []);

  const setRangeActe = useCallback(
    (range: string) => {
      if (valuesRMCActeInscription && range !== "") appelApiRMCActe(valuesRMCActeInscription, range);
    },
    [valuesRMCActeInscription]
  );

  const setRangeInscription = (range: string) => {
    if (valuesRMCActeInscription && range !== "") {
      setCriteresRechercheInscription({
        valeurs: valuesRMCActeInscription as unknown as IRMCActeInscription,
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
          valeurs: valuesRMCActeInscription as unknown as IRMCActeInscription,
          range,
          ficheIdentifiant
        });
      }
    },
    [valuesRMCActeInscription]
  );

  const onSubmitRMCActeInscription = async (valeurs: IRMCActeInscriptionForm) => {
    StockageLocal.stocker("CRITERES_RMC_ACTE_INSCRIPTION", valeurs);
    appelApiRMCActe(valeurs, `0-${NB_LIGNES_PAR_APPEL_ACTE}`);

    setOpEnCours(true);
    setNouvelleRMCActeInscription(true);
    setValuesRMCActeInscription(valeurs);
    setCriteresRechercheInscription({
      valeurs: valeurs as unknown as IRMCActeInscription,
      range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}`,
      onErreur: () => setOpEnCours(false),
      onFinTraitement: () => setOpEnCours(false)
    });
    setNouvelleRMCActeInscription(false);
  };

  useEffect(() => {
    if (dataRMCActe && dataTableauRMCActe && dataRMCInscription && dataTableauRMCInscription)
      tableauResultatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [dataRMCActe, dataTableauRMCActe, dataRMCInscription, dataTableauRMCInscription]);

  return (
    <>
      <OperationEnCours visible={opEnCours || enAttenteRMCActe}></OperationEnCours>

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
          dataRMCFicheActe={dataRMCActe!}
          dataTableauRMCFicheActe={dataTableauRMCActe!}
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
