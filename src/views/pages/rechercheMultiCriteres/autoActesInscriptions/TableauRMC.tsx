import { CONFIG_POST_RMC_AUTO_ACTE } from "@api/configurations/etatCivil/acte/PostRMCAutoActeConfigApi";
import { ICriteresRechercheActeInscription } from "@hook/rmcActeInscription/RMCActeInscriptionUtils";
import { useRMCInscriptionApiHook } from "@hook/rmcActeInscription/RMCInscriptionApiHook";
import { getCriteresRMCAuto } from "@hook/rmcAuto/RMCAutoActesInscriptionsUtils";
import { IRMCAutoInscriptionParams, useRMCAutoInscriptionApiHook } from "@hook/rmcAuto/RMCAutoInscriptionApiHook";
import {
  ITraitementAutoRDCSParams,
  estEligibleAuTraitementAutoRDCS,
  useTraitementAutoRDCSHook
} from "@hook/rmcAuto/TraitementAutoRDCSHook";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { IParamsTableau, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import messageManager from "@util/messageManager";
import { stockageDonnees } from "@util/stockageDonnees";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import { useRMCActeApiHook } from "../../../../hooks/rmc/RMCActeApiHook";
import { StockageLocal } from "../../../../utils/StockageLocal";
import { RMCActeInscriptionResultats } from "../acteInscription/resultats/RMCActeInscriptionResultats";
import { goToLinkRMC } from "../acteInscription/resultats/RMCTableauCommun";
import { getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur } from "../acteInscription/validation/VerificationRestrictionRmcActeInscription";
import { BoutonNouvelleRMCActeInscription } from "./BoutonNouvelleRMCActeInscription";

interface ITableauRMCProps {
  requete?: TRequete;
  dataAlertes?: IAlerte[];
  onClickCheckboxTableauActes?: (event: TChangeEventSurHTMLInputElement, data: ResultatRMCActe) => void;
  onClickCheckboxTableauInscriptions?: (event: TChangeEventSurHTMLInputElement, data: IResultatRMCInscription) => void;
  reset?: () => void;
}

export const TableauRMC: React.FC<ITableauRMCProps> = props => {
  const location = useLocation();
  const [popinAffichee, setPopinAffichee] = useState<boolean>(false);

  /* Etats RMC Auto */
  const [rmcAutoActe, setRmcAutoActe] = useState<ResultatRMCActe[] | undefined>();
  const [tableauRMCAutoActe, setTableauRMCAutoActe] = useState<IParamsTableau | undefined>();
  const [rmcAutoInscription, setRmcAutoInscription] = useState<IResultatRMCInscription[] | undefined>();
  const [tableauRMCAutoInscription, setTableauRMCAutoInscription] = useState<IParamsTableau | undefined>();

  /* Etats RMC manuelle */
  const [resetRMCActeInscription, setResetRMCActeInscription] = useState<boolean>(false);
  const [valuesRMCActeInscription, setValuesRMCActeInscription] = useState<IRMCActeInscription>({});
  const [criteresRechercheActe, setCriteresRechercheActe] = useState<ICriteresRechercheActeInscription>();
  const [criteresRechercheInscription, setCriteresRechercheInscription] = useState<ICriteresRechercheActeInscription>();

  // Critères de recherche pour alimenter les données des fiches Acte en effet leur pagination/navigation est indépendante du tableau de résultats
  const [criteresRechercheFicheActe, setCriteresRechercheFicheActe] = useState<ICriteresRechercheActeInscription>();

  // Critères de recherche pour alimenter les données des fiches Inscription en effet leur pagination/navigation est indépendante du tableau de résultats
  const [criteresRechercheFicheInscription, setCriteresRechercheFicheInscription] = useState<ICriteresRechercheActeInscription>();

  /* Hooks RMC Auto */
  const [paramsRMCAuto, setParamsRMCAuto] = useState<IRMCAutoInscriptionParams>({});

  useEffect(() => {
    if (!props.requete) return;

    setParamsRMCAuto({
      requete: props.requete,
      range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
    });
  }, [props.requete]);

  /* RMC Auto Actes */
  const [dataRMCAutoActe, setDataRMCAutoActe] = useState<ResultatRMCActe[]>();

  const { appelApi: appelRMCAutoActe } = useFetchApi(CONFIG_POST_RMC_AUTO_ACTE);

  useEffect(() => {
    if (!paramsRMCAuto?.requete) return;

    const criteresRMCAutoActe = getCriteresRMCAuto(paramsRMCAuto?.requete);

    appelRMCAutoActe({
      parametres: { body: criteresRMCAutoActe, query: { range: `0-${NB_LIGNES_PAR_APPEL_ACTE}` } },
      apresSucces: (actes, headers) => {
        setDataRMCAutoActe(actes.map(ResultatRMCActe.depuisDto).filter((acte): acte is ResultatRMCActe => acte !== null));
        setTableauRMCAutoActe(getParamsTableauDepuisHeaders(headers));
      },
      apresErreur: erreurs => {
        console.error("Erreur lors de la RMC auto acte :", erreurs);
        messageManager.showError("Une erreur est survenue lors de la recherche multi-critères automatique d'actes");
        logError({
          messageUtilisateur: "Impossible de récupérer les actes de la recherche multi-critères automatique"
        });
      }
    });
  }, [paramsRMCAuto?.requete]);

  /* RMC Auto Inscriptions */
  const { dataRMCAutoInscription, dataTableauRMCAutoInscription } = useRMCAutoInscriptionApiHook(paramsRMCAuto);

  /* Hook traitement auto RDCS*/
  const traitementAutoRDCSParams: ITraitementAutoRDCSParams | null = useMemo(() => {
    if (props?.requete?.type !== TypeRequete.DELIVRANCE || !dataRMCAutoActe || !dataRMCAutoInscription) return null;

    const requete: IRequeteDelivrance = props.requete as IRequeteDelivrance;

    const { autoriserTraitementAutoRDCS } = location.state || { autoriserTraitementAutoRDCS: true };

    const lancerTraitementAutoRDCS: boolean = autoriserTraitementAutoRDCS && estEligibleAuTraitementAutoRDCS(requete);

    return lancerTraitementAutoRDCS
      ? {
          requete: mappingRequeteDelivranceToRequeteTableau(requete),
          urlCourante: location.pathname,
          dataRMCAutoActe: dataRMCAutoActe,
          dataRMCAutoInscription: dataRMCAutoInscription
        }
      : null;
  }, [props.requete, dataRMCAutoActe, dataRMCAutoInscription]);

  const traitementAutoRDCSEnCours = useTraitementAutoRDCSHook(traitementAutoRDCSParams);

  /* Hooks RMC manuelle */
  const resultatsRMCActe = useRMCActeApiHook(criteresRechercheActe);
  const {
    dataRMCInscription,
    dataTableauRMCInscription,
    opEnCours: opEnCoursRMCInscription
  } = useRMCInscriptionApiHook(criteresRechercheInscription);

  /* Actualisation des résultats de la RMC */
  useEffect(() => {
    if (dataRMCAutoActe) {
      setRmcAutoActe(dataRMCAutoActe);
    }
  }, [dataRMCAutoActe]);

  useEffect(() => {
    if (dataRMCAutoInscription && dataTableauRMCAutoInscription) {
      setRmcAutoInscription(dataRMCAutoInscription);
      setTableauRMCAutoInscription(dataTableauRMCAutoInscription);
    }
  }, [dataRMCAutoInscription, dataTableauRMCAutoInscription]);

  useEffect(() => {
    if (!resultatsRMCActe) return;
    setRmcAutoActe(resultatsRMCActe.dataRMCActe);
    setTableauRMCAutoActe(resultatsRMCActe.dataTableauRMCActe);
  }, [resultatsRMCActe]);

  useEffect(() => {
    if (dataRMCInscription && dataTableauRMCInscription) {
      setRmcAutoInscription(dataRMCInscription);
      setTableauRMCAutoInscription(dataTableauRMCInscription);
    }
  }, [dataRMCInscription, dataTableauRMCInscription]);

  /* Gestion de la pagination pour la RMC */
  const setRangeInscription = (rangeInscription: string) => {
    if (valuesRMCActeInscription && rangeInscription !== "") {
      setCriteresRechercheInscription({
        valeurs: valuesRMCActeInscription,
        range: rangeInscription
      });
    }
  };

  const setRangeActe = (rangeActe: string) => {
    if (valuesRMCActeInscription && rangeActe !== "") {
      setCriteresRechercheActe({
        valeurs: valuesRMCActeInscription,
        range: rangeActe
      });
    }
  };

  /** Récupération des résultats rmc pour une fiche Acte lors d'une navigation */
  const resultatRMCFicheActe = useRMCActeApiHook(criteresRechercheFicheActe);

  /** Récupération des résultats rmc pour une fiche Inscription lors d'une navigation */
  const resultatRMCFicheInscription = useRMCInscriptionApiHook(criteresRechercheFicheInscription);

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

  /* Nouvelle RMC depuis la pop up */
  const nouvelleRMCActeInscription = useCallback(
    (values: any) => {
      const messageErreur = getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(values);
      if (messageErreur) {
        messageManager.showErrorAndClose(messageErreur);
      } else {
        setPopinAffichee(false);
        setResetRMCActeInscription(true);
        setValuesRMCActeInscription(values);
        setCriteresRechercheActe({
          valeurs: RMCActeInscriptionForm.versDto(values) as IRMCActeInscription,
          range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
        });
        setCriteresRechercheInscription({
          valeurs: RMCActeInscriptionForm.versDto(values) as IRMCActeInscription,
          range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
        });
        gestionnaireFeatureFlag.estActif(FeatureFlag.FF_UTILISER_NOUVELLE_RMC)
          ? StockageLocal.stocker("CRITERES_RMC_ACTE_INSCRIPTION", values)
          : stockageDonnees.stockerCriteresRMCActeInspt(values);
        setResetRMCActeInscription(false);
        props.reset?.();
      }
    },
    [props.reset]
  );

  return (
    <>
      {rmcAutoActe && tableauRMCAutoActe && rmcAutoInscription && tableauRMCAutoInscription && (
        <RMCActeInscriptionResultats
          typeRMC="Auto"
          dataAlertes={props.dataAlertes}
          dataRequete={props.requete}
          dataRMCActe={rmcAutoActe}
          dataTableauRMCActe={tableauRMCAutoActe}
          dataRMCInscription={rmcAutoInscription}
          dataTableauRMCInscription={tableauRMCAutoInscription}
          onClickCheckboxTableauActes={props.onClickCheckboxTableauActes}
          onClickCheckboxTableauInscriptions={props.onClickCheckboxTableauInscriptions}
          resetRMC={resetRMCActeInscription}
          setRangeInscription={setRangeInscription}
          setRangeActe={setRangeActe}
          nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
          nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
          nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
          nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
          getLignesSuivantesOuPrecedentesActe={getLignesSuivantesOuPrecedentesActe}
          idFicheActe={resultatRMCFicheActe?.ficheIdentifiant}
          dataRMCFicheActe={resultatRMCFicheActe?.dataRMCActe}
          dataTableauRMCFicheActe={resultatRMCFicheActe?.dataTableauRMCActe}
          getLignesSuivantesOuPrecedentesInscription={getLignesSuivantesOuPrecedentesInscription}
          idFicheInscription={resultatRMCFicheInscription?.ficheIdentifiant}
          dataRMCFicheInscription={resultatRMCFicheInscription?.dataRMCInscription}
          dataTableauRMCFicheInscription={resultatRMCFicheInscription?.dataTableauRMCInscription}
          opEnCoursRMCActe={resultatsRMCActe?.opEnCours}
          opEnCoursRMCInscription={opEnCoursRMCInscription}
        />
      )}
      <BoutonNouvelleRMCActeInscription
        nouvelleRMCActeInscription={nouvelleRMCActeInscription}
        setPopinAffichee={setPopinAffichee}
        popinAffichee={popinAffichee}
        titulaires={props.requete?.titulaires}
      />
      {traitementAutoRDCSEnCours && <PageChargeur />}
    </>
  );
};
