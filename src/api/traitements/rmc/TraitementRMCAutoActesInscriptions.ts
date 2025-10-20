import { CONFIG_POST_RMC_AUTO_ACTE } from "@api/configurations/etatCivil/acte/PostRMCAutoActeConfigApi";
import { CONFIG_POST_RMC_AUTO_INSCRIPTION } from "@api/configurations/etatCivil/acte/PostRMCAutoInscriptionConfigApi";
import { TErreurApi } from "@model/api/Api";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import {
  IRMCAutoTitulaireDto,
  titulaireRequeteVersRMCAutoTitulaireDto
} from "@model/rmc/acteInscription/rechercheForm/IRMCAutoTitulaireDto";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import ResultatRMCInscription, { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { getParamsTableauRMCDepuisHeaders, PARAMS_TABLEAU_RMC_VIDE } from "@util/GestionDesLiensApi";
import { NB_LIGNES_PAR_APPEL_ACTE, NB_LIGNES_PAR_APPEL_INSCRIPTION } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../utils/AfficherMessage";
import { IErreurTraitement, TRAITEMENT_SANS_ERREUR, TTraitementApi } from "../TTraitementApi";
import { IResultatRMCActesInscriptions } from "./TraitementRMCActesInscriptions";

interface IParamsRMCAutoActesInscriptions {
  titulairesRequete?: ITitulaireRequete[];
}

const TRAITEMENT_RMC_AUTO_ACTES_INSCRIPTIONS: TTraitementApi<IParamsRMCAutoActesInscriptions, IResultatRMCActesInscriptions> = {
  Lancer: terminerTraitement => {
    const [resultat, setResultat] = useState<Partial<IResultatRMCActesInscriptions>>({});
    const [tropDeResultats, setTropDeResultats] = useState<boolean>(false);
    const [erreurTraitement, setErreurTraitement] = useState<IErreurTraitement>(TRAITEMENT_SANS_ERREUR);

    const { appelApi: postRMCAutoActe, enAttenteDeReponseApi: enAttenteRMCActe } = useFetchApi(CONFIG_POST_RMC_AUTO_ACTE);
    const { appelApi: postRMCAutoInscription, enAttenteDeReponseApi: enAttenteRMCInscription } =
      useFetchApi(CONFIG_POST_RMC_AUTO_INSCRIPTION);

    const apresErreur: (erreurs: TErreurApi[], statut: number | undefined, messageErreur: string) => void = (
      erreurs,
      statut,
      messageErreur
    ) => {
      statut === 413
        ? setTropDeResultats(true)
        : AfficherMessage.erreur(messageErreur, {
            fermetureAuto: true,
            erreurs
          });
      setErreurTraitement({ enEchec: true });
      terminerTraitement();
    };

    const lancer = ({ titulairesRequete }: IParamsRMCAutoActesInscriptions) => {
      const criteresRMCAuto: IRMCAutoTitulaireDto[] = titulairesRequete?.map(titulaireRequeteVersRMCAutoTitulaireDto) ?? [];
      setErreurTraitement(TRAITEMENT_SANS_ERREUR);
      setTropDeResultats(false);
      setResultat({});

      if (!criteresRMCAuto.length) {
        setResultat({
          resultatRMCInscription: [],
          resultatRMCActe: [],
          paramsTableauRMCActe: PARAMS_TABLEAU_RMC_VIDE,
          paramsTableauRMCInscription: PARAMS_TABLEAU_RMC_VIDE
        });
        return;
      }

      postRMCAutoActe({
        parametres: {
          query: {
            range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
          },
          body: criteresRMCAuto
        },
        apresSucces: (actes, headers) =>
          setResultat(prec => ({
            ...prec,
            paramsTableauRMCActe: getParamsTableauRMCDepuisHeaders(headers),
            resultatRMCActe: actes.map(ResultatRMCActe.depuisDto).filter((acte): acte is ResultatRMCActe => acte !== null)
          })),
        apresErreur: (erreurs, statut) =>
          apresErreur(erreurs, statut, "Impossible de récupérer les actes de la recherche multi-critères automatique")
      });

      postRMCAutoInscription({
        parametres: {
          query: {
            range: `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}`
          },
          body: criteresRMCAuto
        },
        apresSucces: (inscriptions, headers) =>
          setResultat(prec => ({
            ...prec,
            paramsTableauRMCInscription: getParamsTableauRMCDepuisHeaders(headers),
            resultatRMCInscription: inscriptions
              .map(ResultatRMCInscription.depuisDto)
              .filter((inscription): inscription is TResultatRMCInscription => inscription !== null)
          })),
        apresErreur: (erreurs, statut) =>
          apresErreur(erreurs, statut, "Impossible de récupérer les inscriptions via la recherche multi-critères automatique")
      });
    };

    useEffect(() => {
      if (tropDeResultats)
        AfficherMessage.info("La recherche automatique renvoie plus de 100 résultats. Veuillez affiner votre recherche.", {
          fermetureAuto: true
        });
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

export default TRAITEMENT_RMC_AUTO_ACTES_INSCRIPTIONS;
