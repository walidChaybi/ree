import { CONFIG_DELETE_ANALYSE_MARGINALE_ABANDONNEE } from "@api/configurations/etatCivil/DeleteAnalyseMarginaleAbandonneeConfigApi";
import { CONFIG_PATCH_ABONDON_MISE_A_JOUR_ACTE } from "@api/configurations/etatCivil/acte/PatchAbandonMiseAJourActe";
import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjourConfigApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import useFetchApi from "../../hooks/api/FetchApiHook";
import { TRAITEMENT_SANS_ERREUR, TRAITEMENT_SANS_REPONSE, TTraitementApi } from "./TTraitementApi";

type TParamsAbandon = {
  idActe: string;
  idRequete: string;
  miseAJourEffectuee: boolean;
  estMiseAJourAvecMentions: boolean;
};

const TRAITEMENT_ABANDONNER_MISE_A_JOUR: TTraitementApi<TParamsAbandon> = {
  Lancer: terminerTraitement => {
    const { appelApi: appelApiAbandonnerAnalyseMarginale } = useFetchApi(CONFIG_DELETE_ANALYSE_MARGINALE_ABANDONNEE);
    const { appelApi: appelApiAbandonnerMajActe } = useFetchApi(CONFIG_PATCH_ABONDON_MISE_A_JOUR_ACTE);
    const { appelApi: appelPatchMiseAJourStatutRequete } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR);

    const lancer = (parametres: TParamsAbandon | undefined): void => {
      const idActe = parametres?.idActe;
      const idRequete = parametres?.idRequete;
      if (!idActe || !idRequete) {
        terminerTraitement();

        return;
      }

      const abandonnerRequete = () =>
        appelPatchMiseAJourStatutRequete({
          parametres: { path: { idRequete: idRequete, statut: StatutRequete.getKey(StatutRequete.ABANDONNEE) } },
          finalement: () => terminerTraitement()
        });

      if (!parametres?.miseAJourEffectuee) {
        abandonnerRequete();

        return;
      }

      parametres.estMiseAJourAvecMentions
        ? appelApiAbandonnerMajActe({
            parametres: { path: { idActe: idActe } },
            finalement: abandonnerRequete
          })
        : appelApiAbandonnerAnalyseMarginale({
            parametres: { path: { idActe: idActe } },
            finalement: abandonnerRequete
          });
    };

    return { lancer, erreurTraitement: TRAITEMENT_SANS_ERREUR, reponseTraitement: TRAITEMENT_SANS_REPONSE };
  }
};

export default TRAITEMENT_ABANDONNER_MISE_A_JOUR;
