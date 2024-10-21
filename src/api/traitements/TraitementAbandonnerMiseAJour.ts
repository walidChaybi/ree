import { CONFIG_DELETE_ANALYSE_MARGINALE_ABANDONNEE } from "@api/configurations/etatCivil/DeleteAnalyseMarginaleAbandonneeConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjour";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import useFetchApi from "../../hooks/api/FetchApiHook";
import { TTraitementApi } from "./TTraitementApi";

type TParamsAbandon = {
  idActe: string;
  idRequete: string;
  miseAJourEffectuee: boolean;
};

const TRAITEMENT_ABANDONNER_MISE_A_JOUR: TTraitementApi<TParamsAbandon> = {
  Lancer: terminerTraitment => {
    const { appelApi: appelApiAbandonnerAnalyseMarginale } = useFetchApi(CONFIG_DELETE_ANALYSE_MARGINALE_ABANDONNEE);
    const { appelApi: appelPatchMiseAJourStatutRequete } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR);

    const abandonnerRequete = (idRequete: string, terminerTraitement: () => void) =>
      appelPatchMiseAJourStatutRequete({
        parametres: { path: { idRequete: idRequete, statut: StatutRequete.getKey(StatutRequete.ABANDONNEE) } },
        finalement: () => terminerTraitement()
      });

    const lancer = (parametres: TParamsAbandon | undefined): void => {
      const idActe = parametres?.idActe;
      const idRequete = parametres?.idRequete;
      if (!idActe || !idRequete) {
        terminerTraitment();

        return;
      }

      if (!parametres?.miseAJourEffectuee) {
        abandonnerRequete(idRequete, terminerTraitment);

        return;
      }

      appelApiAbandonnerAnalyseMarginale({
        parametres: { path: { idActe: idActe } },
        finalement: () => abandonnerRequete(idRequete, terminerTraitment)
      });
    };

    return { lancer };
  }
};

export default TRAITEMENT_ABANDONNER_MISE_A_JOUR;
