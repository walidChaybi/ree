import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { CONFIG_POST_RMC_INSCRIPTION } from "@api/configurations/etatCivil/acte/PostRMCInscriptionConfigApi";
import { IRMCActeInscriptionDto, IRMCActeInscriptionForm, RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import ResultatRMCInscription, { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { getParamsTableauRMCDepuisHeaders, PARAMS_TABLEAU_RMC_VIDE, TParamsTableauRMC } from "@util/GestionDesLiensApi";
import { NB_LIGNES_PAR_APPEL_ACTE, NB_LIGNES_PAR_APPEL_INSCRIPTION } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../utils/AfficherMessage";
import { IErreurTraitement, TRAITEMENT_SANS_ERREUR, TTraitementApi } from "../TTraitementApi";

interface IParamsRMCActesInscriptions {
  valeursFormulaire: IRMCActeInscriptionForm;
}

export interface IResultatRMCActesInscriptions {
  resultatRMCActe: ResultatRMCActe[];
  resultatRMCInscription: TResultatRMCInscription[];
  paramsTableauRMCActe: TParamsTableauRMC;
  paramsTableauRMCInscription: TParamsTableauRMC;
}

const rmcInscriptionAutorisee = (rmc: IRMCActeInscriptionDto): boolean =>
  !(
    rmc.acte?.natureActe ??
    rmc.acte?.referenceRegistre?.familleRegistre ??
    rmc.acte?.referenceRegistre?.pocopa ??
    rmc.acte?.referenceRegistre?.numeroActe ??
    rmc.acte?.referenceRegistre?.anneeRegistre ??
    rmc.acte?.referenceRECE
  );

const rmcActeAutorisee = (rmc: IRMCActeInscriptionDto): boolean =>
  !(rmc.inscription?.typeRepertoire ?? rmc.inscription?.natureInscription ?? rmc.inscription?.numeroInscription);

const TRAITEMENT_RMC_ACTES_INSCRIPTIONS: TTraitementApi<IParamsRMCActesInscriptions, IResultatRMCActesInscriptions> = {
  Lancer: terminerTraitement => {
    const [resultat, setResultat] = useState<Partial<IResultatRMCActesInscriptions>>({});
    const [tropDeResultats, setTropDeResultats] = useState<boolean>(false);
    const [erreurTraitement, setErreurTraitement] = useState<IErreurTraitement>(TRAITEMENT_SANS_ERREUR);

    const { appelApi: getRMCActe, enAttenteDeReponseApi: enAttenteRMCActe } = useFetchApi(CONFIG_POST_RMC_ACTE);
    const { appelApi: getRMCInscription, enAttenteDeReponseApi: enAttenteRMCInscription } = useFetchApi(CONFIG_POST_RMC_INSCRIPTION);

    const lancer = ({ valeursFormulaire }: IParamsRMCActesInscriptions) => {
      const criteresRMC = RMCActeInscriptionForm.versDto(valeursFormulaire);
      setErreurTraitement(TRAITEMENT_SANS_ERREUR);
      setTropDeResultats(false);
      setResultat({});
      !rmcActeAutorisee(criteresRMC)
        ? setResultat(prec => ({ ...prec, resultatRMCActe: [], paramsTableauRMCActe: PARAMS_TABLEAU_RMC_VIDE }))
        : getRMCActe({
            parametres: {
              body: criteresRMC,
              query: {
                range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
              }
            },
            apresSucces: (actes, headers) =>
              setResultat(prec => ({
                ...prec,
                resultatRMCActe: actes.map(ResultatRMCActe.depuisDto).filter((acte): acte is ResultatRMCActe => acte !== null),
                paramsTableauRMCActe: getParamsTableauRMCDepuisHeaders(headers)
              })),
            apresErreur: (erreurs, statut) => {
              statut === 413
                ? setTropDeResultats(true)
                : AfficherMessage.erreur("Impossible de récupérer les actes de la recherche multi-critères", {
                    erreurs,
                    fermetureAuto: true
                  });
              setErreurTraitement({ enEchec: true });
              terminerTraitement();
            }
          });

      !rmcInscriptionAutorisee(criteresRMC)
        ? setResultat(prec => ({ ...prec, resultatRMCInscription: [], paramsTableauRMCInscription: PARAMS_TABLEAU_RMC_VIDE }))
        : getRMCInscription({
            parametres: {
              body: criteresRMC,
              query: {
                range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}`
              }
            },
            apresSucces: (inscriptions, headers) =>
              setResultat(prec => ({
                ...prec,
                resultatRMCInscription: inscriptions
                  .map(ResultatRMCInscription.depuisDto)
                  .filter((inscription): inscription is TResultatRMCInscription => inscription !== null),
                paramsTableauRMCInscription: getParamsTableauRMCDepuisHeaders(headers)
              })),
            apresErreur: (erreurs, statut) => {
              statut === 413
                ? setTropDeResultats(true)
                : AfficherMessage.erreur("Impossible de récupérer les inscriptions via la recherche multi-critères", {
                    erreurs,
                    fermetureAuto: true
                  });
              setErreurTraitement({ enEchec: true });
              terminerTraitement();
            }
          });
    };

    useEffect(() => {
      if (tropDeResultats)
        AfficherMessage.info("La recherche renvoie plus de 100 résultats. Veuillez affiner votre recherche.", { fermetureAuto: true });
    }, [tropDeResultats]);

    useEffect(() => {
      !enAttenteRMCActe &&
        !enAttenteRMCInscription &&
        resultat.paramsTableauRMCActe &&
        resultat.paramsTableauRMCInscription &&
        resultat.resultatRMCActe &&
        resultat.resultatRMCInscription &&
        terminerTraitement();
    }, [enAttenteRMCActe, enAttenteRMCInscription, resultat]);

    return { lancer, erreurTraitement: erreurTraitement, reponseTraitement: resultat as IResultatRMCActesInscriptions };
  }
};

export default TRAITEMENT_RMC_ACTES_INSCRIPTIONS;
