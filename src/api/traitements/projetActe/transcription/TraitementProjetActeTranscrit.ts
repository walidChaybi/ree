/* istanbul ignore file */
/* v8 ignore start A TESTER 03/25 */
import {
  CONFIG_POST_PROJET_ACTE_TRANSCRIPTION,
  IPostProjetActeTranscriptionConfigApiParams
} from "@api/configurations/etatCivil/acte/transcription/PostProjetActeTranscriptionConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import { IErreurTraitement, TTraitementApi } from "@api/traitements/TTraitementApi";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";

export interface ICreationActionEtMiseAjourStatutParams {
  libelleAction?: string;
  statutRequete?: StatutRequete;
  idRequete?: string;
}

const TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT: TTraitementApi<IPostProjetActeTranscriptionConfigApiParams> = {
  Lancer: terminerTraitement => {
    const [resultat, setResultat] = useState<IProjetActeTranscritDto>();
    const [erreurTraitement, setErreurTraitement] = useState<IErreurTraitement>({ enEchec: false });
    const { appelApi: appelEnregistrerRequeteApi } = useFetchApi(CONFIG_POST_PROJET_ACTE_TRANSCRIPTION);
    const { appelApi: appelPatchCreationStatutRequete } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_CREATION);

    const lancer = (parametres?: IPostProjetActeTranscriptionConfigApiParams): void => {
      const idRequete = parametres?.idRequete;
      if (!parametres || !idRequete) {
        terminerTraitement();
        return;
      }

      const lancerPatchCreationStatutRequete = () => {
        appelPatchCreationStatutRequete({
          parametres: {
            path: {
              idRequete: idRequete
            },
            query: {
              statut: StatutRequete.getKey(StatutRequete.A_SIGNER)
            }
          },
          apresErreur: () => setErreurTraitement({ enEchec: true, message: "Impossible de mettre à jour le statut de la requête" }),
          finalement: () => {
            terminerTraitement();
          }
        });
      };
      appelEnregistrerRequeteApi({
        parametres: {
          body: parametres.projetActe
        },
        apresSucces: (reponse: IProjetActeTranscritDto) => {
          lancerPatchCreationStatutRequete();
          setResultat(reponse);
        },
        apresErreur: () => {
          setErreurTraitement({ enEchec: true, message: "Impossible d'enregister le projet d'acte transcrit" });
          terminerTraitement();
        }
      });
    };

    return { lancer, erreurTraitement, reponseTraitement: resultat };
  }
};

export default TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT;
/* v8 ignore end */
