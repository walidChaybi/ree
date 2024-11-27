import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjourConfigApi";
import { CONFIG_PATCH_VALIDER_ANALYSE_MARGINALE } from "@api/configurations/requete/miseAJour/PatchValideranalyseMarginaleConfigApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useState } from "react";
import useFetchApi from "../../hooks/api/FetchApiHook";
import { IErreurTraitement, TRAITEMENT_SANS_REPONSE, TTraitementApi } from "./TTraitementApi";

type TParamsValidation = {
  idActe: string;
  idRequete: string;
};

const TRAITEMENT_VALIDATION_MISE_A_JOUR: TTraitementApi<TParamsValidation> = {
  Lancer: terminerTraitment => {
    const [erreurTraitement, setErreurTraitement] = useState<IErreurTraitement>({ enEchec: false });
    const { appelApi: appelApiValiderAnalyseMarginale } = useFetchApi(CONFIG_PATCH_VALIDER_ANALYSE_MARGINALE);
    const { appelApi: appelPatchMiseAJourStatutRequete } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR);

    const lancer = (parametres: TParamsValidation | undefined): void => {
      const idActe = parametres?.idActe;
      const idRequete = parametres?.idRequete;
      if (!idActe || !idRequete) {
        terminerTraitment();

        return;
      }

      const miseAJourStatutRequete = () => {
        appelPatchMiseAJourStatutRequete({
          parametres: {
            path: {
              idRequete: idRequete,
              statut: StatutRequete.getKey(StatutRequete.TRAITEE_MIS_A_JOUR)
            },
            query: {
              estMiseAjourAnalyseMarginale: true
            }
          },
          apresErreur: () => setErreurTraitement({ enEchec: true, message: "Impossible de valider l'analyse marginale" }),
          finalement: () => terminerTraitment()
        });
      };

      appelApiValiderAnalyseMarginale({
        parametres: { path: { idActe: idActe } },
        apresSucces: () => miseAJourStatutRequete(),
        apresErreur: () => {
          setErreurTraitement({ enEchec: true, message: "Impossible de valider l'analyse marginale" });
          terminerTraitment();
        }
      });
    };

    return { lancer, erreurTraitement, reponseTraitement: TRAITEMENT_SANS_REPONSE };
  }
};

export default TRAITEMENT_VALIDATION_MISE_A_JOUR;
