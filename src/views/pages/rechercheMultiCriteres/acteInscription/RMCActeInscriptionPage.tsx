import React, { useCallback, useRef, useState } from "react";
import { IRMCActeInscription } from "../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { stockageDonnees } from "../../../common/util/stockageDonnees";
import { AutoScroll } from "../../../common/widget/autoScroll/autoScroll";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { useRMCActeApiHook } from "./hook/RMCActeApiHook";
import { ICriteresRechercheActeInscription } from "./hook/RMCActeInscriptionUtils";
import { useRMCInscriptionApiHook } from "./hook/RMCInscriptionApiHook";
import { RMCActeInscriptionResultats } from "./resultats/RMCActeInscriptionResultats";
import { goToLinkRMC } from "./resultats/RMCTableauCommun";
import { RMCActeInscriptionForm } from "./RMCActeInscriptionForm";
import "./scss/RMCActeInscriptionPage.scss";

export const RMCActeInscriptionPage: React.FC = () => {
  const [
    valuesRMCActeInscription,
    setValuesRMCActeInscription
  ] = useState<IRMCActeInscription>({});

  const [
    nouvelleRMCActeInscription,
    setNouvelleRMCActeInscription
  ] = useState<boolean>(false);

  const [
    criteresRechercheActe,
    setCriteresRechercheActe
  ] = useState<ICriteresRechercheActeInscription>();

  const [
    criteresRechercheInscription,
    setCriteresRechercheInscription
  ] = useState<ICriteresRechercheActeInscription>();

  // Critères de recherche pour alimenter les données des fiches Acte en effet leur pagination/navigation est indépendante du tableau de résultats
  const [
    criteresRechercheFicheActe,
    setCriteresRechercheFicheActe
  ] = useState<ICriteresRechercheActeInscription>();

  // Critères de recherche pour alimenter les données des fiches Inscription en effet leur pagination/navigation est indépendante du tableau de résultats
  const [
    criteresRechercheFicheInscription,
    setCriteresRechercheFicheInscription
  ] = useState<ICriteresRechercheActeInscription>();

  const { dataRMCActe, dataTableauRMCActe } = useRMCActeApiHook(
    criteresRechercheActe
  );

  const {
    dataRMCInscription,
    dataTableauRMCInscription
  } = useRMCInscriptionApiHook(criteresRechercheInscription);

  /** Récupération des résultats rmc pour une fiche Acte lors d'une navigation */
  const resultatRMCFicheActe = useRMCActeApiHook(criteresRechercheFicheActe);

  /** Récupération des résultats rmc pour une fiche Inscription lors d'une navigation */
  const resultatRMCFicheInscription = useRMCInscriptionApiHook(
    criteresRechercheFicheInscription
  );

  const setRangeActe = useCallback(
    (range: string) => {
      if (valuesRMCActeInscription && range !== "") {
        setCriteresRechercheActe({
          valeurs: valuesRMCActeInscription,
          range
        });
      }
    },
    [valuesRMCActeInscription]
  );

  const setRangeInscription = (range: string) => {
    if (valuesRMCActeInscription && range !== "") {
      setCriteresRechercheInscription({
        valeurs: valuesRMCActeInscription,
        range
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
          ficheIdentifiant
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

  const onSubmitRMCActeInscription = useCallback((values: any) => {
    setNouvelleRMCActeInscription(true);
    setValuesRMCActeInscription(values);
    setCriteresRechercheActe({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
    });
    setCriteresRechercheInscription({
      valeurs: values,
      range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}`
    });
    stockageDonnees.stockerCriteresRMCActeInspt(values);
    setNouvelleRMCActeInscription(false);
  }, []);

  const RMCActeInscriptionRef = useRef();
  return (
    <>
      <RMCActeInscriptionForm onSubmit={onSubmitRMCActeInscription} />
      <AutoScroll
        autoScroll={nouvelleRMCActeInscription}
        baliseRef={RMCActeInscriptionRef}
      />
      {dataRMCActe &&
        dataTableauRMCActe &&
        dataRMCInscription &&
        dataTableauRMCInscription && (
          <RMCActeInscriptionResultats
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
            getLignesSuivantesOuPrecedentesActe={
              getLignesSuivantesOuPrecedentesActe
            }
            idFicheActe={resultatRMCFicheActe?.ficheIdentifiant}
            dataRMCFicheActe={resultatRMCFicheActe?.dataRMCActe}
            dataTableauRMCFicheActe={resultatRMCFicheActe?.dataTableauRMCActe}
            getLignesSuivantesOuPrecedentesInscription={
              getLignesSuivantesOuPrecedentesInscription
            }
            idFicheInscription={resultatRMCFicheInscription?.ficheIdentifiant}
            dataRMCFicheInscription={
              resultatRMCFicheInscription?.dataRMCInscription
            }
            dataTableauRMCFicheInscription={
              resultatRMCFicheInscription?.dataTableauRMCInscription
            }
          />
        )}
    </>
  );
};
