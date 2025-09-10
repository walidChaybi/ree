import { CONFIG_POST_RMC_AUTO_ACTE } from "@api/configurations/etatCivil/acte/PostRMCAutoActeConfigApi";
import { CONFIG_POST_RMC_AUTO_INSCRIPTION } from "@api/configurations/etatCivil/acte/PostRMCAutoInscriptionConfigApi";
import TRAITEMENT_RMC_ACTES_INSCRIPTIONS, { IResultatRMCActesInscriptions } from "@api/traitements/rmc/TraitementRMCActesInscriptions";
import { getCriteresRMCAuto } from "@hook/rmcAuto/RMCAutoActesInscriptionsUtils";
import {
  ITraitementAutoRDCSParams,
  estEligibleAuTraitementAutoRDCS,
  useTraitementAutoRDCSHook
} from "@hook/rmcAuto/TraitementAutoRDCSHook";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import ResultatRMCInscription, { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { TParamsTableauRMC, getParamsTableauRMCDepuisHeaders } from "@util/GestionDesLiensApi";
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
import useTraitementApi from "../../../../hooks/api/TraitementApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import { StockageLocal } from "../../../../utils/StockageLocal";
import { RMCActeInscriptionResultats } from "../acteInscription/resultats/RMCActeInscriptionResultats";
import { getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur } from "../acteInscription/validation/VerificationRestrictionRmcActeInscription";
import { BoutonNouvelleRMCActeInscription } from "./BoutonNouvelleRMCActeInscription";

interface ITableauRMCProps {
  requete?: TRequete;
  dataAlertes?: IAlerte[];
  onClickCheckboxTableauActes?: (event: TChangeEventSurHTMLInputElement, data: ResultatRMCActe) => void;
  onClickCheckboxTableauInscriptions?: (event: TChangeEventSurHTMLInputElement, data: TResultatRMCInscription) => void;
  reset?: () => void;
}

export const TableauRMC: React.FC<ITableauRMCProps> = ({ requete, ...props }) => {
  const location = useLocation();
  const [popinAffichee, setPopinAffichee] = useState<boolean>(false);

  /* Etats RMC Communs */
  const [resetRMCActeInscription, setResetRMCActeInscription] = useState<boolean>(false);
  const [resultatRMCActeInscription, setResultatRMCActeInscription] = useState<IResultatRMCActesInscriptions | null>(null);

  /* Etats RMC Auto */
  const [dataRMCAutoActe, setDataRMCAutoActe] = useState<ResultatRMCActe[] | null>(null);
  const [dataRMCAutoInscription, setDataRMCAutoInscription] = useState<TResultatRMCInscription[] | null>(null);
  const [paramsTableauRMCAutoActe, setParamsTableauRMCAutoActe] = useState<TParamsTableauRMC | null>(null);
  const [paramsTableauRMCAutoInscription, setParamsTableauRMCAutoInscription] = useState<TParamsTableauRMC | null>(null);
  const [tropDeResultatsRMCAuto, setTropDeResultatsRMCAuto] = useState<boolean>(false);

  /* RMC Auto Actes */
  const { appelApi: appelRMCAutoActe } = useFetchApi(CONFIG_POST_RMC_AUTO_ACTE);

  useEffect(() => {
    if (!requete) return;

    const criteresRMCAutoActe = getCriteresRMCAuto(requete);

    appelRMCAutoActe({
      parametres: { body: criteresRMCAutoActe, query: { range: `0-${NB_LIGNES_PAR_APPEL_ACTE}` } },
      apresSucces: (actes, headers) => {
        setDataRMCAutoActe(actes.map(ResultatRMCActe.depuisDto).filter((acte): acte is ResultatRMCActe => acte !== null));
        setParamsTableauRMCAutoActe(getParamsTableauRMCDepuisHeaders(headers));
      },
      apresErreur: (erreurs, statut) => {
        console.error("Erreur lors de la RMC auto acte :", erreurs);
        statut === 413
          ? setTropDeResultatsRMCAuto(true)
          : AfficherMessage.erreur("Une erreur est survenue lors de la recherche multi-critères automatique d'actes", {
              erreurs,
              fermetureAuto: true
            });
      }
    });
  }, [requete]);

  /* RMC Auto Inscriptions */
  const { appelApi: rmcAutoInscriptions } = useFetchApi(CONFIG_POST_RMC_AUTO_INSCRIPTION);

  useEffect(() => {
    if (!requete) return;

    const criteresRMCAutoInscription = getCriteresRMCAuto(requete);

    rmcAutoInscriptions({
      parametres: { body: criteresRMCAutoInscription, query: { range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}` } },
      apresSucces: (inscriptions, headers) => {
        setDataRMCAutoInscription(
          inscriptions
            .map(ResultatRMCInscription.depuisDto)
            .filter((inscription): inscription is TResultatRMCInscription => inscription !== null)
        );
        setParamsTableauRMCAutoInscription(getParamsTableauRMCDepuisHeaders(headers));
      },
      apresErreur: (erreurs, statut) => {
        console.error("Erreur lors de la RMC auto inscription :", erreurs);
        statut === 413
          ? setTropDeResultatsRMCAuto(true)
          : AfficherMessage.erreur("Une erreur est survenue lors de la recherche multi-critères automatique de RC/RCA/PACS", {
              erreurs,
              fermetureAuto: true
            });
      }
    });
  }, [requete]);

  useEffect(() => {
    if (tropDeResultatsRMCAuto)
      AfficherMessage.info(" La recherche automatique renvoie plus de 100 résultats. Veuillez affiner votre recherche.", {
        fermetureAuto: true
      });
  }, [tropDeResultatsRMCAuto]);

  /* Hook traitement auto RDCS*/
  const traitementAutoRDCSParams: ITraitementAutoRDCSParams | null = useMemo(() => {
    if (requete?.type !== TypeRequete.DELIVRANCE || !dataRMCAutoActe || !dataRMCAutoInscription || tropDeResultatsRMCAuto) return null;

    const requeteDelivrance: IRequeteDelivrance = requete as IRequeteDelivrance;

    const { autoriserTraitementAutoRDCS } = location.state ?? { autoriserTraitementAutoRDCS: true };

    const lancerTraitementAutoRDCS: boolean = autoriserTraitementAutoRDCS && estEligibleAuTraitementAutoRDCS(requeteDelivrance);

    return lancerTraitementAutoRDCS
      ? {
          requete: mappingRequeteDelivranceToRequeteTableau(requeteDelivrance),
          urlCourante: location.pathname,
          dataRMCAutoActe: dataRMCAutoActe,
          dataRMCAutoInscription: dataRMCAutoInscription
        }
      : null;
  }, [requete, dataRMCAutoActe, dataRMCAutoInscription]);

  const traitementAutoRDCSEnCours = useTraitementAutoRDCSHook(traitementAutoRDCSParams);

  /* Traitement RMC manuelle */
  const { lancerTraitement, traitementEnCours: enAttenteRMC } = useTraitementApi(TRAITEMENT_RMC_ACTES_INSCRIPTIONS);

  /* Actualisation des résultats de la RMC */
  useEffect(() => {
    if (!dataRMCAutoActe || !dataRMCAutoInscription || !paramsTableauRMCAutoActe || !paramsTableauRMCAutoInscription) return;

    setResultatRMCActeInscription({
      resultatRMCActe: dataRMCAutoActe,
      resultatRMCInscription: dataRMCAutoInscription,
      paramsTableauRMCActe: paramsTableauRMCAutoActe,
      paramsTableauRMCInscription: paramsTableauRMCAutoInscription
    });
  }, [dataRMCAutoActe, dataRMCAutoInscription, paramsTableauRMCAutoActe, paramsTableauRMCAutoInscription]);

  /* Nouvelle RMC depuis la pop up */
  const nouvelleRMCActeInscription = useCallback(
    (valeurs: any) => {
      const messageErreur = getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(valeurs);
      if (messageErreur) {
        AfficherMessage.erreur(messageErreur, { fermetureAuto: true });
      } else {
        setPopinAffichee(false);
        setResetRMCActeInscription(true);

        lancerTraitement({
          parametres: {
            valeursFormulaire: valeurs
          },
          apresSucces: setResultatRMCActeInscription
        });

        StockageLocal.stocker("CRITERES_RMC_ACTE_INSCRIPTION", valeurs);
        setResetRMCActeInscription(false);
        props.reset?.();
      }
    },
    [props.reset]
  );

  return (
    <>
      {resultatRMCActeInscription && (
        <RMCActeInscriptionResultats
          typeRMC="Auto"
          dataAlertes={props.dataAlertes}
          dataRequete={requete}
          dataRMCActe={resultatRMCActeInscription.resultatRMCActe}
          dataTableauRMCActe={resultatRMCActeInscription.paramsTableauRMCActe}
          dataRMCInscription={resultatRMCActeInscription.resultatRMCInscription}
          dataTableauRMCInscription={resultatRMCActeInscription.paramsTableauRMCInscription}
          onClickCheckboxTableauActes={props.onClickCheckboxTableauActes}
          onClickCheckboxTableauInscriptions={props.onClickCheckboxTableauInscriptions}
          resetRMC={resetRMCActeInscription}
          nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
          nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
          nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
          nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
          rmcActeEnCours={enAttenteRMC}
          rmcInscriptionEnCours={enAttenteRMC}
        />
      )}
      <BoutonNouvelleRMCActeInscription
        nouvelleRMCActeInscription={nouvelleRMCActeInscription}
        setPopinAffichee={setPopinAffichee}
        popinAffichee={popinAffichee}
        titulaires={requete?.titulaires}
      />
      {traitementAutoRDCSEnCours && <PageChargeur />}
    </>
  );
};
