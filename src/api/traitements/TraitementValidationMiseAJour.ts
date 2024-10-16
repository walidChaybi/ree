import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjour";
import { CONFIG_PATCH_VALIDER_ANALYSE_MARGINALE } from "@api/configurations/requete/miseAJour/PatchValideranalyseMarginaleConfigApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import useFetchApi from "../../hooks/api/FetchApiHook";
import { TTraitementApi } from "./TTraitementApi";

type TParamsValidation = {
  idActe: string;
  idRequete: string;
};

type TEtatAppel = "EN_COURS" | "TERMINE" | "ECHEC";

const TRAITEMENT_VALIDATION_MISE_A_JOUR: TTraitementApi<TParamsValidation> = {
  Lancer: terminerTraitment => {
    const { appelApi: appelApiValiderAnalyseMarginale } = useFetchApi(CONFIG_PATCH_VALIDER_ANALYSE_MARGINALE);
    const [etatValidationAnalyseMarginale, setEtatValidationAnalyseMarginale] = useState<TEtatAppel>("EN_COURS");

    const { appelApi: appelPatchMiseAJourStatutRequete } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR);
    const [etatMiseAJourStatut, setEtatMiseAJourStatut] = useState<TEtatAppel>("EN_COURS");

    const lancer = (parametres: TParamsValidation | undefined, apresSucces: ((reponse?: unknown) => void) | undefined): void => {
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
          apresSucces: () => {
            setEtatMiseAJourStatut("TERMINE");
          },
          apresErreur: () => {
            setEtatMiseAJourStatut("ECHEC");
          }
        });
      };

      appelApiValiderAnalyseMarginale({
        parametres: { path: { idActe: idActe } },
        apresSucces: () => {
          setEtatValidationAnalyseMarginale("TERMINE");
          miseAJourStatutRequete();
          apresSucces?.();
        },
        apresErreur: () => {
          setEtatValidationAnalyseMarginale("ECHEC");
          setEtatMiseAJourStatut("ECHEC");
        }
      });
    };

    useEffect(() => {
      const etatsValidation = [
        { nom: "état civil", etat: etatValidationAnalyseMarginale },
        { nom: "requête", etat: etatMiseAJourStatut }
      ];
      if (etatsValidation.find(etatValidation => etatValidation.etat === "EN_COURS")) {
        return;
      }

      const apisEnEchec = etatsValidation.reduce((nomsApi: string[], etatValidation) => {
        if (etatValidation.etat === "ECHEC") {
          nomsApi.push(etatValidation.nom);
        }

        return nomsApi;
      }, []);

      if (etatValidationAnalyseMarginale === "ECHEC") {
        logError({
          messageUtilisateur: "Impossible de valider l'analyse marginale'",
          error: apisEnEchec.join(", ")
        });
      }

      terminerTraitment();
    }, [etatValidationAnalyseMarginale, etatMiseAJourStatut]);

    return { lancer };
  }
};

export default TRAITEMENT_VALIDATION_MISE_A_JOUR;
